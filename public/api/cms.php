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

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Acción desconocida.'], JSON_UNESCAPED_UNICODE);
