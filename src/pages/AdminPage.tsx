import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Save,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  History,
  RotateCcw,
  Video,
  FileText,
  GraduationCap,
  MapPin,
  Sparkles,
  KeyRound,
  LogOut,
  Eye,
  EyeOff,
  Download,
  Stethoscope,
  RefreshCw,
} from 'lucide-react';
import { useCms, CmsData, CmsSnapshotMeta } from '../context/CmsContext';

type AdminTab =
  | 'hero-media'
  | 'sonorama'
  | 'publications'
  | 'blog-faq'
  | 'specialties'
  | 'contact-reviews'
  | 'history-security';

export const AdminPage: React.FC = () => {
  const {
    cmsData,
    updatedAt,
    isAuthenticated,
    login,
    logout,
    saveCmsData,
    uploadMediaFile,
    fetchYoutubeMeta,
    fetchHistory,
    restoreSnapshot,
    resetToFactoryDefaults,
    changeAdminPassword,
  } = useCms();

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('hero-media');
  const [draft, setDraft] = useState<CmsData>(() => JSON.parse(JSON.stringify(cmsData)));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Quick YouTube Paste state
  const [ytQuickUrl, setYtQuickUrl] = useState('');
  const [ytQuickDate, setYtQuickDate] = useState('');
  const [ytQuickCategory, setYtQuickCategory] = useState('Programa Completo · Sonorama Digital');
  const [ytLoading, setYtLoading] = useState(false);

  // History & Security state
  const [snapshots, setSnapshots] = useState<CmsSnapshotMeta[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');

  // Keep draft synced when cmsData loads from server (unless user has unsaved edits)
  useEffect(() => {
    if (!hasUnsavedChanges) {
      setDraft(JSON.parse(JSON.stringify(cmsData)));
    }
  }, [cmsData, hasUnsavedChanges]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'history-security') {
      setLoadingHistory(true);
      fetchHistory()
        .then((list) => setSnapshots(list))
        .finally(() => setLoadingHistory(false));
    }
  }, [isAuthenticated, activeTab, fetchHistory]);

  const showNotice = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 5000);
  };

  const updateDraft = (updater: (prev: CmsData) => CmsData) => {
    setDraft((prev) => {
      const next = updater(JSON.parse(JSON.stringify(prev)));
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const res = await login(passwordInput);
    setLoginLoading(false);
    if (!res.ok) {
      setLoginError(res.error || 'Contraseña incorrecta.');
    } else {
      setPasswordInput('');
    }
  };

  const handleSaveAll = async (customLabel?: string) => {
    setSaving(true);
    const res = await saveCmsData(draft, customLabel || 'Actualización desde panel /admin');
    setSaving(false);
    if (res.ok) {
      setHasUnsavedChanges(false);
      showNotice('success', '¡Cambios guardados y publicados en vivo exitosamente!');
      if (activeTab === 'history-security') {
        const list = await fetchHistory();
        setSnapshots(list);
      }
    } else {
      showNotice('error', res.error || 'Error al guardar los cambios.');
    }
  };

  const handleFileUpload = async (
    fieldKey: string,
    file: File | undefined,
    onUrlReady: (url: string) => void
  ) => {
    if (!file) return;
    setUploadingField(fieldKey);
    const res = await uploadMediaFile(file);
    setUploadingField(null);
    if (res.ok && res.url) {
      onUrlReady(res.url);
      showNotice('success', `Archivo subido: ${res.url}. Recuerda hacer clic en "Guardar y Publicar".`);
    } else {
      showNotice('error', res.error || 'No se pudo subir el archivo.');
    }
  };

  const handleQuickAddYoutube = async () => {
    if (!ytQuickUrl.trim()) {
      showNotice('error', 'Pega primero un enlace de YouTube.');
      return;
    }
    setYtLoading(true);
    const meta = await fetchYoutubeMeta(ytQuickUrl.trim());
    setYtLoading(false);
    if (!meta.ok || !meta.videoId) {
      showNotice('error', meta.error || 'No se pudo obtener información del video de YouTube.');
      return;
    }
    const newEpisode = {
      id: meta.videoId,
      title: meta.title || `Sonorama Vital con Pamela Pazmiño`,
      dateLabel: ytQuickDate.trim() || 'Nuevo Episodio',
      category: ytQuickCategory.trim() || 'Programa Completo · Sonorama Digital',
      youtubeUrl: `https://www.youtube.com/watch?v=${meta.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${meta.videoId}?rel=0`,
      thumbnailUrl: meta.thumbnailUrl || `https://i.ytimg.com/vi/${meta.videoId}/hqdefault.jpg`,
    };
    updateDraft((prev) => {
      prev.sonoramaVideos = [
        newEpisode,
        ...prev.sonoramaVideos.filter((v) => v.id !== newEpisode.id),
      ];
      return prev;
    });
    setYtQuickUrl('');
    setYtQuickDate('');
    showNotice('success', `Episodio "${newEpisode.title}" agregado al inicio. Haz clic en "Guardar y Publicar".`);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drapamelapazmino-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setDraft(parsed);
        setHasUnsavedChanges(true);
        showNotice('success', 'Respaldo cargado en el editor. Haz clic en "Guardar y Publicar" para aplicarlo.');
      } catch {
        showNotice('error', 'El archivo JSON seleccionado no es válido.');
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-[2.5rem] bg-white/95 backdrop-blur-xl p-8 sm:p-10 shadow-[0_24px_80px_-15px_rgba(6,182,212,0.28)] ring-1 ring-cyan-500/30 space-y-6">
          <div className="flex items-center justify-between">
            <img
              src="/images/clinic/dentalcheck-logo.png"
              alt="DentalCheck"
              className="h-12 w-auto object-contain"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-xs font-extrabold text-cyan-800 ring-1 ring-cyan-500/25">
              <Lock className="h-3.5 w-3.5 text-cyan-600" />
              <span>Panel No-Code</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Administrador Web · Dra. Pamela Pazmiño
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Ingresa tu contraseña para editar textos, subir videos/fotos, agregar episodios de Sonorama Vital o publicaciones científicas sin tocar código.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Contraseña de Administrador
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Ingresa la contraseña..."
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-11 text-sm font-semibold text-slate-900 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-xs font-bold text-red-700 ring-1 ring-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? 'Verificando...' : 'Ingresar al Editor Visual'}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link to="/" className="font-bold text-cyan-700 hover:underline">
              ← Volver al sitio público
            </Link>
            <span>drapamelapazmino.com</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-28 space-y-6">
      {/* Top Sticky Action Bar */}
      <div className="sticky top-20 z-40 rounded-3xl bg-slate-950/95 backdrop-blur-xl p-4 sm:px-6 text-white shadow-[0_20px_50px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-white">
                Editor Visual Sin Código · Dra. Pamela Pazmiño
              </h1>
              {hasUnsavedChanges ? (
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-300 ring-1 ring-amber-400/40">
                  Cambios sin guardar
                </span>
              ) : (
                <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-300 ring-1 ring-emerald-400/40">
                  Sincronizado en vivo
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {updatedAt
                ? `Último guardado en servidor: ${new Date(updatedAt).toLocaleString('es-EC')}`
                : 'Editando contenido activo del sitio web'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleSaveAll()}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-500/30 hover:from-cyan-300 hover:to-cyan-400 transition cursor-pointer disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Publicando...' : 'Guardar y Publicar Ahora'}</span>
          </button>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
          >
            <span>Ver Sitio</span>
            <ExternalLink className="h-3.5 w-3.5 text-cyan-300" />
          </Link>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2.5 text-xs font-bold text-slate-300 hover:bg-red-500/20 hover:text-red-200 transition cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-lg ${
            toast.type === 'success'
              ? 'bg-emerald-950 text-emerald-200 ring-1 ring-emerald-400/50'
              : 'bg-red-950 text-red-200 ring-1 ring-red-400/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-xs underline opacity-80 hover:opacity-100 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 rounded-3xl bg-white/85 backdrop-blur-md p-2 shadow-sm ring-1 ring-cyan-500/20">
        {[
          { id: 'hero-media', label: '1. Hero, Video & Fotos', icon: Video },
          { id: 'sonorama', label: '2. Sonorama Vital (YouTube)', icon: Sparkles },
          { id: 'publications', label: '3. Publicaciones Científicas', icon: GraduationCap },
          { id: 'blog-faq', label: '4. Artículos & Preguntas (FAQ)', icon: FileText },
          { id: 'specialties', label: '5. Especialidades Clínicas', icon: Stethoscope },
          { id: 'contact-reviews', label: '6. Contacto, Horarios & Reseñas', icon: MapPin },
          { id: 'history-security', label: '7. Historial (Undo) & Clave', icon: History },
        ].map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as AdminTab)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                active
                  ? 'bg-slate-900 text-cyan-300 shadow-sm ring-1 ring-cyan-400/40'
                  : 'text-slate-700 hover:bg-cyan-50/80 hover:text-slate-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO, VIDEO & CLINIC PHOTOS */}
      {activeTab === 'hero-media' && (
        <div className="space-y-8">
          {/* Hero Section Editor */}
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Portada Principal (Hero) y Video Principal
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">
                    Etiqueta Superior (Badge)
                  </label>
                  <input
                    type="text"
                    value={draft.hero.badge}
                    onChange={(e) =>
                      updateDraft((d) => {
                        d.hero.badge = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">
                      Título (Parte 1)
                    </label>
                    <input
                      type="text"
                      value={draft.hero.titlePrefix}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.hero.titlePrefix = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-cyan-700 mb-1">
                      Frase Resaltada en Cian
                    </label>
                    <input
                      type="text"
                      value={draft.hero.titleHighlight}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.hero.titleHighlight = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-xl border border-cyan-300 bg-cyan-50/40 px-3.5 py-2.5 text-sm font-bold text-cyan-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">
                      Título (Parte Final)
                    </label>
                    <input
                      type="text"
                      value={draft.hero.titleSuffix}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.hero.titleSuffix = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">
                    Párrafo Descriptivo de Bienvenida
                  </label>
                  <textarea
                    rows={3}
                    value={draft.hero.description}
                    onChange={(e) =>
                      updateDraft((d) => {
                        d.hero.description = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">
                      Texto Botón Principal
                    </label>
                    <input
                      type="text"
                      value={draft.hero.primaryCtaText}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.hero.primaryCtaText = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1">
                      Texto Botón Secundario
                    </label>
                    <input
                      type="text"
                      value={draft.hero.secondaryCtaText}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.hero.secondaryCtaText = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Video Upload & Live Preview */}
              <div className="lg:col-span-5 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Video del Hero (Formato 9:16 MP4)
                  </span>
                  <label className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-3.5 py-1.5 text-xs font-extrabold text-white hover:bg-cyan-500 transition cursor-pointer">
                    <Upload className="h-3.5 w-3.5" />
                    <span>{uploadingField === 'heroVideo' ? 'Subiendo...' : 'Subir Nuevo MP4'}</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload('heroVideo', e.target.files?.[0], (url) =>
                          updateDraft((d) => {
                            d.hero.videoUrl = url;
                            return d;
                          })
                        )
                      }
                    />
                  </label>
                </div>

                <input
                  type="text"
                  value={draft.hero.videoUrl}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.hero.videoUrl = e.target.value;
                      return d;
                    })
                  }
                  placeholder="/videos/..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-700"
                />

                <div className="mx-auto w-44 aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 shadow-md ring-1 ring-cyan-400/50">
                  <video
                    key={draft.hero.videoUrl}
                    src={draft.hero.videoUrl}
                    poster={draft.hero.posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clinic & Clinical Cases Photo Manager */}
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Fotografías Clínicas y Casos Reales (Antes/Después, Férula 3D, Consultorio)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Puedes reemplazar cualquiera de las fotografías del sitio subiendo una imagen desde tu computadora o celular.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(
                [
                  { key: 'heroDraPamela', label: 'Retrato Principal Dra. Pamela (Poster)' },
                  { key: 'realBeforeAfterSmile', label: 'Caso Antes y Después Sonrisa' },
                  { key: 'realCadCamSplint3D', label: 'Férula Digital 3D Real (ATM / Bruxismo)' },
                  { key: 'realBiomimeticVeneers', label: 'Estética Dental Biomimética' },
                  { key: 'realOralRehabProsthesis', label: 'Rehabilitación Oral y Prótesis' },
                  { key: 'draPameClinicalUnit', label: 'Dra. Pamela en Unidad Dental Check' },
                  { key: 'draPameDiplomas', label: 'Dra. Pamela · Diplomas y Docencia UDLA' },
                  { key: 'draPameHappyPatient', label: 'Atención a Pacientes (5.0 ★)' },
                  { key: 'fortunePlazaBuilding', label: 'Edificio Fortune Plaza (Quito)' },
                ] as const
              ).map((item) => {
                const currentUrl = draft.mediaAssets[item.key];
                return (
                  <div
                    key={item.key}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <span className="block text-xs font-extrabold text-slate-800 mb-2">
                        {item.label}
                      </span>
                      <div className="h-40 w-full rounded-xl overflow-hidden bg-slate-200 ring-1 ring-slate-300">
                        <img
                          src={currentUrl}
                          alt={item.label}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={currentUrl}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.mediaAssets[item.key] = e.target.value;
                            if (item.key === 'heroDraPamela') {
                              d.hero.posterUrl = e.target.value;
                            }
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-mono text-slate-600"
                      />
                      <label className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-cyan-600 transition cursor-pointer">
                        <Upload className="h-3.5 w-3.5" />
                        <span>
                          {uploadingField === item.key ? 'Subiendo imagen...' : 'Subir Nueva Foto'}
                        </span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(item.key, e.target.files?.[0], (url) =>
                              updateDraft((d) => {
                                d.mediaAssets[item.key] = url;
                                if (item.key === 'heroDraPamela') {
                                  d.hero.posterUrl = url;
                                }
                                return d;
                              })
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SONORAMA VITAL (YOUTUBE & FACEBOOK REEL) */}
      {activeTab === 'sonorama' && (
        <div className="space-y-6">
          {/* Magic 1-Click YouTube Adder */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-lg ring-1 ring-cyan-400/40 space-y-4">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Agregar Nuevo Episodio de Sonorama Vital en 1 Clic</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Solo pega el enlace de YouTube del programa y el sistema extraerá automáticamente el título oficial y la miniatura en alta definición.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-6">
                <input
                  type="text"
                  value={ytQuickUrl}
                  onChange={(e) => setYtQuickUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <input
                  type="text"
                  value={ytQuickDate}
                  onChange={(e) => setYtQuickDate(e.target.value)}
                  placeholder="Fecha (ej. 30 Octubre 2026)"
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={handleQuickAddYoutube}
                  disabled={ytLoading}
                  className="w-full h-full inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-cyan-300 transition cursor-pointer disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  <span>{ytLoading ? 'Buscando...' : 'Agregar Episodio'}</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 shrink-0">
                Enlace de Facebook Reel Destacado:
              </label>
              <input
                type="text"
                value={draft.mediaAssets.facebookReelUrl}
                onChange={(e) =>
                  updateDraft((d) => {
                    d.mediaAssets.facebookReelUrl = e.target.value;
                    return d;
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Episode List */}
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">
                Episodios Publicados ({draft.sonoramaVideos.length})
              </h2>
              <span className="text-xs text-slate-500">
                El primer episodio de la lista aparece como destacado principal.
              </span>
            </div>

            <div className="space-y-3">
              {draft.sonoramaVideos.map((video, idx) => (
                <div
                  key={`${video.id}-${idx}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col md:flex-row items-start md:items-center gap-4"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-20 w-36 rounded-xl object-cover shrink-0 bg-slate-900"
                  />

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Título del Programa
                      </label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.sonoramaVideos[idx].title = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Fecha / Etiqueta
                      </label>
                      <input
                        type="text"
                        value={video.dateLabel}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.sonoramaVideos[idx].dateLabel = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Categoría
                      </label>
                      <input
                        type="text"
                        value={video.category}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.sonoramaVideos[idx].category = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Enlace de YouTube
                      </label>
                      <input
                        type="text"
                        value={video.youtubeUrl}
                        onChange={(e) =>
                          updateDraft((d) => {
                            const urlVal = e.target.value;
                            d.sonoramaVideos[idx].youtubeUrl = urlVal;
                            const m = urlVal.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                            if (m) {
                              d.sonoramaVideos[idx].id = m[1];
                              d.sonoramaVideos[idx].embedUrl = `https://www.youtube.com/embed/${m[1]}?rel=0`;
                              d.sonoramaVideos[idx].thumbnailUrl = `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`;
                            }
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() =>
                        updateDraft((d) => {
                          const temp = d.sonoramaVideos[idx - 1];
                          d.sonoramaVideos[idx - 1] = d.sonoramaVideos[idx];
                          d.sonoramaVideos[idx] = temp;
                          return d;
                        })
                      }
                      className="rounded-lg bg-white p-2 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                      title="Subir"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === draft.sonoramaVideos.length - 1}
                      onClick={() =>
                        updateDraft((d) => {
                          const temp = d.sonoramaVideos[idx + 1];
                          d.sonoramaVideos[idx + 1] = d.sonoramaVideos[idx];
                          d.sonoramaVideos[idx] = temp;
                          return d;
                        })
                      }
                      className="rounded-lg bg-white p-2 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                      title="Bajar"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft((d) => {
                          d.sonoramaVideos.splice(idx, 1);
                          return d;
                        })
                      }
                      className="rounded-lg bg-red-50 p-2 text-red-600 ring-1 ring-red-200 hover:bg-red-100 cursor-pointer"
                      title="Eliminar episodio"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCIENTIFIC PUBLICATIONS & RESEARCHER PROFILES */}
      {activeTab === 'publications' && (
        <div className="space-y-6">
          {/* Author Profiles */}
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">
              Perfiles de Investigadora (ORCID, ResearchGate, MDPI SciProfiles)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">ORCID iD</label>
                <input
                  type="text"
                  value={draft.researcherProfiles.orcidId}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.researcherProfiles.orcidId = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Enlace ORCID</label>
                <input
                  type="text"
                  value={draft.researcherProfiles.orcidUrl}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.researcherProfiles.orcidUrl = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Enlace ResearchGate
                </label>
                <input
                  type="text"
                  value={draft.researcherProfiles.researchGateUrl}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.researcherProfiles.researchGateUrl = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Enlace MDPI SciProfiles
                </label>
                <input
                  type="text"
                  value={draft.researcherProfiles.sciProfilesUrl}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.researcherProfiles.sciProfilesUrl = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-mono"
                />
              </div>
            </div>
          </div>

          {/* Scientific Publications List */}
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-slate-900">
                Artículos Científicos Indexados ({draft.scientificPublications.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  updateDraft((d) => {
                    d.scientificPublications.unshift({
                      id: `pub-${Date.now()}`,
                      year: '2026',
                      title: 'Nuevo Artículo Científico',
                      publishedAs: 'Eliana Pazmiño Troncoso',
                      journal: 'Nombre de la Revista Científica',
                      doi: '',
                      focus: 'Resumen del estudio clínico o revisión sistemática...',
                      coAuthors: 'Byron Velásquez Ron, Eliana Pazmiño Troncoso.',
                      links: [{ label: 'PubMed / DOI', url: 'https://pubmed.ncbi.nlm.nih.gov/' }],
                    });
                    return d;
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-cyan-500 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Nueva Publicación</span>
              </button>
            </div>

            <div className="space-y-4">
              {draft.scientificPublications.map((pub, idx) => (
                <div
                  key={pub.id || idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase text-cyan-800">
                      Publicación #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft((d) => {
                          d.scientificPublications.splice(idx, 1);
                          return d;
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Título del Estudio
                      </label>
                      <input
                        type="text"
                        value={pub.title}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.scientificPublications[idx].title = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Año / Fecha
                      </label>
                      <input
                        type="text"
                        value={pub.year}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.scientificPublications[idx].year = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Publicado como
                      </label>
                      <input
                        type="text"
                        value={pub.publishedAs}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.scientificPublications[idx].publishedAs = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Revista Científica (Journal)
                      </label>
                      <input
                        type="text"
                        value={pub.journal}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.scientificPublications[idx].journal = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Coautores
                      </label>
                      <input
                        type="text"
                        value={pub.coAuthors}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.scientificPublications[idx].coAuthors = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Enfoque / Resumen Clínico
                    </label>
                    <textarea
                      rows={2}
                      value={pub.focus}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.scientificPublications[idx].focus = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>

                  {/* Links */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-slate-500">
                        Enlaces (PubMed, DOI, PDF, ResearchGate)
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateDraft((d) => {
                            d.scientificPublications[idx].links.push({
                              label: 'Enlace Científico',
                              url: 'https://',
                            });
                            return d;
                          })
                        }
                        className="text-xs font-bold text-cyan-700 hover:underline cursor-pointer"
                      >
                        + Añadir enlace
                      </button>
                    </div>
                    {pub.links.map((lnk, lIdx) => (
                      <div key={lIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={lnk.label}
                          onChange={(e) =>
                            updateDraft((d) => {
                              d.scientificPublications[idx].links[lIdx].label = e.target.value;
                              return d;
                            })
                          }
                          placeholder="Etiqueta (ej. PubMed)"
                          className="w-1/3 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold"
                        />
                        <input
                          type="text"
                          value={lnk.url}
                          onChange={(e) =>
                            updateDraft((d) => {
                              d.scientificPublications[idx].links[lIdx].url = e.target.value;
                              return d;
                            })
                          }
                          placeholder="https://..."
                          className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateDraft((d) => {
                              d.scientificPublications[idx].links.splice(lIdx, 1);
                              return d;
                            })
                          }
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BLOG ARTICLES & FAQS */}
      {activeTab === 'blog-faq' && (
        <div className="space-y-8">
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Artículos Educativos del Blog ({draft.blogPosts.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Crea o edita artículos sobre ATM, Bruxismo, Rehabilitación Oral y Prevención.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateDraft((d) => {
                    const slug = `nuevo-articulo-${Date.now()}`;
                    d.blogPosts.unshift({
                      id: slug,
                      slug,
                      title: 'Nuevo Artículo Clínico',
                      excerpt: 'Resumen breve del artículo para los pacientes...',
                      category: 'ATM Integral',
                      readTime: '5 min de lectura',
                      date: 'Octubre 2026',
                      author: 'Dra. Eliana Pamela Pazmiño Troncoso',
                      authorRole: 'Especialista en Rehabilitación Oral · Docente UDLA',
                      keyTakeaways: ['Punto clave 1 del artículo.'],
                      sections: [
                        {
                          heading: 'Introducción Clínica',
                          paragraphs: ['Escribe aquí el contenido del artículo...'],
                        },
                      ],
                      relatedSpecialtyId: 'atm-integral',
                    });
                    return d;
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-cyan-500 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Crear Nuevo Artículo</span>
              </button>
            </div>

            <div className="space-y-5">
              {draft.blogPosts.map((post, idx) => (
                <div
                  key={post.id || idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase text-cyan-800">
                      Artículo #{idx + 1} · {post.category}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft((d) => {
                          d.blogPosts.splice(idx, 1);
                          return d;
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Eliminar Artículo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Título del Artículo
                      </label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.blogPosts[idx].title = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Categoría
                      </label>
                      <select
                        value={post.category}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.blogPosts[idx].category = e.target.value as typeof post.category;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold"
                      >
                        <option value="ATM Integral">ATM Integral</option>
                        <option value="Bruxismo y Ciencia">Bruxismo y Ciencia</option>
                        <option value="Rehabilitación Oral">Rehabilitación Oral</option>
                        <option value="Prevención Dental Check">Prevención Dental Check</option>
                        <option value="Estética Biológica">Estética Biológica</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">
                        Fecha / Tiempo de Lectura
                      </label>
                      <input
                        type="text"
                        value={post.date}
                        onChange={(e) =>
                          updateDraft((d) => {
                            d.blogPosts[idx].date = e.target.value;
                            return d;
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Resumen Corto (Excerpt)
                    </label>
                    <textarea
                      rows={2}
                      value={post.excerpt}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.blogPosts[idx].excerpt = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>

                  {/* Sections */}
                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-700">
                        Secciones del Artículo ({post.sections.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateDraft((d) => {
                            d.blogPosts[idx].sections.push({
                              heading: 'Nuevo Subtítulo',
                              paragraphs: ['Contenido de la sección...'],
                            });
                            return d;
                          })
                        }
                        className="text-xs font-bold text-cyan-700 hover:underline cursor-pointer"
                      >
                        + Añadir sección
                      </button>
                    </div>

                    {post.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="rounded-xl bg-white p-3.5 ring-1 ring-slate-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={sec.heading}
                            onChange={(e) =>
                              updateDraft((d) => {
                                d.blogPosts[idx].sections[sIdx].heading = e.target.value;
                                return d;
                              })
                            }
                            placeholder="Subtítulo de la sección"
                            className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateDraft((d) => {
                                d.blogPosts[idx].sections.splice(sIdx, 1);
                                return d;
                              })
                            }
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <textarea
                          rows={3}
                          value={sec.paragraphs.join('\n\n')}
                          onChange={(e) =>
                            updateDraft((d) => {
                              d.blogPosts[idx].sections[sIdx].paragraphs = e.target.value
                                .split(/\n\s*\n/)
                                .map((p) => p.trim())
                                .filter(Boolean);
                              return d;
                            })
                          }
                          placeholder="Escribe los párrafos separados por una línea en blanco..."
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Editor */}
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">
                Preguntas Frecuentes (FAQ) ({draft.faqs.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  updateDraft((d) => {
                    d.faqs.push({
                      question: '¿Nueva pregunta frecuente?',
                      answer: 'Respuesta detallada...',
                    });
                    return d;
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-cyan-500 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Pregunta</span>
              </button>
            </div>

            <div className="space-y-3">
              {draft.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.faqs[idx].question = e.target.value;
                          return d;
                        })
                      }
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft((d) => {
                          d.faqs.splice(idx, 1);
                          return d;
                        })
                      }
                      className="text-red-500 hover:text-red-700 p-1.5 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) =>
                      updateDraft((d) => {
                        d.faqs[idx].answer = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CLINICAL SPECIALTIES */}
      {activeTab === 'specialties' && (
        <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900">
            Especialidades Clínicas ({draft.specialties.length})
          </h2>
          <div className="space-y-6">
            {draft.specialties.map((spec, idx) => (
              <div key={spec.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Título de Especialidad
                    </label>
                    <input
                      type="text"
                      value={spec.title}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.specialties[idx].title = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Etiqueta (Badge)
                    </label>
                    <input
                      type="text"
                      value={spec.badge}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.specialties[idx].badge = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500">
                      Duración / Formato
                    </label>
                    <input
                      type="text"
                      value={spec.durationOrFormat}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.specialties[idx].durationOrFormat = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    value={spec.subtitle}
                    onChange={(e) =>
                      updateDraft((d) => {
                        d.specialties[idx].subtitle = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500">
                    Descripción Corta (Tarjetas de Inicio)
                  </label>
                  <textarea
                    rows={2}
                    value={spec.shortDescription}
                    onChange={(e) =>
                      updateDraft((d) => {
                        d.specialties[idx].shortDescription = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500">
                    Descripción Clínica Completa
                  </label>
                  <textarea
                    rows={3}
                    value={spec.fullDescription}
                    onChange={(e) =>
                      updateDraft((d) => {
                        d.specialties[idx].fullDescription = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CONTACT, SCHEDULE & TESTIMONIALS */}
      {activeTab === 'contact-reviews' && (
        <div className="space-y-8">
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">
              Datos de Contacto, WhatsApp, Dirección y Horarios
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  WhatsApp (Visible, ej. 096 042 4887)
                </label>
                <input
                  type="text"
                  value={draft.siteConfig.whatsappDisplay}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.siteConfig.whatsappDisplay = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  WhatsApp Internacional (Solo números, ej. 593960424887)
                </label>
                <input
                  type="text"
                  value={draft.siteConfig.whatsappNumberClean}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.siteConfig.whatsappNumberClean = e.target.value.replace(/[^0-9]/g, '');
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="text"
                  value={draft.siteConfig.email}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.siteConfig.email = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Dirección Principal (Quito)
                </label>
                <input
                  type="text"
                  value={draft.siteConfig.address.street}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.siteConfig.address.street = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Sector / Código Postal
                </label>
                <input
                  type="text"
                  value={draft.siteConfig.address.sector}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.siteConfig.address.sector = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Horario Lunes a Viernes
                </label>
                <input
                  type="text"
                  value={draft.siteConfig.hours.weekdays}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.siteConfig.hours.weekdays = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Horario Sábados
                </label>
                <input
                  type="text"
                  value={draft.siteConfig.hours.saturdays}
                  onChange={(e) =>
                    updateDraft((d) => {
                      d.siteConfig.hours.saturdays = e.target.value;
                      return d;
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Patient Testimonials */}
          <div className="rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">
                Reseñas de Pacientes en Google Maps ({draft.testimonials.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  updateDraft((d) => {
                    d.testimonials.unshift({
                      id: `t-${Date.now()}`,
                      name: 'Nombre del Paciente',
                      role: 'Reseña Verificada en Google Maps · 5.0 ★',
                      quote: 'Escribe aquí el testimonio del paciente...',
                      specialty: 'Dental Check UIO · Quito',
                      rating: 5,
                    });
                    return d;
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-cyan-500 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Reseña</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {draft.testimonials.map((t, idx) => (
                <div
                  key={t.id || idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.testimonials[idx].name = e.target.value;
                          return d;
                        })
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={t.specialty}
                      onChange={(e) =>
                        updateDraft((d) => {
                          d.testimonials[idx].specialty = e.target.value;
                          return d;
                        })
                      }
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-cyan-800 font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft((d) => {
                          d.testimonials.splice(idx, 1);
                          return d;
                        })
                      }
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={t.quote}
                    onChange={(e) =>
                      updateDraft((d) => {
                        d.testimonials[idx].quote = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: VERSION HISTORY (10 SNAPSHOTS), BACKUP & PASSWORD */}
      {activeTab === 'history-security' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Version History (Undo up to 10 versions) */}
          <div className="lg:col-span-7 rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Historial Automático de Versiones (Últimos 10 Guardados)
                </h2>
                <p className="text-xs text-slate-500">
                  Cada vez que guardas cambios, el servidor conserva una copia previa para que puedas deshacer en 1 clic.
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  setLoadingHistory(true);
                  const list = await fetchHistory();
                  setSnapshots(list);
                  setLoadingHistory(false);
                }}
                className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingHistory ? 'animate-spin' : ''}`} />
                <span>Actualizar</span>
              </button>
            </div>

            {snapshots.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-6 text-center text-xs text-slate-500">
                Aún no hay versiones anteriores registradas. Se crearán automáticamente cada vez que hagas clic en "Guardar y Publicar".
              </div>
            ) : (
              <div className="space-y-2.5">
                {snapshots.map((snap) => (
                  <div
                    key={snap.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">{snap.label}</p>
                      <p className="text-[11px] text-slate-500">
                        {new Date(snap.timestamp).toLocaleString('es-EC')} · ID: {snap.id}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        const res = await restoreSnapshot(snap.id);
                        if (res.ok) {
                          setHasUnsavedChanges(false);
                          showNotice('success', `Versión ${snap.id} restaurada en vivo.`);
                          const list = await fetchHistory();
                          setSnapshots(list);
                        } else {
                          showNotice('error', res.error || 'No se pudo restaurar.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-600 hover:text-white transition cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Restaurar esta versión</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* JSON Export / Import & Factory Reset */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Descargar Respaldo (.json)</span>
                </button>
                <label className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200 cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Importar Respaldo (.json)</span>
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => handleImportJson(e.target.files?.[0])}
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={async () => {
                  if (
                    window.confirm(
                      '¿Restaurar todos los textos y enlaces a los valores originales de fábrica? (Se guardará un respaldo previo automáticamente).'
                    )
                  ) {
                    await resetToFactoryDefaults();
                    setHasUnsavedChanges(false);
                    showNotice('success', 'Valores originales de fábrica restaurados.');
                  }
                }}
                className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
              >
                Restaurar valores de fábrica
              </button>
            </div>
          </div>

          {/* Change Admin Password */}
          <div className="lg:col-span-5 rounded-3xl bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-cyan-500/20 space-y-4">
            <div className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-cyan-600" />
              <h2 className="text-lg font-extrabold text-slate-900">
                Cambiar Contraseña de /admin
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Actualiza la contraseña de acceso al panel de administración. Se almacena encriptada en el servidor.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nueva Contraseña (mínimo 6 caracteres)
                </label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={confirmAdminPassword}
                  onChange={(e) => setConfirmAdminPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (newAdminPassword.length < 6) {
                    showNotice('error', 'La nueva contraseña debe tener al menos 6 caracteres.');
                    return;
                  }
                  if (newAdminPassword !== confirmAdminPassword) {
                    showNotice('error', 'Las contraseñas no coinciden.');
                    return;
                  }
                  const res = await changeAdminPassword(newAdminPassword);
                  if (res.ok) {
                    setNewAdminPassword('');
                    setConfirmAdminPassword('');
                    showNotice('success', '¡Contraseña actualizada correctamente!');
                  } else {
                    showNotice('error', res.error || 'No se pudo cambiar la contraseña.');
                  }
                }}
                className="w-full rounded-full bg-slate-900 px-5 py-3 text-xs font-extrabold text-white hover:bg-cyan-600 transition cursor-pointer"
              >
                Actualizar Contraseña
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
