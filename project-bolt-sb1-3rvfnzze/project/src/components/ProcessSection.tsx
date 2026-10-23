import { ClipboardCheck, FileCheck, Wrench, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: ClipboardCheck,
      titleKey: 'step1Title',
      descKey: 'step1Desc',
      color: 'from-amber-400 to-amber-500',
    },
    {
      num: '02',
      icon: FileCheck,
      titleKey: 'step2Title',
      descKey: 'step2Desc',
      color: 'from-emerald-500 to-green-600',
    },
    {
      num: '03',
      icon: Wrench,
      titleKey: 'step3Title',
      descKey: 'step3Desc',
      color: 'from-teal-500 to-emerald-600',
    },
    {
      num: '04',
      icon: Zap,
      titleKey: 'step4Title',
      descKey: 'step4Desc',
      color: 'from-orange-500 to-amber-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Simple & Transparent
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
            {t('processTitle')}
          </h2>
          <p className="text-base text-gray-600 mt-2">
            {t('processSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-emerald-50/30 border border-gray-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black font-mono text-gray-300 group-hover:text-amber-500 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(step.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
