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
  Award,
  Phone,
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
import { DoctorEditorialPortrait, InstagramIcon as Instagram } from '../components/ClinicalVisuals';
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
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION (Editorial Clinical Luxury like davidjaramillo.org) */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 bg-gradient-to-b from-[#EBF2F0]/70 via-[#FAF8F5] to-[#FAF8F5] border-b border-[#0F3D3E]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Core Value Proposition (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#0F3D3E] shadow-xs border border-[#0F3D3E]/15">
                <span className="h-2 w-2 rounded-full bg-[#C5A059]" />
                <span>Rehabilitación Oral · ATM Integral · Bruxismo · Dental Check Quito</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0F3D3E] leading-[1.08] tracking-tight">
                Ciencia, precisión y calidez para devolver la{' '}
                <span className="italic text-[#134E4A] underline decoration-[#C5A059]/60 decoration-2 underline-offset-8">
                  calma a tu mandíbula
                </span>{' '}
                y la armonía a tu sonrisa.
              </h1>

              <p className="text-base sm:text-lg text-[#334745] leading-relaxed max-w-2xl">
                Soy la <strong>{SITE_CONFIG.doctorFullName}</strong>, odontóloga especialista en{' '}
                <strong>Rehabilitación Oral</strong>, manejo clínico de <strong>ATM Integral, Bruxismo y Dolor Orofacial</strong>, docente e investigadora universitaria. En nuestro centro{' '}
                <strong>{SITE_CONFIG.clinicName}</strong> en Quito te brindamos un diagnóstico honesto, conservador y basado en evidencia científica.
              </p>

              {/* Key Trust Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-xs border border-[#0F3D3E]/10">
                  <Activity className="h-5 w-5 text-[#C5A059] shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-[#0F3D3E]">ATM Integral y Bruxismo</p>
                    <p className="text-[#4A5D5B]">Alivio articular y cráneo-cervical</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-xs border border-[#0F3D3E]/10">
                  <Crown className="h-5 w-5 text-[#C5A059] shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-[#0F3D3E]">Rehabilitación Biomimética</p>
                    <p className="text-[#4A5D5B]">Estética y función sin desgaste</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-xs border border-[#0F3D3E]/10">
                  <Stethoscope className="h-5 w-5 text-[#C5A059] shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-[#0F3D3E]">Dental Check UIO</p>
                    <p className="text-[#4A5D5B]">Av. La Coruña y Fco. de Orellana</p>
                  </div>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking('atm-integral')}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#0F3D3E] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#134E4A] transition cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-[#C5A059]" />
                  <span>Agendar Cita de Valoración</span>
                </button>

                <a
                  href="#test-atm-interactivo"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#0F3D3E]/25 bg-white px-6 py-4 text-sm font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition"
                >
                  <Activity className="h-4 w-4 text-[#C5A059]" />
                  <span>Realizar Test de ATM y Bruxismo</span>
                </a>
              </div>

              {/* Quick Social & Location Proof */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#4A5D5B]">
                <a
                  href={SITE_CONFIG.address.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[#0F3D3E] hover:underline"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span>Quito · Sector Iñaquito ({SITE_CONFIG.address.street})</span>
                </a>
                <span>•</span>
                <a
                  href={SITE_CONFIG.social.instagramPersonal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#0F3D3E] hover:underline"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
                </a>
                <span>•</span>
                <a
                  href={SITE_CONFIG.social.instagramClinic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#0F3D3E] hover:underline"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Editorial Specialist Portrait (5 cols) */}
            <div className="lg:col-span-5">
              <DoctorEditorialPortrait variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. EMPATHY SYMPTOM IDENTIFICATION ("¿Te identificas con alguno de estos signos?" like davidjaramillo.org) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#0F3D3E]">
            Escucha Clínica Activa
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F3D3E]">
            ¿Te identificas con alguna de estas situaciones?
          </h2>
          <p className="text-sm sm:text-base text-[#4A5D5B] leading-relaxed">
            El dolor mandibular, el desgaste dental y la inseguridad al sonreír no deberían normalizarse. Identificar la causa real es el primer paso hacia un tratamiento conservador y duradero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMPATHY_SYMPTOMS.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl border border-[#0F3D3E]/10 hover:border-[#0F3D3E]/30 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block rounded-full bg-[#EBF2F0] px-3 py-1 text-[11px] font-semibold text-[#0F3D3E]">
                  {item.badge}
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#182625] group-hover:text-[#0F3D3E] transition">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4A5D5B] leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#0F3D3E]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onOpenBooking(item.recommendedSpecialty, `Consulta sobre: ${item.title}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F3D3E] group-hover:text-[#134E4A] cursor-pointer"
                >
                  <span>Consultar este caso</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to={`/especialidades#${item.recommendedSpecialty}`}
                  className="text-xs text-[#4A5D5B] hover:text-[#0F3D3E] underline"
                >
                  Ver protocolo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE SPECIALTIES & ATM INTEGRAL SHOWCASE */}
      <section className="bg-[#0F3D3E] text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                Áreas de Intervención Clínica
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
                Especialidades diseñadas para cuidar tu función y tu estética
              </h2>
              <p className="text-sm sm:text-base text-[#D5E5E2]/90 leading-relaxed">
                Integramos la alta especialidad en Rehabilitación Oral y ATM Integral de la Dra. Pamela Pazmiño con la atención odontológica preventiva y multidisciplinaria de Dental Check UIO.
              </p>
            </div>

            <Link
              to="/especialidades"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#C5A059] hover:text-[#0A292A] transition self-start"
            >
              <span>Explorar todas las especialidades</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map((spec, idx) => {
              const IconComponent = iconMap[spec.iconName] || Activity;
              const isFeatured = idx === 0;
              return (
                <div
                  key={spec.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between transition border ${
                    isFeatured
                      ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#134E4A] to-[#0A292A] border-[#C5A059]/50 shadow-2xl'
                      : 'bg-white/6 border-white/12 hover:border-[#C5A059]/40'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#C5A059]/20 px-3 py-1 text-[11px] font-semibold text-[#C5A059] border border-[#C5A059]/30">
                        {spec.badge}
                      </span>
                      <span className="text-[11px] text-[#D5E5E2]/75 font-medium">{spec.brandTag}</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C5A059] text-[#0A292A]">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-white">
                          {spec.title}
                        </h3>
                        <p className="text-xs text-[#C5A059] font-medium mt-0.5">{spec.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-[#E6F0EE]/90 leading-relaxed">{spec.shortDescription}</p>

                    <div className="pt-2 space-y-1.5">
                      {spec.procedures.slice(0, isFeatured ? 3 : 2).map((proc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#D5E5E2]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                          <span>{proc.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(spec.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2.5 text-xs font-bold text-[#0A292A] hover:bg-[#d4b26c] transition cursor-pointer"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Agendar en esta área</span>
                    </button>

                    <Link
                      to={`/especialidades#${spec.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#C5A059] transition"
                    >
                      <span>Detalles clínicos</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ABOUT THE SPECIALIST PREVIEW ("Conóceme" section inspired by davidjaramillo.org) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-white p-8 sm:p-12 shadow-xl border border-[#0F3D3E]/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF2F0] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
              <Award className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Conóceme · Rigor Científico y Trato Humano</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F3D3E] leading-tight">
              Dra. Eliana Pamela Pazmiño Troncoso
            </h2>

            <p className="text-sm sm:text-base text-[#334745] leading-relaxed">
              Mi vocación nace de comprender que detrás de cada diente desgastado o de cada dolor mandibular crónico hay una persona que desea volver a comer, hablar, descansar y sonreír con tranquilidad.
            </p>

            <p className="text-sm sm:text-base text-[#334745] leading-relaxed">
              Combino mi práctica clínica privada como <strong>Especialista en Rehabilitación Oral y ATM Integral</strong> en <strong>Dental Check UIO</strong> con la <strong>docencia e investigación científica universitaria en la UDLA</strong>, donde investigamos activamente los mecanismos del bruxismo, los trastornos temporomandibulares y el dolor orofacial.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#0F3D3E]/10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
                  Investigación Publicada (PubMed / NIH)
                </p>
                <p className="text-xs text-[#4A5D5B] mt-1 leading-relaxed">
                  Estudios científicos sobre Trastornos Temporomandibulares (TTM), bruxismo y biomarcadores de estrés oxidativo aplicados a protocolos clínicos reales.
                </p>
              </div>
              <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#0F3D3E]/10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
                  Dirección en Dental Check UIO
                </p>
                <p className="text-xs text-[#4A5D5B] mt-1 leading-relaxed">
                  Un centro odontológico en Quito diseñado para que te sientas escuchado, seguro y acompañado por especialistas éticos.
                </p>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                to="/sobre-mi"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#134E4A] transition shadow"
              >
                <span>Conocer mi trayectoria completa</span>
                <ArrowRight className="h-4 w-4 text-[#C5A059]" />
              </Link>

              <button
                type="button"
                onClick={() => onOpenBooking('atm-integral')}
                className="inline-flex items-center gap-2 rounded-xl border border-[#0F3D3E]/25 bg-[#FAF8F5] px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-[#C5A059]" />
                <span>Agendar Consulta</span>
              </button>
            </div>
          </div>

          {/* Right Highlight Box: Clinical Philosophy */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#0F3D3E] to-[#0A292A] p-7 sm:p-8 text-white space-y-5 border border-[#C5A059]/30">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Nuestra Promesa Clínica
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold">
              ¿Por qué nuestros pacientes confían en nuestro enfoque?
            </h3>

            <ul className="space-y-4 text-xs sm:text-sm text-[#E6F0EE]/90">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Cero sobretratamiento:</strong> Priorizamos siempre la preservación biológica de tu esmalte y terapias reversibles antes de cualquier intervención invasiva.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Visión de ATM Integral:</strong> No miramos solo un diente aislado; evaluamos tu mordida, tus articulaciones temporomandibulares y tu postura cervical.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Tiempo de calidad en consulta:</strong> Explicamos tu diagnóstico con fotografías e indicadores claros para que tomes decisiones informadas.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SELF-ASSESSMENT & FREE E-BOOK (Inspired by davidjaramillo.org's Free Resource & Workshop) */}
      <section id="test-atm-interactivo" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive ATM & Bruxism Quiz (7 cols) */}
          <div className="lg:col-span-7">
            <AtmQuizContent
              onOpenBookingWithNote={(specId, note) => onOpenBooking(specId, note)}
            />
          </div>

          {/* Right: Free Downloadable Patient E-Book Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#0F3D3E] via-[#134E4A] to-[#0A292A] p-7 sm:p-9 text-white shadow-xl border border-[#C5A059]/35 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#C5A059] border border-[#C5A059]/30">
              <BookOpen className="h-3.5 w-3.5" />
              <span>E-Book Gratuito para Pacientes</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-white leading-tight">
                {FREE_GUIDE_CONTENT.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D5E5E2] leading-relaxed">
                {FREE_GUIDE_CONTENT.subtitle}
              </p>
            </div>

            <div className="rounded-2xl bg-white/8 p-4 border border-white/12 space-y-2.5 text-xs text-[#E6F0EE]">
              <p className="font-bold text-[#C5A059] uppercase tracking-wider">
                Lo que aprenderás en esta guía clínica:
              </p>
              {FREE_GUIDE_CONTENT.chapters.map((ch) => (
                <div key={ch.number} className="flex items-start gap-2.5">
                  <span className="font-bold text-[#C5A059]">{ch.number}.</span>
                  <span>{ch.title}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={onOpenGuide}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C5A059] px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A292A] hover:bg-[#d4b26c] transition shadow-lg cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Leer y Descargar Guía Gratuita (PDF)</span>
              </button>
              <p className="text-[11px] text-center text-[#D5E5E2]/80">
                Acceso inmediato sin registro obligatorio · Escrito por la Dra. Pamela Pazmiño
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM DUAL SHOWCASE (@drapamelapazmino & @dentalcheck.uio) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#0F3D3E]">
              Comunidad Digital y Divulgación
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0F3D3E]">
              Síguenos en Instagram: Educación y Casos Reales
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.social.instagramPersonal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#134E4A] transition"
            >
              <Instagram className="h-4 w-4 text-[#C5A059]" />
              <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
              <ExternalLink className="h-3 w-3 opacity-75" />
            </a>
            <a
              href={SITE_CONFIG.social.instagramClinic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0F3D3E]/25 bg-white px-4 py-2.5 text-xs font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition"
            >
              <Instagram className="h-4 w-4 text-[#C5A059]" />
              <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
              <ExternalLink className="h-3 w-3 opacity-75" />
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
              className="group rounded-3xl bg-white p-6 shadow-sm hover:shadow-xl border border-[#0F3D3E]/10 hover:border-[#0F3D3E]/30 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0F3D3E] inline-flex items-center gap-1">
                    <Instagram className="h-3.5 w-3.5 text-[#C5A059]" />
                    {post.account}
                  </span>
                  <span className="rounded-full bg-[#EBF2F0] px-2.5 py-0.5 text-[10px] font-semibold text-[#0F3D3E]">
                    {post.format}
                  </span>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-[#0F3D3E] to-[#134E4A] p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold block">
                    {post.badge}
                  </span>
                  <h3 className="font-editorial text-lg font-semibold mt-1 leading-snug">
                    {post.title}
                  </h3>
                </div>

                <p className="text-xs text-[#4A5D5B] leading-relaxed">{post.caption}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#0F3D3E]/10 flex items-center justify-between text-xs font-semibold text-[#0F3D3E]">
                <span>Ver en Instagram</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 7. PATIENT TESTIMONIALS */}
      <section className="bg-[#EBF2F0]/60 py-16 border-y border-[#0F3D3E]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F3D3E]">
              Experiencias Reales en Quito
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0F3D3E]">
              Lo que dicen nuestros pacientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="rounded-3xl bg-white p-7 shadow-sm border border-[#0F3D3E]/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-[#C5A059]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#182625] italic leading-relaxed">"{t.quote}"</p>
                </div>

                <div className="pt-4 border-t border-[#0F3D3E]/10">
                  <p className="text-sm font-bold text-[#0F3D3E]">{t.name}</p>
                  <p className="text-xs text-[#4A5D5B]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BLOG PREVIEW SECTION (matching davidjaramillo.org's educational articles) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F3D3E]">
              Blog de Divulgación Científica
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0F3D3E] mt-1">
              Artículos sobre ATM Integral, Bruxismo y Salud Oral
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F3D3E] hover:underline"
          >
            <span>Ver todos los artículos ({BLOG_POSTS.length})</span>
            <ArrowRight className="h-4 w-4 text-[#C5A059]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group rounded-3xl bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl border border-[#0F3D3E]/10 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#4A5D5B]">
                  <span className="rounded-full bg-[#EBF2F0] px-3 py-1 font-semibold text-[#0F3D3E]">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#182625] group-hover:text-[#0F3D3E] transition leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5D5B] leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#0F3D3E]/10 flex items-center justify-between text-xs font-bold text-[#0F3D3E]">
                <span>Leer artículo completo</span>
                <ArrowRight className="h-4 w-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. FINAL LOCATION & APPOINTMENT BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-gradient-to-r from-[#0F3D3E] via-[#134E4A] to-[#0A292A] p-8 sm:p-12 text-white shadow-2xl border border-[#C5A059]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#C5A059]">
              <MapPin className="h-3.5 w-3.5" />
              <span>Consultorio en Quito · Dental Check UIO</span>
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Agenda tu valoración con la Dra. Pamela Pazmiño
            </h2>
            <p className="text-sm sm:text-base text-[#D5E5E2] leading-relaxed max-w-2xl">
              Te esperamos en <strong>{SITE_CONFIG.clinicName}</strong> ({SITE_CONFIG.address.street}, {SITE_CONFIG.address.sector}). Da el primer paso hacia una mordida estable, sin dolor articular y una sonrisa natural.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs text-[#E6F0EE]">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-[#C5A059]" />
                WhatsApp: <strong>{SITE_CONFIG.whatsappDisplay}</strong> | Fijo: <strong>{SITE_CONFIG.landlineDisplay}</strong>
              </span>
              <span>•</span>
              <span>{SITE_CONFIG.hours.weekdays}</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onOpenBooking('atm-integral')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C5A059] px-6 py-4 text-sm font-bold text-[#0A292A] hover:bg-[#d4b26c] transition shadow-lg cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Agendar Cita por WhatsApp</span>
            </button>
            <a
              href={SITE_CONFIG.address.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/20 transition"
            >
              <MapPin className="h-4 w-4 text-[#C5A059]" />
              <span>Abrir Ubicación en Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
