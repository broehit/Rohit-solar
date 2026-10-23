import { Link, useLocation, Navigate } from 'react-router-dom';
import { Sun, LayoutDashboard, Image, MessageSquare, Package, Users, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/installations', label: 'Installations', icon: Image },
    { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { path: '/admin/equipment', label: 'Equipment', icon: Package },
    { path: '/admin/leads', label: 'Leads', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white flex flex-col">
        <div className="p-6">
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Rohit Solar</h1>
              <p className="text-xs text-green-200">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive(item.path)
                    ? 'bg-yellow-500 text-white'
                    : 'text-green-100 hover:bg-green-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-700">
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-green-100 hover:bg-green-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
