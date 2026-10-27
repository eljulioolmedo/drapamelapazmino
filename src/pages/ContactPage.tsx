import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ExternalLink,
  HelpCircle,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { SITE_CONFIG, SPECIALTIES, FAQS } from '../data/siteContent';
import { ViteCyanCanvas, InstagramIcon as Instagram } from '../components/ClinicalVisuals';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState(SPECIALTIES[0].id);
  const [schedule, setSchedule] = useState('Mañana (09h00 - 13h00)');
  const [message, setMessage] = useState('');

  const handleDirectFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specTitle = SPECIALTIES.find((s) => s.id === specialty)?.title || 'Valoración General';
    const text = encodeURIComponent(
      `Hola Dra. Pamela Pazmiño / Dental Check UIO 👋\n` +
        `Deseo agendar una cita desde *drapamelapazmino.com*:\n\n` +
        `• *Nombre:* ${name.trim() || 'Paciente'}\n` +
        (phone.trim() ? `• *Teléfono:* ${phone.trim()}\n` : '') +
        `• *Especialidad:* ${specTitle}\n` +
        `• *Horario preferido:* ${schedule}\n` +
        (message.trim() ? `• *Consulta:* ${message.trim()}\n` : '') +
        `\n¡Muchas gracias!`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumberClean}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-20 pb-24">
      {/* 1. ARCHITECTURAL WOOD + CYAN GLASS HEADER */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <ViteCyanCanvas className="absolute inset-0 h-full w-full" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="animate-hero-up-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-cyan-700 ring-1 ring-cyan-500/20 shadow-2xs">
            <MapPin className="h-3.5 w-3.5 text-cyan-500" />
            <span>Ubicación y Agendamiento · Quito</span>
          </div>

          <h1 className="animate-hero-up-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Contacto y Reserva de{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-transparent">
              Valoración Clínica
            </span>
          </h1>

          <p className="animate-hero-up-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Atendemos en nuestro centro odontológico <strong>{SITE_CONFIG.clinicName}</strong> ({SITE_CONFIG.address.street}, {SITE_CONFIG.address.sector}).
          </p>
        </div>
      </section>

      {/* 2. FORM & MAP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 rounded-[2.25rem] bg-white p-7 sm:p-10 shadow-[0_24px_60px_-15px_rgba(6,182,212,0.14)] ring-1 ring-slate-200/80 space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 pb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600">
                Solicitud Directa de Cita
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Prepara tu valoración por WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Completa tus datos y te conectaremos de inmediato con nuestra agenda en Quito ({SITE_CONFIG.whatsappDisplay}).
              </p>
            </div>

            <form onSubmit={handleDirectFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Teléfono / Celular
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 096 042 4887"
                    className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Área de Especialidad
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {SPECIALTIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Jornada Preferida
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
                      onClick={() => setSchedule(slot)}
                      className={`flex items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-xs font-bold transition cursor-pointer ${
                        schedule === slot
                          ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                          : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-cyan-50'
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Síntomas o Motivo de Consulta (Opcional)
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos si presentas dolor mandibular, chasquidos en la ATM, bruxismo, desgaste dental o si buscas una valoración integral Dental Check..."
                  className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Enviar Solicitud a WhatsApp ({SITE_CONFIG.whatsappDisplay})</span>
              </button>
            </form>
          </div>

          {/* Right Location & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[2.25rem] bg-slate-950 p-7 sm:p-8 text-white shadow-xl ring-1 ring-cyan-400/30 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                  Consultorio en Quito
                </span>
                <h3 className="text-2xl font-extrabold mt-1">
                  {SITE_CONFIG.doctorName} · {SITE_CONFIG.clinicName}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Dirección Clínica:</p>
                    <p>{SITE_CONFIG.address.street}</p>
                    <p>{SITE_CONFIG.address.sector} · {SITE_CONFIG.address.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">WhatsApp Directo:</p>
                    <p>
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsappNumberClean}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 font-bold hover:underline"
                      >
                        {SITE_CONFIG.whatsappDisplay} ({SITE_CONFIG.whatsappInternational})
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Horarios:</p>
                    <p>{SITE_CONFIG.hours.weekdays}</p>
                    <p>{SITE_CONFIG.hours.saturdays}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={SITE_CONFIG.address.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 hover:bg-cyan-300 transition"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Abrir Ubicación en Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={SITE_CONFIG.social.instagramPersonal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 px-3 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
                  >
                    <Instagram className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
                  </a>
                  <a
                    href={SITE_CONFIG.social.instagramClinic.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 px-3 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
                  >
                    <Instagram className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] ring-1 ring-slate-200/80 bg-white shadow-md">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                  Av. Eloy Alfaro esq. y Alemania · Fortune Plaza (Torre Alemania)
                </span>
                <a
                  href={SITE_CONFIG.address.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 font-bold hover:underline"
                >
                  Ampliar
                </a>
              </div>
              <iframe
                title="Ubicación Dental Check UIO - Dra. Pamela Pazmiño en Quito"
                src={SITE_CONFIG.address.googleMapsEmbedQuery}
                className="w-full h-64 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-600">
            <HelpCircle className="h-4 w-4 text-cyan-500" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Resolvemos tus dudas antes de tu visita
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white p-6 shadow-2xs ring-1 ring-slate-200/80 space-y-2"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
