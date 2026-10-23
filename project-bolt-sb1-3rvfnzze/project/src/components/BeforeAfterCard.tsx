import { TrendingDown, ZapOff, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BeforeAfterCard() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Proven Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t('beforeAfterTitle')}
          </h2>
          <p className="text-base text-emerald-100/80 mt-2">
            {t('beforeAfterSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Comparison Cards */}
          <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/30 backdrop-blur-md space-y-4">
            <div className="flex items-center space-x-3 text-red-400">
              <ZapOff className="w-6 h-6" />
              <h3 className="text-xl font-bold">{t('beforeSolar')}</h3>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-red-400">
              <img src="https://ik.imagekit.io/broehit/Rohit%20Solar/BillBefore.jpeg" alt="" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t('')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/60 border-2 border-emerald-400 backdrop-blur-md space-y-4 shadow-2xl shadow-emerald-500/20">
            <div className="flex items-center space-x-3 text-amber-400">
              <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />
              <h3 className="text-xl font-bold">{t('afterSolar')}</h3>
            </div>
            <div className="text-3xl sm:text-4xl h-[270px] md:h-[630px] font-black font-mono text-amber-300">
              <img className='object-fill' src="https://ik.imagekit.io/broehit/Rohit%20Solar/billAfter.jpeg" alt="" />
            </div>
            <p className="text-sm text-emerald-100 leading-relaxed">
              {t('')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
