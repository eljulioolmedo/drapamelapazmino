import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Activity,
  Share2,
} from 'lucide-react';
import { BLOG_POSTS, FREE_GUIDE_CONTENT, SITE_CONFIG, SPECIALTIES } from '../data/siteContent';
import { ViteCyanCanvas, SonoramaVitalMediaHub } from '../components/ClinicalVisuals';

interface BlogPageProps {
  onOpenBooking: (specialtyId?: string, note?: string) => void;
  onOpenGuide: () => void;
  onOpenQuiz: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenBooking, onOpenGuide, onOpenQuiz }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  if (slug) {
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
      return (
        <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900">Artículo no encontrado</h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-xs font-bold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Blog</span>
          </Link>
        </div>
      );
    }

    const relatedSpec =
      SPECIALTIES.find((s) => s.id === post.relatedSpecialtyId) || SPECIALTIES[0];

    const handleShareWhatsApp = () => {
      const text = encodeURIComponent(
        `Mira este artículo de la Dra. Pamela Pazmiño sobre "${post.title}": https://${SITE_CONFIG.domain}/blog/${post.slug}`
      );
      window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
    };

    return (
      <div className="pb-24">
        <section className="relative overflow-hidden pt-12 pb-14 bg-vite-grid border-b border-slate-200/70">
          <ViteCyanCanvas className="absolute inset-0 h-full w-full" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-5">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-600 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a todos los artículos</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-cyan-500 px-3.5 py-1 font-bold text-white">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                <Clock className="h-3.5 w-3.5 text-cyan-500" />
                {post.readTime}
              </span>
              <span className="text-slate-400">• {post.date}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70">
              <div>
                <p className="text-xs font-extrabold text-slate-900">Por: {post.author}</p>
                <p className="text-[11px] text-cyan-700 font-medium">{post.authorRole}</p>
              </div>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200 hover:ring-cyan-400 transition cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5 text-cyan-500" />
                <span>Compartir</span>
              </button>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
          <div className="rounded-3xl bg-cyan-50/70 p-6 sm:p-8 ring-1 ring-cyan-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-cyan-700">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              <span>Puntos Clave de Evidencia</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
              {post.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            {post.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.highlightBox && (
                  <div className="rounded-2xl bg-cyan-50 p-5 border-l-4 border-cyan-500 text-sm font-semibold text-cyan-900 leading-relaxed">
                    {sec.highlightBox}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-[2.25rem] bg-slate-950 p-7 sm:p-10 text-white shadow-xl ring-1 ring-cyan-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                Dental Check UIO · Quito
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                ¿Te identificas con este artículo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Agenda una valoración de <strong>{relatedSpec.title}</strong> con la Dra. Pamela Pazmiño en Dental Check UIO ({SITE_CONFIG.address.street}).
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenBooking(relatedSpec.id, `Leí el artículo "${post.title}" y deseo agendar valoración.`)
              }
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-4 text-xs sm:text-sm font-extrabold text-slate-950 hover:bg-cyan-300 transition shrink-0 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Agendar Cita Ahora</span>
            </button>
          </div>
        </article>
      </div>
    );
  }

  const categories = [
    'Todos',
    'ATM Integral',
    'Bruxismo y Ciencia',
    'Rehabilitación Oral',
    'Prevención Dental Check',
    'Estética Biológica',
  ];

  const filteredPosts =
    selectedCategory === 'Todos'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-20 pb-24">
      {/* 1. HEADER */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-vite-grid">
        <ViteCyanCanvas className="absolute inset-0 h-full w-full" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-cyan-700 ring-1 ring-cyan-500/20 shadow-2xs">
            <BookOpen className="h-3.5 w-3.5 text-cyan-500" />
            <span>Artículos, Guía Gratuita y Sonorama Vital</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Divulgación Científica en{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-transparent">
              Salud Oral y Bienestar
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Artículos clínicos, guías descargables y programas en vivo de <strong>Sonorama Vital</strong> con la Dra. Pamela Pazmiño.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-md shadow-cyan-500/25'
                    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-cyan-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ARTICLES GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group rounded-[2rem] bg-white p-7 ring-1 ring-slate-200/80 hover:ring-cyan-400 hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.18)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="rounded-full bg-cyan-50 px-3 py-1 font-bold text-cyan-700">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
                <span>Leer artículo completo</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SONORAMA VITAL VIDEO HUB */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SonoramaVitalMediaHub />
      </section>

      {/* 4. E-BOOK & QUIZ CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-[2.25rem] bg-gradient-to-r from-cyan-500 to-sky-600 p-8 text-white shadow-lg flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white">
                E-Book Descargable Gratuito
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {FREE_GUIDE_CONTENT.title}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-50 leading-relaxed">
                {FREE_GUIDE_CONTENT.subtitle}
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenGuide}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-extrabold text-cyan-700 hover:bg-cyan-50 transition cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Abrir y Descargar Guía en PDF</span>
              </button>
            </div>
          </div>

          <div className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200/80 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold text-cyan-700">
                Autoevaluación Interactiva
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Test de ATM Integral y Bruxismo
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Responde 5 preguntas clínicas rápidas para evaluar si tus síntomas corresponden a sobrecarga articular en la ATM o bruxismo.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-cyan-600 transition cursor-pointer"
              >
                <Activity className="h-4 w-4 text-cyan-400" />
                <span>Iniciar Autoevaluación</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
