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
} from '../data/siteContent';
import {
  ViteCyanCanvas,
  InteractiveAtmHarmonyShowcase,
  SonoramaVitalMediaHub,
  InteractiveSmileAndVideoBento,
  MinimalistAuthorityShowcase,
  InstagramIcon as Instagram,
} from '../components/ClinicalVisuals';
import { AtmQuizContent } from '../components/AtmQuizModal';

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
  return (
    <div className="space-y-28 pb-24">
      {/* 1. VITE-INSPIRED ANIMATED HIGH-TECH MINIMALIST CYAN HERO */}
      <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-24 bg-vite-grid">
        {/* Interactive 60fps Cyan Energy Beam & Bio-Node Canvas */}
        <ViteCyanCanvas className="absolute inset-0 h-full w-full" />

        {/* Ambient Cyan Mesh Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-cyan-300/30 blur-[140px]" />
        <div className="pointer-events-none absolute top-20 right-0 h-[440px] w-[440px] rounded-full bg-sky-300/25 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: High-Tech Minimalist Typography (7 cols) */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-extrabold text-cyan-700 shadow-sm ring-1 ring-cyan-500/25">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <span>Dra. Pamela Pazmiño · Dental Check UIO · Sonorama Vital</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[4.15rem] font-extrabold text-slate-900 leading-[1.04] tracking-tight">
                Ciencia y tecnología para{' '}
                <span className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-600 bg-clip-text text-transparent animate-cyan-beam">
                  liberar tu ATM
                </span>{' '}
                y rehabilitar tu sonrisa.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Soy la <strong className="text-slate-900 font-bold">{SITE_CONFIG.doctorFullName}</strong>, especialista en{' '}
                <strong className="text-slate-900 font-bold">Rehabilitación Oral, ATM Integral, Bruxismo y Dolor Orofacial</strong>, docente e investigadora universitaria (UDLA) y conductora de <strong className="text-cyan-700 font-bold">Sonorama Vital</strong>.
              </p>

              {/* Floating Minimalist Capability Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
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
                      className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs ring-1 ring-cyan-500/15"
                    >
                      <Icon className="h-3.5 w-3.5 text-cyan-500" />
                      {pill.label}
                    </span>
                  );
                })}
              </div>

              {/* Primary Pill CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking('atm-integral')}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-4 text-sm font-extrabold text-white shadow-[0_16px_40px_-8px_rgba(6,182,212,0.55)] hover:from-cyan-400 hover:to-cyan-500 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Agendar Valoración en Quito</span>
                </button>

                <a
                  href="#sonorama-vital-hub"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-sm font-bold text-white shadow-md hover:bg-cyan-600 transition"
                >
                  <Radio className="h-4 w-4 text-cyan-400" />
                  <span>Ver Videos Sonorama Vital</span>
                </a>
              </div>

              {/* Quick Location & Social Links */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <a
                  href={SITE_CONFIG.address.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-cyan-600 transition"
                >
                  <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                  <span>{SITE_CONFIG.address.street} · Dental Check UIO</span>
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

            {/* Right Column: Live YouTube + Facebook Reel + 3D ATM Scanner HUD (5 cols) */}
            <div className="lg:col-span-5">
              <InteractiveAtmHarmonyShowcase />
            </div>
          </div>
        </div>

        {/* High-Tech Animated Kinetic Marquee Bar */}
        <div className="relative z-10 mt-16 border-y border-cyan-500/15 bg-white/80 backdrop-blur-md py-3.5 overflow-hidden">
          <div className="animate-marquee flex items-center gap-10 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-600">
            {[
              'ATM Integral & Eje Cráneo-Cervical',
              'Bruxismo del Sueño y Vigilia',
              'Rehabilitación Oral Biomimética',
              'Diseño de Sonrisa Natural sin Desgaste',
              'Dental Check UIO · Av. La Coruña',
              'Sonorama Vital · Radio Sonorama Ecuador',
              'Investigación Científica UDLA · PubMed',
              'ATM Integral & Eje Cráneo-Cervical',
              'Bruxismo del Sueño y Vigilia',
              'Rehabilitación Oral Biomimética',
              'Diseño de Sonrisa Natural sin Desgaste',
              'Dental Check UIO · Av. La Coruña',
              'Sonorama Vital · Radio Sonorama Ecuador',
              'Investigación Científica UDLA · PubMed',
            ].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-3 whitespace-nowrap">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>{item}</span>
              </span>
            ))}
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
              className="group relative overflow-hidden rounded-[2rem] bg-white hover:bg-gradient-to-br hover:from-cyan-50/90 hover:to-white p-7 transition-all duration-300 ring-1 ring-slate-200/80 hover:ring-cyan-400 hover:shadow-[0_24px_60px_-15px_rgba(6,182,212,0.22)] flex flex-col justify-between"
            >
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
        <div className="rounded-[2.75rem] bg-gradient-to-b from-cyan-950 via-slate-900 to-slate-950 p-7 sm:p-12 lg:p-16 text-white shadow-[0_32px_90px_-20px_rgba(6,182,212,0.28)] relative overflow-hidden bg-vite-grid-dark">
          <div className="pointer-events-none absolute -top-24 right-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

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
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-cyan-400 hover:text-slate-950 transition self-start"
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
                      ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-cyan-500/20 via-cyan-900/30 to-white/5 ring-1 ring-cyan-400/40'
                      : 'bg-white/6 hover:bg-white/10 ring-1 ring-white/10 hover:ring-cyan-400/30'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-[11px] font-bold text-cyan-300">
                        {spec.badge}
                      </span>
                      <span className="text-[11px] text-cyan-100/60 font-medium">{spec.brandTag}</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          {spec.title}
                        </h3>
                        <p className="text-xs text-cyan-300 font-medium mt-0.5">{spec.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{spec.shortDescription}</p>

                    <div className="pt-2 space-y-1.5">
                      {spec.procedures.slice(0, isFeatured ? 3 : 2).map((proc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-cyan-100/90">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>{proc.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(spec.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition cursor-pointer"
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

      {/* 6. SCIENTIFIC & CLINICAL AUTHORITY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-600">
              Ciencia, Docencia y Práctica Clínica
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {SITE_CONFIG.doctorFullName}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Cada diagnóstico en <strong className="text-slate-900">Dental Check UIO</strong> integra la experiencia clínica en <strong className="text-slate-900">Rehabilitación Oral y ATM Integral</strong> con la investigación científica activa en la Carrera de Odontología de la <strong className="text-slate-900">Universidad de Las Américas (UDLA)</strong> y la comunicación en salud en <strong className="text-cyan-700">Sonorama Vital</strong>.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Nuestro objetivo es claro: aliviar el dolor orofacial, detener el desgaste por bruxismo y diseñar sonrisas armónicas con la mínima intervención biológica posible.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/sobre-mi"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-xs font-bold text-white hover:bg-cyan-600 transition"
              >
                <span>Conocer enfoque e investigación</span>
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
              className="group rounded-[2rem] bg-white p-6 ring-1 ring-slate-200/80 hover:ring-cyan-400 hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.18)] transition-all flex flex-col justify-between"
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

                <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-cyan-100 font-bold block">
                    {post.badge}
                  </span>
                  <h3 className="text-base font-bold mt-1 leading-snug">
                    {post.title}
                  </h3>
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

      {/* 9. PATIENT TESTIMONIALS & BLOG PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        <div>
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-600">
              Experiencias Reales
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Historias de alivio articular y armonía dental
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="rounded-[2rem] bg-white p-7 shadow-xs ring-1 ring-cyan-500/15 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-cyan-500">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-cyan-400" />
                    ))}
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
              Atención personalizada en el sector Iñaquito / La Coruña. WhatsApp directo{' '}
              <strong>{SITE_CONFIG.whatsappDisplay}</strong> o teléfono fijo <strong>{SITE_CONFIG.landlineDisplay}</strong>.
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
