import React, { useState } from 'react';
import { X, Activity, ArrowRight, RotateCcw, CheckCircle2, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { ATM_QUIZ_QUESTIONS, SITE_CONFIG } from '../data/siteContent';

interface AtmQuizProps {
  onOpenBookingWithNote: (specialtyId: string, note: string) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const AtmQuizContent: React.FC<AtmQuizProps> = ({
  onOpenBookingWithNote,
  isModal = false,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; points: number; tag: string; label: string }[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelectOption = (option: { label: string; points: number; tag: string }) => {
    const q = ATM_QUIZ_QUESTIONS[currentStep];
    const updated = [
      ...answers.filter((a) => a.questionId !== q.id),
      { questionId: q.id, points: option.points, tag: option.tag, label: option.label },
    ];
    setAnswers(updated);

    if (currentStep + 1 < ATM_QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setCurrentStep(0);
    setCompleted(false);
  };

  const totalScore = answers.reduce((acc, item) => acc + item.points, 0);

  const getAssessmentResult = () => {
    if (totalScore >= 8) {
      return {
        level: 'Prioridad Clínica Alta · Sobrecarga en ATM / Bruxismo',
        recommendedSpecialtyId: 'atm-integral',
        badgeColor: 'bg-cyan-500 text-white',
        summary:
          'Tus respuestas sugieren signos activos de sobrecarga muscular masticatoria, bruxismo y/o compromiso en la Articulación Temporomandibular (ATM) y su eje cráneo-cervical.',
        recommendation:
          'Te recomendamos agendar una Valoración Especializada de ATM Integral y Bruxismo con la Dra. Pamela Pazmiño para descomprimir tu articulación y proteger tus dientes.',
      };
    }
    if (totalScore >= 4) {
      return {
        level: 'Prioridad Moderada · Signos Funcionales o Desgaste Incipiente',
        recommendedSpecialtyId: 'bruxismo',
        badgeColor: 'bg-cyan-100 text-cyan-800',
        summary:
          'Presentas signos moderados o episódicos de tensión mandibular, sensibilidad o desgaste dental que conviene diagnosticar a tiempo.',
        recommendation:
          'Una valoración diagnóstica oportuna permite identificar si existe bruxismo de vigilia o nocturno y aplicar medidas preventivas conservadoras.',
      };
    }
    return {
      level: 'Enfoque Preventivo y Armonía Oral · Dental Check Integral',
      recommendedSpecialtyId: 'dental-check-integral',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      summary:
        'No reportas síntomas articulares severos en este momento, una excelente base para cuidar tu salud preventiva o planificar mejoras estéticas.',
      recommendation:
        'Es el momento ideal para realizar tu protocolo preventivo en Dental Check UIO o planificar un Diseño de Sonrisa Natural sobre una articulación estable.',
    };
  };

  const result = getAssessmentResult();
  const tagsSummary = answers.map((a) => a.tag).join(', ');

  const handleBookWithQuizResult = () => {
    const note = `Resultado Test ATM/Bruxismo (${totalScore} pts - ${result.level}): ${tagsSummary}`;
    if (onClose) onClose();
    onOpenBookingWithNote(result.recommendedSpecialtyId, note);
  };

  const handleSendQuizWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hola Dra. Pamela Pazmiño 👋 Realicé el *Test de ATM Integral y Bruxismo* en drapamelapazmino.com.\n\n` +
        `• *Resultado:* ${result.level}\n` +
        `• *Indicadores:* ${tagsSummary}\n\n` +
        `Me gustaría agendar una cita de valoración en Dental Check UIO.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumberClean}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="rounded-[2.25rem] bg-white p-6 sm:p-9 shadow-[0_24px_60px_-15px_rgba(6,182,212,0.14)] ring-1 ring-cyan-500/15">
      <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3.5 py-1 text-xs font-bold text-cyan-700">
            <Activity className="h-3.5 w-3.5 text-cyan-500" />
            <span>Autoevaluación Interactiva · 60 Segundos</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Test de ATM Integral y Bruxismo
          </h3>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
            aria-label="Cerrar test"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {!completed ? (
        <div>
          {/* Smooth Cyan Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>
                Paso {currentStep + 1} de {ATM_QUIZ_QUESTIONS.length}
              </span>
              <span className="text-cyan-600">{Math.round(((currentStep + 1) / ATM_QUIZ_QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-cyan-50 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / ATM_QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {ATM_QUIZ_QUESTIONS[currentStep].question}
            </h4>
            <p className="text-xs text-slate-600 bg-cyan-50/50 p-3.5 rounded-2xl ring-1 ring-cyan-500/10">
              <strong className="text-cyan-700">Contexto clínico:</strong> {ATM_QUIZ_QUESTIONS[currentStep].clinicalContext}
            </p>

            <div className="space-y-2.5 pt-1">
              {ATM_QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className="w-full text-left flex items-center justify-between gap-4 rounded-2xl bg-slate-50/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-600 hover:text-white p-4 transition-all group cursor-pointer ring-1 ring-slate-200/70 hover:ring-transparent hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <span className="text-sm font-semibold">{option.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-cyan-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {currentStep > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-bold text-slate-500 hover:text-cyan-600 transition cursor-pointer"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-cyan-600 transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${result.badgeColor}`}>
            <Sparkles className="h-4 w-4" />
            <span>{result.level}</span>
          </div>

          <div className="rounded-3xl bg-cyan-50/60 p-6 ring-1 ring-cyan-500/15 space-y-3">
            <h4 className="text-xl font-extrabold text-slate-900">
              Orientación Clínica Personalizada
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{result.summary}</p>
            <p className="text-sm font-bold text-cyan-800 leading-relaxed">{result.recommendation}</p>

            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                {answers.map((ans) => (
                  <span
                    key={ans.questionId}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs ring-1 ring-cyan-500/15"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500" />
                    {ans.tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleBookWithQuizResult}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-cyan-500 transition cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Agendar Cita con mi Resultado</span>
            </button>

            <button
              type="button"
              onClick={handleSendQuizWhatsAppDirect}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-50 px-5 py-3.5 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Enviar por WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-100 px-4 py-3.5 text-xs font-bold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const AtmQuizModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingWithNote: (specialtyId: string, note: string) => void;
}> = ({ isOpen, onClose, onOpenBookingWithNote }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        <AtmQuizContent isModal onClose={onClose} onOpenBookingWithNote={onOpenBookingWithNote} />
      </div>
    </div>
  );
};
