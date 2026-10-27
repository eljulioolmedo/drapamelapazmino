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

interface BlogPageProps {
  onOpenBooking: (specialtyId?: string, note?: string) => void;
  onOpenGuide: () => void;
  onOpenQuiz: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenBooking, onOpenGuide, onOpenQuiz }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // If viewing a specific article (/blog/:slug)
  if (slug) {
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
      return (
        <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
          <h1 className="font-editorial text-4xl font-semibold text-[#0F3D3E]">
            Artículo no encontrado
          </h1>
          <p className="text-sm text-[#4A5D5B]">
            Te invitamos a explorar todos nuestros artículos de divulgación clínica.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-3 text-xs font-semibold text-white"
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
      <div className="pb-20">
        {/* Article Header */}
        <section className="bg-gradient-to-b from-[#EBF2F0]/80 to-[#FAF8F5] pt-10 pb-12 border-b border-[#0F3D3E]/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-5">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0F3D3E] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 text-[#C5A059]" />
              <span>Volver a todos los artículos</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-[#0F3D3E] px-3.5 py-1 font-semibold text-[#C5A059]">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[#4A5D5B]">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <span className="text-[#4A5D5B]">• {post.date}</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#0F3D3E] leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#334745] leading-relaxed">{post.excerpt}</p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#0F3D3E]/10">
              <div>
                <p className="text-xs font-bold text-[#0F3D3E]">Escrito por: {post.author}</p>
                <p className="text-[11px] text-[#4A5D5B]">{post.authorRole}</p>
              </div>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#0F3D3E]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#0F3D3E] hover:bg-[#EBF2F0] transition cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>Compartir artículo</span>
              </button>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
          {/* Key Clinical Takeaways Box */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-[#0F3D3E]/15 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
              <Sparkles className="h-4 w-4 text-[#C5A059]" />
              <span>Puntos Clave de Evidencia Clínica</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#182625]">
              {post.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#0F3D3E] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className="space-y-8">
            {post.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0F3D3E]">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-[#182625] leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.highlightBox && (
                  <div className="rounded-2xl bg-[#EBF2F0] p-5 border-l-4 border-[#0F3D3E] text-sm font-medium text-[#0F3D3E] leading-relaxed">
                    {sec.highlightBox}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Related Specialty CTA Box */}
          <div className="rounded-3xl bg-[#0F3D3E] p-7 sm:p-9 text-white shadow-xl border border-[#C5A059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Atención Especializada en Quito · Dental Check UIO
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold">
                ¿Te identificas con lo descrito en este artículo?
              </h3>
              <p className="text-xs sm:text-sm text-[#D5E5E2] leading-relaxed">
                Agenda una valoración de <strong>{relatedSpec.title}</strong> con la Dra. Pamela Pazmiño en nuestro consultorio de la Av. La Coruña y Francisco de Orellana.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenBooking(relatedSpec.id, `Leí el artículo "${post.title}" y deseo agendar valoración.`)
              }
              className="inline-flex items-center gap-2 rounded-2xl bg-[#C5A059] px-6 py-4 text-xs sm:text-sm font-bold text-[#0A292A] hover:bg-[#d4b26c] transition shrink-0 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Agendar Cita Ahora</span>
            </button>
          </div>
        </article>
      </div>
    );
  }

  // Otherwise render full Blog & Educational Resources index (/blog)
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
    <div className="space-y-20 pb-20">
      {/* 1. HEADER */}
      <section className="bg-gradient-to-b from-[#EBF2F0]/80 to-[#FAF8F5] pt-10 pb-14 border-b border-[#0F3D3E]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F3D3E] border border-[#0F3D3E]/15">
            <BookOpen className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Blog y Recursos Educativos · Dra. Pamela Pazmiño</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0F3D3E] leading-tight">
            Divulgación Odontológica Basada en Evidencia
          </h1>

          <p className="text-sm sm:text-base text-[#334745] leading-relaxed max-w-2xl mx-auto">
            Artículos clínicos y guías prácticas sobre <strong>ATM Integral, Bruxismo, Dolor Orofacial, Rehabilitación Biomimética y Prevención en Dental Check UIO</strong>.
          </p>

          {/* Category Filter */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F3D3E] text-white shadow'
                    : 'bg-white text-[#0F3D3E] border border-[#0F3D3E]/15 hover:bg-[#EBF2F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FEATURED RESOURCES BAR (E-Book + Interactive Test) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#0F3D3E] p-7 text-white shadow-lg border border-[#C5A059]/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-[#C5A059]/20 px-3 py-1 text-[11px] font-semibold text-[#C5A059]">
                E-Book Descargable Gratuito
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold">
                {FREE_GUIDE_CONTENT.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#D5E5E2] leading-relaxed">
                {FREE_GUIDE_CONTENT.subtitle}
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenGuide}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-5 py-3 text-xs font-bold text-[#0A292A] hover:bg-[#d4b26c] transition cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Abrir y Descargar Guía en PDF</span>
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lg border border-[#0F3D3E]/15 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-[#EBF2F0] px-3 py-1 text-[11px] font-semibold text-[#0F3D3E]">
                Herramienta Clínica Interactiva
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0F3D3E]">
                Test de ATM Integral, Bruxismo y Salud Oral
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5D5B] leading-relaxed">
                Responde 5 preguntas clínicas rápidas para evaluar si tus síntomas corresponden a sobrecarga articular en la ATM, bruxismo de vigilia o desgaste dental.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-3 text-xs font-semibold text-white hover:bg-[#134E4A] transition cursor-pointer"
              >
                <Activity className="h-4 w-4 text-[#C5A059]" />
                <span>Iniciar Autoevaluación Ahora</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARTICLES GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group rounded-3xl bg-white p-7 shadow-sm hover:shadow-xl border border-[#0F3D3E]/12 transition flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs text-[#4A5D5B]">
                  <span className="rounded-full bg-[#EBF2F0] px-3 py-1 font-semibold text-[#0F3D3E]">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-editorial text-2xl font-semibold text-[#182625] group-hover:text-[#0F3D3E] transition leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4A5D5B] leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#0F3D3E]/10 flex items-center justify-between text-xs font-bold text-[#0F3D3E]">
                <span>Leer artículo completo</span>
                <ArrowRight className="h-4 w-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
