import { Award, ShieldCheck, Zap, Landmark, Compass, Gauge } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TrustBadges() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: Award,
      titleKey: 'mnreApproved',
      descKey: 'mnreDesc',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      icon: Zap,
      titleKey: 'tier1Panels',
      descKey: 'tier1Desc',
      color: 'from-emerald-600 to-green-700',
    },
    {
      icon: ShieldCheck,
      titleKey: 'warrantyYears',
      descKey: 'warrantyDesc',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      icon: Landmark,
      titleKey: 'bankLoans',
      descKey: 'bankDesc',
      color: 'from-orange-500 to-amber-600',
    },
    {
      icon: Compass,
      titleKey: 'freeSurvey',
      descKey: 'freeSurveyDesc',
      color: 'from-teal-600 to-emerald-700',
    },
    {
      icon: Gauge,
      titleKey: 'netMetering',
      descKey: 'netDesc',
      color: 'from-green-600 to-emerald-800',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-emerald-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Certified Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            {t('trustTitle')}
          </h2>
          <p className="text-emerald-100/80 mt-2 text-base">
            {t('trustSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {t(badge.titleKey)}
                </h3>
                <p className="text-sm text-emerald-100/70 leading-relaxed">
                  {t(badge.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
