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
import { InstagramIcon as Instagram } from '../components/ClinicalVisuals';

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
        `Deseo agendar una cita desde la página de Contacto de *drapamelapazmino.com*:\n\n` +
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
    <div className="space-y-20 pb-20">
      {/* 1. HEADER */}
      <section className="bg-gradient-to-b from-[#EBF2F0]/80 to-[#FAF8F5] pt-10 pb-14 border-b border-[#0F3D3E]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F3D3E] border border-[#0F3D3E]/15">
            <MapPin className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Ubicación y Agendamiento · Quito</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0F3D3E] leading-tight">
            Contacto y Reserva de Citas
          </h1>

          <p className="text-sm sm:text-base text-[#334745] leading-relaxed">
            Atendemos en nuestro centro odontológico <strong>{SITE_CONFIG.clinicName}</strong> ({SITE_CONFIG.address.street}, {SITE_CONFIG.address.sector}). Escríbenos para coordinar tu valoración especializada.
          </p>
        </div>
      </section>

      {/* 2. CONTACT FORM & CLINIC DETAILS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Appointment Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-7 sm:p-10 shadow-xl border border-[#0F3D3E]/12 space-y-6">
            <div className="space-y-1.5 border-b border-[#0F3D3E]/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
                Solicitud Directa de Cita
              </span>
              <h2 className="font-editorial text-3xl font-semibold text-[#0F3D3E]">
                Prepara tu valoración por WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5D5B]">
                Completa este formulario rápido y te conectaremos de inmediato con nuestra agenda clínica en Quito ({SITE_CONFIG.whatsappDisplay}).
              </p>
            </div>

            <form onSubmit={handleDirectFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full rounded-xl border border-[#0F3D3E]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#182625] focus:border-[#0F3D3E] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
                    Teléfono / Celular
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 099 189 7077"
                    className="w-full rounded-xl border border-[#0F3D3E]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#182625] focus:border-[#0F3D3E] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
                  Área de Especialidad o Tratamiento
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full rounded-xl border border-[#0F3D3E]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#182625] focus:border-[#0F3D3E] focus:bg-white focus:outline-none"
                >
                  {SPECIALTIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.brandTag})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
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
                      className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition cursor-pointer ${
                        schedule === slot
                          ? 'border-[#0F3D3E] bg-[#0F3D3E] text-white'
                          : 'border-[#0F3D3E]/20 bg-[#FAF8F5] text-[#182625] hover:bg-[#EBF2F0]'
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F3D3E] mb-1.5">
                  Síntomas o Motivo de Consulta (Opcional)
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos si presentas dolor mandibular, chasquidos en la ATM, bruxismo, desgaste dental o si buscas una valoración integral Dental Check..."
                  className="w-full rounded-xl border border-[#0F3D3E]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#182625] focus:border-[#0F3D3E] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3D3E] px-6 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#134E4A] transition cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-[#C5A059]" />
                <span>Enviar Solicitud a WhatsApp ({SITE_CONFIG.whatsappDisplay})</span>
              </button>
            </form>
          </div>

          {/* Right: Direct Contact Info Cards & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#0F3D3E] p-7 sm:p-8 text-white shadow-xl border border-[#C5A059]/30 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  Consultorio en Quito
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold mt-1">
                  {SITE_CONFIG.doctorName} · {SITE_CONFIG.clinicName}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#E6F0EE]">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Dirección Clínica:</p>
                    <p>{SITE_CONFIG.address.street}</p>
                    <p>{SITE_CONFIG.address.sector} · {SITE_CONFIG.address.city}</p>
                    <p className="text-xs text-[#D5E5E2]/80 mt-0.5">{SITE_CONFIG.address.reference}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Líneas de Atención:</p>
                    <p>
                      WhatsApp / Móvil:{' '}
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsappNumberClean}`}
                        className="text-[#C5A059] font-semibold hover:underline"
                      >
                        {SITE_CONFIG.whatsappDisplay}
                      </a>
                    </p>
                    <p>
                      Teléfono Fijo Clínica:{' '}
                      <a href={`tel:${SITE_CONFIG.landlineClean}`} className="text-[#C5A059] font-semibold hover:underline">
                        {SITE_CONFIG.landlineDisplay}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Horarios de Atención:</p>
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
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A292A] hover:bg-[#d4b26c] transition"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Abrir Ubicación Exacta en Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={SITE_CONFIG.social.instagramPersonal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
                  >
                    <Instagram className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
                  </a>
                  <a
                    href={SITE_CONFIG.social.instagramClinic.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
                  >
                    <Instagram className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Map of Av. La Coruña y Francisco de Orellana, Quito */}
            <div className="overflow-hidden rounded-3xl border border-[#0F3D3E]/15 bg-white shadow-md">
              <div className="p-4 border-b border-[#0F3D3E]/10 flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F3D3E] flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
                  Mapa del Sector: Av. La Coruña y Fco. de Orellana
                </span>
                <a
                  href={SITE_CONFIG.address.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0F3D3E] font-semibold hover:underline"
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

      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0F3D3E]">
            <HelpCircle className="h-4 w-4 text-[#C5A059]" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0F3D3E]">
            Resolvemos tus dudas antes de tu visita
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-6 shadow-xs border border-[#0F3D3E]/12 space-y-2"
            >
              <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#0F3D3E]">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5D5B] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
