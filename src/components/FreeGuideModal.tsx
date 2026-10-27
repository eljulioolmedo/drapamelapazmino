import React from 'react';
import { X, BookOpen, Printer, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { FREE_GUIDE_CONTENT, SITE_CONFIG } from '../data/siteContent';

interface FreeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (specialtyId?: string) => void;
}

export const FreeGuideModal: React.FC<FreeGuideModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[2.25rem] bg-white shadow-[0_32px_80px_-16px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/20">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 backdrop-blur-xl px-6 sm:px-8 py-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-cyan-600 font-bold">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{FREE_GUIDE_CONTENT.badge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {FREE_GUIDE_CONTENT.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-4 py-2 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 sm:p-8 text-white shadow-lg shadow-cyan-500/20">
            <p className="text-xs uppercase tracking-widest text-cyan-100 font-bold">
              E-Book Clínico Educativo · Acceso Libre
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              {FREE_GUIDE_CONTENT.subtitle}
            </h3>
            <p className="text-xs text-cyan-50 mt-2">
              Autora: {FREE_GUIDE_CONTENT.author} · {SITE_CONFIG.clinicName} (Quito)
            </p>
          </div>

          <div className="space-y-4">
            {FREE_GUIDE_CONTENT.chapters.map((chapter) => (
              <div
                key={chapter.number}
                className="rounded-3xl bg-slate-50/70 p-6 ring-1 ring-slate-200/70 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 text-xs font-extrabold text-white">
                    {chapter.number}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                    {chapter.title}
                  </h4>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{chapter.content}</p>

                <div className="rounded-2xl bg-cyan-50 p-4 flex items-start gap-3 ring-1 ring-cyan-500/15">
                  <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-cyan-900 leading-relaxed">{chapter.tip}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-cyan-50/80 p-6 ring-1 ring-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700">
                <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                <span>¿Te identificaste con esta guía?</span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                Agenda tu valoración personalizada de ATM Integral y Bruxismo en Quito.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 transition cursor-pointer"
              >
                <Printer className="h-4 w-4 text-cyan-600" />
                <span>Guardar PDF</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking('atm-integral');
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Agendar Cita Ahora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
