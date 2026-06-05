import React, { useState, useEffect } from 'react';
import { useApp, AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './landing/LandingPage';
import LoginPage from './landing/LoginPage';
import AdminDashboard from './dashboards/admin/AdminDashboard';
import VendorDashboard from './dashboards/vendor/VendorDashboard';
import EmployerDashboard from './dashboards/employer/EmployerDashboard';
import UserDashboard from './dashboards/user/UserDashboard';
import { Menu } from 'lucide-react';

function AppContent() {
  const { role, activeTab, setActiveTab } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hasSidebar = role !== 'visitor' && role !== 'login';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      {role !== 'admin' && <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />}

      {/* Floating Hamburger for Mobile Admin Dashboard */}
      {role === 'admin' && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 p-2 rounded-xl border lg:hidden cursor-pointer"
          style={{
            background: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
            color: 'var(--text-base)',
          }}
        >
          <Menu size={16} />
        </button>
      )}

      <div className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
        {hasSidebar && (
          <Sidebar
            role={role}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <main
          className={`flex-1 overflow-y-auto ${hasSidebar ? 'px-6 py-7' : ''} ${role === 'admin' ? 'pt-16 lg:pt-7' : ''}`}
          style={{ minWidth: 0 }}
        >
          {role === 'visitor'  && <LandingPage />}
          {role === 'login'    && <LoginPage />}
          {role === 'admin'    && <AdminDashboard    activeTab={activeTab} />}
          {role === 'vendor'   && <VendorDashboard   activeTab={activeTab} setActiveTab={setActiveTab} />}
          {role === 'employer' && <EmployerDashboard activeTab={activeTab} setActiveTab={setActiveTab} />}
          {role === 'user'     && <UserDashboard     activeTab={activeTab} setActiveTab={setActiveTab} />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
