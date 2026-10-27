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
        level: 'Prioridad Clínica Alta · Indicadores de Sobrecarga en ATM / Bruxismo',
        recommendedSpecialtyId: 'atm-integral',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        summary:
          'Tus respuestas sugieren signos activos de sobrecarga muscular masticatoria, bruxismo y/o compromiso en la Articulación Temporomandibular (ATM) y su eje cráneo-cervical.',
        recommendation:
          'Te recomendamos agendar una Valoración Especializada de ATM Integral y Bruxismo con la Dra. Pamela Pazmiño para evaluar tu articulación, aliviar la tensión muscular y proteger tus dientes antes de que avance el desgaste.',
      };
    }
    if (totalScore >= 4) {
      return {
        level: 'Prioridad Moderada · Signos Funcionales o Desgaste Incipiente',
        recommendedSpecialtyId: 'bruxismo',
        badgeColor: 'bg-[#EBF2F0] text-[#0F3D3E] border-[#0F3D3E]/25',
        summary:
          'Presentas signos moderados o episódicos de tensión mandibular, sensibilidad o desgaste dental que vale la pena diagnosticar a tiempo.',
        recommendation:
          'Una valoración diagnóstica oportuna permite identificar si existe bruxismo de vigilia o nocturno y aplicar medidas preventivas conservadoras o rehabilitación biomimética mínima.',
      };
    }
    return {
      level: 'Enfoque Preventivo y Armonía Oral · Dental Check Integral',
      recommendedSpecialtyId: 'dental-check-integral',
      badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      summary:
        'No reportas síntomas articulares severos en este momento, lo cual es una excelente base para cuidar tu salud preventiva o planificar mejoras estéticas seguras.',
      recommendation:
        'Es el momento ideal para realizar tu protocolo preventivo en Dental Check UIO o planificar un Diseño de Sonrisa Natural sobre una articulación sana y estable.',
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
        `Me gustaría agendar una cita de valoración en Dental Check UIO (Av. La Coruña y Fco. de Orellana).`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumberClean}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-[#0F3D3E]/12">
      <div className="flex items-start justify-between gap-4 border-b border-[#0F3D3E]/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF2F0] px-3 py-1 text-xs font-semibold text-[#0F3D3E]">
            <Activity className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Autoevaluación Clínica Interactiva · 1 Minuto</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0F3D3E] mt-2">
            Test de ATM Integral, Bruxismo y Rehabilitación Oral
          </h3>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="rounded-full bg-[#FAF8F5] p-2 text-[#182625]/70 hover:bg-[#EBF2F0] hover:text-[#0F3D3E] transition"
            aria-label="Cerrar test"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {!completed ? (
        <div>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5D5B] mb-2">
              <span>
                Pregunta {currentStep + 1} de {ATM_QUIZ_QUESTIONS.length}
              </span>
              <span>{Math.round(((currentStep + 1) / ATM_QUIZ_QUESTIONS.length) * 100)}% completado</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#EBF2F0] overflow-hidden">
              <div
                className="h-full bg-[#0F3D3E] transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / ATM_QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <h4 className="font-editorial text-xl sm:text-2xl font-semibold text-[#182625] leading-snug">
              {ATM_QUIZ_QUESTIONS[currentStep].question}
            </h4>
            <p className="text-xs text-[#4A5D5B] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#0F3D3E]/10">
              <strong className="text-[#0F3D3E]">Nota clínica:</strong> {ATM_QUIZ_QUESTIONS[currentStep].clinicalContext}
            </p>

            <div className="space-y-2.5 pt-2">
              {ATM_QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className="w-full text-left flex items-center justify-between gap-4 rounded-2xl border border-[#0F3D3E]/15 bg-[#FAF8F5] hover:bg-[#0F3D3E] hover:text-white p-4 transition group cursor-pointer"
                >
                  <span className="text-sm font-medium">{option.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#0F3D3E] group-hover:text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {currentStep > 0 && (
            <div className="mt-5 pt-3 border-t border-[#0F3D3E]/10 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-semibold text-[#4A5D5B] hover:text-[#0F3D3E] transition cursor-pointer"
              >
                ← Volver a la pregunta anterior
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-[#4A5D5B] hover:text-[#0F3D3E] transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5 animate-fadeIn">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold ${result.badgeColor}`}>
            <Sparkles className="h-4 w-4" />
            <span>{result.level}</span>
          </div>

          <div className="rounded-2xl bg-[#FAF8F5] p-5 border border-[#0F3D3E]/12 space-y-3">
            <h4 className="font-editorial text-2xl font-semibold text-[#0F3D3E]">
              Orientación Clínica Personalizada
            </h4>
            <p className="text-sm text-[#182625] leading-relaxed">{result.summary}</p>
            <p className="text-sm font-medium text-[#0F3D3E] leading-relaxed">{result.recommendation}</p>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4A5D5B] mb-2">
                Indicadores registrados en tu evaluación:
              </p>
              <div className="flex flex-wrap gap-2">
                {answers.map((ans) => (
                  <span
                    key={ans.questionId}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1 text-xs font-medium text-[#0F3D3E] border border-[#0F3D3E]/15"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059]" />
                    {ans.tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={handleBookWithQuizResult}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-[#134E4A] transition cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-[#C5A059]" />
              <span>Agendar Cita con este Resultado</span>
            </button>

            <button
              type="button"
              onClick={handleSendQuizWhatsAppDirect}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0F3D3E]/25 bg-[#EBF2F0] px-5 py-3.5 text-sm font-semibold text-[#0F3D3E] hover:bg-[#dce8e5] transition cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Enviar a WhatsApp Directo</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#0F3D3E]/15 bg-white px-4 py-3.5 text-xs font-semibold text-[#4A5D5B] hover:text-[#0F3D3E] transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Repetir Test</span>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A292A]/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        <AtmQuizContent isModal onClose={onClose} onOpenBookingWithNote={onOpenBookingWithNote} />
      </div>
    </div>
  );
};
