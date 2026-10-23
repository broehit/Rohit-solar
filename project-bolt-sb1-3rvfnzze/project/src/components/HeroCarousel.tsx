import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Award, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const slides = [
  {
    badge: 'PM Surya Ghar Scheme',
    icon: Shield,
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    titleKey: 'heroSlide1Title',
    subKey: 'heroSlide1Subtitle',
    ctaKey: 'heroSlide1Cta',
    ctaLink: '/contact',
    secKey: 'heroSlide1Calc',
    secLink: '/calculator',
    stats: [
      { l: 'Govt Subsidy', v: 'Up to ₹78,000' },
      { l: 'Bill Savings', v: 'Up to 100%' },
      { l: 'Payback Time', v: '~5 Years' }
    ]
  },
  {
    badge: 'Tier-1 Solar Modules',
    icon: Zap,
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    titleKey: 'heroSlide2Title',
    subKey: 'heroSlide2Subtitle',
    ctaKey: 'heroSlide2Cta',
    ctaLink: '/equipment',
    secKey: 'heroSlide2Calc',
    secLink: '/contact',
    stats: [
      { l: 'Module Life', v: '25+ Years' },
      { l: 'Efficiency', v: '98.6%' },
      { l: 'Weatherproof', v: 'IP68 Rated' }
    ]
  },
  {
    badge: '100+ Installations',
    icon: Award,
    color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    titleKey: 'heroSlide3Title',
    subKey: 'heroSlide3Subtitle',
    ctaKey: 'heroSlide3Cta',
    ctaLink: '/installations',
    secKey: 'heroSlide3Calc',
    secLink: '/contact',
    stats: [
      { l: 'Install Time', v: '3 Days' },
      { l: 'Net Metering', v: '100% Handled' },
      { l: 'MSEDCL Sync', v: 'Assured' }
    ]
  },
  {
    badge: 'Easy Financing Options',
    icon: Shield,
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    titleKey: 'heroSlide4Title',
    subKey: 'heroSlide4Subtitle',
    ctaKey: 'heroSlide4Cta',
    ctaLink: '/contact',
    secKey: 'heroSlide4Calc',
    secLink: '/calculator',
    stats: [
      { l: 'Interest Rate', v: '5.95% EMI Avail' },
      { l: 'Partner Banks', v: 'SBI, HDFC' },
      { l: 'Paperwork', v: 'Zero Hassle' }
    ]
  }
];

export default function HeroCarousel() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col justify-center my-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4 text-left">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium backdrop-blur-md ${slide.color}`}>
            <Icon className="w-4 h-4 animate-pulse" />
            <span>{slide.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight min-h-[80px] flex items-center">
            {t(slide.titleKey)}
          </h1>

          <p className="text-base text-emerald-100/90 max-w-xl font-light">
            {t(slide.subKey)}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to={slide.ctaLink} className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-bold px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-all">
              <span>{t(slide.ctaKey)}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link to={slide.secLink} className="inline-flex items-center space-x-2 bg-white/10 text-white font-semibold px-5 py-2.5 rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <span>{t(slide.secKey)}</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-3">
            <div className="flex justify-between border-b border-white/10 pb-2 text-xs">
              <span className="text-amber-300 font-semibold uppercase">Highlights</span>
              <span className="text-emerald-200 font-mono">{currentSlide + 1} / {slides.length}</span>
            </div>

            {slide.stats.map((st, idx) => (
              <div key={idx} className="flex justify-between p-2 rounded-lg bg-black/20 border border-white/10 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-200">{st.l}</span>
                </div>
                <span className="font-bold text-amber-300 font-mono">{st.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex space-x-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/30'}`} />
          ))}
        </div>

        <div className="flex space-x-2">
          <button onClick={() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)} className="p-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setCurrentSlide((p) => (p + 1) % slides.length)} className="p-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
