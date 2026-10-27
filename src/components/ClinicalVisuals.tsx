import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Play,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  Radio,
  ExternalLink,
  Tv,
} from 'lucide-react';
import { SITE_CONFIG, SONORAMA_YOUTUBE_VIDEOS } from '../data/siteContent';

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const MEDIA_ASSETS = {
  facebookReelUrl: 'https://www.facebook.com/reel/1418801960469263',
  facebookReelEmbedUrl:
    'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1418801960469263&show_text=false&t=0',
  sonoramaFacebookPage: 'https://www.facebook.com/sonoramadigital',
  sonoramaYoutubeChannel: 'https://www.youtube.com/@SonoramaDigital',
  sonoramaTvChannel: 'https://www.youtube.com/@SonoramaTvOficial',
  sonoramaYoutubeSearch: 'https://www.youtube.com/results?search_query=sonorama+vital',
  doctorHeroPhoto: 'https://i.ytimg.com/vi/YEiBtw4KfyM/hqdefault.jpg',
  doctorConsultationPhoto:
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
  clinicHighTechPhoto:
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
  digitalDentistryPhoto:
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
  naturalSmileAfter:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
  jawHarmonyPhoto:
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
  biomimeticCeramicsPhoto:
    'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=85',
  clinicVideoLoop:
    'https://assets.mixkit.co/videos/preview/mixkit-dentist-examining-a-patient-with-tools-44551-large.mp4',
  smileVideoLoop:
    'https://assets.mixkit.co/videos/preview/mixkit-woman-smiling-at-the-camera-41695-large.mp4',
  digitalScanVideoLoop:
    'https://assets.mixkit.co/videos/preview/mixkit-female-doctor-looking-at-a-medical-scan-41655-large.mp4',
};

/**
 * 60fps Vite-inspired Interactive Cyan Energy & Bio-Node Canvas.
 */
export const ViteCyanCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: width * 0.65, y: height * 0.4, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const nodes = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.2 + 1,
    }));

    let t = 0;
    const render = () => {
      t += 0.014;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const yOffset = height * (0.25 + i * 0.22);
        ctx.moveTo(0, yOffset);
        for (let x = 0; x <= width; x += 36) {
          const y =
            yOffset +
            Math.sin(x * 0.004 + t + i * 1.4) * 42 +
            Math.cos(x * 0.008 - t * 0.7) * 20;
          ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        grad.addColorStop(0.5, `rgba(34, 211, 238, ${0.18 - i * 0.04})`);
        grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.6)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 135) * 0.18})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 190) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - mdist / 190) * 0.32})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
};

const BIOMECHANICAL_ZONES = [
  {
    id: 'atm',
    code: '01',
    label: 'ATM Integral',
    title: 'Descompresión y Calma Articular',
    detail:
      'Eliminamos chasquidos ("clicks"), bloqueos y dolor frente al oído devolviendo a la articulación temporomandibular su espacio biológico.',
    cx: 78,
    cy: 112,
    mirrorCx: 242,
  },
  {
    id: 'bruxismo',
    code: '02',
    label: 'Bruxismo',
    title: 'Relajación Neuromuscular (Sueño y Vigilia)',
    detail:
      'Controlamos la sobrecarga de los músculos maseteros y temporales mediante férulas rígidas calibradas y biofeedback diurno.',
    cx: 96,
    cy: 162,
    mirrorCx: 224,
  },
  {
    id: 'biomimetica',
    code: '03',
    label: 'Biomimética',
    title: 'Rehabilitación y Estética sin Desgaste',
    detail:
      'Restituimos la anatomía, translucidez y dimensión vertical de tus dientes conservando al máximo tu esmalte natural.',
    cx: 160,
    cy: 194,
    mirrorCx: 160,
  },
  {
    id: 'cervical',
    code: '04',
    label: 'Eje Cervical',
    title: 'Conexión Postural y Alivio de Cefaleas',
    detail:
      'Integramos la estabilidad de tu mordida con la postura de cabeza y cuello para aliviar cefaleas tensionales matutinas.',
    cx: 160,
    cy: 252,
    mirrorCx: 160,
  },
];

/**
 * High-Tech Hero Showcase combining:
 * 1. Real YouTube Episodes of Dra. Pamela Pazmiño on Sonorama Vital (YEiBtw4KfyM + quick switcher)
 * 2. Real Facebook Reel (1418801960469263)
 * 3. Interactive 3D Cyan ATM Scanner
 */
export const InteractiveAtmHarmonyShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'reel' | 'scanner'>('youtube');
  const [heroVideoId, setHeroVideoId] = useState<string>(SONORAMA_YOUTUBE_VIDEOS[0].id);
  const [activeZoneId, setActiveZoneId] = useState<string>('atm');

  const activeZone = BIOMECHANICAL_ZONES.find((z) => z.id === activeZoneId) || BIOMECHANICAL_ZONES[0];
  const currentHeroVideo =
    SONORAMA_YOUTUBE_VIDEOS.find((v) => v.id === heroVideoId) || SONORAMA_YOUTUBE_VIDEOS[0];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Vite-style Cyan Neon Halo */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-80 w-80 rounded-full bg-cyan-400/35 blur-[100px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-sky-400/25 blur-[90px]" />

      {/* Outer High-Tech Glass Frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-3.5 sm:p-4 text-white shadow-[0_32px_90px_-15px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/40">
        {/* Top Mode Switcher Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-1 pb-3">
          <div className="inline-flex flex-wrap rounded-full bg-slate-900/95 p-1 ring-1 ring-white/10 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('youtube')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                activeTab === 'youtube'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Tv className="h-3 w-3" />
              <span>YouTube · Sonorama Vital</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reel')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                activeTab === 'reel'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Radio className="h-3 w-3" />
              <span>Reel Esmalte</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('scanner')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Activity className="h-3 w-3" />
              <span>ATM 3D</span>
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-3 py-1 text-[10px] font-extrabold text-cyan-300 ring-1 ring-cyan-400/30">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>EN VIVO</span>
          </span>
        </div>

        {/* TAB 1: YOUTUBE EPISODES OF DRA. PAMELA PAZMIÑO ON SONORAMA VITAL */}
        {activeTab === 'youtube' && (
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-4 sm:p-5 bg-vite-grid-dark space-y-4">
            {/* Main 16:9 YouTube Player */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video shadow-[0_0_40px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/40">
              <iframe
                key={currentHeroVideo.id}
                src={currentHeroVideo.embedUrl}
                title={currentHeroVideo.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Episode Info & Quick Episode Selector Strip */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 block">
                    {currentHeroVideo.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug mt-0.5">
                    {currentHeroVideo.title}
                  </h3>
                </div>
                <a
                  href={currentHeroVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 rounded-full bg-cyan-400/15 px-3 py-1.5 text-[11px] font-bold text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition"
                >
                  <span>YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* 4 Thumbnail Switchers */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {SONORAMA_YOUTUBE_VIDEOS.slice(0, 4).map((vid) => {
                  const isCurrent = vid.id === heroVideoId;
                  return (
                    <button
                      key={vid.id}
                      type="button"
                      onClick={() => setHeroVideoId(vid.id)}
                      className={`group relative overflow-hidden rounded-xl aspect-video cursor-pointer transition-all ${
                        isCurrent
                          ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 scale-[1.02]'
                          : 'opacity-65 hover:opacity-100 ring-1 ring-white/15'
                      }`}
                      title={vid.title}
                    >
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white fill-white drop-shadow" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REAL FACEBOOK REEL (Sonorama Vital - Dra. Pamela Pazmiño) */}
        {activeTab === 'reel' && (
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-4 sm:p-5 bg-vite-grid-dark space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 relative mx-auto w-full max-w-[260px] overflow-hidden rounded-3xl bg-black shadow-[0_0_40px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400/50 aspect-[9/16]">
                <iframe
                  src={MEDIA_ASSETS.facebookReelEmbedUrl}
                  title="Dra. Pamela Pazmiño en Sonorama Vital - Radio Sonorama Ecuador"
                  className="h-full w-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="sm:col-span-5 space-y-3.5 text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-400/30">
                  <Radio className="h-3 w-3" />
                  <span>Reel Oficial · Facebook</span>
                </div>

                <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">
                  Cuidado del Esmalte y Fracturas Dentales
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Cápsula educativa de la <strong>Dra. Pamela Pazmiño</strong> en <strong>Sonorama Vital</strong> sobre cómo proteger tus dientes frente al desgaste y bruxismo.
                </p>

                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={MEDIA_ASSETS.facebookReelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-cyan-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition"
                  >
                    <span>Ver en Facebook</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveTab('youtube')}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/8 px-4 py-2 text-[11px] font-bold text-cyan-300 hover:bg-white/15 transition cursor-pointer"
                  >
                    <Tv className="h-3.5 w-3.5" />
                    <span>Ver Programas YouTube →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE 3D ATM SCANNER */}
        {activeTab === 'scanner' && (
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-5 sm:p-6 bg-vite-grid-dark">
            <div className="relative z-10 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 320 270"
                className="h-60 sm:h-64 w-full max-w-[330px] select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="cyanLine" x1="0" y1="0" x2="320" y2="270" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#67E8F9" />
                    <stop offset="50%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                  <radialGradient id="cyanNodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <circle cx="160" cy="135" r="112" stroke="url(#cyanLine)" strokeOpacity="0.2" strokeWidth="1" />
                <circle
                  cx="160"
                  cy="135"
                  r="88"
                  stroke="url(#cyanLine)"
                  strokeOpacity="0.32"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />

                <line
                  x1="160"
                  y1="18"
                  x2="160"
                  y2="260"
                  stroke="#22D3EE"
                  strokeOpacity={activeZoneId === 'cervical' ? '0.95' : '0.28'}
                  strokeWidth={activeZoneId === 'cervical' ? '2.2' : '1'}
                  strokeDasharray="3 4"
                />

                <line
                  x1="50"
                  y1="112"
                  x2="270"
                  y2="112"
                  stroke="#22D3EE"
                  strokeOpacity={activeZoneId === 'atm' ? '0.95' : '0.32'}
                  strokeWidth={activeZoneId === 'atm' ? '2.2' : '1'}
                />

                <path
                  d="M78 112C78 158 96 196 124 218C142 232 151 236 160 236C169 236 178 232 196 218C224 196 242 158 242 112"
                  stroke="url(#cyanLine)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />

                <path
                  d="M82 116L102 182M238 116L218 182"
                  stroke="#67E8F9"
                  strokeOpacity={activeZoneId === 'bruxismo' ? '0.95' : '0.35'}
                  strokeWidth={activeZoneId === 'bruxismo' ? '3.2' : '1.5'}
                  strokeLinecap="round"
                />

                <path
                  d="M112 184C128 202 143 208 160 208C177 208 192 202 208 184"
                  stroke={activeZoneId === 'biomimetica' ? '#67E8F9' : '#22D3EE'}
                  strokeWidth={activeZoneId === 'biomimetica' ? '4' : '2.5'}
                  strokeLinecap="round"
                />

                {BIOMECHANICAL_ZONES.map((zone) => {
                  const isSelected = zone.id === activeZoneId;
                  return (
                    <g key={zone.id} onClick={() => setActiveZoneId(zone.id)} className="cursor-pointer">
                      <circle cx={zone.cx} cy={zone.cy} r={isSelected ? 19 : 12} fill="url(#cyanNodeGlow)" />
                      <circle
                        cx={zone.cx}
                        cy={zone.cy}
                        r={isSelected ? 7 : 5}
                        fill={isSelected ? '#67E8F9' : '#06B6D4'}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      {zone.mirrorCx !== zone.cx && (
                        <>
                          <circle cx={zone.mirrorCx} cy={zone.cy} r={isSelected ? 19 : 12} fill="url(#cyanNodeGlow)" />
                          <circle
                            cx={zone.mirrorCx}
                            cy={zone.cy}
                            r={isSelected ? 7 : 5}
                            fill={isSelected ? '#67E8F9' : '#06B6D4'}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {BIOMECHANICAL_ZONES.map((zone) => {
                const isSelected = zone.id === activeZoneId;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`rounded-2xl px-3 py-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                        : 'bg-white/6 text-cyan-100/80 hover:bg-white/12 ring-1 ring-white/10'
                    }`}
                  >
                    <span className={`block text-[10px] tracking-widest uppercase ${isSelected ? 'text-slate-900' : 'text-cyan-400'}`}>
                      {zone.code}
                    </span>
                    <span className="block text-xs truncate mt-0.5">{zone.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative z-10 rounded-2xl bg-slate-950/90 p-4 ring-1 ring-cyan-400/30">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  {activeZone.code} · {activeZone.label}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('youtube')}
                  className="text-[11px] text-cyan-300 hover:underline cursor-pointer"
                >
                  ← Volver a Videos
                </button>
              </div>
              <h3 className="text-base font-bold text-white">{activeZone.title}</h3>
              <p className="text-xs text-cyan-100/85 mt-1 leading-relaxed">{activeZone.detail}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Interactive Media Theater with ALL 14 Real YouTube Episodes of Sonorama Vital + Facebook Reel.
 */
export const SonoramaVitalMediaHub: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState(SONORAMA_YOUTUBE_VIDEOS[0]);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  const visibleEpisodes = showAllEpisodes
    ? SONORAMA_YOUTUBE_VIDEOS
    : SONORAMA_YOUTUBE_VIDEOS.slice(0, 6);

  return (
    <div className="rounded-[2.75rem] bg-slate-950 p-6 sm:p-10 lg:p-14 text-white shadow-[0_32px_90px_-20px_rgba(6,182,212,0.38)] ring-1 ring-cyan-400/30 relative overflow-hidden bg-vite-grid-dark space-y-10">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-500/15 blur-[120px]" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-400/30">
            <Radio className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span>Sonorama Vital · Radio Sonorama Ecuador & Sonorama Digital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Programas en Vivo, Entrevistas y{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              Reels de Salud
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Explora las emisiones de <strong>Sonorama Vital con Pamela Pazmiño</strong> en YouTube y Facebook (<em>@SonoramaDigital</em> / <em>@SonoramaTvOficial</em>). Haz clic en cualquier episodio para reproducirlo directamente aquí.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href={MEDIA_ASSETS.sonoramaYoutubeSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/25"
          >
            <Tv className="h-4 w-4" />
            <span>Ver todos en YouTube</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={MEDIA_ASSETS.facebookReelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition ring-1 ring-white/15"
          >
            <Radio className="h-4 w-4 text-cyan-400" />
            <span>Reel Facebook</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Main Cinema Row: Active YouTube Episode (8 cols) + Featured Facebook Reel (4 cols) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Main YouTube Theater (8 cols) */}
        <div className="lg:col-span-8 rounded-[2rem] bg-slate-900/90 p-4 sm:p-6 ring-1 ring-cyan-400/30 flex flex-col justify-between space-y-4">
          <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video shadow-2xl ring-1 ring-white/10">
            <iframe
              key={selectedVideo.id}
              src={selectedVideo.embedUrl}
              title={selectedVideo.title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <span>{selectedVideo.category}</span>
                <span>•</span>
                <span>{selectedVideo.dateLabel}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                {selectedVideo.title}
              </h3>
            </div>

            <a
              href={selectedVideo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition self-start"
            >
              <span>Abrir en YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right: Embedded Facebook Reel 1418801960469263 (4 cols) */}
        <div className="lg:col-span-4 rounded-[2rem] bg-slate-900/90 p-4 sm:p-5 ring-1 ring-cyan-400/30 flex flex-col items-center justify-between space-y-3">
          <div className="w-full flex items-center justify-between text-xs">
            <span className="font-extrabold uppercase tracking-wider text-cyan-400">
              Facebook Reel · Salud Oral
            </span>
            <a
              href={MEDIA_ASSETS.facebookReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>Directo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="relative w-full max-w-[260px] overflow-hidden rounded-2xl bg-black aspect-[9/16] ring-1 ring-cyan-400/40 shadow-xl">
            <iframe
              src={MEDIA_ASSETS.facebookReelEmbedUrl}
              title="Sonorama Vital Facebook Reel - Dra. Pamela Pazmiño"
              className="h-full w-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <p className="text-[11px] text-center text-slate-400">
            Sonorama Digital · Radio Sonorama Ecuador
          </p>
        </div>
      </div>

      {/* All Episodes Interactive Playlist Grid */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-cyan-400">
            Episodios de Sonorama Vital ({SONORAMA_YOUTUBE_VIDEOS.length} programas disponibles)
          </h3>
          <button
            type="button"
            onClick={() => setShowAllEpisodes(!showAllEpisodes)}
            className="text-xs font-bold text-cyan-300 hover:text-white transition cursor-pointer"
          >
            {showAllEpisodes ? 'Mostrar menos ↑' : `Ver los ${SONORAMA_YOUTUBE_VIDEOS.length} episodios ↓`}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleEpisodes.map((vid) => {
            const isSelected = vid.id === selectedVideo.id;
            return (
              <button
                key={vid.id}
                type="button"
                onClick={() => setSelectedVideo(vid)}
                className={`group text-left rounded-2xl p-3 transition-all flex items-center gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/25 to-cyan-400/10 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 hover:bg-white/10 ring-1 ring-white/10'
                }`}
              >
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-black">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-950/35 flex items-center justify-center">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-950/80 text-white'
                      }`}
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block truncate">
                    {vid.dateLabel}
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-2 leading-snug mt-0.5">
                    {vid.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Interactive Before/After & Video Bento Showcase for Biomimetic Rehabilitation & ATM Harmony.
 */
export const InteractiveSmileAndVideoBento: React.FC<{
  onOpenBooking: (specId?: string) => void;
}> = ({ onOpenBooking }) => {
  const [sliderPos, setSliderPos] = useState(55);
  const [muted, setMuted] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-7 rounded-[2.25rem] bg-slate-950 p-6 sm:p-8 text-white shadow-[0_24px_70px_-15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/25 flex flex-col justify-between space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-400">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Simulador Visual Interactivo</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Armonía Facial, ATM y Sonrisa Natural
            </h3>
          </div>
          <span className="rounded-full bg-cyan-500/15 px-3.5 py-1 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/30">
            Desliza para comparar ↔
          </span>
        </div>

        <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-3xl select-none ring-1 ring-white/15">
          <img
            src={MEDIA_ASSETS.naturalSmileAfter}
            alt="Sonrisa rehabilitada y armónica"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-3 right-3 z-20 rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-extrabold text-slate-950 shadow">
            DESPUÉS · Armonía Biomimética & ATM
          </span>

          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={MEDIA_ASSETS.naturalSmileAfter}
              alt="Estado previo con sobrecarga muscular"
              className="h-full w-full max-w-none object-cover grayscale contrast-125 brightness-75"
              style={{ width: '100vw', maxWidth: '720px' }}
            />
            <div className="absolute inset-0 bg-cyan-950/35" />
            <span className="absolute bottom-3 left-3 z-20 rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-bold text-cyan-300 ring-1 ring-cyan-400/30">
              ANTES · Tensión / Sobrecarga
            </span>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,1)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg font-extrabold text-xs">
              ↔
            </div>
          </div>

          <input
            type="range"
            min={10}
            max={90}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            aria-label="Comparar antes y después"
            className="absolute inset-0 z-30 h-full w-full opacity-0 cursor-ew-resize"
          />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Al desprogramar la sobrecarga muscular del bruxismo y restituir la dimensión vertical perdida, relajamos el tercio inferior del rostro y devolvemos una sonrisa translúcida y natural.
        </p>
      </div>

      {/* Right: High-Tech Looping Clinical Video Reel Card (5 cols) */}
      <div className="lg:col-span-5 relative overflow-hidden rounded-[2.25rem] bg-slate-900 text-white shadow-[0_24px_70px_-15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/25 min-h-[420px] flex flex-col justify-between p-6 sm:p-8">
        <video
          src={MEDIA_ASSETS.digitalScanVideoLoop}
          poster={MEDIA_ASSETS.doctorConsultationPhoto}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/30" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/20 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/35">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>VIDEO · DIAGNÓSTICO DIGITAL</span>
          </span>

          <button
            type="button"
            onClick={() => setMuted(!muted)}
            className="rounded-full bg-slate-950/70 backdrop-blur-md p-2.5 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition cursor-pointer ring-1 ring-white/15"
            aria-label="Alternar audio"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        <div className="relative z-10 space-y-4 pt-24">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 block">
            Tecnología & Evidencia · Dental Check UIO
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Diagnóstico visual claro antes de cualquier tratamiento.
          </h3>
          <p className="text-xs sm:text-sm text-cyan-50/90 leading-relaxed">
            Evaluamos tu articulación (ATM), encías y oclusión con fotografía clínica y análisis funcional en Quito.
          </p>
          <button
            type="button"
            onClick={() => onOpenBooking('dental-check-integral')}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 hover:from-cyan-300 hover:to-cyan-400 transition shadow-lg shadow-cyan-500/25 cursor-pointer"
          >
            <span>Agendar Dental Check Integral</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const MinimalistAuthorityShowcase: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-cyan-400/25 via-sky-300/15 to-transparent blur-2xl" />

      <div className="relative grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* Main Real Broadcast Thumbnail / Portrait Card (7 cols) */}
        <div className="sm:col-span-7 relative overflow-hidden rounded-[2rem] bg-slate-900 min-h-[380px] shadow-xl ring-1 ring-cyan-500/25 group">
          <img
            src={SONORAMA_YOUTUBE_VIDEOS[0].thumbnailUrl}
            alt="Dra. Pamela Pazmiño en Sonorama Vital"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
          <a
            href={SONORAMA_YOUTUBE_VIDEOS[0].youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Ver Sonorama Vital con Pamela Pazmiño en YouTube"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/90 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.8)] group-hover:scale-110 transition-transform">
              <Play className="h-6 w-6 fill-current ml-0.5" />
            </div>
          </a>
          <div className="absolute bottom-4 inset-x-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl p-4 ring-1 ring-cyan-400/30 text-white">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
              Sonorama Vital · Radio Sonorama & Dental Check
            </span>
            <p className="text-sm font-bold mt-0.5">
              Dra. Pamela Pazmiño: Ciencia clínica y divulgación en salud
            </p>
          </div>
        </div>

        {/* Right Stack: Looping Video + UDLA Science Metric Card (5 cols) */}
        <div className="sm:col-span-5 flex flex-col gap-4">
          <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-slate-950 min-h-[190px] ring-1 ring-cyan-500/25">
            <video
              src={MEDIA_ASSETS.clinicVideoLoop}
              poster={MEDIA_ASSETS.doctorConsultationPhoto}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="inline-block rounded-full bg-cyan-500/30 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-cyan-200">
                Dental Check UIO
              </span>
              <p className="text-xs font-bold mt-1">Tecnología y precisión clínica</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-cyan-500 to-sky-600 p-5 text-white shadow-lg shadow-cyan-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <GraduationCap className="h-6 w-6 text-cyan-100" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                UDLA · PubMed
              </span>
            </div>
            <p className="text-base font-extrabold leading-snug">
              Docente Universitaria e Investigadora
            </p>
            <p className="text-xs text-cyan-50 leading-relaxed">
              Publicaciones científicas sobre Bruxismo, Dolor Orofacial y Trastornos Temporomandibulares.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpecialtyVisualIllustration: React.FC<{
  type: 'atm' | 'bruxism' | 'rehab' | 'esthetic' | 'dentalcheck';
}> = ({ type }) => {
  const imageByType = {
    atm: MEDIA_ASSETS.digitalDentistryPhoto,
    bruxism: MEDIA_ASSETS.jawHarmonyPhoto,
    rehab: MEDIA_ASSETS.biomimeticCeramicsPhoto,
    esthetic: MEDIA_ASSETS.naturalSmileAfter,
    dentalcheck: MEDIA_ASSETS.clinicHighTechPhoto,
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-50 via-sky-50/70 to-white p-5 sm:p-6 ring-1 ring-cyan-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 relative h-44 sm:h-48 overflow-hidden rounded-2xl ring-1 ring-cyan-500/20">
          <img
            src={imageByType[type]}
            alt={type}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-full bg-cyan-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-950">
            {type === 'atm' && 'ATM Integral · 3D'}
            {type === 'bruxism' && 'Protección Neuromuscular'}
            {type === 'rehab' && 'Cerámica Biomimética'}
            {type === 'esthetic' && 'Sonrisa Natural'}
            {type === 'dentalcheck' && 'Dental Check UIO'}
          </span>
        </div>

        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between border-b border-cyan-500/15 pb-2.5">
            <span className="text-xs uppercase tracking-widest text-cyan-700 font-extrabold">
              {type === 'atm' && 'Eje Biomecánico · ATM Integral'}
              {type === 'bruxism' && 'Neurofisiología y Protección Oclusal'}
              {type === 'rehab' && 'Adhesión Biomimética Conservadora'}
              {type === 'esthetic' && 'Armonía Natural y Translucidez'}
              {type === 'dentalcheck' && 'Diagnóstico Preventivo Dental Check UIO'}
            </span>
            <Sparkles className="h-4 w-4 text-cyan-500" />
          </div>

          {type === 'atm' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">01 · Articulación (ATM)</p>
                <p className="text-slate-600 leading-relaxed">
                  Evaluación del complejo cóndilo-disco, clicks articulares y apertura sin dolor.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">02 · Eje Cráneo-Cervical</p>
                <p className="text-slate-600 leading-relaxed">
                  Conexión entre mordida, postura de cuello y alivio de cefaleas tensionales.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">03 · Férula Calibrada</p>
                <p className="text-slate-600 leading-relaxed">
                  Desprogramación neuromuscular y férulas estabilizadoras rígidas en céntrica.
                </p>
              </div>
            </div>
          )}

          {type === 'bruxism' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">Bruxismo de Vigilia (Diurno)</p>
                <p className="text-slate-600 leading-relaxed">
                  Apretamiento silencioso por concentración. Se aborda con biofeedback y reeducación funcional.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">Bruxismo del Sueño (Nocturno)</p>
                <p className="text-slate-600 leading-relaxed">
                  Protección mecánica mediante dispositivos oclusales rígidos con guías caninas equilibradas.
                </p>
              </div>
            </div>
          )}

          {type === 'rehab' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">Mínima Invasión</p>
                <p className="text-slate-600 leading-relaxed">
                  Incrustaciones adhesivas (Inlays/Overlays) que preservan el diente sano.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">Cerámica Libre de Metal</p>
                <p className="text-slate-600 leading-relaxed">
                  Disilicato de litio y zirconia multicapa con estética natural.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">Dimensión Vertical</p>
                <p className="text-slate-600 leading-relaxed">
                  Recuperación funcional de la altura dental perdida por desgaste.
                </p>
              </div>
            </div>
          )}

          {type === 'esthetic' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">Mock-up Digital en Boca</p>
                <p className="text-slate-600 leading-relaxed">
                  Visualiza tu nueva sonrisa sobre tus dientes antes de iniciar cualquier procedimiento.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-2xs ring-1 ring-cyan-500/10">
                <p className="font-bold text-cyan-700 mb-1">Translucidez y Biología</p>
                <p className="text-slate-600 leading-relaxed">
                  Carillas ultrafinas y aclaramiento clínico seguro cuidando tu ATM.
                </p>
              </div>
            </div>
          )}

          {type === 'dentalcheck' && (
            <div className="rounded-2xl bg-white p-4 shadow-2xs ring-1 ring-cyan-500/10 text-xs space-y-1">
              <div className="flex items-center gap-2 text-cyan-700 font-bold">
                <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                <span>Centro Odontológico Dental Check UIO (@dentalcheck.uio)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Valoración preventiva integral antes de ortodoncia, profilaxis ultrasónica, periodoncia, endodoncia y cirugía oral en Av. La Coruña y Francisco de Orellana.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
