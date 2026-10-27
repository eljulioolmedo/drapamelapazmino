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

  const handlePrintOrSavePdf = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A292A]/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] shadow-2xl border border-[#C5A059]/30">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#0F3D3E]/15 bg-[#0F3D3E] px-6 py-5 text-white">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{FREE_GUIDE_CONTENT.badge}</span>
            </div>
            <h2 id="guide-modal-title" className="font-editorial text-2xl sm:text-3xl font-semibold mt-0.5">
              {FREE_GUIDE_CONTENT.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintOrSavePdf}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-[#C5A059] hover:bg-white/20 transition cursor-pointer"
              title="Imprimir o Guardar como PDF"
            >
              <Printer className="h-4 w-4" />
              <span>Guardar PDF / Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition cursor-pointer"
              aria-label="Cerrar guía"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* E-Book Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-[#0F3D3E] to-[#134E4A] p-6 text-white shadow-md">
            <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
              E-Book Clínico Educativo · Acceso Libre
            </p>
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold mt-1">
              {FREE_GUIDE_CONTENT.subtitle}
            </h3>
            <p className="text-xs text-[#D5E5E2] mt-2">
              Autora: {FREE_GUIDE_CONTENT.author} · {SITE_CONFIG.clinicName} (Quito, Ecuador)
            </p>
          </div>

          <div className="space-y-5">
            {FREE_GUIDE_CONTENT.chapters.map((chapter) => (
              <div
                key={chapter.number}
                className="rounded-2xl bg-white p-6 shadow-sm border border-[#0F3D3E]/10 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F3D3E] text-xs font-bold text-[#C5A059]">
                    {chapter.number}
                  </span>
                  <h4 className="font-editorial text-xl sm:text-2xl font-semibold text-[#0F3D3E]">
                    {chapter.title}
                  </h4>
                </div>

                <p className="text-sm text-[#182625] leading-relaxed">{chapter.content}</p>

                <div className="rounded-xl bg-[#EBF2F0] p-4 border-l-4 border-[#0F3D3E] flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#0F3D3E] shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-[#0F3D3E] leading-relaxed">{chapter.tip}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="rounded-2xl bg-[#EBF2F0] p-6 border border-[#0F3D3E]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
                <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>¿Te identificaste con esta guía?</span>
              </div>
              <p className="text-sm font-semibold text-[#182625]">
                Agenda tu valoración personalizada de ATM Integral y Bruxismo en Quito.
              </p>
              <p className="text-xs text-[#4A5D5B]">
                Dental Check UIO · {SITE_CONFIG.address.street} · WhatsApp {SITE_CONFIG.whatsappDisplay}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={handlePrintOrSavePdf}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#0F3D3E]/25 bg-white px-4 py-2.5 text-xs font-semibold text-[#0F3D3E] hover:bg-[#FAF8F5] transition cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Guardar en PDF</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking('atm-integral');
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#134E4A] transition shadow cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-[#C5A059]" />
                <span>Agendar Cita Ahora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
