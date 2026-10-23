import { useEffect, useState } from 'react';
import { Trash2, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { supabase, Lead } from '../../lib/supabase';

export default function ManageLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    setLeads(data || []);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await supabase.from('leads').delete().eq('id', id);
      fetchLeads();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Leads</h1>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
            Total Leads: {leads.length}
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No leads yet</h3>
            <p className="text-gray-500">Customer quote requests will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{lead.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(lead.created_at)}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-green-600" />
                    <a href={`tel:${lead.phone}`} className="hover:text-green-600">
                      {lead.phone}
                    </a>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                    <span>{lead.city}</span>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Monthly Bill</span>
                      <span className="text-lg font-bold text-orange-600">
                        ₹{lead.monthly_bill.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {lead.message && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Message:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {lead.message}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
