import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ShieldCheck,
  Crown,
  Sparkles,
  Stethoscope,
  Calendar,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MapPin,
  Star,
  ExternalLink,
  Phone,
  Radio,
} from 'lucide-react';
import {
  SITE_CONFIG,
  EMPATHY_SYMPTOMS,
  SPECIALTIES,
  FREE_GUIDE_CONTENT,
  BLOG_POSTS,
  INSTAGRAM_SHOWCASE,
  TESTIMONIALS,
  SCIENTIFIC_PUBLICATIONS,
  RESEARCHER_PROFILES,
} from '../data/siteContent';
import {
  ViteCyanCanvas,
  InteractiveSmileAndVideoBento,
  SonoramaVitalMediaHub,
  MinimalistAuthorityShowcase,
  InstagramIcon as Instagram,
} from '../components/ClinicalVisuals';
import { AtmQuizContent } from '../components/AtmQuizModal';
import { useCms } from '../context/CmsContext';

interface HomePageProps {
  onOpenBooking: (specialtyId?: string, note?: string) => void;
  onOpenGuide: () => void;
}

const iconMap = {
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Crown: Crown,
  Sparkles: Sparkles,
  Stethoscope: Stethoscope,
};

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking, onOpenGuide }) => {
  const { cmsData } = useCms();
  const { hero } = cmsData;

  return (
    <div className="space-y-28 pb-24">
      {/* 1. ENDLESS WOOD + CYAN GLASS HERO WITH 9:16 FULL-FRAME HERO VIDEO */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16">
        {/* Interactive 60fps Cyan Energy Beam & Bio-Node Canvas */}
        <ViteCyanCanvas className="absolute inset-0 h-full w-full" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Clean Hero Typography over Endless Wood & Cyan Canvas (7 cols) */}
            <div className="lg:col-span-7 rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-7 sm:p-10 lg:p-12 shadow-[0_24px_70px_-15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/40 space-y-6 z-20">
              {/* Top Brand Row with Official DentalCheck Logo + Live Pill */}
              <div className="animate-hero-up-1 flex flex-wrap items-center justify-between gap-3">
                <img
                  src="/images/clinic/dentalcheck-logo.png"
                  alt="DentalCheck · El mejor proyecto, tu sonrisa"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1.5 text-xs font-extrabold text-cyan-800 ring-1 ring-cyan-500/30">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-ping" />
                  <span>{hero.badge}</span>
                </div>
              </div>

              <h1 className="animate-hero-up-2 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.06] tracking-tight">
                {hero.titlePrefix}{' '}
                <span className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-600 bg-clip-text text-transparent animate-cyan-beam">
                  {hero.titleHighlight}
                </span>{' '}
                {hero.titleSuffix}
              </h1>

              <p className="animate-hero-up-3 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                {hero.description}
              </p>

              {/* Floating Minimalist Capability Pills */}
              <div className="animate-hero-up-3 flex flex-wrap gap-2 pt-1">
                {[
                  { label: 'ATM Integral & Dolor Orofacial', icon: Activity },
                  { label: 'Bruxismo (Sueño y Vigilia)', icon: ShieldCheck },
                  { label: 'Rehabilitación Biomimética', icon: Crown },
                  { label: 'Sonorama Vital · Divulgación', icon: Radio },
                ].map((pill, i) => {
                  const Icon = pill.icon;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs ring-1 ring-cyan-500/25 hover:ring-cyan-400 transition-all"
                    >
                      <Icon className="h-3.5 w-3.5 text-cyan-500" />
                      {pill.label}
                    </span>
                  );
                })}
              </div>

              {/* Primary Pill CTAs with Shimmer Sweep */}
              <div className="animate-hero-up-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking('atm-integral')}
                  className="btn-shimmer inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-4 text-sm font-extrabold text-white shadow-[0_16px_40px_-8px_rgba(6,182,212,0.55)] hover:from-cyan-400 hover:to-cyan-500 hover:scale-[1.03] transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{hero.primaryCtaText}</span>
                </button>

                <a
                  href="#sonorama-vital-hub"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-sm font-bold text-white shadow-md hover:bg-cyan-600 hover:scale-[1.02] transition-all"
                >
                  <Radio className="h-4 w-4 text-cyan-400" />
                  <span>{hero.secondaryCtaText}</span>
                </a>
              </div>

              {/* Quick Location & Social Links */}
              <div className="animate-hero-up-4 pt-2 flex flex-wrap items-center gap-3.5 text-xs text-slate-600">
                <a
                  href={SITE_CONFIG.address.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-slate-800 hover:text-cyan-600 transition"
                >
                  <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                  <span>{SITE_CONFIG.address.street}</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={SITE_CONFIG.social.instagramPersonal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-cyan-600 transition"
                >
                  <Instagram className="h-3.5 w-3.5 text-cyan-500" />
                  <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
                </a>
                <span className="text-slate-300">•</span>
                <a
                  href={SITE_CONFIG.social.instagramClinic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-cyan-600 transition"
                >
                  <Instagram className="h-3.5 w-3.5 text-cyan-500" />
                  <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
                </a>
              </div>
            </div>

            {/* Right Column: PURE 9:16 HERO VIDEO (No Fake Navy Pseudo-Background, Exact Aspect Ratio) (5 cols) */}
            <div className="lg:col-span-5 flex items-center justify-center order-first lg:order-last">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-[0_32px_90px_-15px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/70 animate-hero-right">
                <video
                  key={hero.videoUrl}
                  src={hero.videoUrl}
                  poster={hero.posterUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* High-Tech Animated Kinetic Marquee Pill (Centered so Endless Background Never Breaks) */}
          <div className="relative z-20 mt-12 rounded-full border border-cyan-500/25 bg-white/80 backdrop-blur-md py-3.5 px-4 shadow-sm overflow-hidden">
            <div className="animate-marquee flex items-center gap-10 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-700">
              {[
                'ATM Integral & Eje Cráneo-Cervical',
                'Bruxismo del Sueño y Vigilia',
                'Rehabilitación Oral Biomimética',
                'Diseño de Sonrisa Natural sin Desgaste',
                'Dental Check UIO · Av. Eloy Alfaro y Alemania (Fortune Plaza)',
                'Sonorama Vital · Radio Sonorama Ecuador',
                'Investigación Científica UDLA · PubMed',
                'ATM Integral & Eje Cráneo-Cervical',
                'Bruxismo del Sueño y Vigilia',
                'Rehabilitación Oral Biomimética',
                'Diseño de Sonrisa Natural sin Desgaste',
                'Dental Check UIO · Av. Eloy Alfaro y Alemania (Fortune Plaza)',
                'Sonorama Vital · Radio Sonorama Ecuador',
                'Investigación Científica UDLA · PubMed',
              ].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-3 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SONORAMA VITAL MEDIA THEATER (All 14 YouTube Videos + Facebook Reel) */}
      <section id="sonorama-vital-hub" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <SonoramaVitalMediaHub />
      </section>

      {/* 3. INTERACTIVE SMILE SLIDER & LOOPING CLINICAL VIDEO BENTO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InteractiveSmileAndVideoBento onOpenBooking={(specId) => onOpenBooking(specId)} />
      </section>

      {/* 4. MINIMALIST SYMPTOM IDENTIFICATION ("¿Te identificas con alguno de estos signos?") */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-600">
              Diagnóstico con Sentido Clínico
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              ¿Reconoces alguno de estos síntomas en tu día a día?
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md leading-relaxed">
            El dolor articular, las cefaleas matutinas y el desgaste dental silencioso tienen tratamiento conservador cuando se evalúa el origen biomecánico real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EMPATHY_SYMPTOMS.map((item, idx) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-[2rem] bg-white hover:bg-gradient-to-br hover:from-cyan-50/90 hover:to-white p-7 pl-10 transition-all duration-300 ring-1 ring-slate-200/80 hover:ring-cyan-400 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-15px_rgba(6,182,212,0.22)] flex flex-col justify-between"
            >
              {/* Real Architectural Wood Slats + Cyan Glass Left Strip */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-cover bg-left border-r border-cyan-400/50 shadow-[2px_0_12px_rgba(6,182,212,0.25)]"
                style={{ backgroundImage: "url('/images/clinic/wood-cyan-strip.jpg')" }}
              />
              {/* Subtle Diagonal Cyan Glass Shard on Card Bottom-Left */}
              <div className="pointer-events-none absolute -left-8 bottom-6 h-8 w-28 -rotate-35 bg-gradient-to-r from-cyan-400/25 via-white/30 to-transparent border-y border-cyan-300/40" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-500/10 px-3.5 py-1 text-[11px] font-bold text-cyan-700">
                    {item.badge}
                  </span>
                  <span className="text-xs font-extrabold text-cyan-500/40">0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-6 mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onOpenBooking(item.recommendedSpecialty, `Consulta sobre: ${item.title}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 group-hover:text-cyan-700 cursor-pointer"
                >
                  <span>Agendar valoración</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to={`/especialidades#${item.recommendedSpecialty}`}
                  className="text-xs font-medium text-slate-400 hover:text-cyan-600 transition"
                >
                  Protocolo →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BENTO GRID OF 5 CLINICAL SPECIALTIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.75rem] bg-slate-950 bg-vite-grid-dark p-7 sm:p-12 lg:p-16 pl-10 sm:pl-16 lg:pl-20 text-white shadow-[0_32px_90px_-20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/40 relative overflow-hidden">
          {/* Real Architectural Wood Slats + Cyan Glass Left Column */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-4 sm:w-7 bg-cover bg-left border-r border-cyan-400/60 shadow-[4px_0_24px_rgba(6,182,212,0.4)]"
            style={{ backgroundImage: "url('/images/clinic/wood-cyan-strip.jpg')" }}
          />
          <div className="pointer-events-none absolute -top-24 right-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-400">
                Especialidades Clínicas
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Precisión biomecánica y estética biológica.
              </h2>
            </div>

            <Link
              to="/especialidades"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-6 py-3 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/35 hover:bg-cyan-400 hover:text-slate-950 transition self-start"
            >
              <span>Ver protocolos detallados</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPECIALTIES.map((spec, idx) => {
              const IconComponent = iconMap[spec.iconName] || Activity;
              const isFeatured = idx === 0;
              return (
                <div
                  key={spec.id}
                  className={`rounded-[2rem] p-7 flex flex-col justify-between transition-all ${
                    isFeatured
                      ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-cyan-950/95 via-slate-900/95 to-slate-900/90 ring-2 ring-cyan-400/50 shadow-[0_20px_50px_-15px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/90 hover:bg-slate-900 ring-1 ring-cyan-400/25 hover:ring-cyan-400/60 shadow-lg'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-[11px] font-bold text-cyan-300 ring-1 ring-cyan-400/30">
                        {spec.badge}
                      </span>
                      <span className="text-[11px] text-cyan-200/80 font-semibold">{spec.brandTag}</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          {spec.title}
                        </h3>
                        <p className="text-xs text-cyan-300 font-semibold mt-0.5">{spec.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed">{spec.shortDescription}</p>

                    <div className="pt-2 space-y-2">
                      {spec.procedures.slice(0, isFeatured ? 3 : 2).map((proc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-cyan-100 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>{proc.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(spec.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition cursor-pointer shadow-md shadow-cyan-500/20"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Agendar cita</span>
                    </button>

                    <Link
                      to={`/especialidades#${spec.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-white transition"
                    >
                      <span>Explorar</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SCIENTIFIC & CLINICAL AUTHORITY + VERIFIED PUBLICATIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-600">
              Ciencia, Docencia e Investigación (UDLA)
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {SITE_CONFIG.doctorFullName}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Cada diagnóstico en <strong className="text-slate-900">Dental Check UIO</strong> integra la práctica clínica en <strong className="text-slate-900">Rehabilitación Oral y ATM Integral</strong> con la investigación científica activa en la Facultad de Odontología de la <strong className="text-slate-900">Universidad de Las Américas (UDLA)</strong>, publicando en bases científicas internacionales bajo <strong className="text-slate-900">Pamela Pazmiño Troncoso</strong> y <strong className="text-slate-900">Eliana Pazmiño Troncoso</strong>.
            </p>

            {/* Researcher Identifiers Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={RESEARCHER_PROFILES.orcidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3.5 py-1.5 text-xs font-extrabold text-cyan-800 ring-1 ring-cyan-500/25 hover:bg-cyan-100 transition"
              >
                <span>ORCID: {RESEARCHER_PROFILES.orcidId}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={RESEARCHER_PROFILES.researchGateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200 hover:ring-cyan-400 hover:text-cyan-700 transition"
              >
                <span>ResearchGate</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={RESEARCHER_PROFILES.sciProfilesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200 hover:ring-cyan-400 hover:text-cyan-700 transition"
              >
                <span>MDPI SciProfiles</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/sobre-mi"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-xs font-bold text-white hover:bg-cyan-600 transition"
              >
                <span>Ver las 4 publicaciones y red científica</span>
                <ArrowRight className="h-4 w-4 text-cyan-400" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenBooking('atm-integral')}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-6 py-3.5 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-cyan-500" />
                <span>Reservar Valoración</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <MinimalistAuthorityShowcase />
          </div>
        </div>

        {/* 4 Verified Peer-Reviewed Publications Grid */}
        <div className="rounded-[2.25rem] bg-white/90 backdrop-blur-md p-6 sm:p-9 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.14)] ring-1 ring-cyan-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-600 block">
                Evidencia Científica Verificada · UDLA
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Publicaciones Indexadas en Bruxismo, Dolor Orofacial y TTM
              </h3>
            </div>
            <Link
              to="/sobre-mi"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-700 hover:text-cyan-900"
            >
              <span>Ver coautores e identificadores</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SCIENTIFIC_PUBLICATIONS.map((pub) => (
              <div
                key={pub.id}
                className="rounded-3xl bg-slate-50/90 p-5 sm:p-6 ring-1 ring-slate-200/80 hover:ring-cyan-400 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-0.5 text-[11px] font-extrabold text-cyan-800">
                      {pub.journal} ({pub.year})
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Autora: {pub.publishedAs}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                    {pub.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{pub.focus}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex flex-wrap gap-2">
                  {pub.links.map((lnk, i) => (
                    <a
                      key={i}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-cyan-700 ring-1 ring-cyan-500/25 hover:bg-cyan-500 hover:text-white transition"
                    >
                      <span>{lnk.label}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE SELF-ASSESSMENT & FREE E-BOOK */}
      <section id="test-atm-interactivo" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <AtmQuizContent
              onOpenBookingWithNote={(specId, note) => onOpenBooking(specId, note)}
            />
          </div>

          <div className="lg:col-span-5 rounded-[2.25rem] bg-gradient-to-br from-cyan-500 via-cyan-600 to-sky-700 p-7 sm:p-9 text-white shadow-[0_24px_60px_-15px_rgba(6,182,212,0.4)] space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
              <BookOpen className="h-3.5 w-3.5" />
              <span>E-Book Gratuito para Pacientes</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                {FREE_GUIDE_CONTENT.title}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-50 leading-relaxed">
                {FREE_GUIDE_CONTENT.subtitle}
              </p>
            </div>

            <div className="rounded-3xl bg-white/12 backdrop-blur-md p-5 space-y-2.5 text-xs text-white">
              <p className="font-extrabold uppercase tracking-wider text-cyan-100">
                Capítulos incluidos:
              </p>
              {FREE_GUIDE_CONTENT.chapters.map((ch) => (
                <div key={ch.number} className="flex items-start gap-2.5">
                  <span className="font-extrabold text-cyan-200">{ch.number}.</span>
                  <span>{ch.title}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenGuide}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-700 hover:bg-cyan-50 transition shadow-lg cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Abrir y Descargar Guía (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM DUAL SHOWCASE (@drapamelapazmino & @dentalcheck.uio) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-600">
              Comunidad Digital
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Síguenos en Instagram
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href={SITE_CONFIG.social.instagramPersonal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-cyan-600 transition shadow-sm shadow-cyan-500/20"
            >
              <Instagram className="h-4 w-4" />
              <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
            <a
              href={SITE_CONFIG.social.instagramClinic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-5 py-2.5 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition"
            >
              <Instagram className="h-4 w-4 text-cyan-500" />
              <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INSTAGRAM_SHOWCASE.map((post) => (
            <a
              key={post.id}
              href={post.accountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[2rem] bg-white p-5 ring-1 ring-slate-200/80 hover:ring-cyan-400 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-15px_rgba(6,182,212,0.22)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 inline-flex items-center gap-1.5">
                    <Instagram className="h-3.5 w-3.5 text-cyan-500" />
                    {post.account}
                  </span>
                  <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold text-cyan-700">
                    {post.format}
                  </span>
                </div>

                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-slate-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-extrabold block">
                      {post.badge}
                    </span>
                    <h3 className="text-sm font-bold mt-0.5 leading-snug">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{post.caption}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
                <span>Abrir en Instagram</span>
                <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 9. PATIENT TESTIMONIALS (REAL GOOGLE MAPS REVIEWS) & BLOG PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-600">
                36+ Reseñas Verificadas en Google Maps · 5.0 ★
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Lo que dicen nuestros pacientes sobre la Dra. Pame
              </h2>
            </div>
            <a
              href={SITE_CONFIG.address.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-5 py-2.5 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition self-start"
            >
              <Star className="h-3.5 w-3.5 fill-cyan-500 text-cyan-500" />
              <span>Ver todas las reseñas en Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="rounded-[2rem] bg-white p-7 shadow-xs ring-1 ring-cyan-500/15 hover:ring-cyan-400 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-cyan-500">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-cyan-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                      Google Maps
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">"{t.quote}"</p>
                </div>

                <div className="pt-4 border-t border-cyan-500/10">
                  <p className="text-sm font-extrabold text-slate-900">{t.name}</p>
                  <p className="text-xs font-medium text-cyan-700">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Preview */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-600">
                Lecturas Clínicas
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                Artículos sobre ATM Integral y Bruxismo
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-600 hover:text-cyan-700"
            >
              <span>Ver todos ({BLOG_POSTS.length})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group rounded-[2rem] bg-white p-7 ring-1 ring-slate-200/80 hover:ring-cyan-400 hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.16)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="rounded-full bg-cyan-50 px-3 py-1 font-bold text-cyan-700">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
                  <span>Leer artículo</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. MINIMALIST CYAN CALL TO ACTION BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-cyan-500 via-cyan-600 to-sky-600 p-8 sm:p-12 text-white shadow-[0_28px_70px_-15px_rgba(6,182,212,0.45)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-white">
              <MapPin className="h-3.5 w-3.5" />
              <span>Quito · {SITE_CONFIG.clinicName} ({SITE_CONFIG.address.street})</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Agenda tu valoración con la Dra. Pamela Pazmiño
            </h2>
            <p className="text-sm sm:text-base text-cyan-50 leading-relaxed max-w-2xl">
              Atención personalizada en <strong>Edificio Fortune Plaza · Torre Alemania</strong> (Av. Eloy Alfaro esq. y Alemania, Sector La Pradera). WhatsApp directo{' '}
              <strong>{SITE_CONFIG.whatsappDisplay}</strong>.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onOpenBooking('atm-integral')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-extrabold text-cyan-700 hover:bg-cyan-50 transition shadow-lg cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Reservar por WhatsApp</span>
            </button>
            <a
              href={SITE_CONFIG.address.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/25 transition"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Ver Ubicación en Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
