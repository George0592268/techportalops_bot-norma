import React, { useState } from 'react';
import { Icon } from './Icon';

interface OnboardingProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    icon: 'smart_toy',
    title: 'ИИ-Консультант 24/7',
    desc: 'Мгновенные ответы на вопросы по монтажу ОПС согласно актуальным СП и ГОСТ.',
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  {
    icon: 'inventory_2',
    title: 'База Знаний',
    desc: 'Доступ к тысячам нормативных документов с умным векторным поиском.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    icon: 'verified',
    title: 'Начните бесплатно',
    desc: '3 дня полного доступа ко всем функциям. Пробуйте, прежде чем платить.',
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < SLIDES.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white dark:bg-background-dark flex flex-col animate-[fadeIn_0.3s_ease-out]">
      {/* Skip Button */}
      <div className="flex justify-end p-4 safe-pb">
        <button 
          onClick={onComplete}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          Пропустить
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="relative mb-8">
           <div className={`w-32 h-32 rounded-full ${SLIDES[step].bg} flex items-center justify-center animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)] key-${step}`}>
               <Icon name={SLIDES[step].icon} size={64} className={SLIDES[step].color} />
           </div>
           {/* Decorative circles */}
           <div className="absolute -z-10 top-0 left-0 w-32 h-32 bg-current opacity-20 blur-3xl rounded-full"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 animate-[slideUp_0.3s_ease-out]">
            {SLIDES[step].title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs animate-[slideUp_0.4s_ease-out]">
            {SLIDES[step].desc}
        </p>
      </div>

      {/* Controls */}
      <div className="p-8 pb-12 safe-pb space-y-8">
        {/* Indicators */}
        <div className="flex justify-center gap-2">
            {SLIDES.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-2 rounded-full transition-all duration-300 ${
                        i === step ? 'w-8 bg-primary' : 'w-2 bg-gray-200 dark:bg-gray-700'
                    }`}
                />
            ))}
        </div>

        <button 
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-14 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
            <span>{step === SLIDES.length - 1 ? 'Начать работу' : 'Далее'}</span>
            <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  );
};