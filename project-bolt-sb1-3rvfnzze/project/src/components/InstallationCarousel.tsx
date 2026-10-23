import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import ImagePreviewModal from './ImagePreviewModal';

const defaultInstallations = [
  { id: '1', title: '3.3 kW Residential Rooftop', location: 'Cidco, Chh. Sambhajinagar', images: ['https://ik.imagekit.io/broehit/Rohit%20Solar/Cust25.jpeg'] },
  { id: '2', title: '3.3 kW Home Solar System', location: 'Tv center, Chh. Sambhajinagar', images: ['https://ik.imagekit.io/broehit/Rohit%20Solar/WhatsApp%20Image%202026-09-29%20at%2011.26.18.jpeg?updatedAt=1792561638232'] },
  { id: '3', title: '4.3 kW Home Solar System', location: 'Chikalthana, Chh. Sambhajinagar', images: ['https://ik.imagekit.io/broehit/Rohit%20Solar/bhagwan_rooftop.jpeg?updatedAt=1792561638120'] },
  { id: '4', title: '5.3 kW Residential Rooftop', location: 'Waluj MIDC, Chh. Sambhajinagar', images: ['https://ik.imagekit.io/broehit/Rohit%20Solar/WhatsApp%20Image%202026-09-29%20at%2011.15.56.jpeg?updatedAt=1792561637688images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800'] },
  { id: '5', title: '4 kW Home Solar System', location: 'Beed Bypass, Chh. Sambhajinagar', images: ['https://ik.imagekit.io/broehit/Rohit%20Solar/Cust_2.jpeg?updatedAt=1792561638157'] },
  { id: '6', title: '3.3 kW Residential Rooftop', location: 'Seven Hills, Chh. Sambhajinagar', images: ['https://ik.imagekit.io/broehit/Rohit%20Solar/Cust28.jpeg'] }
];

export default function InstallationCarousel() {
  const { t } = useLanguage();
  const [items, setItems] = useState(defaultInstallations);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstallations() {
      try {
        const { data, error } = await supabase.from('installations').select('id, title, location, images').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          const valid = data.filter((item) => item.images && item.images.length > 0);
          if (valid.length > 0) {
            setItems([
              ...valid,
              ...defaultInstallations.filter(
                (defaultItem) => !valid.some((item) => item.id === defaultItem.id),
              ),
            ]);
          }
        }
      } catch {
        // ignore error
      }
    }
    fetchInstallations();
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % items.length), 3500);
    return () => clearInterval(timer);
  }, [items.length]);

  const visibleSlides = Array.from({ length: Math.min(items.length, 4) }, (_, i) => items[(currentIndex + i) % items.length]);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white border-t border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase mb-3">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Project Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">{t('galleryTitle')}</h2>
            <p className="text-emerald-100/80 text-sm sm:text-base mt-1 max-w-2xl">{t('gallerySub')}</p>
          </div>

          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <div className="flex space-x-2">
              <button onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)} className="p-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)} className="p-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link to="/installations" className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform text-sm">
              <span>{t('viewAllInstallations')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleSlides.map((item, index) => (
            <div key={`${item.id}-${index}`} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/15 hover:border-amber-400/50 shadow-xl group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <button
                type="button"
                className="relative h-52 w-full cursor-zoom-in overflow-hidden bg-slate-950 text-left"
                onClick={() => setPreviewImage(item.images[0])}
                aria-label={`Preview ${item.title}`}
              >
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 " />
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-slate-950/80 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate max-w-[180px]">{item.location}</span>
                </div>
              </button>
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">{item.title}</h3>
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-emerald-200/80 font-medium">Completed</span>
                  <Link to="/installations" className="inline-flex items-center space-x-1 font-extrabold text-amber-400 hover:text-amber-300 hover:underline">
                    <span>{t('seeMoreLink')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ImagePreviewModal
          image={previewImage}
          alt="Solar installation preview"
          onClose={() => setPreviewImage(null)}
        />

        <div className="mt-8 flex justify-center space-x-2">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-2 rounded-full transition-all ${currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
