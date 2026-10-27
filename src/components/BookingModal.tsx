import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Phone, MapPin, CheckCircle2, Calendar, Sparkles, Copy, Check } from 'lucide-react';
import { SITE_CONFIG, SPECIALTIES } from '../data/siteContent';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpecialtyId?: string;
  initialNote?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialSpecialtyId = 'atm-integral',
  initialNote = '',
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialtyId || 'atm-integral');
  const [preferredSchedule, setPreferredSchedule] = useState('Mañana (09h00 - 13h00)');
  const [symptomsNote, setSymptomsNote] = useState(initialNote);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialSpecialtyId) {
      setSelectedSpecialty(initialSpecialtyId);
    }
  }, [initialSpecialtyId]);

  useEffect(() => {
    if (initialNote) {
      setSymptomsNote(initialNote);
    }
  }, [initialNote]);

  if (!isOpen) return null;

  const specialtyObj = SPECIALTIES.find((s) => s.id === selectedSpecialty) || SPECIALTIES[0];

  const buildWhatsAppMessage = () => {
    const lines = [
      `Hola Dra. Pamela Pazmiño / equipo de Dental Check UIO 👋`,
      `Me gustaría agendar una cita de valoración desde *drapamelapazmino.com*.`,
      ``,
      `• *Nombre:* ${patientName.trim() || 'Paciente'}`,
      patientPhone.trim() ? `• *Teléfono:* ${patientPhone.trim()}` : null,
      `• *Motivo / Especialidad:* ${specialtyObj.title}`,
      `• *Horario de preferencia:* ${preferredSchedule}`,
      symptomsNote.trim() ? `• *Síntomas o consulta:* ${symptomsNote.trim()}` : null,
      ``,
      `Quedo atento/a a la disponibilidad en el consultorio (Av. La Coruña y Francisco de Orellana). ¡Muchas gracias!`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumberClean}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(buildWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A292A]/75 p-4 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] shadow-2xl border border-[#0F3D3E]/15">
        {/* Top Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#0F3D3E]/10 bg-[#0F3D3E] px-6 py-5 text-white">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Agendamiento Directo · Quito</span>
            </div>
            <h2 id="booking-modal-title" className="font-editorial text-2xl font-semibold mt-0.5">
              Agendar Valoración con la Dra. Pamela Pazmiño
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition"
            aria-label="Cerrar ventana"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="p-6 sm:p-7 space-y-5">
          <div className="rounded-2xl bg-[#EBF2F0] p-4 border border-[#0F3D3E]/10 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#0F3D3E] shrink-0 mt-0.5" />
            <p className="text-xs text-[#182625] leading-relaxed">
              Completa tus datos para preparar tu ficha de pre-valoración. Al hacer clic en <strong>Confirmar por WhatsApp</strong>, se abrirá un chat directo con nuestro consultorio en <strong>Dental Check UIO</strong> ({SITE_CONFIG.whatsappDisplay}).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
                Tu Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Ej. Carolina Andrade"
                className="w-full rounded-xl border border-[#0F3D3E]/20 bg-white px-4 py-2.5 text-sm text-[#182625] focus:border-[#0F3D3E] focus:outline-none focus:ring-2 focus:ring-[#0F3D3E]/15"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
                Teléfono / Celular (Opcional)
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="Ej. 099 123 4567"
                className="w-full rounded-xl border border-[#0F3D3E]/20 bg-white px-4 py-2.5 text-sm text-[#182625] focus:border-[#0F3D3E] focus:outline-none focus:ring-2 focus:ring-[#0F3D3E]/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
              Especialidad o Motivo de Consulta
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full rounded-xl border border-[#0F3D3E]/20 bg-white px-4 py-2.5 text-sm text-[#182625] focus:border-[#0F3D3E] focus:outline-none focus:ring-2 focus:ring-[#0F3D3E]/15"
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.title} ({spec.brandTag})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
              Horario de Preferencia
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                'Mañana (09h00 - 13h00)',
                'Tarde (14h00 - 19h00)',
                'Sábado (09h00 - 14h00)',
              ].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setPreferredSchedule(slot)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                    preferredSchedule === slot
                      ? 'border-[#0F3D3E] bg-[#0F3D3E] text-white shadow-sm'
                      : 'border-[#0F3D3E]/20 bg-white text-[#182625] hover:bg-[#EBF2F0]'
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>{slot}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
              Cuéntanos brevemente tus síntomas o consulta (Opcional)
            </label>
            <textarea
              rows={3}
              value={symptomsNote}
              onChange={(e) => setSymptomsNote(e.target.value)}
              placeholder="Ej. Siento chasquidos al abrir la boca y dolor de cuello al despertar, o deseo una valoración de Rehabilitación Oral / Dental Check..."
              className="w-full rounded-xl border border-[#0F3D3E]/20 bg-white px-4 py-2.5 text-sm text-[#182625] focus:border-[#0F3D3E] focus:outline-none focus:ring-2 focus:ring-[#0F3D3E]/15"
            />
          </div>

          {/* Primary Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-[#134E4A] transition cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 text-[#C5A059]" />
              <span>Enviar Solicitud por WhatsApp ({SITE_CONFIG.whatsappDisplay})</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0F3D3E]/25 bg-white px-4 py-3.5 text-xs font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-700" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copiado' : 'Copiar Resumen'}</span>
            </button>
          </div>

          {/* Direct Landline & Address Footer */}
          <div className="border-t border-[#0F3D3E]/10 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#4A5D5B]">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#0F3D3E]" />
              <span>
                Fijo Clínica:{' '}
                <a href={`tel:${SITE_CONFIG.landlineClean}`} className="font-semibold text-[#0F3D3E] hover:underline">
                  {SITE_CONFIG.landlineDisplay}
                </a>
              </span>
            </div>
            <a
              href={SITE_CONFIG.address.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#0F3D3E] hover:underline"
            >
              <MapPin className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Av. La Coruña y Fco. de Orellana, Quito (Ver Mapa)</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
