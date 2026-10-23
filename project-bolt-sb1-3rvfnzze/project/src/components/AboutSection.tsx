import { Link } from 'react-router-dom';
import { UserCheck, ShieldCheck, Award, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-20 bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950 text-white border-t border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl group">
              <img
                src="https://ik.imagekit.io/broehit/Rohit%20Solar/image.png"
                alt="Rohit Solar Power Leadership"
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{t('aboutOwnerName')}</h4>
                    <p className="text-xs text-amber-300 font-semibold uppercase">{t('aboutOwnerTitle')}</p>
                    <p className="text-xs text-emerald-200/90 mt-0.5">{t('aboutOwnerTagline')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 hidden sm:flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black px-4 py-2 rounded-2xl shadow-xl border border-amber-300">
              <Award className="w-5 h-5 text-slate-950" />
              <div className="text-left text-xs">
                <div className="uppercase font-extrabold">Trusted Leader</div>
                <div className="font-mono font-black">100+ Roofs</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('aboutBadge')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {t('aboutHeading')}
            </h2>

            <div className="space-y-3 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              <p className="bg-white/5 p-4 rounded-xl border border-white/10">
                <strong className="text-amber-300 font-bold block mb-1 text-base">{t('aboutP1Title')}</strong>
                {t('aboutP1Text')}
              </p>

              <p className="bg-white/5 p-4 rounded-xl border border-white/10">
                <strong className="text-amber-300 font-bold block mb-1 text-base">{t('aboutP2Title')}</strong>
                {t('aboutP2Text')}
              </p>

              <p className="bg-white/5 p-4 rounded-xl border border-white/10">
                <strong className="text-amber-300 font-bold block mb-1 text-base">{t('aboutP3Title')}</strong>
                {t('aboutP3Text')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{t('aboutPillar1')}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{t('aboutPillar2')}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{t('aboutPillar3')}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
              >
                <span>{t('aboutCtaBtn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="tel:9373402907"
                className="inline-flex items-center space-x-2 bg-white/10 text-white font-bold px-6 py-3.5 rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{t('aboutCallBtn')}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
