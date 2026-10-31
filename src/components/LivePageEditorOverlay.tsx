import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Edit3,
  Save,
  X,
  FolderOpen,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  Settings,
  Video,
  FileText,
  GraduationCap,
  MapPin,
  Stethoscope,
  MessageSquare,
} from 'lucide-react';
import { useCms, InspectorSectionType } from '../context/CmsContext';
import { MediaLibraryModal } from './MediaLibraryModal';
import { InternalChatPanel } from './InternalChatPanel';

export const LivePageEditorOverlay: React.FC = () => {
  const location = useLocation();
  const {
    cmsData,
    isAuthenticated,
    editOnPageEnabled,
    setEditOnPageEnabled,
    inspectorSection,
    openInspector,
    closeInspector,
    updateLiveDraft,
    saveCmsData,
    fetchYoutubeMeta,
    chatUnreadCount,
    activeRole,
  } = useCms();

  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const unreadCount = activeRole === 'doc' ? chatUnreadCount.forDoc : chatUnreadCount.forInge;
  const [mediaModal, setMediaModal] = useState<{
    open: boolean;
    accept: 'all' | 'image' | 'video';
    onSelect: (url: string) => void;
  }>({
    open: false,
    accept: 'all',
    onSelect: () => {},
  });

  // Quick YouTube paste inside drawer
  const [quickYtUrl, setQuickYtUrl] = useState('');
  const [quickYtLoading, setQuickYtLoading] = useState(false);

  // Attach interactive click-to-edit outlines to sections on the live page when editOnPageEnabled is true
  useEffect(() => {
    if (!isAuthenticated || !editOnPageEnabled || location.pathname === '/admin') {
      return;
    }

    const sections = Array.from(document.querySelectorAll('main > div > section')) as HTMLElement[];
    const sectionMapping: InspectorSectionType[] =
      location.pathname === '/'
        ? [
            'hero',
            'sonorama',
            'symptoms',
            'cases',
            'specialties',
            'publications',
            'guide',
            'blog',
            'instagram',
            'testimonials',
            'faq',
          ]
        : location.pathname === '/sobre-mi'
        ? ['publications', 'cases']
        : location.pathname === '/especialidades'
        ? ['specialties', 'faq']
        : location.pathname === '/blog'
        ? ['blog', 'guide']
        : ['contact'];

    const handlers: { el: HTMLElement; fn: (e: MouseEvent) => void }[] = [];

    sections.forEach((sec, idx) => {
      const targetType = sectionMapping[idx] || 'hero';
      sec.classList.add(
        'ring-2',
        'ring-dashed',
        'ring-cyan-400/70',
        'hover:ring-4',
        'hover:ring-cyan-500',
        'transition-all',
        'cursor-pointer',
        'relative'
      );
      sec.setAttribute('title', 'Clic para editar esta sección en vivo');

      const fn = (e: MouseEvent) => {
        // Allow normal buttons/links if user holds Ctrl/Cmd, otherwise open visual inspector
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        e.stopPropagation();
        openInspector(targetType);
      };
      sec.addEventListener('click', fn, true);
      handlers.push({ el: sec, fn });
    });

    return () => {
      handlers.forEach(({ el, fn }) => {
        el.classList.remove(
          'ring-2',
          'ring-dashed',
          'ring-cyan-400/70',
          'hover:ring-4',
          'hover:ring-cyan-500',
          'cursor-pointer'
        );
        el.removeAttribute('title');
        el.removeEventListener('click', fn, true);
      });
    };
  }, [isAuthenticated, editOnPageEnabled, location.pathname, openInspector]);

  if (!isAuthenticated || location.pathname === '/admin') {
    return null;
  }

  const handleSaveLive = async () => {
    setSaving(true);
    const res = await saveCmsData(cmsData, 'Edición visual en página');
    setSaving(false);
    if (res.ok) {
      setSavedNotice('¡Guardado en vivo!');
      setTimeout(() => setSavedNotice(''), 3500);
    }
  };

  return (
    <>
      {/* Bottom-Left Floating Visual Editor Bar */}
      <div className="fixed bottom-5 left-5 z-[80] flex flex-wrap items-center gap-2 rounded-full bg-slate-950/95 backdrop-blur-xl px-4 py-2.5 text-white shadow-[0_20px_50px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/60">
        <button
          type="button"
          onClick={() => {
            const next = !editOnPageEnabled;
            setEditOnPageEnabled(next);
            if (next && !inspectorSection) {
              openInspector('hero');
            }
          }}
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition cursor-pointer ${
            editOnPageEnabled
              ? 'bg-cyan-400 text-slate-950 shadow-sm'
              : 'bg-white/10 text-cyan-300 hover:bg-white/20'
          }`}
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>{editOnPageEnabled ? 'Modo Editar en Página: ON' : 'Editar en Página'}</span>
        </button>

        <button
          type="button"
          onClick={() => openInspector(inspectorSection || 'hero')}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/20 cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Inspector</span>
        </button>

        <button
          type="button"
          onClick={handleSaveLive}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition cursor-pointer disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" />
          <span>{saving ? 'Guardando...' : savedNotice || 'Guardar Todo'}</span>
        </button>

        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition cursor-pointer ${
            chatOpen
              ? 'bg-cyan-400 text-slate-950 shadow-sm'
              : 'bg-white/10 text-cyan-200 hover:bg-white/20'
          }`}
          title="Abrir chat interno Inge ↔ Doc"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Chat Interno</span>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-black h-4 px-1.5 min-w-[16px] animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        <Link
          to="/admin"
          className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-200 hover:bg-white/20"
        >
          <Settings className="h-3.5 w-3.5" />
          <span>Panel /admin</span>
        </Link>
      </div>

      {/* Right Slide-Over Inspector Drawer */}
      {inspectorSection && (
        <div className="fixed inset-y-0 right-0 z-[85] w-full max-w-md bg-white/98 backdrop-blur-2xl shadow-[-20px_0_60px_rgba(15,23,42,0.35)] border-l border-cyan-500/30 flex flex-col">
          {/* Drawer Header */}
          <div className="bg-slate-950 px-5 py-4 text-white flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                Inspector Visual en Vivo
              </span>
              <h3 className="text-sm font-extrabold">
                Edición Directa sobre la Página
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveLive}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? 'Guardando...' : 'Publicar'}</span>
              </button>
              <button
                type="button"
                onClick={closeInspector}
                className="rounded-full bg-white/10 p-1.5 text-slate-300 hover:bg-white/20 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Section Switcher Pills inside Drawer */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 py-2.5">
            {(
              [
                { id: 'hero', label: 'Hero & Video', icon: Video },
                { id: 'sonorama', label: 'Sonorama', icon: Sparkles },
                { id: 'cases', label: 'Fotos & Casos', icon: FolderOpen },
                { id: 'specialties', label: 'Especialidades', icon: Stethoscope },
                { id: 'publications', label: 'Ciencia UDLA', icon: GraduationCap },
                { id: 'blog', label: 'Blog & Guía', icon: FileText },
                { id: 'contact', label: 'Contacto', icon: MapPin },
              ] as const
            ).map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => openInspector(s.id)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold whitespace-nowrap cursor-pointer ${
                    inspectorSection === s.id
                      ? 'bg-slate-900 text-cyan-300'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>

          {savedNotice && (
            <div className="bg-emerald-950 px-4 py-2 text-xs font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{savedNotice}</span>
            </div>
          )}

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {inspectorSection === 'hero' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-600 mb-1">
                    Badge Superior
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero.badge}
                    onChange={(e) =>
                      updateLiveDraft((d) => {
                        d.hero.badge = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-600 mb-1">
                    Título (Inicio)
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero.titlePrefix}
                    onChange={(e) =>
                      updateLiveDraft((d) => {
                        d.hero.titlePrefix = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-cyan-700 mb-1">
                    Frase Destacada en Cian
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero.titleHighlight}
                    onChange={(e) =>
                      updateLiveDraft((d) => {
                        d.hero.titleHighlight = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-cyan-300 bg-cyan-50/40 px-3 py-2 text-xs font-extrabold text-cyan-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-600 mb-1">
                    Título (Final)
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero.titleSuffix}
                    onChange={(e) =>
                      updateLiveDraft((d) => {
                        d.hero.titleSuffix = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-600 mb-1">
                    Descripción de Bienvenida
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.hero.description}
                    onChange={(e) =>
                      updateLiveDraft((d) => {
                        d.hero.description = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">
                      Video del Hero (9:16 MP4)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setMediaModal({
                          open: true,
                          accept: 'video',
                          onSelect: (url) =>
                            updateLiveDraft((d) => {
                              d.hero.videoUrl = url;
                              return d;
                            }),
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-full bg-cyan-600 px-3 py-1 text-[11px] font-extrabold text-white hover:bg-cyan-500 cursor-pointer"
                    >
                      <FolderOpen className="h-3 w-3" />
                      <span>Cambiar Video</span>
                    </button>
                  </div>
                  <p className="truncate text-[11px] font-mono text-slate-500">
                    {cmsData.hero.videoUrl}
                  </p>
                </div>
              </div>
            )}

            {inspectorSection === 'sonorama' && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-900 p-4 text-white space-y-2.5">
                  <span className="text-[11px] font-extrabold uppercase text-cyan-300 block">
                    Agregar Episodio pegando link de YouTube
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={quickYtUrl}
                      onChange={(e) => setQuickYtUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="flex-1 rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-xs text-white"
                    />
                    <button
                      type="button"
                      disabled={quickYtLoading}
                      onClick={async () => {
                        if (!quickYtUrl.trim()) return;
                        setQuickYtLoading(true);
                        const meta = await fetchYoutubeMeta(quickYtUrl.trim());
                        setQuickYtLoading(false);
                        if (meta.ok && meta.videoId) {
                          updateLiveDraft((d) => {
                            d.sonoramaVideos.unshift({
                              id: meta.videoId!,
                              title: meta.title || 'Sonorama Vital con Pamela Pazmiño',
                              dateLabel: 'Nuevo Episodio',
                              category: 'Programa Completo · Sonorama Digital',
                              youtubeUrl: `https://www.youtube.com/watch?v=${meta.videoId}`,
                              embedUrl: `https://www.youtube.com/embed/${meta.videoId}?rel=0`,
                              thumbnailUrl:
                                meta.thumbnailUrl ||
                                `https://i.ytimg.com/vi/${meta.videoId}/hqdefault.jpg`,
                            });
                            return d;
                          });
                          setQuickYtUrl('');
                        }
                      }}
                      className="rounded-xl bg-cyan-400 px-3 py-2 text-xs font-extrabold text-slate-950 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {cmsData.sonoramaVideos.map((v, idx) => (
                    <div
                      key={`${v.id}-${idx}`}
                      className="rounded-xl border border-slate-200 p-3 flex items-center gap-2.5 bg-slate-50"
                    >
                      <img
                        src={v.thumbnailUrl}
                        alt={v.title}
                        className="h-12 w-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <input
                          type="text"
                          value={v.title}
                          onChange={(e) =>
                            updateLiveDraft((d) => {
                              d.sonoramaVideos[idx].title = e.target.value;
                              return d;
                            })
                          }
                          className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={v.dateLabel}
                          onChange={(e) =>
                            updateLiveDraft((d) => {
                              d.sonoramaVideos[idx].dateLabel = e.target.value;
                              return d;
                            })
                          }
                          className="w-full rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          updateLiveDraft((d) => {
                            d.sonoramaVideos.splice(idx, 1);
                            return d;
                          })
                        }
                        className="text-red-500 p-1 hover:bg-red-50 rounded cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {inspectorSection === 'cases' && (
              <div className="space-y-3">
                {(
                  [
                    { key: 'realBeforeAfterSmile', label: 'Caso Antes y Después Sonrisa' },
                    { key: 'realCadCamSplint3D', label: 'Férula Digital 3D Real' },
                    { key: 'realBiomimeticVeneers', label: 'Carillas Biomiméticas' },
                    { key: 'realOralRehabProsthesis', label: 'Rehabilitación Oral' },
                    { key: 'draPameClinicalUnit', label: 'Unidad Clínica Dental Check' },
                    { key: 'draPameDiplomas', label: 'Diplomas y Docencia UDLA' },
                    { key: 'draPameHappyPatient', label: 'Pacientes Felices 5.0★' },
                    { key: 'fortunePlazaBuilding', label: 'Edificio Fortune Plaza' },
                  ] as const
                ).map((item) => (
                  <div
                    key={item.key}
                    className="rounded-2xl border border-slate-200 p-3 flex items-center gap-3 bg-slate-50"
                  >
                    <img
                      src={cmsData.mediaAssets[item.key]}
                      alt={item.label}
                      className="h-14 w-16 rounded-xl object-cover shrink-0 bg-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-extrabold text-slate-800">{item.label}</p>
                      <button
                        type="button"
                        onClick={() =>
                          setMediaModal({
                            open: true,
                            accept: 'image',
                            onSelect: (url) =>
                              updateLiveDraft((d) => {
                                d.mediaAssets[item.key] = url;
                                return d;
                              }),
                          })
                        }
                        className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold text-cyan-300 hover:bg-cyan-600 hover:text-white cursor-pointer"
                      >
                        <FolderOpen className="h-3 w-3" />
                        <span>Elegir / Recortar Foto</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {inspectorSection === 'specialties' && (
              <div className="space-y-4">
                {cmsData.specialties.map((spec, idx) => (
                  <div
                    key={spec.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-2"
                  >
                    <input
                      type="text"
                      value={spec.title}
                      onChange={(e) =>
                        updateLiveDraft((d) => {
                          d.specialties[idx].title = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-extrabold"
                    />
                    <textarea
                      rows={2}
                      value={spec.shortDescription}
                      onChange={(e) =>
                        updateLiveDraft((d) => {
                          d.specialties[idx].shortDescription = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {inspectorSection === 'publications' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    updateLiveDraft((d) => {
                      d.scientificPublications.unshift({
                        id: `pub-${Date.now()}`,
                        year: '2026',
                        title: 'Nuevo Estudio Científico',
                        publishedAs: 'Eliana Pazmiño Troncoso',
                        journal: 'Revista Científica Indexada',
                        doi: '',
                        focus: 'Resumen del estudio...',
                        coAuthors: 'Byron Velásquez Ron, Eliana Pazmiño Troncoso.',
                        links: [{ label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/' }],
                      });
                      return d;
                    })
                  }
                  className="w-full rounded-xl bg-cyan-600 py-2 text-xs font-extrabold text-white cursor-pointer"
                >
                  + Agregar Publicación Científica
                </button>
                {cmsData.scientificPublications.map((pub, idx) => (
                  <div
                    key={pub.id || idx}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2"
                  >
                    <input
                      type="text"
                      value={pub.title}
                      onChange={(e) =>
                        updateLiveDraft((d) => {
                          d.scientificPublications[idx].title = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={pub.journal}
                      onChange={(e) =>
                        updateLiveDraft((d) => {
                          d.scientificPublications[idx].journal = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-cyan-800 font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={pub.focus}
                      onChange={(e) =>
                        updateLiveDraft((d) => {
                          d.scientificPublications[idx].focus = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {(inspectorSection === 'blog' ||
              inspectorSection === 'guide' ||
              inspectorSection === 'symptoms' ||
              inspectorSection === 'instagram' ||
              inspectorSection === 'testimonials' ||
              inspectorSection === 'faq') && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-cyan-50 p-3.5 text-xs text-cyan-900">
                  Edita rápidamente los artículos y la Guía Gratuita aquí o abre el{' '}
                  <Link to="/admin" className="font-extrabold underline">
                    Panel Completo /admin
                  </Link>{' '}
                  para usar el editor enriquecido con vista dividida.
                </div>
                {cmsData.blogPosts.map((post, idx) => (
                  <div
                    key={post.id || idx}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2"
                  >
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) =>
                        updateLiveDraft((d) => {
                          d.blogPosts[idx].title = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      value={post.excerpt}
                      onChange={(e) =>
                        updateLiveDraft((d) => {
                          d.blogPosts[idx].excerpt = e.target.value;
                          return d;
                        })
                      }
                      className="w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {inspectorSection === 'contact' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    WhatsApp Visible
                  </label>
                  <input
                    type="text"
                    value={cmsData.siteConfig.whatsappDisplay}
                    onChange={(e) =>
                      updateLiveDraft((d) => {
                        d.siteConfig.whatsappDisplay = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Dirección Consultorio
                  </label>
                  <input
                    type="text"
                    value={cmsData.siteConfig.address.street}
                    onChange={(e) =>
                      updateLiveDraft((d) => {
                        d.siteConfig.address.street = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Horario Lunes a Viernes
                  </label>
                  <input
                    type="text"
                    value={cmsData.siteConfig.hours.weekdays}
                    onChange={(e) =>
                      updateLiveDraft((d) => {
                        d.siteConfig.hours.weekdays = e.target.value;
                        return d;
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Internal Chat Drawer */}
      {chatOpen && (
        <div className="fixed inset-y-0 right-0 z-[95] w-full max-w-lg bg-white shadow-[-25px_0_60px_rgba(15,23,42,0.35)] flex flex-col border-l border-slate-200">
          <InternalChatPanel onClose={() => setChatOpen(false)} />
        </div>
      )}

      {/* Visual Media Library + Cropper Modal */}
      <MediaLibraryModal
        isOpen={mediaModal.open}
        onClose={() => setMediaModal((m) => ({ ...m, open: false }))}
        acceptFilter={mediaModal.accept}
        onSelect={mediaModal.onSelect}
      />
    </>
  );
};
