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
import { ViteCyanCanvas, SpecialtyVisualIllustration } from '../components/ClinicalVisuals';

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
    <div className="space-y-20 pb-24">
      {/* 1. ARCHITECTURAL WOOD + CYAN GLASS HEADER */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-vite-grid">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[45%] bg-cover bg-left opacity-30 lg:opacity-45"
          style={{ backgroundImage: "url('/images/clinic/wood-cyan-bg.jpg')" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/75 via-white/90 to-white/95" />
        <ViteCyanCanvas className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-cyan-300/25 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="animate-hero-up-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-cyan-700 ring-1 ring-cyan-500/20 shadow-2xs">
            <Activity className="h-3.5 w-3.5 text-cyan-500" />
            <span>Especialidades Clínicas · Quito</span>
          </div>

          <h1 className="animate-hero-up-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            ATM Integral, Bruxismo y{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-transparent">
              Rehabilitación Biomimética
            </span>
          </h1>

          <p className="animate-hero-up-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Protocolos clínicos basados en evidencia científica para aliviar el dolor articular, detener el desgaste dental y diseñar sonrisas naturales en <strong>Dental Check UIO</strong>.
          </p>

          {/* Pill Filters */}
          <div className="animate-hero-up-4 pt-3 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`rounded-full px-4 py-2 text-xs font-bold transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-cyan-400 hover:text-cyan-700'
              }`}
            >
              Todas ({SPECIALTIES.length})
            </button>
            {SPECIALTIES.map((spec) => (
              <button
                key={spec.id}
                type="button"
                onClick={() => setActiveFilter(spec.id)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  activeFilter === spec.id
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-md shadow-cyan-500/25'
                    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-cyan-400 hover:text-cyan-700'
                }`}
              >
                {spec.title.split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SPECIALTY CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredSpecialties.map((spec) => {
          const IconComponent = iconMap[spec.iconName] || Activity;
          return (
            <article
              key={spec.id}
              id={spec.id}
              className="scroll-mt-28 rounded-[2.5rem] bg-white p-7 sm:p-10 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.12)] ring-1 ring-slate-200/80 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-lg shadow-cyan-500/25">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-cyan-50 px-3 py-0.5 text-[11px] font-bold text-cyan-700">
                        {spec.badge}
                      </span>
                      <span className="text-xs font-medium text-slate-400">• {spec.brandTag}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {spec.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-cyan-600">{spec.subtitle}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBooking(spec.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-cyan-500 transition self-start cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Agendar Valoración</span>
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {spec.fullDescription}
                </p>

                <SpecialtyVisualIllustration type={spec.imageSvgType} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 rounded-3xl bg-slate-50/80 p-6 ring-1 ring-slate-200/70 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-cyan-700">
                    <AlertCircle className="h-4 w-4 text-cyan-500" />
                    <span>Signos e Indicadores Clínicos</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {spec.symptomsToWatch.map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                        <span className="leading-relaxed">{sym}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-4 w-4 text-cyan-600 shrink-0" />
                    <span>{spec.durationOrFormat}</span>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Protocolos y Procedimientos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {spec.procedures.map((proc, idx) => (
                      <div
                        key={idx}
                        className="rounded-3xl bg-slate-50/70 p-5 ring-1 ring-slate-200/70 space-y-1.5"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {proc.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-6">
                          {proc.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-cyan-50/80 p-4 ring-1 ring-cyan-500/20 text-xs sm:text-sm text-cyan-900 font-medium">
                    <strong className="text-cyan-700">Resultado Clínico:</strong> {spec.clinicalBenefit}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 3. FIRST CONSULTATION WORKFLOW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-slate-950 p-8 sm:p-12 text-white shadow-2xl ring-1 ring-cyan-400/30 space-y-8 bg-vite-grid-dark">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-400">
              Protocolo Dental Check UIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              ¿Cómo es tu primera consulta de valoración?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'Escucha Clínica',
                desc: 'Conversamos sin prisa sobre tus síntomas articulares, bruxismo o expectativas estéticas.',
              },
              {
                step: '02',
                title: 'Mapa de ATM y Postura',
                desc: 'Evaluamos la Articulación Temporomandibular, músculos masticatorios y eje cráneo-cervical.',
              },
              {
                step: '03',
                title: 'Diagnóstico Visual',
                desc: 'Registro fotográfico y evaluación Dental Check de encías, esmalte y mordida.',
              },
              {
                step: '04',
                title: 'Plan Conservador',
                desc: 'Propuesta transparente por fases priorizando tu bienestar articular y biológico.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10 space-y-2.5"
              >
                <span className="inline-block rounded-full bg-cyan-400 px-3 py-0.5 text-[11px] font-extrabold text-slate-950">
                  PASO {item.step}
                </span>
                <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            <p className="text-xs sm:text-sm text-cyan-100">
              ¿Deseas conocer qué especialidad aplica a tu caso? Haz nuestro test interactivo en 60 segundos.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
              >
                <Activity className="h-4 w-4 text-cyan-400" />
                <span>Realizar Test ATM</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenBooking('atm-integral')}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-xs font-extrabold text-slate-950 hover:bg-cyan-300 transition cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Agendar Primera Cita</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
