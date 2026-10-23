import { useEffect, useState } from 'react';
import { MapPin, Zap, Sun, TrendingUp } from 'lucide-react';
import { supabase, Installation } from '../lib/supabase';
import InstallationCarousel from '../components/InstallationCarousel';

export default function Installations() {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstallations();
  }, []);

  const fetchInstallations = async () => {
    try {
      const { data, error } = await supabase
        .from('installations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInstallations(data || []);
    } catch (error) {
      console.error('Error fetching installations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading installations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Installations</h1>
          <p className="text-xl text-yellow-50 max-w-2xl mx-auto">
            Browse through our successful solar projects and see how we've helped customers
            achieve energy independence
          </p>
        </div>
      </div>

      {/* Installations Showcase Carousel */}
      <InstallationCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {installations.length === 0 ? (
          <div className="text-center py-12">
            <Sun className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No installations yet</h3>
            <p className="text-gray-500">Check back soon for our completed projects!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installations.map((installation) => (
              <div
                key={installation.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {installation.images && installation.images.length > 0 ? (
                  <div className="h-56 bg-gradient-to-br from-yellow-100 to-orange-100">
                    <img
                      src={installation.images[0]}
                      alt={installation.title || 'Solar installation'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                    <Sun className="w-16 h-16 text-orange-400" />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {installation.title || 'Solar Installation'}
                  </h3>

                  {installation.location && (
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{installation.location}</span>
                  </div>
                  )}

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {installation.system_size !== null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                        System Size
                      </span>
                      <span className="font-semibold text-gray-900">{installation.system_size} kW</span>
                    </div>
                    )}

                    {installation.panels_used && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Panels</span>
                      <span className="font-semibold text-gray-900 text-right">{installation.panels_used}</span>
                    </div>
                    )}

                    {installation.inverter_used && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Inverter</span>
                      <span className="font-semibold text-gray-900 text-right">{installation.inverter_used}</span>
                    </div>
                    )}

                    {installation.monthly_savings !== null && (
                    <div className="flex items-center justify-between text-sm col-span-2 pt-2 border-t border-gray-200">
                      <span className="text-gray-600 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                        Monthly Savings
                      </span>
                      <span className="font-bold text-green-600">
                        ₹{installation.monthly_savings.toLocaleString()}
                      </span>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
