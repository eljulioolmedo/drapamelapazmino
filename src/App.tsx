import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AtmQuizModal } from './components/AtmQuizModal';
import { FreeGuideModal } from './components/FreeGuideModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { CmsProvider, useCms } from './context/CmsContext';

const ScrollToTopAndHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach staggered scroll-reveal animations to headings, cards, and blocks below the hero
    const timer = setTimeout(() => {
      const sections = Array.from(document.querySelectorAll('main > div > section'));
      const revealTargets: HTMLElement[] = [];

      sections.forEach((sec, secIdx) => {
        // Skip Hero section (secIdx === 0) because it has its own immediate keyframe animations
        if (secIdx === 0) return;

        const headings = Array.from(sec.querySelectorAll('h2')) as HTMLElement[];
        headings.forEach((h) => {
          h.classList.add('reveal-on-scroll');
          revealTargets.push(h);
        });

        const grids = Array.from(sec.querySelectorAll('.grid'));
        grids.forEach((grid) => {
          const children = Array.from(grid.children) as HTMLElement[];
          children.forEach((child, idx) => {
            child.classList.add('reveal-on-scroll');
            child.style.transitionDelay = `${(idx % 4) * 110}ms`;
            revealTargets.push(child);
          });
        });
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
      );

      revealTargets.forEach((el) => observer.observe(el));
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

const AppShell: React.FC = () => {
  const { cmsVersion } = useCms();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSpecialtyId, setBookingSpecialtyId] = useState<string>('atm-integral');
  const [bookingInitialNote, setBookingInitialNote] = useState<string>('');
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  const handleOpenBooking = (specialtyId = 'atm-integral', note = '') => {
    setBookingSpecialtyId(specialtyId);
    setBookingInitialNote(note);
    setBookingModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTopAndHash />
      <div
        data-cms-version={cmsVersion}
        className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900"
      >
        {/* Endless Seamless Architectural Wood Slats + Cyan Glass Background Across All Pages */}
        <div
          className="pointer-events-none fixed inset-y-0 left-0 w-full lg:w-[58%] bg-repeat-y bg-[length:100%_auto] bg-left opacity-35 lg:opacity-50 z-0"
          style={{ backgroundImage: "url('/images/clinic/wood-cyan-endless.jpg')" }}
        />
        <div className="pointer-events-none fixed inset-0 bg-gradient-to-r from-transparent via-white/80 to-white/95 z-0" />

        <Navbar
          onOpenBooking={(specId) => handleOpenBooking(specId)}
          onOpenQuiz={() => setQuizModalOpen(true)}
        />

        <main className="relative z-10 flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenBooking={handleOpenBooking}
                  onOpenGuide={() => setGuideModalOpen(true)}
                />
              }
            />
            <Route
              path="/sobre-mi"
              element={<AboutPage onOpenBooking={handleOpenBooking} />}
            />
            <Route
              path="/especialidades"
              element={
                <SpecialtiesPage
                  onOpenBooking={handleOpenBooking}
                  onOpenQuiz={() => setQuizModalOpen(true)}
                />
              }
            />
            <Route
              path="/blog"
              element={
                <BlogPage
                  onOpenBooking={handleOpenBooking}
                  onOpenGuide={() => setGuideModalOpen(true)}
                  onOpenQuiz={() => setQuizModalOpen(true)}
                />
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <BlogPage
                  onOpenBooking={handleOpenBooking}
                  onOpenGuide={() => setGuideModalOpen(true)}
                  onOpenQuiz={() => setQuizModalOpen(true)}
                />
              }
            />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="*"
              element={
                <HomePage
                  onOpenBooking={handleOpenBooking}
                  onOpenGuide={() => setGuideModalOpen(true)}
                />
              }
            />
          </Routes>
        </main>

        <Footer
          onOpenBooking={(specId) => handleOpenBooking(specId)}
          onOpenGuide={() => setGuideModalOpen(true)}
        />

        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          initialSpecialtyId={bookingSpecialtyId}
          initialNote={bookingInitialNote}
        />

        <AtmQuizModal
          isOpen={quizModalOpen}
          onClose={() => setQuizModalOpen(false)}
          onOpenBookingWithNote={(specId, note) => handleOpenBooking(specId, note)}
        />

        <FreeGuideModal
          isOpen={guideModalOpen}
          onClose={() => setGuideModalOpen(false)}
          onOpenBooking={(specId) => handleOpenBooking(specId)}
        />
      </div>
    </BrowserRouter>
  );
};

export const App: React.FC = () => (
  <CmsProvider>
    <AppShell />
  </CmsProvider>
);

export default App;
