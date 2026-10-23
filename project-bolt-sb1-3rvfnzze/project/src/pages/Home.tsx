import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ThreeMeshBackground from '../components/ThreeMeshBackground';
import HeroCarousel from '../components/HeroCarousel';
import TrustBadges from '../components/TrustBadges';
import AboutSection from '../components/AboutSection';
import SubsidySection from '../components/SubsidySection';
import ProcessSection from '../components/ProcessSection';
import BeforeAfterCard from '../components/BeforeAfterCard';
import InstallationCarousel from '../components/InstallationCarousel';
import FaqSection from '../components/FaqSection';

export default function Home() {
  const { t } = useLanguage();
  const [monthlyBill, setMonthlyBill] = useState('');
  const [quickEstimate, setQuickEstimate] = useState<{
    systemSize: number;
    monthlySavings: number;
    annualSavings: number;
    subsidy: number;
  } | null>(null);

  const calculateQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const bill = parseFloat(monthlyBill);
    if (isNaN(bill) || bill <= 0) return;

    const systemSize = Math.max(1, Math.ceil(bill / 1600));
    const monthlySavings = bill * 0.82;
    const annualSavings = monthlySavings * 12;

    let subsidy = 0;
    if (systemSize === 1) subsidy = 30000;
    else if (systemSize === 2) subsidy = 60000;
    else if (systemSize >= 3) subsidy = 78000;

    setQuickEstimate({
      systemSize,
      monthlySavings,
      annualSavings,
      subsidy,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans antialiased text-gray-900">
      {/* 1. Hero Section with 3D Canvas Background + Hero Carousel overlay */}
      <section className="relative overflow-hidden min-h-[75vh] flex flex-col justify-center bg-gradient-to-br from-emerald-950 via-slate-950 to-green-950 py-12 sm:py-16">
        <ThreeMeshBackground />
        <div className="relative z-10 w-full">
          <HeroCarousel />
        </div>
      </section>

      {/* 2. Live Stats Counter Bar */}
      <section className="bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-900 py-8 border-y border-emerald-700/50 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">{t('statInstallations')}</div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">{t('statInstallationsLabel')}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">{t('statCapacity')}</div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">{t('statCapacityLabel')}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">{t('statSavings')}</div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">{t('statSavingsLabel')}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">{t('statSatisfaction')}</div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">{t('statSatisfactionLabel')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Certified Trust Badges */}
      <TrustBadges />

      {/* 4. About Us Section (Owner & Company Story) */}
      <AboutSection />

      {/* 4. PM Surya Ghar Govt Subsidy Section */}
      <SubsidySection />
      {/* 5. Interactive Quick Solar Calculator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-900 to-green-950 rounded-3xl p-6 sm:p-12 shadow-2xl text-white relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
                  <Calculator className="w-4 h-4" />
                  <span>Instant Calculator</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                  {t('calcTitle')}
                </h2>
                <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                  {t('calcSubtitle')}
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/80 pt-2">
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Calculated using latest MSEDCL tariff guidelines</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Includes PM Surya Ghar Muft Bijli Subsidy</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-xl">
                  <form onSubmit={calculateQuickEstimate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        {t('monthlyBillLabel')}
                      </label>
                      <input
                        type="number"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(e.target.value)}
                        placeholder={t('monthlyBillPlaceholder')}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-bold text-lg"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 font-extrabold py-3.5 px-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
                    >
                      {t('calculateBtn')}
                    </button>
                  </form>

                  {quickEstimate && (
                    <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-200 space-y-3">
                      <div className="flex justify-between items-center text-sm border-b border-gray-200/80 pb-2">
                        <span className="text-gray-600 font-medium">{t('systemSize')}</span>
                        <span className="font-extrabold text-emerald-800 font-mono text-base">{quickEstimate.systemSize} kW</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-gray-200/80 pb-2">
                        <span className="text-gray-600 font-medium">{t('govtSubsidy')}</span>
                        <span className="font-extrabold text-amber-600 font-mono text-base">₹{quickEstimate.subsidy.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-gray-200/80 pb-2">
                        <span className="text-gray-600 font-medium">{t('monthlySavings')}</span>
                        <span className="font-extrabold text-emerald-700 font-mono text-base">₹{quickEstimate.monthlySavings.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 font-medium">{t('annualSavings')}</span>
                        <span className="font-extrabold text-orange-600 font-mono text-lg">₹{quickEstimate.annualSavings.toFixed(0)}</span>
                      </div>

                      <Link
                        to="/calculator"
                        className="block w-full text-center mt-3 bg-emerald-800 text-white font-bold py-2.5 rounded-lg text-xs hover:bg-emerald-900 transition-colors"
                      >
                        {t('detailedAnalysisBtn')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Before vs After Comparison */}
      <BeforeAfterCard />

      {/* 7. Installation Process Workflow */}
      <ProcessSection />

      {/* 8. Recent Installations Showcase Carousel */}
      <InstallationCarousel />

      {/* 9. FAQs Section */}
      <FaqSection />

      {/* 9. Final Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-950 text-white text-center border-t border-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black leading-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/90">
            {t('ctaSub')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-gray-950 font-extrabold px-8 py-4 rounded-xl text-base shadow-xl hover:scale-105 transition-transform"
            >
              <span>{t('ctaBtn')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="tel:9373402907"
              className="inline-flex items-center space-x-2 bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-base backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              <span>{t('ctaCall')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
