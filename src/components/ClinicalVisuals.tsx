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
  Camera,
  MapPin,
} from 'lucide-react';
import { SITE_CONFIG, SONORAMA_YOUTUBE_VIDEOS, CLINIC_REAL_PHOTOS } from '../data/siteContent';

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

/**
 * Real photos from https://maps.app.goo.gl/o5sB1327LsLovAet7 (excluding old location photo 09)
 * + Real YouTube & Facebook videos of Dra. Pamela Pazmiño on Sonorama Vital.
 */
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

  // Real downloaded photos from DentalCheck Google Maps listing
  draPameCyanScrubs: '/images/clinic/dentalcheck-03.jpg',
  draPameDiplomas: '/images/clinic/dentalcheck-08.jpg',
  draPameClinicalUnit: '/images/clinic/dentalcheck-02.jpg',
  draPameHappyPatient: '/images/clinic/dentalcheck-10.jpg',
  realBeforeAfterSmile: '/images/clinic/dentalcheck-05.jpg',
  realCadCamSplint3D: '/images/clinic/dentalcheck-06.jpg',
  realBiomimeticVeneers: '/images/clinic/dentalcheck-07.jpg',
  realOralRehabProsthesis: '/images/clinic/dentalcheck-04.jpg',
  fortunePlazaBuilding: '/images/clinic/dentalcheck-01.jpg',

  // Looping HD video accents
  clinicVideoLoop:
    'https://assets.mixkit.co/videos/preview/mixkit-dentist-examining-a-patient-with-tools-44551-large.mp4',
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
      'Controlamos la sobrecarga de los músculos maseteros y temporales mediante férulas rígidas digitales 3D calibradas y biofeedback diurno.',
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

const HERO_DOCTOR_PHOTOS = [
  {
    id: 'pame-cyan',
    src: MEDIA_ASSETS.draPameCyanScrubs,
    badge: 'Directora Clínica · Dental Check UIO',
    title: 'Dra. Pamela Pazmiño',
    subtitle: 'Especialista en Rehabilitación Oral, ATM Integral y Bruxismo',
  },
  {
    id: 'pame-diplomas',
    src: MEDIA_ASSETS.draPameDiplomas,
    badge: 'Docente e Investigadora UDLA',
    title: 'Excelencia Académica y Científica',
    subtitle: 'Publicaciones internacionales en PubMed / NIH sobre dolor orofacial',
  },
  {
    id: 'pame-patient',
    src: MEDIA_ASSETS.draPameHappyPatient,
    badge: '5.0 ★ en Google Maps (36+ reseñas)',
    title: '"Nuestro mejor proyecto, Tu sonrisa"',
    subtitle: 'Atención empática, minuciosa y libre de dolor en Quito',
  },
  {
    id: 'pame-chair',
    src: MEDIA_ASSETS.draPameClinicalUnit,
    badge: 'Tecnología & Precisión',
    title: 'Consultorio Dental Check UIO',
    subtitle: 'Edificio Fortune Plaza · Torre Alemania (La Pradera / Iñaquito)',
  },
];

/**
 * High-Tech Hero Showcase combining:
 * 1. Real Photos of Dra. Pamela Pazmiño in Cyan Scrubs at Dental Check UIO
 * 2. Real YouTube Episodes of Dra. Pamela Pazmiño on Sonorama Vital (YEiBtw4KfyM + switcher)
 * 3. Real Facebook Reel (1418801960469263)
 * 4. Interactive 3D Cyan ATM Scanner + Real 3D CAD/CAM Splint
 */
export const InteractiveAtmHarmonyShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'doctora' | 'youtube' | 'reel' | 'scanner'>('doctora');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroVideoId, setHeroVideoId] = useState<string>(SONORAMA_YOUTUBE_VIDEOS[0].id);
  const [activeZoneId, setActiveZoneId] = useState<string>('atm');

  // Auto-advance Dra. Pame's real clinic photos when on the 'doctora' tab
  useEffect(() => {
    if (activeTab !== 'doctora' || isPaused) return;
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % HERO_DOCTOR_PHOTOS.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [activeTab, isPaused]);

  const activeZone = BIOMECHANICAL_ZONES.find((z) => z.id === activeZoneId) || BIOMECHANICAL_ZONES[0];
  const currentHeroVideo =
    SONORAMA_YOUTUBE_VIDEOS.find((v) => v.id === heroVideoId) || SONORAMA_YOUTUBE_VIDEOS[0];
  const currentPhoto = HERO_DOCTOR_PHOTOS[activePhotoIdx] || HERO_DOCTOR_PHOTOS[0];

  return (
    <div
      className="relative mx-auto w-full max-w-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Vite-style Cyan Neon Halo */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-80 w-80 rounded-full bg-cyan-400/35 blur-[100px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-sky-400/25 blur-[90px]" />

      {/* Outer High-Tech Glass Frame with Signature Dental Check Wooden Slat Architectural Trim */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-3.5 sm:p-4 text-white shadow-[0_32px_90px_-15px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/40">
        {/* Top Architectural Wooden Slat Ribbon */}
        <div className="h-2 w-full rounded-full bg-wood-slats mb-3 opacity-95" title="Detalle arquitectónico Dental Check UIO" />
        {/* Top Mode Switcher Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-1 pb-3">
          <div className="inline-flex flex-wrap rounded-full bg-slate-900 p-1 ring-1 ring-white/15 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('doctora')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                activeTab === 'doctora'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Camera className="h-3 w-3" />
              <span>Dra. Pame</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('youtube')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                activeTab === 'youtube'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Tv className="h-3 w-3" />
              <span>Sonorama Vital TV</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reel')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                activeTab === 'reel'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Radio className="h-3 w-3" />
              <span>Reel</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('scanner')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Activity className="h-3 w-3" />
              <span>ATM 3D</span>
            </button>
          </div>
        </div>

        {/* TAB 1: REAL PHOTOS OF DRA. PAMELA PAZMIÑO AT DENTAL CHECK UIO */}
        {activeTab === 'doctora' && (
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 bg-vite-grid-dark p-3.5 sm:p-4 space-y-3.5">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-slate-950 ring-1 ring-cyan-400/40 shadow-2xl">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className="h-full w-full object-cover object-top transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Top Cyan Badge */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-400/40">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{currentPhoto.badge}</span>
              </div>

              {/* Bottom Caption + Quick Video Trigger */}
              <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight drop-shadow">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-xs text-cyan-200 font-medium">
                    {currentPhoto.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('youtube')}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-3.5 py-2 text-[11px] font-extrabold text-slate-950 shadow-lg hover:bg-cyan-300 transition cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Ver en TV</span>
                </button>
              </div>
            </div>

            {/* 4 Real Photo Thumbnail Switchers */}
            <div className="grid grid-cols-4 gap-2">
              {HERO_DOCTOR_PHOTOS.map((photo, idx) => {
                const isSelected = idx === activePhotoIdx;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 scale-[1.02]'
                        : 'opacity-65 hover:opacity-100 ring-1 ring-white/15'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: YOUTUBE EPISODES OF DRA. PAMELA PAZMIÑO ON SONORAMA VITAL */}
        {activeTab === 'youtube' && (
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-4 sm:p-5 bg-vite-grid-dark space-y-4">
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
                  className="shrink-0 inline-flex items-center gap-1 rounded-full bg-cyan-400/20 px-3 py-1.5 text-[11px] font-bold text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition"
                >
                  <span>YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

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

        {/* TAB 3: REAL FACEBOOK REEL (Sonorama Vital - Dra. Pamela Pazmiño) */}
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
                <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-400/30">
                  <Radio className="h-3 w-3" />
                  <span>Reel Oficial · Facebook</span>
                </div>

                <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">
                  Cuidado del Esmalte y Fracturas Dentales
                </h3>

                <p className="text-xs text-slate-200 leading-relaxed">
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
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold text-cyan-300 hover:bg-white/20 transition cursor-pointer"
                  >
                    <Tv className="h-3.5 w-3.5" />
                    <span>Ver Programas YouTube →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INTERACTIVE 3D ATM SCANNER + REAL 3D CAD/CAM SPLINT */}
        {activeTab === 'scanner' && (
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-4 sm:p-5 bg-vite-grid-dark space-y-3">
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-7 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 320 270"
                  className="h-48 sm:h-52 w-full max-w-[280px] select-none"
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

              {/* Real 3D CAD/CAM Occlusal Splint Photo from DentalCheck */}
              <div className="sm:col-span-5 relative overflow-hidden rounded-2xl aspect-[3/4] ring-1 ring-cyan-400/40">
                <img
                  src={MEDIA_ASSETS.realCadCamSplint3D}
                  alt="Diseño 3D de Férula Oclusal CAD/CAM en Dental Check"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 inset-x-2.5">
                  <span className="inline-block rounded-full bg-cyan-400 px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-slate-950">
                    CAD/CAM 3D Real
                  </span>
                  <p className="text-[11px] font-bold text-white mt-1 leading-tight">
                    Férula Oclusal Digital para ATM y Bruxismo
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                        : 'bg-slate-950/80 text-cyan-100 hover:bg-slate-800 ring-1 ring-white/15'
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

            <div className="relative z-10 rounded-2xl bg-slate-950/95 p-4 ring-1 ring-cyan-400/30">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  {activeZone.code} · {activeZone.label}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('doctora')}
                  className="text-[11px] text-cyan-300 hover:underline cursor-pointer"
                >
                  ← Ver Fotos Dra. Pame
                </button>
              </div>
              <h3 className="text-base font-bold text-white">{activeZone.title}</h3>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{activeZone.detail}</p>
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
        {/* Main YouTube Theater (8 cols) */}
        <div className="lg:col-span-8 rounded-[2rem] bg-slate-900/95 p-4 sm:p-6 ring-1 ring-cyan-400/30 flex flex-col justify-between space-y-4">
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
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-4 py-2 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/30 hover:bg-cyan-400 hover:text-slate-950 transition self-start"
            >
              <span>Abrir en YouTube</span>
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
              <button
                key={vid.id}
                type="button"
                onClick={() => setSelectedVideo(vid)}
                className={`group text-left rounded-2xl p-3 transition-all flex items-center gap-3.5 cursor-pointer ${
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
    }, 5200);
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
          <div className="absolute top-0 inset-x-0 h-2 bg-wood-slats opacity-95" />
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
              src={currentCase.image}
              alt={currentCase.title}
              className="h-full w-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
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
        <div className="lg:col-span-5 relative overflow-hidden rounded-[2.25rem] bg-slate-950 text-white shadow-[0_24px_70px_-15px_rgba(6,182,212,0.28)] ring-1 ring-cyan-500/30 min-h-[440px] flex flex-col justify-between p-6 sm:p-8">
          <img
            src={MEDIA_ASSETS.draPameHappyPatient}
            alt="Dra. Pamela Pazmiño con paciente en Dental Check UIO"
            className="absolute inset-0 h-full w-full object-cover object-top"
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
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 hover:from-cyan-300 hover:to-cyan-400 transition shadow-lg shadow-cyan-500/25 cursor-pointer"
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
            src: MEDIA_ASSETS.draPameCyanScrubs,
            tag: 'Recepción Dental Check',
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
            className="group relative overflow-hidden rounded-3xl bg-slate-950 aspect-[4/3] ring-1 ring-slate-200/80 shadow-md"
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

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-500 to-sky-600 p-5 pl-7 text-white shadow-lg shadow-cyan-500/20 space-y-2">
            {/* Architectural Vertical Wooden Slat Side Strip */}
            <div className="absolute inset-y-0 left-0 w-3 bg-wood-slats" />
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
    atm: MEDIA_ASSETS.realCadCamSplint3D,
    bruxism: MEDIA_ASSETS.draPameClinicalUnit,
    rehab: MEDIA_ASSETS.realBiomimeticVeneers,
    esthetic: MEDIA_ASSETS.realBeforeAfterSmile,
    dentalcheck: MEDIA_ASSETS.draPameCyanScrubs,
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-50 via-sky-50/70 to-white p-5 sm:p-6 ring-1 ring-cyan-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 relative h-48 sm:h-52 overflow-hidden rounded-2xl ring-1 ring-cyan-500/20 bg-slate-950">
          <img
            src={imageByType[type]}
            alt={type}
            className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
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
