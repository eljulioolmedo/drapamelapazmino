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

const ScrollToTopAndHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
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
      <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
        <Navbar
          onOpenBooking={(specId) => handleOpenBooking(specId)}
          onOpenQuiz={() => setQuizModalOpen(true)}
        />

        <main className="flex-1">
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

export default App;
