import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Calendar, MessageCircle, ExternalLink, ShieldCheck, BookOpen } from 'lucide-react';
import { InstagramIcon as Instagram } from './ClinicalVisuals';
import { SITE_CONFIG, SPECIALTIES } from '../data/siteContent';

interface FooterProps {
  onOpenBooking: (specialtyId?: string) => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenGuide }) => {
  return (
    <footer className="bg-[#0A292A] text-[#E6F0EE] border-t border-[#C5A059]/25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Specialist & Clinic Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F3D3E] text-white font-editorial text-xl font-bold border border-[#C5A059]/50">
                <span>P</span>
                <span className="text-[#C5A059]">P</span>
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-bold text-white leading-none">
                  {SITE_CONFIG.doctorName}
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-[#C5A059] font-semibold mt-1">
                  Rehabilitación Oral · ATM Integral · Quito
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#D5E5E2]/85 leading-relaxed">
              Práctica clínica especializada de la <strong>{SITE_CONFIG.doctorFullName}</strong> en{' '}
              <strong>{SITE_CONFIG.clinicName}</strong>. Odontología basada en evidencia científica para el alivio del dolor orofacial, manejo de ATM Integral, bruxismo y rehabilitación estética conservadora.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href={SITE_CONFIG.social.instagramPersonal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-medium text-white hover:bg-[#C5A059] hover:text-[#0A292A] transition"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
              </a>
              <a
                href={SITE_CONFIG.social.instagramClinic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-medium text-white hover:bg-[#C5A059] hover:text-[#0A292A] transition"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation & Resources (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#D5E5E2]/90">
              <li>
                <Link to="/" className="hover:text-[#C5A059] transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/sobre-mi" className="hover:text-[#C5A059] transition">
                  Sobre Mí (Conóceme)
                </Link>
              </li>
              <li>
                <Link to="/especialidades" className="hover:text-[#C5A059] transition">
                  Especialidades Clínicas
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#C5A059] transition">
                  Blog y Divulgación
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-[#C5A059] transition">
                  Ubicación y Contacto
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="inline-flex items-center gap-1.5 text-left text-[#C5A059] hover:underline font-medium cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  <span>Guía Gratuita de ATM</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical Specialties (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Áreas de Especialización
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#D5E5E2]/90">
              {SPECIALTIES.map((spec) => (
                <li key={spec.id}>
                  <Link
                    to={`/especialidades#${spec.id}`}
                    className="hover:text-[#C5A059] transition block leading-snug"
                  >
                    {spec.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Clinic Location & Direct Booking (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Consultorio en Quito · Dental Check
            </h4>

            <div className="space-y-2.5 text-xs text-[#D5E5E2]/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{SITE_CONFIG.clinicName}</p>
                  <p>{SITE_CONFIG.address.street}</p>
                  <p>{SITE_CONFIG.address.sector} · {SITE_CONFIG.address.city}</p>
                  <a
                    href={SITE_CONFIG.address.googleMapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C5A059] font-semibold hover:underline mt-1"
                  >
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#C5A059] shrink-0" />
                <div>
                  <a href={`https://wa.me/${SITE_CONFIG.whatsappNumberClean}`} className="hover:text-[#C5A059] font-semibold">
                    {SITE_CONFIG.whatsappDisplay}
                  </a>
                  {' / '}
                  <a href={`tel:${SITE_CONFIG.landlineClean}`} className="hover:text-[#C5A059]">
                    {SITE_CONFIG.landlineDisplay}
                  </a>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenBooking('atm-integral')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#0A292A] hover:bg-[#d4b26c] transition shadow-md cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Agendar Cita en Quito</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D5E5E2]/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
            <span>
              © {new Date().getFullYear()} {SITE_CONFIG.doctorFullName} · {SITE_CONFIG.domain} · Todos los derechos reservados.
            </span>
          </div>
          <p className="text-[11px]">
            Centro Clínico Adscrito: <strong className="text-white">{SITE_CONFIG.clinicName}</strong> ({SITE_CONFIG.social.instagramClinic.handle}) · Quito, Ecuador
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Quick-Action Button */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenBooking('atm-integral')}
          className="group flex items-center gap-2.5 rounded-full bg-[#0F3D3E] pl-4 pr-5 py-3.5 text-white shadow-2xl border border-[#C5A059]/50 hover:bg-[#134E4A] transition-all cursor-pointer"
          aria-label="Agendar cita por WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
          </span>
          <MessageCircle className="h-5 w-5 text-[#C5A059]" />
          <span className="text-xs font-semibold tracking-wide">Agendar Cita · WhatsApp</span>
        </button>
      </div>
    </footer>
  );
};
