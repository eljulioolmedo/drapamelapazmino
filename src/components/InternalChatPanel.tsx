import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Paperclip,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  Wrench,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
  Bell,
  X,
} from 'lucide-react';
import { useCms, ChatMessage } from '../context/CmsContext';

interface InternalChatPanelProps {
  embeddedInTab?: boolean;
  onClose?: () => void;
}

export const InternalChatPanel: React.FC<InternalChatPanelProps> = ({
  embeddedInTab = false,
  onClose,
}) => {
  const {
    chatMessages,
    chatUnreadCount,
    activeRole,
    setActiveRole,
    fetchChatMessages,
    sendChatMessage,
    markChatAsRead,
    deleteChatMessage,
    uploadMediaFile,
  } = useCms();

  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Mark messages as read when opening or changing role
  useEffect(() => {
    markChatAsRead(activeRole);
  }, [activeRole, chatMessages.length, markChatAsRead]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchChatMessages();
    setIsRefreshing(false);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed && !attachedFile) return;

    setIsSending(true);
    setErrorMsg('');

    const res = await sendChatMessage({
      sender: activeRole,
      senderName: activeRole === 'doc' ? 'Dra. Pamela (Doc)' : 'Inge Julio (Soporte)',
      text: trimmed,
      attachmentUrl: attachedFile?.url || '',
      attachmentName: attachedFile?.name || '',
    });

    setIsSending(false);

    if (res.ok) {
      setInputText('');
      setAttachedFile(null);
    } else {
      setErrorMsg(res.error || 'No se pudo enviar el mensaje.');
    }
  };

  const handleFileAttach = async (file: File | undefined) => {
    if (!file) return;
    setUploadingAttachment(true);
    setErrorMsg('');
    const res = await uploadMediaFile(file);
    setUploadingAttachment(false);

    if (res.ok && res.url) {
      setAttachedFile({
        url: res.url,
        name: file.name,
      });
    } else {
      setErrorMsg(res.error || 'Error al subir archivo adjunto.');
    }
  };

  const quickPills =
    activeRole === 'doc'
      ? [
          'Revisar video del hero 🎬',
          'Actualizar horario de atención 🕒',
          'Nueva publicación científica 📄',
          'Cambiar número de WhatsApp 📱',
          'Todo listo y verificado 👍',
        ]
      : [
          'Cambios subidos a producción y verificados en vivo ✨',
          'Video del hero actualizado correctamente 🎬',
          'Ajustes realizados, por favor revísalo cuando puedas 👍',
          '¿Deseas agregar alguna foto o texto adicional?',
        ];

  return (
    <div
      className={`flex flex-col bg-white overflow-hidden ${
        embeddedInTab
          ? 'rounded-3xl border border-cyan-500/20 shadow-sm min-h-[680px] h-[780px]'
          : 'h-full'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-4 sm:px-6 text-white border-b border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-white">
                Chat Interno Directo: Inge (Soporte) ↔ Doc (Admin)
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-400/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>En Línea</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Canal de coordinación y soporte técnico sin salir del sitio web.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="rounded-full bg-white/10 p-2 text-slate-300 hover:bg-white/20 hover:text-white transition cursor-pointer"
            title="Refrescar mensajes"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-slate-300 hover:bg-white/20 hover:text-white transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Role Switcher & Email Alert Banner */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Estás chateando como:</span>
          <div className="inline-flex rounded-xl bg-white p-1 ring-1 ring-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveRole('doc')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-extrabold transition cursor-pointer ${
                activeRole === 'doc'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Dra. Pamela (Doc)</span>
              {chatUnreadCount.forDoc > 0 && (
                <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.2 text-[10px] text-white font-black">
                  {chatUnreadCount.forDoc}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveRole('inge')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-extrabold transition cursor-pointer ${
                activeRole === 'inge'
                  ? 'bg-slate-900 text-cyan-300 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>Inge Julio (Soporte)</span>
              {chatUnreadCount.forInge > 0 && (
                <span className="ml-1 rounded-full bg-cyan-500 px-1.5 py-0.2 text-[10px] text-slate-950 font-black">
                  {chatUnreadCount.forInge}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Email Alert Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold text-cyan-800 ring-1 ring-cyan-500/25">
          <Bell className="h-3.5 w-3.5 text-cyan-600 shrink-0" />
          <span>
            Alertas de la Doc: <strong className="text-cyan-950 font-extrabold">julio.olmedo.p@gmail.com</strong>
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
            <Sparkles className="h-10 w-10 text-cyan-400 mb-2 opacity-50" />
            <p className="text-sm font-bold text-slate-700">Canal de Chat Listo</p>
            <p className="text-xs max-w-sm mt-1">
              Envía cualquier solicitud, cambio de video, foto o ajuste de contenido.
            </p>
          </div>
        ) : (
          chatMessages.map((msg) => {
            const isDoc = msg.sender === 'doc';
            const isMe = msg.sender === activeRole;

            const timeStr = msg.timestamp
              ? new Date(msg.timestamp).toLocaleTimeString('es-EC', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '';
            const dateStr = msg.timestamp
              ? new Date(msg.timestamp).toLocaleDateString('es-EC', {
                  day: 'numeric',
                  month: 'short',
                })
              : '';

            return (
              <div
                key={msg.id}
                className={`group flex items-start gap-2.5 ${
                  isMe ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-xs font-black shadow-sm ${
                    isDoc
                      ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-950 ring-2 ring-cyan-300'
                      : 'bg-gradient-to-br from-slate-800 to-slate-950 text-cyan-300 ring-2 ring-slate-700'
                  }`}
                  title={msg.senderName}
                >
                  {isDoc ? 'Doc' : 'Inge'}
                </div>

                {/* Message Bubble */}
                <div
                  className={`relative max-w-[85%] sm:max-w-[70%] rounded-[1.5rem] p-4 shadow-sm transition-all ${
                    isMe
                      ? isDoc
                        ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-slate-950 rounded-tr-xs'
                        : 'bg-slate-900 text-white rounded-tr-xs ring-1 ring-cyan-500/30'
                      : isDoc
                      ? 'bg-white border border-cyan-200 text-slate-900 rounded-tl-xs shadow-cyan-500/5'
                      : 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs'
                  }`}
                >
                  {/* Sender Header */}
                  <div
                    className={`flex items-center justify-between gap-3 text-[11px] font-extrabold pb-1.5 mb-1.5 border-b ${
                      isMe && isDoc
                        ? 'text-cyan-950 border-cyan-400/40'
                        : isMe && !isDoc
                        ? 'text-cyan-300 border-white/10'
                        : isDoc
                        ? 'text-cyan-700 border-cyan-100'
                        : 'text-slate-500 border-slate-100'
                    }`}
                  >
                    <span>{msg.senderName}</span>
                    <span className="font-normal text-[10px] opacity-80">
                      {dateStr} · {timeStr}
                    </span>
                  </div>

                  {/* Body Text */}
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {msg.text}
                  </p>

                  {/* Attachment if present */}
                  {msg.attachmentUrl && (
                    <div
                      className={`mt-2.5 rounded-xl p-2.5 flex items-center justify-between gap-2.5 ${
                        isMe && isDoc
                          ? 'bg-cyan-600/30 border border-cyan-400/50'
                          : isMe && !isDoc
                          ? 'bg-white/10 border border-white/15'
                          : 'bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {msg.attachmentUrl.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? (
                          <ImageIcon className="h-4 w-4 shrink-0" />
                        ) : (
                          <FileText className="h-4 w-4 shrink-0" />
                        )}
                        <span className="text-xs truncate font-bold">
                          {msg.attachmentName || 'Archivo adjunto'}
                        </span>
                      </div>
                      <a
                        href={msg.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-white/20 hover:bg-white/40 px-2 py-1 text-[11px] font-bold transition shrink-0"
                      >
                        <span>Ver</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  {/* Quick Delete button (visible on hover) */}
                  <button
                    type="button"
                    onClick={() => deleteChatMessage(msg.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 rounded-full bg-slate-900 text-slate-300 hover:text-red-400 p-1 shadow-md cursor-pointer"
                    title="Eliminar mensaje"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Pills */}
      <div className="px-4 sm:px-6 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto shrink-0">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
          Sugerencias:
        </span>
        {quickPills.map((pill, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInputText((prev) => (prev ? `${prev} ${pill}` : pill))}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 hover:ring-cyan-400 hover:bg-cyan-50/50 whitespace-nowrap transition cursor-pointer"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Attachment Preview Bar (if file selected) */}
      {attachedFile && (
        <div className="px-4 sm:px-6 py-2 bg-cyan-50 border-t border-cyan-200 flex items-center justify-between text-xs text-cyan-900 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <Paperclip className="h-3.5 w-3.5 text-cyan-600 shrink-0" />
            <span className="font-bold truncate">Adjunto listo: {attachedFile.name}</span>
          </div>
          <button
            type="button"
            onClick={() => setAttachedFile(null)}
            className="text-cyan-700 hover:text-red-600 font-bold ml-2 cursor-pointer"
          >
            Quitar
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="px-4 py-2 bg-red-50 text-red-700 text-xs font-bold border-t border-red-200 flex items-center gap-2 shrink-0">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadingAttachment}
          className="rounded-2xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-cyan-600 transition cursor-pointer"
          title="Adjuntar archivo o imagen"
        >
          <Paperclip className={`h-5 w-5 ${uploadingAttachment ? 'animate-bounce' : ''}`} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/mp4,application/pdf"
            className="hidden"
            onChange={(e) => handleFileAttach(e.target.files?.[0])}
          />
        </button>

        <textarea
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={
            activeRole === 'doc'
              ? 'Escribe tu mensaje o solicitud al Inge... (Enter para enviar)'
              : 'Escribe tu respuesta a la Doc... (Enter para enviar)'
          }
          className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none max-h-28"
        />

        <button
          type="submit"
          disabled={isSending || (!inputText.trim() && !attachedFile)}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">{isSending ? 'Enviando...' : 'Enviar'}</span>
        </button>
      </form>
    </div>
  );
};
