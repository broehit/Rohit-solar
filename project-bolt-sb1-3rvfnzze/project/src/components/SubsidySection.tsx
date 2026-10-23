import { Link } from 'react-router-dom';
import { IndianRupee, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SubsidySection() {
  const { t } = useLanguage();

  const tiers = [
    {
      titleKey: 'sub1kwTitle',
      amountKey: 'sub1kwAmount',
      descKey: 'sub1kwDesc',
      popular: false,
    },
    {
      titleKey: 'sub2kwTitle',
      amountKey: 'sub2kwAmount',
      descKey: 'sub2kwDesc',
      popular: false,
    },
    {
      titleKey: 'sub3kwTitle',
      amountKey: 'sub3kwAmount',
      descKey: 'sub3kwDesc',
      popular: true,
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-amber-50/40 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full text-amber-800 text-xs font-bold mb-3">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Govt Subsidy Scheme</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            {t('subsidyHeader')}
          </h2>
          <p className="text-base text-gray-600 mt-2">
            {t('subsidySubhead')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between ${
                tier.popular
                  ? 'bg-white shadow-2xl border-2 border-amber-500 scale-105 z-10'
                  : 'bg-white shadow-xl border border-gray-100 hover:border-emerald-300'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular for Homes
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t(tier.titleKey)}</h3>
                <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-center">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono">
                    {t(tier.amountKey)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {t(tier.descKey)}
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Direct Bank DBT Transfer</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>MNRE Portal Registration Assistance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Zero Hassle Document Submission</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/contact"
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center space-x-2 transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 shadow-lg hover:shadow-amber-500/30'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                <span>{t('claimSubsidyBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
