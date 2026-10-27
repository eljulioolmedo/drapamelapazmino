import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Calendar, Activity } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteContent';
import { InstagramIcon as Instagram } from './ClinicalVisuals';

interface NavbarProps {
  onOpenBooking: (specialtyId?: string) => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', to: '/' },
    { label: 'Enfoque & Ciencia', to: '/sobre-mi' },
    { label: 'Especialidades & ATM', to: '/especialidades' },
    { label: 'Artículos & Guía', to: '/blog' },
    { label: 'Contacto', to: '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full pt-3 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Floating Minimalist Glass Pill Header */}
        <div className="rounded-full bg-white/85 backdrop-blur-2xl px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4 shadow-[0_8px_32px_-8px_rgba(6,182,212,0.14)] ring-1 ring-cyan-500/15">
          {/* Official DentalCheck Icon + Dra. Pamela Pazmiño Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white p-1.5 shadow-md shadow-cyan-500/15 ring-1 ring-cyan-500/25 group-hover:scale-105 transition-transform">
              <img
                src="/images/clinic/dentalcheck-icon.png"
                alt="DentalCheck Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-extrabold text-slate-900 leading-none tracking-tight whitespace-nowrap">
                Dra. Pamela Pazmiño
              </span>
              <span className="block text-[10px] uppercase tracking-[0.14em] text-cyan-600 font-bold mt-1 whitespace-nowrap">
                ATM Integral · Rehabilitación · Bruxismo
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-slate-100/80 p-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-cyan-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action Pills */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={SITE_CONFIG.social.instagramPersonal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition"
              title={SITE_CONFIG.social.instagramPersonal.handle}
            >
              <Instagram className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-4 py-2 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition cursor-pointer"
            >
              <Activity className="h-3.5 w-3.5 text-cyan-500" />
              <span>Test ATM</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenBooking('atm-integral')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-500/25 hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Agendar Cita</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-full bg-cyan-50 p-2.5 text-cyan-700 hover:bg-cyan-100 transition"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Floating Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl p-5 shadow-2xl ring-1 ring-cyan-500/15 space-y-4">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-50 px-4 py-3 text-xs font-bold text-cyan-700"
              >
                <Activity className="h-4 w-4 text-cyan-500" />
                <span>Test Interactivo ATM</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking('atm-integral');
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-cyan-500/20"
              >
                <Calendar className="h-4 w-4" />
                <span>Agendar Cita</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
