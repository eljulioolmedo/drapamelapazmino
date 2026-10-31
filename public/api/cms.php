<?php
/**
 * No-Code Visual CMS Backend for https://drapamelapazmino.com
 * Stores content, 10-version undo history, and media uploads directly on Hostinger.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$rootDir = dirname(__DIR__);
$dataDir = $rootDir . '/cms-data';
$historyDir = $dataDir . '/history';
$uploadsDir = $rootDir . '/uploads';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
if (!is_dir($historyDir)) {
    @mkdir($historyDir, 0755, true);
}
if (!is_dir($uploadsDir)) {
    @mkdir($uploadsDir, 0755, true);
}

// Protect cms-data directory from direct web browsing
$htaccessPath = $dataDir . '/.htaccess';
if (!file_exists($htaccessPath)) {
    @file_put_contents($htaccessPath, "Order allow,deny\nDeny from all\n<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n");
}

$authFile = $dataDir . '/auth.json';
$contentFile = $dataDir . '/content.json';
$chatFile = $dataDir . '/chat.json';

function get_auth_config($authFile) {
    if (file_exists($authFile)) {
        $raw = @file_get_contents($authFile);
        $parsed = @json_decode($raw, true);
        if (is_array($parsed) && !empty($parsed['passwordHash']) && !empty($parsed['secret'])) {
            return $parsed;
        }
    }
    $defaultConfig = [
        'passwordHash' => password_hash('DentalCheck2026!', PASSWORD_DEFAULT),
        'secret' => bin2hex(random_bytes(32)),
        'updatedAt' => gmdate('c'),
    ];
    @file_put_contents($authFile, json_encode($defaultConfig, JSON_PRETTY_PRINT));
    return $defaultConfig;
}

function create_token($authConfig) {
    $exp = time() + (86400 * 30); // 30 days
    $payload = base64_encode(json_encode([
        'exp' => $exp,
        'hashPrefix' => substr($authConfig['passwordHash'], 0, 16),
    ]));
    $sig = hash_hmac('sha256', $payload, $authConfig['secret']);
    return $payload . '.' . $sig;
}

function verify_token($token, $authConfig) {
    if (!$token || !is_string($token) || strpos($token, '.') === false) {
        return false;
    }
    list($payload, $sig) = explode('.', $token, 2);
    $expected = hash_hmac('sha256', $payload, $authConfig['secret']);
    if (!hash_equals($expected, $sig)) {
        return false;
    }
    $data = @json_decode(base64_decode($payload), true);
    if (!is_array($data) || empty($data['exp']) || $data['exp'] < time()) {
        return false;
    }
    if (($data['hashPrefix'] ?? '') !== substr($authConfig['passwordHash'], 0, 16)) {
        return false;
    }
    return true;
}

function get_request_body() {
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return [];
    }
    $decoded = @json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function extract_token($body) {
    if (!empty($_SERVER['HTTP_X_CMS_TOKEN'])) {
        return trim($_SERVER['HTTP_X_CMS_TOKEN']);
    }
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        if (preg_match('/Bearer\s+(.*)$/i', $_SERVER['HTTP_AUTHORIZATION'], $m)) {
            return trim($m[1]);
        }
    }
    if (!empty($body['token'])) {
        return trim($body['token']);
    }
    if (!empty($_POST['token'])) {
        return trim($_POST['token']);
    }
    if (!empty($_GET['token'])) {
        return trim($_GET['token']);
    }
    return '';
}

function backup_current_content($contentFile, $historyDir, $label = 'Guardado automático') {
    if (!file_exists($contentFile)) {
        return;
    }
    $raw = @file_get_contents($contentFile);
    if (!$raw) {
        return;
    }
    $stamp = gmdate('Ymd-His') . '-' . substr(bin2hex(random_bytes(3)), 0, 6);
    $snapFile = $historyDir . '/snapshot-' . $stamp . '.json';
    $payload = [
        'id' => 'snapshot-' . $stamp,
        'timestamp' => gmdate('c'),
        'label' => $label,
        'content' => @json_decode($raw, true),
    ];
    @file_put_contents($snapFile, json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

    // Keep only the 10 most recent snapshots
    $files = glob($historyDir . '/snapshot-*.json');
    if (is_array($files) && count($files) > 10) {
        rsort($files);
        $toDelete = array_slice($files, 10);
        foreach ($toDelete as $oldFile) {
            @unlink($oldFile);
        }
    }
}

function get_chat_data($chatFile) {
    if (file_exists($chatFile)) {
        $raw = @file_get_contents($chatFile);
        $parsed = @json_decode($raw, true);
        if (is_array($parsed) && isset($parsed['messages'])) {
            return $parsed;
        }
    }
    // Default initial welcome message
    $initial = [
        'updatedAt' => gmdate('c'),
        'messages' => [
            [
                'id' => 'msg-welcome-1',
                'sender' => 'inge',
                'senderName' => 'Inge Julio (Soporte)',
                'text' => '¡Hola Doc! Canal de soporte directo activado. Cualquier consulta, ajuste o material que necesites subir, déjamelo aquí y recibiré una alerta inmediata en mi correo.',
                'attachmentUrl' => '',
                'attachmentName' => '',
                'timestamp' => gmdate('c'),
                'readByDoc' => false,
                'readByInge' => true,
            ]
        ]
    ];
    @file_put_contents($chatFile, json_encode($initial, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    return $initial;
}

function send_chat_email_alert($msgData, $supportEmail = 'julio.olmedo.p@gmail.com') {
    $senderName = $msgData['senderName'] ?? 'Dra. Pamela Pazmiño (Doc)';
    $text = htmlspecialchars($msgData['text'] ?? '', ENT_QUOTES, 'UTF-8');
    $attachmentUrl = !empty($msgData['attachmentUrl']) ? $msgData['attachmentUrl'] : '';
    $attachmentName = htmlspecialchars($msgData['attachmentName'] ?? 'Archivo adjunto', ENT_QUOTES, 'UTF-8');

    // Ecuadorian Time (America/Guayaquil, UTC-5)
    $dt = new DateTime('now', new DateTimeZone('America/Guayaquil'));
    $timeStr = $dt->format('d/m/Y - h:i A');

    $subject = "🔔 Mensaje de la Doc en Chat Interno [drapamelapazmino.com]";

    $attachmentHtml = '';
    if ($attachmentUrl) {
        $fullAttachmentUrl = (strpos($attachmentUrl, 'http') === 0)
            ? $attachmentUrl
            : 'https://drapamelapazmino.com' . $attachmentUrl;
        $attachmentHtml = '
        <div style="margin-top: 15px; padding: 12px; background: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #0369a1; font-weight: bold;">📎 Archivo / Imagen Adjunta:</p>
            <p style="margin: 4px 0 0 0;"><a href="' . htmlspecialchars($fullAttachmentUrl, ENT_QUOTES, 'UTF-8') . '" target="_blank" style="color: #0284c7; font-weight: 600; text-decoration: underline;">' . $attachmentName . '</a></p>
        </div>';
    }

    $messageHtml = '
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>' . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . '</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b;">
      <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
        <tr>
          <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; border-bottom: 3px solid #06b6d4;">
            <table width="100%">
              <tr>
                <td>
                  <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 800; letter-spacing: -0.02em;">
                    Dra. Pamela Pazmiño <span style="color: #22d3ee; font-weight: 400;">· Chat Interno Soporte</span>
                  </h1>
                  <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">Alerta de Consulta: Doc (Admin) → Inge (Soporte)</p>
                </td>
                <td align="right">
                  <span style="background: rgba(6,182,212,0.2); color: #22d3ee; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(6,182,212,0.4);">
                    drapamelapazmino.com
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 28px;">
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #475569;">
              Hola <strong>Inge (Julio)</strong>, la <strong>Dra. Pamela (Doc)</strong> te ha dejado un nuevo mensaje en el canal interno de la web:
            </p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #06b6d4; padding: 18px; border-radius: 12px; margin-bottom: 20px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
              <div style="font-size: 12px; font-weight: 700; color: #0891b2; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                👩‍⚕️ ' . htmlspecialchars($senderName, ENT_QUOTES, 'UTF-8') . ' · ' . $timeStr . '
              </div>
              <div style="font-size: 15px; line-height: 1.6; color: #0f172a; white-space: pre-wrap;">' . nl2br($text) . '</div>
              ' . $attachmentHtml . '
            </div>

            <div style="text-align: center; margin-top: 28px; margin-bottom: 20px;">
              <a href="https://drapamelapazmino.com/admin#chat" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: #042f2e; text-decoration: none; font-weight: 800; font-size: 14px; padding: 14px 28px; border-radius: 9999px; box-shadow: 0 8px 20px rgba(6,182,212,0.35);">
                💬 Abrir y Responder en el Chat Interno
              </a>
            </div>

            <p style="margin: 24px 0 0 0; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
              Esta notificación automática fue enviada a <strong>' . htmlspecialchars($supportEmail, ENT_QUOTES, 'UTF-8') . '</strong> porque la Doc envió un mensaje en el panel web.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    ';

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Dra. Pamela Pazmiño <noreply@drapamelapazmino.com>',
        'Reply-To: consultas@drapamelapazmino.com',
        'X-Mailer: PHP/' . phpversion()
    ];

    @mail($supportEmail, $subject, $messageHtml, implode("\r\n", $headers));
}

$action = $_GET['action'] ?? 'get';
$authConfig = get_auth_config($authFile);

if ($action === 'get') {
    if (file_exists($contentFile)) {
        $raw = @file_get_contents($contentFile);
        $decoded = @json_decode($raw, true);
        if (is_array($decoded)) {
            echo json_encode([
                'ok' => true,
                'hasCustomContent' => true,
                'updatedAt' => @date('c', filemtime($contentFile)),
                'content' => $decoded,
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
    echo json_encode([
        'ok' => true,
        'hasCustomContent' => false,
        'content' => null,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'login') {
    $body = get_request_body();
    $password = (string)($body['password'] ?? '');
    if (password_verify($password, $authConfig['passwordHash'])) {
        echo json_encode([
            'ok' => true,
            'token' => create_token($authConfig),
        ]);
        exit;
    }
    http_response_code(401);
    echo json_encode([
        'ok' => false,
        'error' => 'Contraseña incorrecta. Verifica e intenta nuevamente.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'verify') {
    $body = get_request_body();
    $token = extract_token($body);
    echo json_encode([
        'ok' => verify_token($token, $authConfig),
    ]);
    exit;
}

if ($action === 'youtube_meta') {
    $url = trim((string)($_GET['url'] ?? ''));
    $videoId = '';
    if (preg_match('/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/', $url, $m)) {
        $videoId = $m[1];
    } elseif (preg_match('/^[a-zA-Z0-9_-]{11}$/', $url)) {
        $videoId = $url;
    }
    if (!$videoId) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'No se pudo detectar el ID del video de YouTube.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $oembedUrl = 'https://www.youtube.com/oembed?url=' . urlencode('https://www.youtube.com/watch?v=' . $videoId) . '&format=json';
    $ctx = stream_context_create(['http' => ['timeout' => 5, 'ignore_errors' => true]]);
    $resp = @file_get_contents($oembedUrl, false, $ctx);
    $meta = $resp ? @json_decode($resp, true) : null;
    echo json_encode([
        'ok' => true,
        'videoId' => $videoId,
        'title' => $meta['title'] ?? ('Sonorama Vital con Pamela Pazmiño · ' . $videoId),
        'authorName' => $meta['author_name'] ?? 'Sonorama Digital',
        'thumbnailUrl' => 'https://i.ytimg.com/vi/' . $videoId . '/hqdefault.jpg',
        'watchUrl' => 'https://www.youtube.com/watch?v=' . $videoId,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'media_list') {
    $items = [];
    $scanFolders = [
        ['dir' => $uploadsDir, 'prefix' => '/uploads/', 'folder' => 'uploads', 'deletable' => true],
        ['dir' => $rootDir . '/videos', 'prefix' => '/videos/', 'folder' => 'videos', 'deletable' => false],
        ['dir' => $rootDir . '/images/clinic', 'prefix' => '/images/clinic/', 'folder' => 'clinic', 'deletable' => false],
    ];
    foreach ($scanFolders as $sf) {
        if (!is_dir($sf['dir'])) {
            continue;
        }
        $files = @scandir($sf['dir']);
        if (!is_array($files)) {
            continue;
        }
        foreach ($files as $f) {
            if ($f === '.' || $f === '..' || strpos($f, '.') === 0) {
                continue;
            }
            $full = $sf['dir'] . '/' . $f;
            if (!is_file($full)) {
                continue;
            }
            $ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
            $type = 'other';
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'], true)) {
                $type = 'image';
            } elseif (in_array($ext, ['mp4', 'webm', 'mov'], true)) {
                $type = 'video';
            } elseif ($ext === 'pdf') {
                $type = 'pdf';
            } else {
                continue;
            }
            $items[] = [
                'url' => $sf['prefix'] . $f,
                'filename' => $f,
                'type' => $type,
                'folder' => $sf['folder'],
                'deletable' => $sf['deletable'],
                'size' => @filesize($full) ?: 0,
                'modifiedAt' => @date('c', filemtime($full)),
            ];
        }
    }
    usort($items, function ($a, $b) {
        return strcmp($b['modifiedAt'], $a['modifiedAt']);
    });
    echo json_encode([
        'ok' => true,
        'items' => $items,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// All actions below require authentication
$body = get_request_body();
$token = extract_token($body);
if (!verify_token($token, $authConfig)) {
    http_response_code(401);
    echo json_encode([
        'ok' => false,
        'error' => 'Sesión expirada o no autorizada. Por favor inicia sesión nuevamente.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'save') {
    $content = $body['content'] ?? null;
    $label = trim((string)($body['label'] ?? 'Actualización desde panel /admin'));
    if (!is_array($content)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Datos de contenido inválidos.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    backup_current_content($contentFile, $historyDir, $label);

    $tmpFile = $contentFile . '.tmp';
    $encoded = json_encode($content, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if (@file_put_contents($tmpFile, $encoded) === false || !@rename($tmpFile, $contentFile)) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'No se pudo guardar el archivo en el servidor.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode([
        'ok' => true,
        'updatedAt' => gmdate('c'),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'history') {
    $files = glob($historyDir . '/snapshot-*.json') ?: [];
    rsort($files);
    $list = [];
    foreach ($files as $f) {
        $raw = @file_get_contents($f);
        $parsed = @json_decode($raw, true);
        if (is_array($parsed)) {
            $list[] = [
                'id' => $parsed['id'] ?? basename($f, '.json'),
                'timestamp' => $parsed['timestamp'] ?? @date('c', filemtime($f)),
                'label' => $parsed['label'] ?? 'Versión guardada',
            ];
        }
    }
    echo json_encode([
        'ok' => true,
        'snapshots' => $list,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'restore') {
    $snapId = preg_replace('/[^a-zA-Z0-9_-]/', '', (string)($body['id'] ?? ''));
    $snapFile = $historyDir . '/' . $snapId . '.json';
    if (!$snapId || !file_exists($snapFile)) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'No se encontró la versión solicitada.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $parsed = @json_decode(@file_get_contents($snapFile), true);
    if (!is_array($parsed) || !is_array($parsed['content'] ?? null)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'El archivo de respaldo está incompleto.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    backup_current_content($contentFile, $historyDir, 'Respaldo previo a restaurar ' . $snapId);
    @file_put_contents($contentFile, json_encode($parsed['content'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

    echo json_encode([
        'ok' => true,
        'updatedAt' => gmdate('c'),
        'content' => $parsed['content'],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'reset_defaults') {
    backup_current_content($contentFile, $historyDir, 'Respaldo previo a restaurar valores originales');
    if (file_exists($contentFile)) {
        @unlink($contentFile);
    }
    echo json_encode([
        'ok' => true,
        'updatedAt' => gmdate('c'),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'change_password') {
    $newPassword = trim((string)($body['newPassword'] ?? ''));
    if (strlen($newPassword) < 6) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'La nueva contraseña debe tener al menos 6 caracteres.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $authConfig['passwordHash'] = password_hash($newPassword, PASSWORD_DEFAULT);
    $authConfig['updatedAt'] = gmdate('c');
    @file_put_contents($authFile, json_encode($authConfig, JSON_PRETTY_PRINT));
    echo json_encode([
        'ok' => true,
        'token' => create_token($authConfig),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'upload') {
    if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        $errCode = $_FILES['file']['error'] ?? -1;
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Error al subir archivo (código ' . $errCode . ').'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $origName = $_FILES['file']['name'];
    $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'mp4', 'webm', 'mov', 'pdf'];
    if (!in_array($ext, $allowed, true)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Formato no permitido (.' . $ext . '). Usa JPG, PNG, WEBP, MP4 o PDF.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $baseName = preg_replace('/[^a-zA-Z0-9_-]/', '-', pathinfo($origName, PATHINFO_FILENAME));
    $baseName = trim(preg_replace('/-+/', '-', $baseName), '-');
    if (!$baseName) {
        $baseName = 'media';
    }
    $finalName = gmdate('Ymd-His') . '-' . substr($baseName, 0, 40) . '.' . $ext;
    $targetPath = $uploadsDir . '/' . $finalName;

    if (!@move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'No se pudo mover el archivo subido en el servidor.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode([
        'ok' => true,
        'url' => '/uploads/' . $finalName,
        'filename' => $finalName,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'media_delete') {
    $filename = basename((string)($body['filename'] ?? ''));
    $targetPath = $uploadsDir . '/' . $filename;
    if (!$filename || !file_exists($targetPath)) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Archivo no encontrado en /uploads/.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    @unlink($targetPath);
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'chat_get') {
    $chatData = get_chat_data($chatFile);
    $messages = $chatData['messages'] ?? [];

    $unreadForDoc = 0;
    $unreadForInge = 0;
    foreach ($messages as $m) {
        if (($m['sender'] ?? '') === 'inge' && empty($m['readByDoc'])) {
            $unreadForDoc++;
        }
        if (($m['sender'] ?? '') === 'doc' && empty($m['readByInge'])) {
            $unreadForInge++;
        }
    }

    echo json_encode([
        'ok' => true,
        'messages' => $messages,
        'unreadForDoc' => $unreadForDoc,
        'unreadForInge' => $unreadForInge,
        'updatedAt' => $chatData['updatedAt'] ?? gmdate('c'),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'chat_send') {
    $sender = trim((string)($body['sender'] ?? 'doc'));
    if (!in_array($sender, ['doc', 'inge'], true)) {
        $sender = 'doc';
    }
    $senderName = trim((string)($body['senderName'] ?? ($sender === 'doc' ? 'Dra. Pamela (Doc)' : 'Inge Julio (Soporte)')));
    $text = trim((string)($body['text'] ?? ''));
    $attachmentUrl = trim((string)($body['attachmentUrl'] ?? ''));
    $attachmentName = trim((string)($body['attachmentName'] ?? ''));

    if ($text === '' && $attachmentUrl === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'El mensaje no puede estar vacío.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $chatData = get_chat_data($chatFile);
    $messages = $chatData['messages'] ?? [];

    $newMsg = [
        'id' => 'msg-' . gmdate('YmdHis') . '-' . substr(bin2hex(random_bytes(3)), 0, 6),
        'sender' => $sender,
        'senderName' => $senderName,
        'text' => $text,
        'attachmentUrl' => $attachmentUrl,
        'attachmentName' => $attachmentName,
        'timestamp' => gmdate('c'),
        'readByDoc' => ($sender === 'doc'),
        'readByInge' => ($sender === 'inge'),
    ];

    $messages[] = $newMsg;

    if (count($messages) > 200) {
        $messages = array_slice($messages, -200);
    }

    $chatData['messages'] = $messages;
    $chatData['updatedAt'] = gmdate('c');
    @file_put_contents($chatFile, json_encode($chatData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // If message is from Doc, send email alert to Julio!
    if ($sender === 'doc') {
        send_chat_email_alert($newMsg, 'julio.olmedo.p@gmail.com');
    }

    echo json_encode([
        'ok' => true,
        'message' => $newMsg,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'chat_mark_read') {
    $role = trim((string)($body['role'] ?? 'doc'));
    $chatData = get_chat_data($chatFile);
    $messages = $chatData['messages'] ?? [];
    $changed = false;

    foreach ($messages as &$m) {
        if ($role === 'doc' && empty($m['readByDoc'])) {
            $m['readByDoc'] = true;
            $changed = true;
        } elseif ($role === 'inge' && empty($m['readByInge'])) {
            $m['readByInge'] = true;
            $changed = true;
        }
    }
    unset($m);

    if ($changed) {
        $chatData['messages'] = $messages;
        $chatData['updatedAt'] = gmdate('c');
        @file_put_contents($chatFile, json_encode($chatData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'chat_delete_message') {
    $msgId = trim((string)($body['id'] ?? ''));
    if (!$msgId) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'ID de mensaje requerido.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $chatData = get_chat_data($chatFile);
    $messages = $chatData['messages'] ?? [];
    $filtered = array_values(array_filter($messages, function($m) use ($msgId) {
        return ($m['id'] ?? '') !== $msgId;
    }));
    $chatData['messages'] = $filtered;
    $chatData['updatedAt'] = gmdate('c');
    @file_put_contents($chatFile, json_encode($chatData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Acción desconocida.'], JSON_UNESCAPED_UNICODE);
