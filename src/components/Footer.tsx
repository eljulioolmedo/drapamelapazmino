import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Calendar, MessageCircle, ExternalLink, BookOpen } from 'lucide-react';
import { SITE_CONFIG, SPECIALTIES } from '../data/siteContent';
import { InstagramIcon as Instagram } from './ClinicalVisuals';

interface FooterProps {
  onOpenBooking: (specialtyId?: string) => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenGuide }) => {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300 pt-20 pb-14">
      {/* Signature Architectural Wooden Slats + Cyan Glow Top Bar */}
      <div className="absolute top-0 inset-x-0 h-2.5 bg-wood-slats opacity-90" />
      <div className="absolute top-2.5 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-white font-extrabold text-sm">
                PP
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {SITE_CONFIG.doctorName}
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-cyan-400 font-bold">
                  ATM Integral · Rehabilitación · Quito
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Práctica especializada de la <strong className="text-white">{SITE_CONFIG.doctorFullName}</strong> en{' '}
              <strong className="text-cyan-300">{SITE_CONFIG.clinicName}</strong>. Odontología minimalista basada en evidencia para el manejo de ATM Integral, bruxismo y rehabilitación estética conservadora.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={SITE_CONFIG.social.instagramPersonal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3.5 py-2 text-xs font-semibold text-white hover:bg-cyan-500 hover:text-slate-950 transition"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
              </a>
              <a
                href={SITE_CONFIG.social.instagramClinic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3.5 py-2 text-xs font-semibold text-white hover:bg-cyan-500 hover:text-slate-950 transition"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
              </a>
            </div>
          </div>

          {/* Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Explorar
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-300 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/sobre-mi" className="hover:text-cyan-300 transition">
                  Enfoque & Ciencia
                </Link>
              </li>
              <li>
                <Link to="/especialidades" className="hover:text-cyan-300 transition">
                  Especialidades & ATM
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cyan-300 transition">
                  Artículos Clínicos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-cyan-300 transition">
                  Contacto & Mapa
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="inline-flex items-center gap-1.5 text-left text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  <span>E-Book Gratuito ATM</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Specialties (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Especialidades
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {SPECIALTIES.map((spec) => (
                <li key={spec.id}>
                  <Link
                    to={`/especialidades#${spec.id}`}
                    className="hover:text-cyan-300 transition block leading-snug"
                  >
                    {spec.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Dental Check UIO · Quito
            </h4>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{SITE_CONFIG.address.street}</p>
                  <p>{SITE_CONFIG.address.sector} · {SITE_CONFIG.address.city}</p>
                  <a
                    href={SITE_CONFIG.address.googleMapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 font-semibold hover:underline mt-1"
                  >
                    <span>Ver en Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
                <div>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumberClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-300 font-semibold"
                  >
                    WhatsApp: {SITE_CONFIG.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenBooking('atm-integral')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 hover:from-cyan-300 hover:to-cyan-400 transition shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Agendar Cita Ahora</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.doctorFullName} · {SITE_CONFIG.domain}
          </p>
          <p>
            Centro Clínico: <strong className="text-slate-300">{SITE_CONFIG.clinicName}</strong> ({SITE_CONFIG.social.instagramClinic.handle}) · Quito, Ecuador
          </p>
        </div>
      </div>

      {/* Floating Minimalist Cyan WhatsApp Pill */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => onOpenBooking('atm-integral')}
          className="group flex items-center gap-2.5 rounded-full bg-slate-900/95 backdrop-blur-xl pl-4 pr-5 py-3.5 text-white shadow-[0_16px_40px_-8px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/40 hover:bg-cyan-500 hover:text-slate-950 transition-all cursor-pointer"
          aria-label="Agendar cita por WhatsApp"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 group-hover:bg-slate-950" />
          </span>
          <MessageCircle className="h-4 w-4 text-cyan-400 group-hover:text-slate-950" />
          <span className="text-xs font-bold tracking-wide">Agendar · WhatsApp</span>
        </button>
      </div>
    </footer>
  );
};
