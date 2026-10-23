import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../../images/Rohit Solar Power Logo.png';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', labelKey: 'navHome' },
    { path: '/installations', labelKey: 'navInstallations' },
    { path: '/equipment', labelKey: 'navEquipment' },
    { path: '/testimonials', labelKey: 'navTestimonials' },
    { path: '/calculator', labelKey: 'navCalculator' },
    { path: '/contact', labelKey: 'navContact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 transition-all duration-500 py-2 sm:py-3 px-3 sm:px-6">
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl transition-all duration-500 border ${
          scrolled
            ? 'bg-white/70 backdrop-blur-2xl border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]'
            : 'bg-white/80 backdrop-blur-xl border-white/60 shadow-[0_4px_24px_0_rgba(0,0,0,0.04)]'
        } relative overflow-hidden`}
      >
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        <div className="px-4 sm:px-5  flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-50 h-16 group-hover:scale-105 transition-transform duration-300">
              <img
                src={logo}
                alt="Rohit Solar Power logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-2">
            <nav className="flex items-center p-1.5 bg-slate-900/5 backdrop-blur-md rounded-2xl border border-white/40 shadow-inner mr-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.35)] border border-emerald-400/30'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-950 text-xs font-black backdrop-blur-md transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
              title="Toggle Language"
            >
              <Languages className="w-4 h-4 text-amber-600" />
              <span>{language === 'en' ? 'मराठी' : 'English'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-950 text-xs font-extrabold backdrop-blur-md"
            >
              <Languages className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'en' ? 'मराठी' : 'EN'}</span>
            </button>

            <button
              className="p-2 rounded-xl text-slate-800 hover:bg-black/5 transition-colors border border-black/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden p-3 border-t border-slate-200/50 bg-white/80 backdrop-blur-2xl space-y-1 rounded-b-2xl sm:rounded-b-3xl">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-emerald-800 to-green-800 text-white shadow-md'
                      : 'text-slate-800 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
