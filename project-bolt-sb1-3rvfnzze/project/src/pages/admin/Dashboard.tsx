import { useEffect, useState } from 'react';
import { Image, MessageSquare, Package, Users } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    installations: 0,
    testimonials: 0,
    equipment: 0,
    leads: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [installations, testimonials, equipment, leads] = await Promise.all([
        supabase.from('installations').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('equipment').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        installations: installations.count || 0,
        testimonials: testimonials.count || 0,
        equipment: equipment.count || 0,
        leads: leads.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Installations',
      value: stats.installations,
      icon: Image,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Total Testimonials',
      value: stats.testimonials,
      icon: MessageSquare,
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'Equipment Items',
      value: stats.equipment,
      icon: Package,
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Total Leads',
      value: stats.leads,
      icon: Users,
      color: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/installations"
              className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Manage Installations</h3>
              <p className="text-sm text-gray-600">Add or edit solar installations</p>
            </a>
            <a
              href="/admin/testimonials"
              className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Manage Testimonials</h3>
              <p className="text-sm text-gray-600">Add or edit customer reviews</p>
            </a>
            <a
              href="/admin/leads"
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">View Leads</h3>
              <p className="text-sm text-gray-600">Check new quote requests</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
