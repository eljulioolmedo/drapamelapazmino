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
import { DoctorEditorialPortrait, InstagramIcon as Instagram } from '../components/ClinicalVisuals';

interface AboutPageProps {
  onOpenBooking: (specialtyId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* 1. BIO HERO SECTION */}
      <section className="bg-gradient-to-b from-[#EBF2F0]/80 to-[#FAF8F5] pt-10 pb-16 border-b border-[#0F3D3E]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F3D3E] border border-[#0F3D3E]/15">
                <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>Sobre Mí · Conóceme</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0F3D3E] leading-tight">
                {SITE_CONFIG.doctorFullName}
              </h1>

              <p className="text-base sm:text-lg font-medium text-[#134E4A]">
                Especialista en Rehabilitación Oral · Manejo Clínico de ATM Integral, Bruxismo y Dolor Orofacial · Docente e Investigadora Universitaria (UDLA)
              </p>

              <div className="space-y-4 text-sm sm:text-base text-[#334745] leading-relaxed">
                <p>
                  Creo profundamente en una odontología que escucha antes de intervenir. A lo largo de mi carrera clínica y académica en Quito, he comprobado que los mejores resultados —tanto en el alivio del dolor mandibular como en la rehabilitación estética de la sonrisa— surgen cuando unimos la <strong>evidencia científica rigurosa</strong> con el <strong>respeto por la biología natural de cada diente</strong>.
                </p>
                <p>
                  Como especialista en <strong>Rehabilitación Oral y Trastornos Temporomandibulares (ATM Integral)</strong>, acompaño a pacientes que buscan soluciones reales para el bruxismo del sueño y de vigilia, chasquidos o dolor articular, cefaleas tensionales asociadas a la mordida y desgastes dentales complejos.
                </p>
                <p>
                  Paralelamente, ejerzo la docencia y la investigación científica en la Carrera de Odontología de la <strong>Universidad de Las Américas (UDLA)</strong>, participando en publicaciones científicas internacionales sobre dolor orofacial, bruxismo y biomarcadores asociados a trastornos temporomandibulares.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onOpenBooking('atm-integral')}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#0F3D3E] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#134E4A] transition shadow-md cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-[#C5A059]" />
                  <span>Agendar Cita con la Dra. Pamela</span>
                </button>

                <a
                  href={SITE_CONFIG.social.instagramPersonal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#0F3D3E]/25 bg-white px-5 py-3.5 text-sm font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition"
                >
                  <Instagram className="h-4 w-4 text-[#C5A059]" />
                  <span>Seguir en {SITE_CONFIG.social.instagramPersonal.handle}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <DoctorEditorialPortrait variant="about" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CREDENTIALS & ACADEMIC PILLARS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F3D3E]">
            Respaldo Académico y Clínico
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0F3D3E]">
            Formación, Docencia e Investigación Científica
          </h2>
          <p className="text-sm sm:text-base text-[#4A5D5B]">
            Cada protocolo que aplicamos en el consultorio está respaldado por actualización continua e investigación universitaria activa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CREDENTIALS_LIST.map((cred, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white p-7 shadow-sm border border-[#0F3D3E]/12 flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F3D3E] text-[#C5A059]">
                {i === 0 && <Award className="h-6 w-6" />}
                {i === 1 && <ShieldCheck className="h-6 w-6" />}
                {i === 2 && <GraduationCap className="h-6 w-6" />}
                {i === 3 && <Stethoscope className="h-6 w-6" />}
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059] block">
                  {cred.category}
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#0F3D3E]">
                  {cred.title}
                </h3>
                <p className="text-xs font-semibold text-[#134E4A]">{cred.institution}</p>
                <p className="text-xs sm:text-sm text-[#4A5D5B] leading-relaxed pt-1">
                  {cred.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scientific Research Callout */}
        <div className="mt-8 rounded-3xl bg-[#0F3D3E] p-7 sm:p-9 text-white border border-[#C5A059]/30">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">
            <Microscope className="h-4 w-4" />
            <span>Aporte Científico e Investigación en Salud Oral</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCIENTIFIC_HIGHLIGHTS.map((pub, idx) => (
              <div key={idx} className="rounded-2xl bg-white/8 p-5 border border-white/12 space-y-2">
                <span className="inline-block rounded-full bg-[#C5A059]/20 px-3 py-0.5 text-[11px] font-semibold text-[#C5A059]">
                  {pub.journal}
                </span>
                <h4 className="font-editorial text-xl font-semibold text-white">{pub.topic}</h4>
                <p className="text-xs text-[#D5E5E2] leading-relaxed">{pub.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY OF CARE (3 Pillars) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#EBF2F0] p-8 sm:p-12 border border-[#0F3D3E]/10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F3D3E]">
              Filosofía de Trabajo
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0F3D3E]">
              Tres principios que guían cada tratamiento
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 space-y-3 border border-[#0F3D3E]/10">
              <Microscope className="h-7 w-7 text-[#0F3D3E]" />
              <h3 className="font-editorial text-2xl font-semibold text-[#0F3D3E]">
                1. Diagnóstico Científico Integral
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5D5B] leading-relaxed">
                Nunca tratamos un síntoma sin conocer su origen. Analizamos en conjunto la Articulación Temporomandibular (ATM), los músculos masticatorios, la postura cervical y la oclusión dental.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 space-y-3 border border-[#0F3D3E]/10">
              <ShieldCheck className="h-7 w-7 text-[#0F3D3E]" />
              <h3 className="font-editorial text-2xl font-semibold text-[#0F3D3E]">
                2. Odontología Biomimética y Conservadora
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5D5B] leading-relaxed">
                El mejor tejido dental es el tuyo propio. Utilizamos técnicas adhesivas modernas que restauran la forma, función y belleza natural preservando al máximo el esmalte sano.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 space-y-3 border border-[#0F3D3E]/10">
              <HeartHandshake className="h-7 w-7 text-[#0F3D3E]" />
              <h3 className="font-editorial text-2xl font-semibold text-[#0F3D3E]">
                3. Empatía, Tiempo y Claridad
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5D5B] leading-relaxed">
                Sabemos que asistir al odontólogo o convivir con dolor orofacial genera ansiedad. Te explicamos paso a paso tu plan de tratamiento en un ambiente sereno y transparente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DENTAL CHECK UIO FLAGSHIP CLINIC SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-lg border border-[#0F3D3E]/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EBF2F0] px-3.5 py-1 text-xs font-bold text-[#0F3D3E]">
              <Stethoscope className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Nuestro Centro Clínico en Quito · {SITE_CONFIG.social.instagramClinic.handle}</span>
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0F3D3E]">
              Dental Check UIO: Especialidades Coordinadas bajo un mismo estándar ético
            </h2>

            <p className="text-sm sm:text-base text-[#334745] leading-relaxed">
              En <strong>Dental Check UIO</strong> (ubicado en el sector de Iñaquito / La Coruña — {SITE_CONFIG.address.street}) hemos creado un espacio clínico moderno donde la prevención y la seguridad del paciente son lo primero.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-[#182625]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#0F3D3E] shrink-0" />
                <span>Chequeo Integral previo a Ortodoncia</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#0F3D3E] shrink-0" />
                <span>Rehabilitación Oral y ATM Integral</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#0F3D3E] shrink-0" />
                <span>Estética Dental y Diseño de Sonrisa Natural</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#0F3D3E] shrink-0" />
                <span>Periodoncia, Endodoncia y Cirugía Oral</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.address.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-3 text-xs font-semibold text-white hover:bg-[#134E4A] transition"
              >
                <MapPin className="h-4 w-4 text-[#C5A059]" />
                <span>Ver Ubicación en Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={SITE_CONFIG.social.instagramClinic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#0F3D3E]/20 bg-[#FAF8F5] px-5 py-3 text-xs font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition"
              >
                <Instagram className="h-4 w-4 text-[#C5A059]" />
                <span>Visitar {SITE_CONFIG.social.instagramClinic.handle}</span>
              </a>

              <Link
                to="/especialidades"
                className="inline-flex items-center gap-2 rounded-xl border border-[#0F3D3E]/20 bg-white px-5 py-3 text-xs font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition"
              >
                <BookOpen className="h-4 w-4 text-[#C5A059]" />
                <span>Ver Tratamientos</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#0F3D3E] p-7 text-white space-y-4 border border-[#C5A059]/30">
            <h3 className="font-editorial text-2xl font-semibold text-[#C5A059]">
              Información de Contacto Directo
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#E6F0EE]">
              <p>
                <strong>Dirección:</strong> {SITE_CONFIG.address.street}, {SITE_CONFIG.address.sector}, {SITE_CONFIG.address.city}
              </p>
              <p>
                <strong>WhatsApp Citas:</strong> {SITE_CONFIG.whatsappDisplay}
              </p>
              <p>
                <strong>Teléfono Fijo:</strong> {SITE_CONFIG.landlineDisplay}
              </p>
              <p>
                <strong>Horario:</strong> {SITE_CONFIG.hours.weekdays} | {SITE_CONFIG.hours.saturdays}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('atm-integral')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A292A] hover:bg-[#d4b26c] transition cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Reservar Cita de Valoración</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
