import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { SITE_CONFIG, CREDENTIALS_LIST, SCIENTIFIC_HIGHLIGHTS } from '../data/siteContent';
import {
  ViteCyanCanvas,
  MinimalistAuthorityShowcase,
  SonoramaVitalMediaHub,
  InstagramIcon as Instagram,
} from '../components/ClinicalVisuals';

interface AboutPageProps {
  onOpenBooking: (specialtyId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* 1. HIGH-TECH MINIMALIST CYAN HERO */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-vite-grid">
        <ViteCyanCanvas className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-cyan-300/25 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-cyan-700 ring-1 ring-cyan-500/20 shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                <span>Enfoque Clínico, Ciencia y Medios</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {SITE_CONFIG.doctorFullName}
              </h1>

              <p className="text-base sm:text-lg font-bold text-cyan-600">
                Especialista en Rehabilitación Oral · ATM Integral, Bruxismo y Dolor Orofacial · Docente e Investigadora UDLA · Sonorama Vital
              </p>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  Nuestra práctica nace de una convicción sencilla: la odontología moderna debe ser <strong>minimalista, indolora y sustentada en evidencia científica real</strong>.
                </p>
                <p>
                  Como especialista en <strong>Rehabilitación Oral y Trastornos Temporomandibulares (ATM Integral)</strong>, acompaño a pacientes con bruxismo del sueño y de vigilia, ruidos o bloqueo articular, dolor cráneo-cervical y desgastes dentales que requieren soluciones biomiméticas conservadoras.
                </p>
                <p>
                  En paralelo, formo parte del cuerpo docente e investigador de la Carrera de Odontología de la <strong>Universidad de Las Américas (UDLA)</strong> y conduzco el espacio de salud y bienestar <strong>Sonorama Vital</strong> en <strong>Radio Sonorama Ecuador / Sonorama Digital</strong>.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onOpenBooking('atm-integral')}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Agendar Valoración</span>
                </button>

                <a
                  href={SITE_CONFIG.social.instagramPersonal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-cyan-700 ring-1 ring-cyan-500/20 hover:bg-cyan-50 transition"
                >
                  <Instagram className="h-4 w-4 text-cyan-500" />
                  <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <MinimalistAuthorityShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CREDENTIALS & RESEARCH */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-600">
            Trayectoria Académica
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Credenciales y Líneas de Investigación
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CREDENTIALS_LIST.map((cred, i) => (
            <div
              key={i}
              className="rounded-[2rem] bg-white p-7 shadow-xs ring-1 ring-slate-200/80 flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-md shadow-cyan-500/20">
                {i === 0 && <Award className="h-6 w-6" />}
                {i === 1 && <ShieldCheck className="h-6 w-6" />}
                {i === 2 && <GraduationCap className="h-6 w-6" />}
                {i === 3 && <Stethoscope className="h-6 w-6" />}
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 block">
                  {cred.category}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {cred.title}
                </h3>
                <p className="text-xs font-bold text-slate-700">{cred.institution}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {cred.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[2.25rem] bg-gradient-to-r from-cyan-50 via-sky-50 to-white p-7 sm:p-10 ring-1 ring-cyan-500/20">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-700 mb-5">
            <Microscope className="h-4 w-4 text-cyan-500" />
            <span>Publicaciones e Investigación Científica (PubMed / NIH · UDLA)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCIENTIFIC_HIGHLIGHTS.map((pub, idx) => (
              <div key={idx} className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-cyan-500/10 space-y-2">
                <span className="inline-block rounded-full bg-cyan-50 px-3 py-0.5 text-[11px] font-bold text-cyan-700">
                  {pub.journal}
                </span>
                <h4 className="text-lg font-extrabold text-slate-900">{pub.topic}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pub.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SONORAMA VITAL MEDIA HUB */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SonoramaVitalMediaHub />
      </section>

      {/* 4. THREE PILLARS OF MINIMALIST DENTISTRY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200/70 space-y-3">
            <Microscope className="h-7 w-7 text-cyan-500" />
            <h3 className="text-xl font-extrabold text-slate-900">
              01 · Diagnóstico Integral
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Evaluamos la Articulación Temporomandibular (ATM), los músculos masticatorios, la postura cervical y la oclusión como una sola unidad funcional.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200/70 space-y-3">
            <ShieldCheck className="h-7 w-7 text-cyan-500" />
            <h3 className="text-xl font-extrabold text-slate-900">
              02 · Mínima Invasión Biológica
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Priorizamos la adhesión biomimética que restaura forma y estética preservando al máximo tu esmalte dental sano.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200/70 space-y-3">
            <HeartHandshake className="h-7 w-7 text-cyan-500" />
            <h3 className="text-xl font-extrabold text-slate-900">
              03 · Claridad y Calma
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Sesiones sin prisas en Quito, explicando cada hallazgo con fotografía clínica para que comprendas tu tratamiento de principio a fin.
            </p>
          </div>
        </div>
      </section>

      {/* 5. DENTAL CHECK UIO CENTER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-slate-950 p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3.5 py-1 text-xs font-bold text-cyan-300">
              <Stethoscope className="h-3.5 w-3.5" />
              <span>Centro Clínico en Quito · {SITE_CONFIG.social.instagramClinic.handle}</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Dental Check UIO: Especialidades Coordinadas
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Ubicado en {SITE_CONFIG.address.street} ({SITE_CONFIG.address.sector}), nuestro centro reúne tecnología diagnóstica y especialistas éticos para cuidar tu salud oral integral.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-cyan-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Chequeo Integral previo a Ortodoncia</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Rehabilitación Oral y ATM Integral</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Diseño de Sonrisa Natural</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Periodoncia, Endodoncia y Cirugía Oral</span>
              </li>
            </ul>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.address.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition"
              >
                <MapPin className="h-4 w-4" />
                <span>Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/especialidades"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 transition"
              >
                <BookOpen className="h-4 w-4 text-cyan-400" />
                <span>Ver Especialidades</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-white/6 p-7 space-y-4 ring-1 ring-cyan-400/25">
            <h3 className="text-xl font-extrabold text-cyan-300">
              Ubicación y Contacto Directo
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <p><strong className="text-white">Dirección:</strong> {SITE_CONFIG.address.street}, {SITE_CONFIG.address.sector}</p>
              <p><strong className="text-white">WhatsApp:</strong> {SITE_CONFIG.whatsappDisplay}</p>
              <p><strong className="text-white">Teléfono Fijo:</strong> {SITE_CONFIG.landlineDisplay}</p>
              <p><strong className="text-white">Horario:</strong> {SITE_CONFIG.hours.weekdays}</p>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('atm-integral')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-5 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 hover:from-cyan-300 hover:to-cyan-400 transition cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Agendar Cita Ahora</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
