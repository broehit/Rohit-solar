import { useEffect, useState } from 'react';
import { Plus, CreditCard as Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { supabase, Installation } from '../../lib/supabase';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const postgrestError = error as { message: string; details?: string; hint?: string; code?: string };
    return [postgrestError.message, postgrestError.details, postgrestError.hint, postgrestError.code]
      .filter(Boolean)
      .join(' ');
  }
  return 'An unexpected error occurred.';
}

export default function ManageInstallations() {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    system_size: '',
    panels_used: '',
    inverter_used: '',
    images: '',
  });

  useEffect(() => {
    fetchInstallations();
  }, []);

  const fetchInstallations = async () => {
    const { data, error } = await supabase
      .from('installations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setErrorMessage(`Could not load installations: ${error.message}`);
      return;
    }

    setInstallations(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageArray = formData.images.split(',').map(url => url.trim()).filter(url => url);
    const dataToSave = {
      title: formData.title.trim() || null,
      location: formData.location.trim() || null,
      system_size: formData.system_size ? parseFloat(formData.system_size) : null,
      panels_used: formData.panels_used.trim() || null,
      inverter_used: formData.inverter_used.trim() || null,
      images: imageArray,
    };

    setErrorMessage('');
    setIsSaving(true);
    try {
      const result = editingId
        ? await supabase.from('installations').update(dataToSave).eq('id', editingId)
        : await supabase.from('installations').insert([dataToSave]);

      if (result.error) throw result.error;

      resetForm();
      await fetchInstallations();
    } catch (error) {
      setErrorMessage(`Could not save installation: ${getErrorMessage(error)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (installation: Installation) => {
    setEditingId(installation.id);
    setFormData({
      title: installation.title,
      location: installation.location,
      system_size: installation.system_size?.toString() || '',
      panels_used: installation.panels_used || '',
      inverter_used: installation.inverter_used || '',
      images: installation.images?.join(', ') || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this installation?')) {
      const { error } = await supabase.from('installations').delete().eq('id', id);
      if (error) {
        setErrorMessage(`Could not delete installation: ${error.message}`);
        return;
      }
      await fetchInstallations();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      system_size: '',
      panels_used: '',
      inverter_used: '',
      images: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div>
        {errorMessage && (
          <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {errorMessage}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Installations</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Installation</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Installation' : 'Add New Installation'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System Size (kW)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.system_size}
                  onChange={(e) => setFormData({ ...formData, system_size: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Panels Used</label>
                <input
                  type="text"
                  value={formData.panels_used}
                  onChange={(e) => setFormData({ ...formData, panels_used: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Inverter Used</label>
                <input
                  type="text"
                  value={formData.inverter_used}
                  onChange={(e) => setFormData({ ...formData, inverter_used: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URLs (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="md:col-span-2 flex space-x-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  {isSaving ? 'Saving...' : `${editingId ? 'Update' : 'Add'} Installation`}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">System Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Savings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {installations.map((installation) => (
                <tr key={installation.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{installation.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{installation.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {installation.system_size !== null ? `${installation.system_size} kW` : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {installation.monthly_savings !== null ? `₹${installation.monthly_savings}` : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(installation)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(installation.id)}
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
