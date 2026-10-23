import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FaqSection() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { qKey: 'faq1Q', aKey: 'faq1A' },
    { qKey: 'faq2Q', aKey: 'faq2A' },
    { qKey: 'faq3Q', aKey: 'faq3A' },
    { qKey: 'faq4Q', aKey: 'faq4A' },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            {t('faqTitle')}
          </h2>
          <p className="text-base text-gray-600 mt-2">
            {t('faqSub')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-gray-900 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-base sm:text-lg pr-4">{t(faq.qKey)}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-4 leading-relaxed">
                    {t(faq.aKey)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
