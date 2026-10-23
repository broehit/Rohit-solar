import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import logo from "../../images/Rohit Solar Power Logo.png"

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-900 text-white border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white rounded w-50 h-16 group-hover:scale-105 p-2 ">
                <img
                src={logo} 
                className="w-full h-full object-cover"
                alt="Rohit Solar Power" />
              </div>
            </div>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              {t('footerDesc')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-amber-400 mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-emerald-100/90">
              <li><Link to="/" className="hover:text-amber-300 transition-colors">{t('navHome')}</Link></li>
              <li><Link to="/installations" className="hover:text-amber-300 transition-colors">{t('navInstallations')}</Link></li>
              <li><Link to="/equipment" className="hover:text-amber-300 transition-colors">{t('navEquipment')}</Link></li>
              <li><Link to="/testimonials" className="hover:text-amber-300 transition-colors">{t('navTestimonials')}</Link></li>
              <li><Link to="/calculator" className="hover:text-amber-300 transition-colors">{t('navCalculator')}</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition-colors">{t('navContact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-amber-400 mb-4">{t('services')}</h4>
            <ul className="space-y-2 text-sm text-emerald-100/90">
              <li>{t('resSolar')}</li>
              <li>{t('netSolar')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-amber-400 mb-4">{t('contactInfo')}</h4>
            <ul className="space-y-3 text-sm text-emerald-100/90">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 text-amber-400 flex-shrink-0" />
                <a href="tel:9373402907" className="hover:text-amber-300 transition-colors">+91 93734 02907</a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 text-amber-400 flex-shrink-0" />
                <span>info@rohitsolar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-800/80 mt-10 pt-6 text-center text-sm text-emerald-200/70">
          <p>&copy; {new Date().getFullYear()} {t('brandName')}. {t('allRights')}</p> <br />
          <p className='text-align-center'> <a target='_blank' href="https://www.linkedin.com/in/rohit-manal-b1798b313?utm_source=share_via&utm_content=profile&utm_medium=member_ios">Developed by <span className='text-bold'>Rohit Manal</span></a></p>
        </div>
      </div>
    </footer>
  );
}
