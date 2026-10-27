import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle2, MapPin, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteContent';

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
 * Portrait component for Dra. Pamela Pazmiño.
 * Automatically tries `/images/dra-pamela-pazmino.jpg` if added to `public/images/`,
 * and falls back to an editorial clinical portrait composition with her real credentials.
 */
export const DoctorEditorialPortrait: React.FC<{ variant?: 'hero' | 'about' }> = ({ variant = 'hero' }) => {
  const [hasCustomPhoto, setHasCustomPhoto] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Decorative Editorial Frame */}
      <div className="absolute -inset-3 rounded-[2rem] border border-[#C5A059]/35 bg-gradient-to-br from-[#0F3D3E]/5 via-transparent to-[#C5A059]/10 -z-10" />

      <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#134E4A] via-[#0F3D3E] to-[#0A292A] text-[#FAF8F5] shadow-2xl border border-[#C5A059]/30">
        {/* Optional local photo drop-in */}
        <img
          src={SITE_CONFIG.images.doctorPortraitLocal}
          alt={SITE_CONFIG.doctorFullName}
          className={`w-full object-cover object-top transition-opacity duration-500 ${
            hasCustomPhoto ? 'block h-[480px] sm:h-[540px]' : 'hidden'
          }`}
          onLoad={() => setHasCustomPhoto(true)}
          onError={() => setHasCustomPhoto(false)}
        />

        {!hasCustomPhoto && (
          <div className="relative p-7 sm:p-9 flex flex-col justify-between min-h-[490px] sm:min-h-[530px]">
            {/* Ambient Gold & Emerald Glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#C5A059]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 -left-20 h-64 w-64 rounded-full bg-[#2DD4BF]/10 blur-3xl" />

            {/* Top Editorial Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#C5A059]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#E6F0EE]/90 font-medium">
                  Práctica Especializada · Quito
                </span>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-[#C5A059] border border-[#C5A059]/30">
                @drapamelapazmino
              </span>
            </div>

            {/* Central Anatomical & Clinical Emblem */}
            <div className="relative z-10 my-6 flex flex-col items-center text-center">
              <div className="relative mb-5 flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#C5A059]/50 bg-gradient-to-b from-white/10 to-white/5 shadow-inner">
                {/* Bespoke SVG Illustration of Facial Harmony, TMJ/ATM Axis & Biomimetic Smile */}
                <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Golden Proportions Circle */}
                  <circle cx="60" cy="60" r="50" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <circle cx="60" cy="60" r="38" stroke="#FAF8F5" strokeWidth="1" opacity="0.25" />
                  {/* Cranio-Mandibular / ATM Integral Axis Lines */}
                  <line x1="60" y1="12" x2="60" y2="108" stroke="#C5A059" strokeWidth="1" opacity="0.45" />
                  <line x1="20" y1="52" x2="100" y2="52" stroke="#C5A059" strokeWidth="1" opacity="0.45" />
                  {/* Bilateral TMJ / ATM Nodes */}
                  <circle cx="31" cy="52" r="5" fill="#C5A059" />
                  <circle cx="31" cy="52" r="9" stroke="#C5A059" strokeWidth="1.2" opacity="0.6" />
                  <circle cx="89" cy="52" r="5" fill="#C5A059" />
                  <circle cx="89" cy="52" r="9" stroke="#C5A059" strokeWidth="1.2" opacity="0.6" />
                  {/* Mandibular Arch & Biomimetic Dental Curve */}
                  <path
                    d="M31 52C31 76 43 92 60 92C77 92 89 76 89 52"
                    stroke="#FAF8F5"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  {/* Natural Smile Arc */}
                  <path
                    d="M42 66C47 73 53 76 60 76C67 76 73 73 78 66"
                    stroke="#C5A059"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M45 63C50 67 55 69 60 69C65 69 70 67 75 63"
                    stroke="#FAF8F5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
                <div className="absolute -bottom-2 rounded-full bg-[#C5A059] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0A292A] shadow">
                  ATM Integral · Rehabilitación
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {SITE_CONFIG.doctorFullName}
              </h3>
              <p className="mt-1.5 text-sm text-[#D5E5E2] max-w-xs leading-relaxed">
                Especialista en Rehabilitación Oral, Trastornos Temporomandibulares (ATM Integral), Bruxismo y Dolor Orofacial
              </p>
            </div>

            {/* Credentials Pills Inside Portrait Card */}
            <div className="relative z-10 grid grid-cols-1 gap-2.5 pt-2 border-t border-white/15 text-left">
              <div className="flex items-start gap-3 rounded-xl bg-white/8 p-3 backdrop-blur-sm">
                <Award className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white">Especialista en Rehabilitación Oral y ATM</p>
                  <p className="text-[11px] text-[#D5E5E2]/85">
                    Diagnóstico diferencial de bruxismo, oclusión funcional y estética dental biomimética.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white/8 p-3 backdrop-blur-sm">
                <BookOpen className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white">Docente e Investigadora Científica · UDLA</p>
                  <p className="text-[11px] text-[#D5E5E2]/85">
                    Publicaciones indexadas (PubMed / NIH) sobre dolor orofacial y trastornos temporomandibulares.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white/8 p-3 backdrop-blur-sm">
                <Stethoscope className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white">Directora Clínica · Dental Check UIO</p>
                  <p className="text-[11px] text-[#D5E5E2]/85">
                    Av. La Coruña y Francisco de Orellana, Sector Iñaquito · Quito, Ecuador.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overlay Caption if custom photo is loaded */}
        {hasCustomPhoto && (
          <div className="bg-gradient-to-t from-[#0A292A] via-[#0A292A]/90 to-transparent p-6 text-white">
            <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
              { variant === 'hero' ? 'Especialista en Rehabilitación Oral y ATM Integral' : 'Docente e Investigadora UDLA' }
            </p>
            <h3 className="font-editorial text-2xl font-semibold mt-0.5">{SITE_CONFIG.doctorFullName}</h3>
            <p className="text-xs text-[#D5E5E2] mt-1">Directora Clínica en Dental Check UIO · Quito</p>
          </div>
        )}
      </div>

      {/* Floating Verification Badge */}
      <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 rounded-2xl bg-white p-4 shadow-xl border border-[#0F3D3E]/10 flex items-center gap-3.5 max-w-xs">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F3D3E] text-[#C5A059]">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#0F3D3E]">Odontología Basada en Evidencia</p>
          <p className="text-[11px] text-[#4A5D5B] leading-tight mt-0.5">
            Atención empática, diagnósticos claros y preservación biológica en Quito.
          </p>
        </div>
      </div>
    </div>
  );
};

export const SpecialtyVisualIllustration: React.FC<{
  type: 'atm' | 'bruxism' | 'rehab' | 'esthetic' | 'dentalcheck';
}> = ({ type }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F3D3E] via-[#134E4A] to-[#0A292A] p-6 text-white shadow-lg border border-[#C5A059]/25">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-semibold">
          {type === 'atm' && 'Biomecánica Cráneo-Mandibular · ATM Integral'}
          {type === 'bruxism' && 'Neurofisiología y Protección Oclusal'}
          {type === 'rehab' && 'Adhesión Biomimética y Dimensión Vertical'}
          {type === 'esthetic' && 'Armonía Dentofacial y Translucidez Natural'}
          {type === 'dentalcheck' && 'Protocolo Diagnóstico Dental Check UIO'}
        </span>
        <Sparkles className="h-4 w-4 text-[#C5A059]" />
      </div>

      {type === 'atm' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">1. Articulación (ATM)</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Evaluación del complejo cóndilo-disco, ruidos articulares (clicks) y rango de apertura sin dolor.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">2. Eje Cráneo-Cervical</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Relación directa entre mordida, postura de cabeza/cuello, músculos maseteros, temporales y trapecio.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">3. Estabilidad Oclusal</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Desprogramación neuromuscular y férulas estabilizadoras rígidas calibradas en relación céntrica.
            </p>
          </div>
        </div>
      )}

      {type === 'bruxism' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">Bruxismo de Vigilia (Diurno)</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Apretamiento silencioso asociado a concentración y estrés. Se aborda con biofeedback conductual y ergonomía mandibular.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">Bruxismo del Sueño (Nocturno)</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Actividad rítmica durante microdespertares. Se protege mediante férula oclusal rígida con guías caninas calibradas.
            </p>
          </div>
        </div>
      )}

      {type === 'rehab' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">Mínima Invasión</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Incrustaciones adhesivas (Inlays/Onlays/Overlays) que preservan el diente sano evitando coronas agresivas.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">Cerámica Libre de Metal</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Disilicato de litio y zirconia multicapa con sellado microscópico y biocompatibilidad gingival.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">Dimensión Vertical</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Restitución funcional de la altura dental perdida por desgaste severo o bruxismo de larga data.
            </p>
          </div>
        </div>
      )}

      {type === 'esthetic' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">Mock-up y Diseño Facial</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Prueba estética directamente en tu boca antes de iniciar el tratamiento para validar proporciones y naturalidad.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5 border border-white/10">
            <p className="font-semibold text-[#C5A059] mb-1">Función + Estética</p>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed">
              Carillas ultrafinas y aclaramiento seguro que respetan la guía anterior y protegen tu ATM.
            </p>
          </div>
        </div>
      )}

      {type === 'dentalcheck' && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#C5A059] font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              <span>Centro Odontológico Dental Check UIO (@dentalcheck.uio)</span>
            </div>
            <p className="text-[#E6F0EE]/90 text-[11px] leading-relaxed max-w-xl">
              Evaluación preventiva integral antes de ortodoncia, profilaxis con ultrasonido, periodoncia, endodoncia y cirugía oral en un entorno seguro y moderno.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 border border-white/15 shrink-0">
            <MapPin className="h-4 w-4 text-[#C5A059]" />
            <span className="text-[11px] font-medium">Av. La Coruña y Fco. de Orellana</span>
          </div>
        </div>
      )}
    </div>
  );
};
