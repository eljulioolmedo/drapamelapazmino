import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Play,
  SlidersHorizontal,
  Radio,
  ExternalLink,
  Tv,
  Camera,
  MapPin,
  Star,
} from 'lucide-react';
import {
  SITE_CONFIG,
  SONORAMA_YOUTUBE_VIDEOS,
  RESEARCHER_PROFILES,
  SCIENTIFIC_PUBLICATIONS,
} from '../data/siteContent';

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
  googleMapsUrl:
    'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjg3fqLk9uXAxUAAAAAHQAAAAAQIA..i&fvr=1&pvq=Cg0vZy8xMW5uMGN3OXFf&cs=1&um=1&ie=UTF-8&fb=1&gl=ec&sa=X&ftid=0x91d5912ce4b1be17:0x46de3827080205ae',

  // Real downloaded photos & video from DentalCheck
  heroAnimationLoopMp4: '/videos/Fix_video_logo_framing_8c50867c_1080p.mp4',
  dentalCheckLogo: '/images/clinic/dentalcheck-logo.png',
  dentalCheckIcon: '/images/clinic/dentalcheck-icon.png',
  heroDraPamela: '/images/clinic/hero-dra-pamela.jpg',
  draPameDiplomas: '/images/clinic/dentalcheck-08.jpg',
  draPameClinicalUnit: '/images/clinic/dentalcheck-02.jpg',
  draPameHappyPatient: '/images/clinic/dentalcheck-10.jpg',
  realBeforeAfterSmile: '/images/clinic/dentalcheck-05.jpg',
  realCadCamSplint3D: '/images/clinic/dentalcheck-06.jpg',
  realBiomimeticVeneers: '/images/clinic/dentalcheck-07.jpg',
  realOralRehabProsthesis: '/images/clinic/dentalcheck-04.jpg',
  fortunePlazaBuilding: '/images/clinic/dentalcheck-01.jpg',
  woodCyanBg: '/images/clinic/wood-cyan-bg.jpg',
  woodCyanStrip: '/images/clinic/wood-cyan-strip.jpg',
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

    const nodes = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      r: Math.random() * 2.4 + 1.2,
    }));

    let t = 0;
    const render = () => {
      t += 0.018;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const yOffset = height * (0.25 + i * 0.22);
        ctx.moveTo(0, yOffset);
        for (let x = 0; x <= width; x += 32) {
          const y =
            yOffset +
            Math.sin(x * 0.004 + t + i * 1.4) * 46 +
            Math.cos(x * 0.008 - t * 0.7) * 22;
          ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        grad.addColorStop(0.5, `rgba(34, 211, 238, ${0.24 - i * 0.05})`);
        grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4;
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
        ctx.fillStyle = 'rgba(34, 211, 238, 0.7)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 140) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 200) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - mdist / 200) * 0.35})`;
            ctx.lineWidth = 1.4;
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

const HERO_DOCTOR_PHOTOS = [
  {
    id: 'pame-hero-portrait',
    src: MEDIA_ASSETS.heroDraPamela,
    badge: 'Directora Clínica · Dental Check UIO',
    title: 'Dra. Pamela Pazmiño',
    subtitle: 'Especialista en Rehabilitación Oral, ATM Integral, Bruxismo y Dolor Orofacial',
    objectPos: 'object-top',
  },
  {
    id: 'pame-diplomas',
    src: MEDIA_ASSETS.draPameDiplomas,
    badge: 'Docente e Investigadora UDLA',
    title: 'Excelencia Académica y Científica',
    subtitle: 'Publicaciones internacionales en PubMed / NIH sobre dolor orofacial',
    objectPos: 'object-top',
  },
  {
    id: 'pame-chair',
    src: MEDIA_ASSETS.draPameClinicalUnit,
    badge: 'Tecnología & Precisión',
    title: 'Consultorio Dental Check UIO',
    subtitle: 'Edificio Fortune Plaza · Torre Alemania (Av. Eloy Alfaro y Alemania)',
    objectPos: 'object-top',
  },
  {
    id: 'pame-patient',
    src: MEDIA_ASSETS.draPameHappyPatient,
    badge: '5.0 ★ en Google Maps (36+ reseñas)',
    title: '"Nuestro mejor proyecto, Tu sonrisa"',
    subtitle: 'Atención empática, minuciosa y libre de dolor en Quito',
    objectPos: 'object-top',
  },
];

/**
 * BIG CINEMATIC HERO STAGE OF DRA. PAMELA PAZMIÑO (Photo + Live Video Mode + Floating Animated 3D Badges)
 */
export const InteractiveAtmHarmonyShowcase: React.FC = () => {
  const [mode, setMode] = useState<'loop' | 'photo' | 'youtube' | 'reel'>('loop');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [heroVideoId, setHeroVideoId] = useState<string>(SONORAMA_YOUTUBE_VIDEOS[0].id);

  const currentPhoto = HERO_DOCTOR_PHOTOS[activePhotoIdx] || HERO_DOCTOR_PHOTOS[0];
  const currentHeroVideo =
    SONORAMA_YOUTUBE_VIDEOS.find((v) => v.id === heroVideoId) || SONORAMA_YOUTUBE_VIDEOS[0];

  return (
    <div className="relative w-full max-w-[540px] mx-auto animate-hero-right">
      {/* Animated Rotating Cyan Orbital Ring Behind Hero */}
      <div className="pointer-events-none absolute -inset-6 flex items-center justify-center">
        <div className="h-[104%] w-[104%] rounded-[3.2rem] border border-dashed border-cyan-400/35 animate-spin-slow" />
      </div>

      {/* Glowing Cyan Neon Ambient Orbs */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-96 w-96 rounded-full bg-cyan-400/35 blur-[100px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-80 w-80 rounded-full bg-sky-400/30 blur-[90px] animate-pulse-glow" />

      {/* FLOATING 3D BADGE 1 (Top-Left): Official DentalCheck Logo + 5.0 ★ Google Maps */}
      <a
        href={MEDIA_ASSETS.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-3.5 absolute -top-5 -left-6 z-30 rounded-2xl bg-white/95 backdrop-blur-xl px-4 py-2.5 shadow-[0_20px_50px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/35 animate-float-a hover:scale-105 transition-transform"
      >
        <img
          src={MEDIA_ASSETS.dentalCheckLogo}
          alt="Dental Check · El mejor proyecto, tu sonrisa"
          className="h-11 w-auto object-contain shrink-0"
        />
        <div className="border-l border-slate-200 pl-3">
          <div className="flex items-center gap-1 text-xs font-extrabold text-slate-900">
            <Star className="h-3.5 w-3.5 fill-cyan-500 text-cyan-500" />
            <span>5.0 ★ Google Maps</span>
          </div>
          <span className="block text-[10px] font-semibold text-cyan-700">
            36+ Reseñas · Fortune Plaza
          </span>
        </div>
      </a>

      {/* FLOATING 3D BADGE 2 (Bottom-Right): Live Video Trigger / Specialist Badge */}
      {(mode === 'loop' || mode === 'photo') && (
        <button
          type="button"
          onClick={() => setMode('youtube')}
          className="hidden sm:flex items-center gap-3.5 absolute -bottom-5 -right-5 z-30 rounded-2xl bg-slate-950/95 backdrop-blur-xl p-3 pr-5 text-left text-white shadow-[0_24px_60px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/60 animate-float-b hover:scale-105 transition-transform cursor-pointer group"
        >
          <div className="relative h-14 w-20 overflow-hidden rounded-xl bg-black shrink-0 ring-1 ring-cyan-400/40">
            <img
              src={SONORAMA_YOUTUBE_VIDEOS[0].thumbnailUrl}
              alt="Sonorama Vital con Pamela Pazmiño"
              className="h-full w-full object-cover group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-slate-950/35 flex items-center justify-center">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-lg">
                <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
              </span>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Ver Programa en Vivo</span>
            </span>
            <p className="text-xs font-extrabold text-white mt-0.5">
              Dra. Pamela en Sonorama Vital TV →
            </p>
          </div>
        </button>
      )}

      {/* MAIN BIG HERO STAGE FRAME WITH ARCHITECTURAL WOOD + CYAN GLASS INTEGRATION */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-3 sm:p-4 pl-6 sm:pl-9 text-white shadow-[0_32px_100px_-15px_rgba(6,182,212,0.5)] ring-2 ring-cyan-400/60">
        {/* Left Architectural Real Wood Slats + Cyan Glass Strip */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-5 sm:w-7 bg-cover bg-left opacity-95 border-r border-cyan-300/60 shadow-[4px_0_24px_rgba(6,182,212,0.45)]"
          style={{ backgroundImage: `url(${MEDIA_ASSETS.woodCyanStrip})` }}
        />

        {/* Top Mode Switcher Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-1 pb-3">
          <div className="inline-flex flex-wrap rounded-full bg-slate-900 p-1 ring-1 ring-white/15 gap-1">
            <button
              type="button"
              onClick={() => setMode('loop')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                mode === 'loop'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Dra. Pamela (Video)</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('photo')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                mode === 'photo'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Fotos ({HERO_DOCTOR_PHOTOS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('youtube')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                mode === 'youtube'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Tv className="h-3.5 w-3.5" />
              <span>Sonorama Vital TV</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('reel')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                mode === 'reel'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Radio className="h-3.5 w-3.5" />
              <span>Reel</span>
            </button>
          </div>
        </div>

        {/* MODE 0 (DEFAULT): SEAMLESS 1080P HERO ANIMATION LOOP OF DRA. PAMELA PAZMIÑO */}
        {mode === 'loop' && (
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#16263b] ring-1 ring-cyan-400/40">
            <video
              src={MEDIA_ASSETS.heroAnimationLoopMp4}
              poster={MEDIA_ASSETS.heroDraPamela}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-[center_25%]"
            />

            {/* Subtle Bottom Vignette so Caption is Crisp without Blocking the Video */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

            {/* Top-Right Specialist Pill */}
            <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-slate-950/75 backdrop-blur-md px-3 py-1 text-[11px] font-extrabold text-cyan-300 ring-1 ring-cyan-400/40">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Directora Clínica · Dental Check UIO</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                  Dra. Pamela Pazmiño
                </h2>
                <p className="text-xs sm:text-sm text-cyan-200 font-semibold drop-shadow">
                  Especialista en Rehabilitación Oral, ATM Integral y Bruxismo
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MODE 1: BIG ANIMATED PORTRAIT SHOWCASE OF DRA. PAMELA PAZMIÑO */}
        {mode === 'photo' && (
          <div className="space-y-3">
            <div className="relative h-[420px] sm:h-[520px] lg:h-[560px] w-full overflow-hidden rounded-[2rem] bg-slate-900 ring-1 ring-cyan-400/35">
              {/* Ken Burns Living Zoom Image */}
              <img
                key={currentPhoto.id}
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className={`h-full w-full object-cover ${currentPhoto.objectPos} animate-ken-burns transition-all duration-700`}
              />

              {/* Subtle Gradient Vignette for Caption Legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />

              {/* Top-Right Live Badge */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-extrabold text-cyan-300 ring-1 ring-cyan-400/40">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>{currentPhoto.badge}</span>
              </div>

              {/* Bottom Hero Portrait Caption Overlay */}
              <div className="absolute bottom-5 inset-x-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {currentPhoto.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-200 font-semibold max-w-md drop-shadow">
                    {currentPhoto.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMode('youtube')}
                  className="sm:hidden inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Reproducir Video</span>
                </button>
              </div>
            </div>

            {/* 4 Big Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-2.5">
              {HERO_DOCTOR_PHOTOS.map((photo, idx) => {
                const isSelected = idx === activePhotoIdx;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`group relative overflow-hidden rounded-2xl h-16 sm:h-20 cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 scale-[1.02]'
                        : 'opacity-60 hover:opacity-100 ring-1 ring-white/15'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="h-full w-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 2: BIG YOUTUBE VIDEO PLAYER (SONORAMA VITAL CON PAMELA PAZMIÑO) */}
        {mode === 'youtube' && (
          <div className="rounded-[2rem] bg-slate-900 p-4 sm:p-5 bg-vite-grid-dark space-y-4">
            <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video shadow-[0_0_50px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/40">
              <iframe
                key={currentHeroVideo.id}
                src={currentHeroVideo.embedUrl}
                title={currentHeroVideo.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 block">
                  {currentHeroVideo.category}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                  {currentHeroVideo.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMode('photo')}
                  className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                >
                  ← Volver a Fotos
                </button>
                <a
                  href={currentHeroVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-cyan-400 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition"
                >
                  <span>YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* 4 Episode Switchers */}
            <div className="grid grid-cols-4 gap-2.5">
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
                    <img src={vid.thumbnailUrl} alt={vid.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white fill-white drop-shadow" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 3: FACEBOOK REEL OF DRA. PAMELA PAZMIÑO */}
        {mode === 'reel' && (
          <div className="rounded-[2rem] bg-slate-900 p-4 sm:p-6 bg-vite-grid-dark">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-6 relative mx-auto w-full max-w-[270px] overflow-hidden rounded-3xl bg-black shadow-[0_0_40px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400/50 aspect-[9/16]">
                <iframe
                  src={MEDIA_ASSETS.facebookReelEmbedUrl}
                  title="Dra. Pamela Pazmiño en Sonorama Vital - Radio Sonorama Ecuador"
                  className="h-full w-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="sm:col-span-6 space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-400/30">
                  <Radio className="h-3 w-3" />
                  <span>Reel Oficial · Facebook</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                  Cuidado del Esmalte y Fracturas Dentales
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Cápsula educativa de la <strong>Dra. Pamela Pazmiño</strong> en <strong>Sonorama Vital</strong> sobre cómo proteger tus dientes frente al desgaste y bruxismo.
                </p>

                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    href={MEDIA_ASSETS.facebookReelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-cyan-400 px-4 py-3 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition"
                  >
                    <span>Abrir Reel en Facebook</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setMode('photo')}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                  >
                    <span>← Volver a Retratos de la Dra. Pame</span>
                  </button>
                </div>
              </div>
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
    <div className="rounded-[2.75rem] bg-slate-950 bg-vite-grid-dark p-6 sm:p-10 lg:p-14 text-white shadow-[0_32px_90px_-20px_rgba(6,182,212,0.38)] ring-1 ring-cyan-400/30 relative overflow-hidden space-y-10">
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
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
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
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition ring-1 ring-white/20"
          >
            <Radio className="h-4 w-4 text-cyan-400" />
            <span>Reel Facebook</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Main Cinema Row: Active YouTube Episode (8 cols) + Featured Facebook Reel (4 cols) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Main YouTube Theater (8 cols) — Direct YouTube Launch to Avoid UMPG Embed Block */}
        <div className="lg:col-span-8 rounded-[2rem] bg-slate-900/95 p-4 sm:p-6 ring-1 ring-cyan-400/30 flex flex-col justify-between space-y-4">
          <a
            href={selectedVideo.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full overflow-hidden rounded-2xl bg-black aspect-video shadow-2xl ring-1 ring-cyan-400/30"
          >
            <img
              key={selectedVideo.id}
              src={`https://i.ytimg.com/vi/${selectedVideo.id}/maxresdefault.jpg`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = selectedVideo.thumbnailUrl;
              }}
              alt={selectedVideo.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/20 group-hover:via-slate-950/20 transition-colors" />

            {/* Top-Left Live Broadcast Pill */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-extrabold text-cyan-300 ring-1 ring-cyan-400/40">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span>Sonorama Vital · Ver en YouTube</span>
            </div>

            {/* Center Glowing Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 text-slate-950 shadow-[0_0_50px_rgba(6,182,212,0.85)] group-hover:scale-110 transition-transform">
                <Play className="h-9 w-9 fill-current ml-1" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 backdrop-blur-md px-4 py-1.5 text-xs font-extrabold text-white ring-1 ring-white/20 shadow-lg">
                <span>Haz clic para reproducir directamente en YouTube</span>
                <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
              </span>
            </div>
          </a>

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
              className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition self-start shadow-md shadow-cyan-500/20"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Ver en YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right: Embedded Facebook Reel 1418801960469263 (4 cols) */}
        <div className="lg:col-span-4 rounded-[2rem] bg-slate-900/95 p-4 sm:p-5 ring-1 ring-cyan-400/30 flex flex-col items-center justify-between space-y-3">
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

          <p className="text-[11px] text-center text-slate-300">
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
              <a
                key={vid.id}
                href={vid.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedVideo(vid)}
                className={`group text-left rounded-2xl p-3 transition-all flex items-center gap-3.5 cursor-pointer hover:-translate-y-1 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950 to-slate-900 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/90 hover:bg-slate-900 ring-1 ring-white/15'
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center justify-between gap-1">
                    <span className="truncate">{vid.dateLabel}</span>
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-70 group-hover:opacity-100" />
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-2 leading-snug mt-0.5">
                    {vid.title}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Real Dental Check Clinical Cases & Clinic Gallery Bento (using real photos from Google Maps).
 */
export const InteractiveSmileAndVideoBento: React.FC<{
  onOpenBooking: (specId?: string) => void;
}> = ({ onOpenBooking }) => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const realCases = [
    {
      badge: 'Caso Clínico Real · Antes y Después',
      title: 'Diseño de Sonrisa Natural y Biomimética',
      desc: 'Restauración armónica de bordes incisales, proporción dental y luminosidad sin desgastar tejido dental sano.',
      image: MEDIA_ASSETS.realBeforeAfterSmile,
      specId: 'estetica-natural',
    },
    {
      badge: 'Planificación Digital 3D · ATM & Bruxismo',
      title: 'Férula Oclusal Digital CAD/CAM',
      desc: 'Escaneo intraoral y diseño tridimensional de dispositivos oclusales rígidos para proteger tus dientes y descomprimir la ATM.',
      image: MEDIA_ASSETS.realCadCamSplint3D,
      specId: 'atm-integral',
    },
    {
      badge: 'Laboratorio Biomimético · Alta Precisión',
      title: 'Laminados Cerámicos con Translucidez Natural',
      desc: 'Cerámica libre de metal con microtextura y degradado de color idéntico al esmalte humano.',
      image: MEDIA_ASSETS.realBiomimeticVeneers,
      specId: 'rehabilitacion-oral',
    },
    {
      badge: 'Rehabilitación Oral Integral',
      title: 'Recuperación Funcional y Estética',
      desc: 'Prótesis y rehabilitaciones adhesivas personalizadas que devuelven soporte labial y dimensión vertical.',
      image: MEDIA_ASSETS.realOralRehabProsthesis,
      specId: 'rehabilitacion-oral',
    },
  ];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveCaseIdx((prev) => (prev + 1) % realCases.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, realCases.length]);

  const currentCase = realCases[activeCaseIdx] || realCases[0];

  return (
    <div
      className="space-y-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Real Clinical Cases Interactive Showcase (7 cols) */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-[2.25rem] bg-slate-950 p-6 sm:p-8 text-white shadow-[0_24px_70px_-15px_rgba(6,182,212,0.28)] ring-1 ring-cyan-500/30 flex flex-col justify-between space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Casos Reales · Dental Check UIO</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                {currentCase.title}
              </h3>
            </div>
            <span className="rounded-full bg-cyan-400/20 px-3.5 py-1 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/30">
              {currentCase.badge}
            </span>
          </div>

          <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-3xl bg-slate-900 ring-1 ring-cyan-400/30">
            <img
              key={currentCase.image}
              src={currentCase.image}
              alt={currentCase.title}
              className="h-full w-full object-cover animate-ken-burns transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-white font-medium max-w-md drop-shadow">
                {currentCase.desc}
              </p>
              <button
                type="button"
                onClick={() => onOpenBooking(currentCase.specId)}
                className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition cursor-pointer shrink-0"
              >
                Consultar este tratamiento
              </button>
            </div>
          </div>

          {/* 4 Real Case Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {realCases.map((c, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCaseIdx(idx)}
                className={`group relative overflow-hidden rounded-2xl p-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  idx === activeCaseIdx
                    ? 'bg-cyan-400 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 text-slate-200 hover:bg-slate-800 ring-1 ring-white/15'
                }`}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-10 w-10 rounded-xl object-cover shrink-0"
                />
                <span className="text-[11px] leading-tight line-clamp-2">{c.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Real Dra. Pamela Pazmiño & Patient Experience Card (5 cols) */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-[2.25rem] bg-slate-950 text-white shadow-[0_24px_70px_-15px_rgba(6,182,212,0.28)] ring-1 ring-cyan-500/30 min-h-[440px] flex flex-col justify-between p-6 sm:p-8 group">
          <img
            src={MEDIA_ASSETS.draPameHappyPatient}
            alt="Dra. Pamela Pazmiño con paciente en Dental Check UIO"
            className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/15" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/40">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>DENTAL CHECK UIO · 5.0 ★ GOOGLE</span>
            </span>

            <a
              href={MEDIA_ASSETS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-950/85 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold text-white hover:bg-cyan-400 hover:text-slate-950 transition ring-1 ring-white/20 inline-flex items-center gap-1"
            >
              <MapPin className="h-3 w-3 text-cyan-400" />
              <span>Maps</span>
            </a>
          </div>

          <div className="relative z-10 space-y-3 pt-40">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 block">
              "{SITE_CONFIG.clinicTagline}"
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Odontología sin dolor, empática y con resultados reales.
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              En nuestro centro de <strong>Fortune Plaza · Torre Alemania</strong> cuidamos cada detalle para que te sientas en calma desde el primer minuto.
            </p>
            <button
              type="button"
              onClick={() => onOpenBooking('dental-check-integral')}
              className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 hover:from-cyan-300 hover:to-cyan-400 transition shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <span>Agendar Dental Check Integral</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Clinic Photo Strip from Google Maps (Fortune Plaza, Consultorio, Diplomas, Dra. Pame) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            src: MEDIA_ASSETS.heroDraPamela,
            tag: 'Directora Clínica · Dental Check UIO',
            label: 'Dra. Pamela Pazmiño',
          },
          {
            src: MEDIA_ASSETS.draPameClinicalUnit,
            tag: 'Equipamiento Moderno',
            label: 'Unidad Clínica Dental Check',
          },
          {
            src: MEDIA_ASSETS.draPameDiplomas,
            tag: 'Especialista & Docente UDLA',
            label: 'Respaldo Académico',
          },
          {
            src: MEDIA_ASSETS.fortunePlazaBuilding,
            tag: 'Av. Eloy Alfaro y Alemania',
            label: 'Edificio Fortune Plaza · Torre Alemania',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-3xl bg-slate-950 aspect-[4/3] ring-1 ring-slate-200/80 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
          >
            <img
              src={item.src}
              alt={item.label}
              className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-3 inset-x-3 text-white">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 block">
                {item.tag}
              </span>
              <p className="text-xs sm:text-sm font-bold leading-snug">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MinimalistAuthorityShowcase: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-cyan-400/25 via-sky-300/15 to-transparent blur-2xl" />

      <div className="relative grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* Main Portrait: Dra. Pamela Pazmiño with her University & Specialty Diplomas (7 cols) */}
        <div className="sm:col-span-7 relative overflow-hidden rounded-[2rem] bg-slate-950 min-h-[400px] shadow-xl ring-1 ring-cyan-500/25 group">
          <img
            src={MEDIA_ASSETS.draPameDiplomas}
            alt="Dra. Pamela Pazmiño junto a sus títulos de especialidad en Dental Check UIO"
            className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
          <div className="absolute bottom-4 inset-x-4 rounded-2xl bg-slate-950/90 backdrop-blur-xl p-4 ring-1 ring-cyan-400/35 text-white">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
              Especialista en Rehabilitación Oral · ATM Integral
            </span>
            <p className="text-sm font-bold mt-0.5">
              Dra. Eliana Pamela Pazmiño Troncoso · Directora Dental Check UIO
            </p>
          </div>
        </div>

        {/* Right Stack: Real Clinical Suite Photo + UDLA Science Card (5 cols) */}
        <div className="sm:col-span-5 flex flex-col gap-4">
          <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-slate-950 min-h-[210px] ring-1 ring-cyan-500/25 group">
            <img
              src={MEDIA_ASSETS.draPameClinicalUnit}
              alt="Dra. Pamela Pazmiño en el consultorio Dental Check UIO"
              className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="inline-block rounded-full bg-cyan-400 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-950">
                Dental Check UIO
              </span>
              <p className="text-xs font-bold mt-1">Tecnología y precisión clínica sin dolor</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-cyan-500 to-sky-600 p-5 text-white shadow-lg shadow-cyan-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <GraduationCap className="h-6 w-6 text-cyan-100" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                UDLA · PubMed · ORCID
              </span>
            </div>
            <div>
              <p className="text-base font-extrabold leading-snug">
                Docente Universitaria e Investigadora
              </p>
              <p className="text-xs text-cyan-50 leading-relaxed mt-1">
                {SCIENTIFIC_PUBLICATIONS.length} publicaciones indexadas (PubMed, PMC, F1000Research, MDPI, Odovtos) como <strong>Pamela Pazmiño Troncoso</strong> y <strong>Eliana Pazmiño Troncoso</strong>.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <a
                href={RESEARCHER_PROFILES.orcidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-white text-cyan-800 px-2.5 py-1 text-[10px] font-extrabold hover:bg-cyan-50 transition"
              >
                <span>ORCID {RESEARCHER_PROFILES.orcidId}</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
              <a
                href={RESEARCHER_PROFILES.researchGateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-white/20 text-white px-2.5 py-1 text-[10px] font-bold hover:bg-white/30 transition"
              >
                <span>ResearchGate</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
              <a
                href={RESEARCHER_PROFILES.sciProfilesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-white/20 text-white px-2.5 py-1 text-[10px] font-bold hover:bg-white/30 transition"
              >
                <span>SciProfiles</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
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
    atm: MEDIA_ASSETS.realCadCamSplint3D,
    bruxism: MEDIA_ASSETS.draPameClinicalUnit,
    rehab: MEDIA_ASSETS.realBiomimeticVeneers,
    esthetic: MEDIA_ASSETS.realBeforeAfterSmile,
    dentalcheck: MEDIA_ASSETS.heroDraPamela,
  };

  const posByType = {
    atm: 'object-center',
    bruxism: 'object-top',
    rehab: 'object-center',
    esthetic: 'object-center',
    dentalcheck: 'object-top',
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-50 via-sky-50/70 to-white p-5 sm:p-6 ring-1 ring-cyan-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 relative h-52 sm:h-56 overflow-hidden rounded-2xl ring-1 ring-cyan-500/20 bg-slate-950">
          <img
            src={imageByType[type]}
            alt={type}
            className={`h-full w-full object-cover ${posByType[type]} transition-transform duration-500 hover:scale-105`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-full bg-cyan-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-950">
            {type === 'atm' && 'Férula Digital 3D Real'}
            {type === 'bruxism' && 'Consultorio Dental Check'}
            {type === 'rehab' && 'Cerámica Biomimética Real'}
            {type === 'esthetic' && 'Caso Real Antes y Después'}
            {type === 'dentalcheck' && 'Dra. Pamela Pazmiño'}
          </span>
        </div>

        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between border-b border-cyan-500/15 pb-2.5">
            <span className="text-xs uppercase tracking-widest text-cyan-700 font-extrabold">
              {type === 'atm' && 'Eje Biomecánico · ATM Integral & CAD/CAM 3D'}
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
                <p className="font-bold text-cyan-700 mb-1">03 · Férula Digital 3D</p>
                <p className="text-slate-600 leading-relaxed">
                  Desprogramación neuromuscular y férulas estabilizadoras rígidas diseñadas en 3D.
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
                Valoración preventiva integral antes de ortodoncia, profilaxis ultrasónica, periodoncia, endodoncia y cirugía oral en Edificio Fortune Plaza · Torre Alemania (Av. Eloy Alfaro y Alemania).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
