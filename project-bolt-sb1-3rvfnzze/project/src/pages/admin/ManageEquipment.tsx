import { useEffect, useState } from 'react';
import { Plus, CreditCard as Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { supabase, Equipment } from '../../lib/supabase';

export default function ManageEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'panel' as 'panel' | 'inverter' | 'mounting',
    brand: '',
    model: '',
    efficiency: '',
    warranty: '',
    image_url: '',
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    const { data } = await supabase
      .from('equipment')
      .select('*')
      .order('created_at', { ascending: false });
    setEquipment(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await supabase.from('equipment').update(formData).eq('id', editingId);
    } else {
      await supabase.from('equipment').insert([formData]);
    }

    resetForm();
    fetchEquipment();
  };

  const handleEdit = (item: Equipment) => {
    setEditingId(item.id);
    setFormData({
      type: item.type,
      brand: item.brand,
      model: item.model,
      efficiency: item.efficiency,
      warranty: item.warranty,
      image_url: item.image_url,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      await supabase.from('equipment').delete().eq('id', id);
      fetchEquipment();
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'panel',
      brand: '',
      model: '',
      efficiency: '',
      warranty: '',
      image_url: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Equipment</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Equipment</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Equipment' : 'Add New Equipment'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="panel">Solar Panel</option>
                  <option value="inverter">Inverter</option>
                  <option value="mounting">Mounting Structure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Efficiency</label>
                <input
                  type="text"
                  value={formData.efficiency}
                  onChange={(e) => setFormData({ ...formData, efficiency: e.target.value })}
                  placeholder="e.g., 21.5%"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warranty</label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  placeholder="e.g., 25 years"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="md:col-span-2 flex space-x-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  {editingId ? 'Update' : 'Add'} Equipment
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warranty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {equipment.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 capitalize">{item.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.brand}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.model}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.efficiency}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.warranty}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
