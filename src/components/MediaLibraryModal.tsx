import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Film,
  Trash2,
  Check,
  RefreshCw,
  Crop,
  Search,
  FolderOpen,
} from 'lucide-react';
import { useCms, CmsMediaItem } from '../context/CmsContext';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  acceptFilter?: 'all' | 'image' | 'video';
  title?: string;
}

type AspectPreset = 'original' | '9:16' | '4:5' | '16:9' | '1:1';

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  acceptFilter = 'all',
  title = 'Biblioteca Visual de Medios (Hostinger)',
}) => {
  const { fetchMediaLibrary, uploadMediaFile, deleteMediaFile } = useCms();

  const [items, setItems] = useState<CmsMediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'all' | 'image' | 'video' | 'uploads'>(
    acceptFilter === 'video' ? 'video' : acceptFilter === 'image' ? 'image' : 'all'
  );
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Optional Image Cropper before Upload
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [cropPreviewUrl, setCropPreviewUrl] = useState<string | null>(null);
  const [aspectPreset, setAspectPreset] = useState<AspectPreset>('original');
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const loadMedia = async () => {
    setLoading(true);
    const list = await fetchMediaLibrary();
    setItems(list);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      setTab(acceptFilter === 'video' ? 'video' : acceptFilter === 'image' ? 'image' : 'all');
      loadMedia();
    }
  }, [isOpen, acceptFilter]);

  if (!isOpen) return null;

  const filteredItems = items.filter((item) => {
    if (tab === 'image' && item.type !== 'image') return false;
    if (tab === 'video' && item.type !== 'video') return false;
    if (tab === 'uploads' && item.folder !== 'uploads') return false;
    if (search.trim()) {
      return item.filename.toLowerCase().includes(search.trim().toLowerCase());
    }
    return true;
  });

  const handleFileChosen = async (file: File | undefined) => {
    if (!file) return;
    setErrorMsg('');
    if (file.type.startsWith('image/') && !file.type.includes('svg')) {
      const url = URL.createObjectURL(file);
      setCropFile(file);
      setCropPreviewUrl(url);
      setAspectPreset('original');
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
      return;
    }
    // Upload video or SVG directly
    setUploading(true);
    const res = await uploadMediaFile(file);
    setUploading(false);
    if (res.ok && res.url) {
      await loadMedia();
      onSelect(res.url);
      onClose();
    } else {
      setErrorMsg(res.error || 'No se pudo subir el archivo.');
    }
  };

  const handleConfirmCropAndUpload = async () => {
    if (!cropFile) return;
    setUploading(true);
    setErrorMsg('');

    try {
      let fileToUpload = cropFile;

      if (aspectPreset !== 'original' || zoom > 1 || offsetX !== 0 || offsetY !== 0) {
        const img = imgRef.current;
        if (img && img.naturalWidth > 0) {
          const canvas = document.createElement('canvas');
          let targetW = img.naturalWidth;
          let targetH = img.naturalHeight;

          if (aspectPreset === '9:16') {
            targetW = 1080;
            targetH = 1920;
          } else if (aspectPreset === '4:5') {
            targetW = 1080;
            targetH = 1350;
          } else if (aspectPreset === '16:9') {
            targetW = 1600;
            targetH = 900;
          } else if (aspectPreset === '1:1') {
            targetW = 1080;
            targetH = 1080;
          }

          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const scale = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight) * zoom;
            const drawW = img.naturalWidth * scale;
            const drawH = img.naturalHeight * scale;
            const dx = (targetW - drawW) / 2 + (offsetX / 100) * targetW * 0.5;
            const dy = (targetH - drawH) / 2 + (offsetY / 100) * targetH * 0.5;
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, targetW, targetH);
            ctx.drawImage(img, dx, dy, drawW, drawH);

            const blob: Blob | null = await new Promise((resolve) =>
              canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92)
            );
            if (blob) {
              const cleanBase = cropFile.name.replace(/\.[^.]+$/, '');
              fileToUpload = new File([blob], `${cleanBase}-cropped.jpg`, {
                type: 'image/jpeg',
              });
            }
          }
        }
      }

      const res = await uploadMediaFile(fileToUpload);
      setUploading(false);
      if (cropPreviewUrl) URL.revokeObjectURL(cropPreviewUrl);
      setCropFile(null);
      setCropPreviewUrl(null);

      if (res.ok && res.url) {
        await loadMedia();
        onSelect(res.url);
        onClose();
      } else {
        setErrorMsg(res.error || 'Error al subir la imagen.');
      }
    } catch {
      setUploading(false);
      setErrorMsg('Error al procesar la imagen.');
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-[2.25rem] bg-white shadow-2xl ring-1 ring-cyan-500/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-950 px-6 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <FolderOpen className="h-5 w-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-extrabold">{title}</h3>
              <p className="text-[11px] text-slate-400">
                Selecciona cualquier foto o video existente en el servidor o sube uno nuevo.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-slate-300 hover:bg-white/20 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Cropper Modal Step if an image was just selected */}
        {cropFile && cropPreviewUrl ? (
          <div className="p-6 space-y-5 overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Crop className="h-5 w-5 text-cyan-600" />
                <h4 className="text-sm font-extrabold text-slate-900">
                  Ajustar Encuadre y Recorte antes de Subir ({cropFile.name})
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    { id: 'original', label: 'Original (Sin recortar)' },
                    { id: '9:16', label: '9:16 Vertical (Hero)' },
                    { id: '4:5', label: '4:5 Retrato Clínico' },
                    { id: '16:9', label: '16:9 Horizontal' },
                    { id: '1:1', label: '1:1 Cuadrado' },
                  ] as const
                ).map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setAspectPreset(preset.id)}
                    className={`rounded-full px-3 py-1 text-xs font-extrabold transition cursor-pointer ${
                      aspectPreset === preset.id
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 flex items-center justify-center bg-slate-950 rounded-2xl p-4 min-h-[300px] overflow-hidden">
                <div
                  className={`relative overflow-hidden rounded-xl ring-2 ring-cyan-400 ${
                    aspectPreset === '9:16'
                      ? 'w-48 aspect-[9/16]'
                      : aspectPreset === '4:5'
                      ? 'w-56 aspect-[4/5]'
                      : aspectPreset === '16:9'
                      ? 'w-80 aspect-video'
                      : aspectPreset === '1:1'
                      ? 'w-60 aspect-square'
                      : 'max-h-[320px]'
                  }`}
                >
                  <img
                    ref={imgRef}
                    src={cropPreviewUrl}
                    alt="Previsualización"
                    style={{
                      transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`,
                    }}
                    className="h-full w-full object-cover transition-transform duration-75"
                  />
                </div>
              </div>

              <div className="md:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Zoom ({zoom.toFixed(2)}x)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="2.5"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Desplazamiento Horizontal ({offsetX}%)
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={offsetX}
                    onChange={(e) => setOffsetX(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Desplazamiento Vertical ({offsetY}%)
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={offsetY}
                    onChange={(e) => setOffsetY(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-600"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={handleConfirmCropAndUpload}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 py-3 text-xs font-extrabold text-white shadow-md hover:from-cyan-400 hover:to-cyan-500 cursor-pointer disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" />
                    <span>{uploading ? 'Subiendo...' : 'Subir y Usar Esta Imagen'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (cropPreviewUrl) URL.revokeObjectURL(cropPreviewUrl);
                      setCropFile(null);
                      setCropPreviewUrl(null);
                    }}
                    className="rounded-full bg-slate-100 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Toolbar: Filter Tabs + Search + Upload Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'image', label: 'Fotografías' },
                  { id: 'video', label: 'Videos MP4' },
                  { id: 'uploads', label: 'Subidos Nuevos' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id as typeof tab)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                      tab === t.id
                        ? 'bg-slate-900 text-cyan-300'
                        : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar archivo..."
                    className="rounded-full border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={loadMedia}
                  className="rounded-full bg-white p-2 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 cursor-pointer"
                  title="Recargar biblioteca"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <label className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-1.5 text-xs font-extrabold text-white shadow-sm hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploading ? 'Subiendo...' : 'Subir Foto / Video MP4'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => handleFileChosen(e.target.files?.[0])}
                  />
                </label>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 px-6 py-2 text-xs font-bold text-red-700 border-b border-red-100">
                {errorMsg}
              </div>
            )}

            {/* Media Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500">
                  No se encontraron archivos en esta categoría. Usa el botón "Subir Foto / Video MP4" arriba a la derecha.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.url}
                      className="group relative rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between hover:ring-2 hover:ring-cyan-500 transition"
                    >
                      <div
                        onClick={() => {
                          onSelect(item.url);
                          onClose();
                        }}
                        className="relative h-36 w-full bg-slate-900 overflow-hidden cursor-pointer"
                      >
                        {item.type === 'video' ? (
                          <video
                            src={item.url}
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                            onMouseLeave={(e) => e.currentTarget.pause()}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt={item.filename}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                        )}
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                          {item.type === 'video' ? (
                            <>
                              <Film className="h-3 w-3" /> Video
                            </>
                          ) : (
                            <>
                              <ImageIcon className="h-3 w-3" /> Foto
                            </>
                          )}
                        </span>
                      </div>

                      <div className="p-2.5 flex items-center justify-between gap-2 bg-white">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] font-bold text-slate-800" title={item.filename}>
                            {item.filename}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {item.size ? `${(item.size / 1024).toFixed(0)} KB` : item.folder}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              onSelect(item.url);
                              onClose();
                            }}
                            className="rounded-lg bg-cyan-50 px-2.5 py-1 text-[11px] font-extrabold text-cyan-800 hover:bg-cyan-500 hover:text-white transition cursor-pointer"
                          >
                            Usar
                          </button>
                          {item.deletable && (
                            <button
                              type="button"
                              onClick={async () => {
                                if (window.confirm(`¿Eliminar ${item.filename} del servidor?`)) {
                                  await deleteMediaFile(item.filename);
                                  await loadMedia();
                                }
                              }}
                              className="rounded-lg p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              title="Eliminar archivo"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
