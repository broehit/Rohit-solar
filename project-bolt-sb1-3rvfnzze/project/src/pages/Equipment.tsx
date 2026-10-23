import { useEffect, useState } from 'react';
import { Package, Shield, Zap } from 'lucide-react';
import { supabase, Equipment } from '../lib/supabase';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'panel' | 'inverter' | 'mounting'>('all');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEquipment(data || []);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEquipment = filter === 'all'
    ? equipment
    : equipment.filter(item => item.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'panel':
        return <Zap className="w-6 h-6" />;
      case 'inverter':
        return <Package className="w-6 h-6" />;
      case 'mounting':
        return <Shield className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'panel':
        return 'Solar Panel';
      case 'inverter':
        return 'Inverter';
      case 'mounting':
        return 'Mounting Structure';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading equipment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Equipment</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            We use only premium quality solar equipment from trusted manufacturers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['all', 'panel', 'inverter', 'mounting'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === type
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {type === 'all' ? 'All Equipment' : getTypeName(type)}
            </button>
          ))}
        </div>

        {filteredEquipment.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No equipment listed yet</h3>
            <p className="text-gray-500">Check back soon for our equipment catalog!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEquipment.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {item.image_url ? (
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={item.image_url}
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                    <div className="text-orange-400">
                      {getTypeIcon(item.type)}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-3">
                    {getTypeName(item.type)}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.brand}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.model}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                        Efficiency
                      </span>
                      <span className="font-semibold text-gray-900">{item.efficiency}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Shield className="w-4 h-4 mr-1 text-green-500" />
                        Warranty
                      </span>
                      <span className="font-semibold text-gray-900">{item.warranty}</span>
                    </div>
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
