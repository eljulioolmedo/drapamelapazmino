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
    if (initialSpecialtyId) setSelectedSpecialty(initialSpecialtyId);
  }, [initialSpecialtyId]);

  useEffect(() => {
    if (initialNote) setSymptomsNote(initialNote);
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
      `• *Especialidad:* ${specialtyObj.title}`,
      `• *Horario preferido:* ${preferredSchedule}`,
      symptomsNote.trim() ? `• *Consulta:* ${symptomsNote.trim()}` : null,
      ``,
      `Quedo atento/a a la disponibilidad en Dental Check UIO (Av. Eloy Alfaro esq. y Alemania · Edificio Fortune Plaza, Torre Alemania). ¡Muchas gracias!`,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-[2rem] bg-white shadow-[0_32px_80px_-16px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/20">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 backdrop-blur-xl px-6 sm:px-8 py-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-cyan-600 font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Agendamiento Directo · Quito</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Reservar Valoración
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSendWhatsApp} className="p-6 sm:p-8 space-y-5">
          <div className="rounded-2xl bg-cyan-50/70 p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-700 leading-relaxed">
              Prepara tu ficha de pre-valoración. Al confirmar se abrirá tu chat directo con <strong>Dental Check UIO</strong> ({SITE_CONFIG.whatsappDisplay}).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Ej. Carolina Andrade"
                className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Celular (Opcional)
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="Ej. 099 123 4567"
                className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Especialidad o Motivo
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Horario de Preferencia
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                'Mañana (09h00 - 13h00)',
                'Tarde (14h00 - 19h00)',
                'Sábado (09h00 - 14h00)',
              ].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setPreferredSchedule(slot)}
                  className={`flex items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-xs font-semibold transition cursor-pointer ${
                    preferredSchedule === slot
                      ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                      : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-cyan-50'
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>{slot}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Síntomas o consulta (Opcional)
            </label>
            <textarea
              rows={3}
              value={symptomsNote}
              onChange={(e) => setSymptomsNote(e.target.value)}
              placeholder="Ej. Siento chasquidos al abrir la boca, tensión cervical al despertar o deseo una valoración estética..."
              className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Confirmar por WhatsApp ({SITE_CONFIG.whatsappDisplay})</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-cyan-600" />
              <span>
                WhatsApp:{' '}
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumberClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-800 hover:text-cyan-600"
                >
                  {SITE_CONFIG.whatsappDisplay}
                </a>
              </span>
            </div>
            <a
              href={SITE_CONFIG.address.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-cyan-600 hover:underline"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Av. Eloy Alfaro y Alemania (Fortune Plaza)</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
