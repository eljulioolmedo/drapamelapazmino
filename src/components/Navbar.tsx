import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Calendar, Activity } from 'lucide-react';
import { InstagramIcon as Instagram } from './ClinicalVisuals';
import { SITE_CONFIG } from '../data/siteContent';

interface NavbarProps {
  onOpenBooking: (specialtyId?: string) => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', to: '/' },
    { label: 'Sobre Mí', to: '/sobre-mi' },
    { label: 'Especialidades y ATM', to: '/especialidades' },
    { label: 'Blog y Recursos', to: '/blog' },
    { label: 'Contacto', to: '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Clinical Information Bar */}
      <div className="bg-[#0A292A] text-[#E6F0EE] text-xs py-2 px-4 border-b border-white/10">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={SITE_CONFIG.address.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#C5A059] transition"
            >
              <MapPin className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Quito: {SITE_CONFIG.address.street} · Dental Check UIO</span>
            </a>
            <span className="hidden md:inline text-white/25">|</span>
            <a
              href={`tel:${SITE_CONFIG.landlineClean}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#C5A059] transition"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{SITE_CONFIG.whatsappDisplay} / {SITE_CONFIG.landlineDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.social.instagramPersonal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#C5A059] transition font-medium"
            >
              <Instagram className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{SITE_CONFIG.social.instagramPersonal.handle}</span>
            </a>
            <a
              href={SITE_CONFIG.social.instagramClinic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#C5A059] transition font-medium"
            >
              <Instagram className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{SITE_CONFIG.social.instagramClinic.handle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#0F3D3E]/10 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F3D3E] text-[#FAF8F5] font-editorial text-xl font-bold tracking-wider border border-[#C5A059]/40 shadow-sm group-hover:bg-[#134E4A] transition">
              <span>P</span>
              <span className="text-[#C5A059]">P</span>
            </div>
            <div>
              <span className="block font-editorial text-xl sm:text-2xl font-bold text-[#0F3D3E] leading-none tracking-tight">
                Dra. Pamela Pazmiño
              </span>
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#4A5D5B] font-semibold mt-1">
                Rehabilitación Oral · ATM Integral · Dental Check
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#EBF2F0] text-[#0F3D3E] font-semibold'
                      : 'text-[#182625]/80 hover:text-[#0F3D3E] hover:bg-[#EBF2F0]/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#0F3D3E]/20 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition cursor-pointer"
            >
              <Activity className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Test ATM / Bruxismo</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenBooking('atm-integral')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#134E4A] transition cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-[#C5A059]" />
              <span>Agendar Cita</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-xl border border-[#0F3D3E]/15 p-2.5 text-[#0F3D3E] hover:bg-[#EBF2F0] transition"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#0F3D3E]/10 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-[#0F3D3E] text-white font-semibold'
                        : 'text-[#182625] hover:bg-[#EBF2F0]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#0F3D3E]/25 bg-white px-4 py-3 text-xs font-semibold text-[#0F3D3E]"
              >
                <Activity className="h-4 w-4 text-[#C5A059]" />
                <span>Realizar Test de ATM y Bruxismo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking('atm-integral');
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F3D3E] px-4 py-3 text-xs font-semibold text-white"
              >
                <Calendar className="h-4 w-4 text-[#C5A059]" />
                <span>Agendar Valoración</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
