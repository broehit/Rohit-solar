import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Installations from './pages/Installations';
import Equipment from './pages/Equipment';
import Testimonials from './pages/Testimonials';
import Calculator from './pages/Calculator';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ManageInstallations from './pages/admin/ManageInstallations';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageEquipment from './pages/admin/ManageEquipment';
import ManageLeads from './pages/admin/ManageLeads';
import Seo from './components/Seo';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Seo />
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/installations" element={<PublicLayout><Installations /></PublicLayout>} />
            <Route path="/equipment" element={<PublicLayout><Equipment /></PublicLayout>} />
            <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
            <Route path="/calculator" element={<PublicLayout><Calculator /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/installations" element={<ManageInstallations />} />
            <Route path="/admin/testimonials" element={<ManageTestimonials />} />
            <Route path="/admin/equipment" element={<ManageEquipment />} />
            <Route path="/admin/leads" element={<ManageLeads />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}
