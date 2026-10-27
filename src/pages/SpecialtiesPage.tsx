import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  Crown,
  Sparkles,
  Stethoscope,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { SPECIALTIES } from '../data/siteContent';
import { SpecialtyVisualIllustration } from '../components/ClinicalVisuals';

interface SpecialtiesPageProps {
  onOpenBooking: (specialtyId?: string, note?: string) => void;
  onOpenQuiz: () => void;
}

const iconMap = {
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Crown: Crown,
  Sparkles: Sparkles,
  Stethoscope: Stethoscope,
};

export const SpecialtiesPage: React.FC<SpecialtiesPageProps> = ({ onOpenBooking, onOpenQuiz }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredSpecialties =
    activeFilter === 'all' ? SPECIALTIES : SPECIALTIES.filter((s) => s.id === activeFilter);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HEADER */}
      <section className="bg-gradient-to-b from-[#EBF2F0]/80 to-[#FAF8F5] pt-10 pb-14 border-b border-[#0F3D3E]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F3D3E] border border-[#0F3D3E]/15">
            <Activity className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Especialidades Clínicas · Quito</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0F3D3E] leading-tight">
            ATM Integral, Bruxismo, Rehabilitación Oral y Odontología Preventiva
          </h1>

          <p className="text-sm sm:text-base text-[#334745] leading-relaxed max-w-2xl mx-auto">
            Conoce en detalle nuestros protocolos clínicos basados en evidencia científica. Desde el alivio del dolor articular y muscular hasta el diseño de sonrisa biomimético y el chequeo integral en <strong>Dental Check UIO</strong>.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#0F3D3E] text-white shadow'
                  : 'bg-white text-[#0F3D3E] border border-[#0F3D3E]/15 hover:bg-[#EBF2F0]'
              }`}
            >
              Todas las Especialidades ({SPECIALTIES.length})
            </button>
            {SPECIALTIES.map((spec) => (
              <button
                key={spec.id}
                type="button"
                onClick={() => setActiveFilter(spec.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                  activeFilter === spec.id
                    ? 'bg-[#0F3D3E] text-white shadow'
                    : 'bg-white text-[#0F3D3E] border border-[#0F3D3E]/15 hover:bg-[#EBF2F0]'
                }`}
              >
                {spec.title.split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DETAILED SPECIALTY SECTIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredSpecialties.map((spec) => {
          const IconComponent = iconMap[spec.iconName] || Activity;
          return (
            <article
              key={spec.id}
              id={spec.id}
              className="scroll-mt-28 rounded-[2rem] bg-white p-7 sm:p-10 shadow-lg border border-[#0F3D3E]/12 space-y-8"
            >
              {/* Top Specialty Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#0F3D3E]/10 pb-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0F3D3E] text-[#C5A059] shadow-md">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#EBF2F0] px-3 py-0.5 text-[11px] font-bold text-[#0F3D3E]">
                        {spec.badge}
                      </span>
                      <span className="text-xs font-medium text-[#4A5D5B]">• {spec.brandTag}</span>
                    </div>
                    <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0F3D3E]">
                      {spec.title}
                    </h2>
                    <p className="text-sm font-medium text-[#134E4A]">{spec.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(spec.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#134E4A] transition shadow cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 text-[#C5A059]" />
                    <span>Agendar Valoración en esta Área</span>
                  </button>
                </div>
              </div>

              {/* Description & Visual Diagram */}
              <div className="space-y-6">
                <p className="text-sm sm:text-base text-[#334745] leading-relaxed">
                  {spec.fullDescription}
                </p>

                <SpecialtyVisualIllustration type={spec.imageSvgType} />
              </div>

              {/* Two Columns: Symptoms to Watch & Clinical Procedures */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Symptoms (5 cols) */}
                <div className="lg:col-span-5 rounded-2xl bg-[#FAF8F5] p-6 border border-[#0F3D3E]/10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
                    <AlertCircle className="h-4 w-4 text-[#C5A059]" />
                    <span>¿Cuándo acudir a esta consulta?</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#182625]">
                    {spec.symptomsToWatch.map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#C5A059] shrink-0" />
                        <span className="leading-relaxed">{sym}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-[#0F3D3E]/10 flex items-center gap-2 text-xs text-[#4A5D5B]">
                    <Clock className="h-4 w-4 text-[#0F3D3E] shrink-0" />
                    <span>{spec.durationOrFormat}</span>
                  </div>
                </div>

                {/* Right: Clinical Procedures (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-editorial text-2xl font-semibold text-[#0F3D3E]">
                    Procedimientos y Protocolos Clínicos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {spec.procedures.map((proc, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-[#FAF8F5] p-5 border border-[#0F3D3E]/10 space-y-1.5"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#0F3D3E] shrink-0 mt-0.5" />
                          <h4 className="text-sm font-bold text-[#0F3D3E] leading-snug">
                            {proc.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#4A5D5B] leading-relaxed pl-6">
                          {proc.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-[#EBF2F0] p-4 border border-[#0F3D3E]/15 text-xs sm:text-sm text-[#0F3D3E] font-medium">
                    <strong>Beneficio Clínico:</strong> {spec.clinicalBenefit}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 3. HOW YOUR FIRST CONSULTATION WORKS (Step-by-step protocol) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-[#0F3D3E] p-8 sm:p-12 text-white shadow-xl border border-[#C5A059]/30 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
              Protocolo de Atención en Dental Check UIO
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold">
              ¿Cómo es tu primera consulta con la Dra. Pamela Pazmiño?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: 'Paso 01',
                title: 'Escucha Activa e Historia Clínica',
                desc: 'Conversamos sin prisa sobre tus síntomas (dolor mandibular, bruxismo, sensibilidad) o tus objetivos funcionales y estéticos.',
              },
              {
                step: 'Paso 02',
                title: 'Evaluación de ATM Integral y Postura',
                desc: 'Examinamos la Articulación Temporomandibular, músculos masticatorios, rango de apertura y el eje cráneo-cervical.',
              },
              {
                step: 'Paso 03',
                title: 'Diagnóstico Dental Check y Fotografía',
                desc: 'Evaluamos encías, piezas dentales y mordida con registro visual para que veas y comprendas exactamente lo que ocurre en tu boca.',
              },
              {
                step: 'Paso 04',
                title: 'Plan de Tratamiento Transparente',
                desc: 'Diseñamos un plan por fases, priorizando el alivio del dolor, la estabilidad articular y la preservación biológica de tus dientes.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-white/8 p-6 border border-white/12 space-y-2.5"
              >
                <span className="inline-block rounded-lg bg-[#C5A059] px-2.5 py-1 text-[11px] font-bold text-[#0A292A]">
                  {item.step}
                </span>
                <h3 className="font-editorial text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-[#D5E5E2] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
            <p className="text-xs sm:text-sm text-[#E6F0EE]">
              ¿No estás seguro/a de qué especialidad necesitas? Realiza nuestro test interactivo en 1 minuto.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-xs font-semibold text-white hover:bg-white/20 transition cursor-pointer"
              >
                <Activity className="h-4 w-4 text-[#C5A059]" />
                <span>Hacer Test de ATM y Bruxismo</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenBooking('atm-integral')}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-6 py-3 text-xs font-bold text-[#0A292A] hover:bg-[#d4b26c] transition cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Agendar Primera Consulta</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
