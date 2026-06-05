import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/ChatGPT Image May 9, 2026, 05_57_33 PM.png';
import {
  Shield, User, Briefcase, ShoppingBag, Globe,
  AlertTriangle, LogIn, LogOut, Sun, Moon, ChevronRight, ArrowRight
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   MEGA-MENU DATA
══════════════════════════════════════════════════════════════ */
const DAILY_NEEDS_MENU = [
  {
    category: 'Food & Dining',
    accent: '#38bdf8',
    items: ['Restaurants', 'Fast Food', 'Cafes & Bakeries', 'Dairy Outlets', 'Food Delivery', 'Dessert Parlors']
  },
  {
    category: 'Grocery & Provisions',
    accent: '#F5A800',
    items: ['Supermarkets', 'Organic Stores', 'Fresh Produce', 'Daily Dairy', 'Beverage Shops']
  },
  {
    category: 'Healthcare & Pharmacy',
    accent: '#38bdf8',
    items: ['Clinics & Doctors', 'Diagnostic Labs', 'Local Pharmacies', 'Ayurvedic Centers', 'Dental Care']
  },
  {
    category: 'Education & Utilities',
    accent: '#F5A800',
    items: ['Schools & Colleges', 'Coaching Classes', 'Electricity Payments', 'Water & Gas Bill', 'Broadband Utility']
  }
];

const TRAVEL_STAY_MENU = [
  {
    category: 'Accommodation',
    accent: '#fb7185',
    items: ['Luxury Hotels', 'Budget Stays', 'Premium Resorts', 'Cozy Homestays', 'Villas & Cottages']
  },
  {
    category: 'Travel Packages',
    accent: '#1B2A8A',
    items: ['Holiday Packages', 'Weekend Getaways', 'Adventure Tours', 'Honeymoon Deals', 'Corporate Trips']
  },
  {
    category: 'Transport & Bookings',
    accent: '#fb7185',
    items: ['Cab Services', 'Bus Bookings', 'Train Reservations', 'Flight Tickets', 'Car Rentals']
  }
];

const PRODUCTS_MENU = [
  {
    category: 'Electronics',
    accent: '#c084fc',
    items: ['Smartphones', 'Laptops', 'Audio & Headphones', 'Smart Watches', 'Accessories']
  },
  {
    category: 'Fashion & Home',
    accent: '#1B2A8A',
    items: ['Men\'s Wear', 'Women\'s Wear', 'Home Essentials', 'Office Supplies', 'Decor & Crafts']
  },
  {
    category: 'Digital Products',
    accent: '#c084fc',
    items: ['Figma Templates', 'Software Tools', 'eBooks & Guides', 'Design Assets', 'Course Bundles']
  }
];

const SERVICES_MENU = [
  {
    category: 'Business & HR',
    accent: '#34d399',
    items: ['HR Consulting', 'Talent Recruitment', 'Finance Advising', 'Insurance Services', 'Real Estate']
  },
  {
    category: 'IT & Digital',
    accent: '#1B2A8A',
    items: ['Web Development', 'Mobile App Dev', 'API Systems', 'Digital Marketing', 'SEO Campaigns']
  }
];

const CAREER_GROWTH_MENU = [
  {
    category: 'Jobs',
    accent: '#fb923c',
    items: ['Tech Roles', 'Creative & Design', 'Management vacancies', 'Marketing Jobs', 'Freelance & Contract']
  },
  {
    category: 'Training & Skills',
    accent: '#1B2A8A',
    items: ['Skill Development', 'Training Programs', 'Certifications', 'Interview Prep', 'Resume Writing']
  },
  {
    category: 'Opportunities',
    accent: '#fb923c',
    items: ['Internship Programs', 'Graduate Trainee', 'Apprenticeships', 'Volunteering']
  }
];

/* ══════════════════════════════════════════════════════════════
   ROLE BADGE CONFIG
══════════════════════════════════════════════════════════════ */
const ROLE_CONFIG = {
  admin: { label: 'Admin', icon: Shield, cls: 'badge-rose' },
  vendor: { label: 'Vendor', icon: ShoppingBag, cls: 'badge-violet' },
  employer: { label: 'Employer', icon: Briefcase, cls: 'badge-sky' },
  user: { label: 'Member', icon: User, cls: 'badge-emerald' },
  visitor: { label: 'Guest', icon: Globe, cls: 'badge-amber' },
};

/* ══════════════════════════════════════════════════════════════
   TWO-PANEL MEGA DROPDOWN
══════════════════════════════════════════════════════════════ */
function MegaDropdown({ menuData, accent, title, onClose, onViewAll, pushNotification }) {
  const { setRole, setActiveTab, setCareerSubTab } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = menuData[activeIdx];

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 animate-fade-in"
      style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.45))' }}
    >
      <div
        className="w-full flex"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-mid)',
          borderTop: 'none',
          borderRadius: '0 0 16px 16px',
          minHeight: '280px',
          maxHeight: '420px',
          overflow: 'hidden',
        }}
      >
        {/* LEFT PANEL — categories */}
        <div
          className="flex flex-col py-3 shrink-0"
          style={{
            width: '200px',
            borderRight: '1px solid var(--border-subtle)',
            background: 'var(--bg-base)',
            borderRadius: '0 0 0 16px',
          }}
        >
          <p
            className="px-5 py-2 text-[9px] font-bold uppercase tracking-widest mb-1"
            style={{ color: accent }}
          >
            {title}
          </p>
          {menuData.map((group, i) => (
            <button
              key={group.category}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
              className="w-full flex items-center justify-between px-5 py-2.5 text-left transition-all duration-150 group"
              style={{
                background: activeIdx === i ? `${group.accent}12` : 'transparent',
                borderLeft: activeIdx === i ? `3px solid ${group.accent}` : '3px solid transparent',
                color: activeIdx === i ? group.accent : 'var(--text-muted)',
                fontWeight: activeIdx === i ? 600 : 400,
                fontSize: '12.5px',
              }}
            >
              {group.category}
              <ChevronRight size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* RIGHT PANEL — items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: active.accent }}
            />
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: active.accent }}
            >
              {active.category}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {active.items.map(item => (
              <button
                key={item}
                onClick={() => {
                  if (title === 'Career & Growth') {
                    setRole('user');
                    setActiveTab('overview');
                    if (active.category === 'Jobs') {
                      setCareerSubTab('jobs');
                    } else if (active.category === 'Training & Skills') {
                      setCareerSubTab('training');
                    } else if (active.category === 'Opportunities') {
                      setCareerSubTab('opportunities');
                    }
                    pushNotification(`Navigating to Career Board: ${item}`);
                  } else {
                    pushNotification(`Browsing: ${item}`);
                  }
                  onClose();
                }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-[12.5px] transition-all duration-150 group"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${active.accent}10`;
                  e.currentTarget.style.color = active.accent;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                <ChevronRight
                  size={10}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                />
                {item}
              </button>
            ))}
          </div>

          {/* Footer CTA */}
          <div
            className="mt-6 pt-4 flex items-center justify-between"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
              Explore all {active.category} options
            </span>
            <button
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all"
              style={{
                color: active.accent,
                background: `${active.accent}12`,
                border: `1px solid ${active.accent}30`,
              }}
              onClick={() => { if (onViewAll) onViewAll(); else onClose(); }}
            >
              View All <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════ */
export default function Navbar({ onMenuToggle }) {
  const {
    role, setRole, currentUser, setCurrentUser,
    notifications, setNotifications, isOffline, pushNotification,
    setSelectedServiceCategory, setSelectedProductCategory,
    theme, toggleTheme, setActiveTab, setCareerSubTab,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 'services' | 'products' | null
  const hoverTimer = useRef(null);

  const notifRef = useRef(null);
  const navRef = useRef(null);

  const openMenuDelayed = (name) => { clearTimeout(hoverTimer.current); setOpenMenu(name); };
  const closeMenuDelayed = () => { hoverTimer.current = setTimeout(() => setOpenMenu(null), 120); };
  const cancelClose = () => clearTimeout(hoverTimer.current);

  const unreadCount = notifications.filter(n => n.unread).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  const roleConf = ROLE_CONFIG[role] || ROLE_CONFIG.visitor;

  const closeAll = () => { setOpenMenu(null); setShowNotifications(false); };

  const goHome = () => {
    setRole('visitor');
    setSelectedServiceCategory(null);
    setSelectedProductCategory(null);
    closeAll();
  };

  // Close on outside click
  useEffect(() => {
    const h = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Close on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') closeAll(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full flex flex-col" ref={navRef} onMouseLeave={closeMenuDelayed}>

      {/* ════════════════════════════════════════════════════════
          MAIN BAR
      ════════════════════════════════════════════════════════ */}
      <header
        className="glass-panel w-full"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="max-w-screen-2xl mx-auto px-5 h-[62px] grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

          {/* LEFT — Brand + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              id="navbar-hamburger"
              onClick={onMenuToggle}
              className="btn-icon"
              aria-label="Menu"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand — Forge India Connect logo */}
            <button onClick={goHome} className="flex items-center gap-2 shrink-0 group">
              <img
                src={logoImg}
                alt="Forge India Connect"
                className="h-9 w-9 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow"
                style={{ border: '2px solid #F5A800' }}
              />
              <span className="font-extrabold text-[17px] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                <span style={{ color: '#1B2A8A' }}>Connect</span><span style={{ color: '#F5A800' }}>App</span>
              </span>
            </button>

            {/* Offline badge */}
            {isOffline && (
              <span className="hidden sm:flex items-center gap-1.5 badge badge-amber text-[10px]">
                <AlertTriangle size={10} className="animate-pulse" />
                Offline Mode
              </span>
            )}
          </div>

          {/* CENTER — Nav links */}
          <nav className="hidden lg:flex items-center justify-center gap-2">
            {/* Daily Needs — mega trigger */}
            <button
              onMouseEnter={() => openMenuDelayed('dailyNeeds')}
              className="relative px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all duration-150 hover:bg-[var(--glass-hover-bg)] flex items-center gap-1"
              style={{
                color: openMenu === 'dailyNeeds' ? '#38bdf8' : 'var(--text-muted)',
                fontWeight: openMenu === 'dailyNeeds' ? 600 : 500,
                background: openMenu === 'dailyNeeds' ? 'rgba(56,189,248,0.08)' : 'transparent',
              }}
            >
              Daily Needs
              <ChevronRight
                size={11}
                className="transition-transform duration-200"
                style={{ transform: openMenu === 'dailyNeeds' ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
              {openMenu === 'dailyNeeds' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#38bdf8' }} />
              )}
            </button>

            {/* Travel & Stay — mega trigger */}
            <button
              onMouseEnter={() => openMenuDelayed('travelStay')}
              className="relative px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all duration-150 hover:bg-[var(--glass-hover-bg)] flex items-center gap-1"
              style={{
                color: openMenu === 'travelStay' ? '#fb7185' : 'var(--text-muted)',
                fontWeight: openMenu === 'travelStay' ? 600 : 500,
                background: openMenu === 'travelStay' ? 'rgba(251,113,133,0.08)' : 'transparent',
              }}
            >
              Travel & Stay
              <ChevronRight
                size={11}
                className="transition-transform duration-200"
                style={{ transform: openMenu === 'travelStay' ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
              {openMenu === 'travelStay' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#fb7185' }} />
              )}
            </button>

            {/* Products — mega trigger */}
            <button
              onMouseEnter={() => openMenuDelayed('products')}
              className="relative px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all duration-150 hover:bg-[var(--glass-hover-bg)] flex items-center gap-1"
              style={{
                color: openMenu === 'products' ? '#c084fc' : 'var(--text-muted)',
                fontWeight: openMenu === 'products' ? 600 : 500,
                background: openMenu === 'products' ? 'rgba(192,132,252,0.08)' : 'transparent',
              }}
            >
              Products
              <ChevronRight
                size={11}
                className="transition-transform duration-200"
                style={{ transform: openMenu === 'products' ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
              {openMenu === 'products' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#c084fc' }} />
              )}
            </button>

            {/* Services — mega trigger */}
            <button
              onMouseEnter={() => openMenuDelayed('services')}
              className="relative px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all duration-150 hover:bg-[var(--glass-hover-bg)] flex items-center gap-1"
              style={{
                color: openMenu === 'services' ? '#34d399' : 'var(--text-muted)',
                fontWeight: openMenu === 'services' ? 600 : 500,
                background: openMenu === 'services' ? 'rgba(52,211,153,0.08)' : 'transparent',
              }}
            >
              Services
              <ChevronRight
                size={11}
                className="transition-transform duration-200"
                style={{ transform: openMenu === 'services' ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
              {openMenu === 'services' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#34d399' }} />
              )}
            </button>

            {/* Career & Growth — mega trigger */}
            <button
              onMouseEnter={() => openMenuDelayed('careerGrowth')}
              className="relative px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all duration-150 hover:bg-[var(--glass-hover-bg)] flex items-center gap-1"
              style={{
                color: openMenu === 'careerGrowth' ? '#fb923c' : 'var(--text-muted)',
                fontWeight: openMenu === 'careerGrowth' ? 600 : 500,
                background: openMenu === 'careerGrowth' ? 'rgba(251,146,60,0.08)' : 'transparent',
              }}
            >
              Career & Growth
              <ChevronRight
                size={11}
                className="transition-transform duration-200"
                style={{ transform: openMenu === 'careerGrowth' ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
              {openMenu === 'careerGrowth' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#fb923c' }} />
              )}
            </button>
          </nav>

          {/* RIGHT — Controls */}
          <div className="flex items-center gap-2 justify-end">

            {/* Theme Toggle */}
            <button id="theme-toggle-btn" onClick={toggleTheme} title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} className="btn-icon">
              {theme === 'dark'
                ? <Sun size={15} className="transition-transform duration-300 hover:rotate-12" />
                : <Moon size={15} className="transition-transform duration-300 hover:-rotate-12" />
              }
            </button>

            <div className="w-px h-5 mx-1" style={{ background: 'var(--border-subtle)' }} />

            {/* Auth */}
            {currentUser && role !== 'visitor' ? (
              <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow" style={{ background: 'linear-gradient(135deg, #1B2A8A, #F5A800)' }}>
                    {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="text-right leading-tight">
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-base)' }}>{currentUser.name.split(' ')[0]}</p>
                    <span className={`badge ${roleConf.cls} text-[9px]`}>{roleConf.label}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrentUser(null); setRole('visitor');
                    setSelectedServiceCategory(null); setSelectedProductCategory(null);
                    closeAll();
                    pushNotification('Logged out successfully.');
                  }}
                  className="btn-ghost text-xs gap-1.5"
                >
                  <LogOut size={12} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              role !== 'login' && (
                <button
                  onClick={() => { setRole('login'); closeAll(); setSelectedServiceCategory(null); setSelectedProductCategory(null); }}
                  className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-1.5"
                  style={{ background: '#F5A800', color: '#1B2A8A' }}
                >
                  <LogIn size={13} /> Sign In
                </button>
              )
            )}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          MEGA DROPDOWN PANEL
      ════════════════════════════════════════════════════════ */}
      {openMenu === 'dailyNeeds' && (
        <div onMouseEnter={cancelClose} onMouseLeave={closeMenuDelayed}>
          <MegaDropdown
            menuData={DAILY_NEEDS_MENU}
            accent="#38bdf8"
            title="Daily Needs"
            onClose={() => setOpenMenu(null)}
            onViewAll={() => {
              setRole('user');
              setActiveTab('overview');
              setOpenMenu(null);
              pushNotification('Redirected to Daily Needs Directory.');
            }}
            pushNotification={pushNotification}
          />
        </div>
      )}
      {openMenu === 'travelStay' && (
        <div onMouseEnter={cancelClose} onMouseLeave={closeMenuDelayed}>
          <MegaDropdown
            menuData={TRAVEL_STAY_MENU}
            accent="#fb7185"
            title="Travel & Stay"
            onClose={() => setOpenMenu(null)}
            onViewAll={() => {
              setRole('user');
              setActiveTab('orders');
              setOpenMenu(null);
              pushNotification('Redirected to Travel & Stay Bookings.');
            }}
            pushNotification={pushNotification}
          />
        </div>
      )}
      {openMenu === 'products' && (
        <div onMouseEnter={cancelClose} onMouseLeave={closeMenuDelayed}>
          <MegaDropdown
            menuData={PRODUCTS_MENU}
            accent="#c084fc"
            title="Products"
            onClose={() => setOpenMenu(null)}
            onViewAll={() => {
              setRole('user');
              setActiveTab('orders');
              setOpenMenu(null);
              pushNotification('Redirected to Products Marketplace.');
            }}
            pushNotification={pushNotification}
          />
        </div>
      )}
      {openMenu === 'services' && (
        <div onMouseEnter={cancelClose} onMouseLeave={closeMenuDelayed}>
          <MegaDropdown
            menuData={SERVICES_MENU}
            accent="#34d399"
            title="Services"
            onClose={() => setOpenMenu(null)}
            onViewAll={() => {
              setRole('user');
              setActiveTab('orders');
              setOpenMenu(null);
              pushNotification('Redirected to Vendor Services Bookings.');
            }}
            pushNotification={pushNotification}
          />
        </div>
      )}
      {openMenu === 'careerGrowth' && (
        <div onMouseEnter={cancelClose} onMouseLeave={closeMenuDelayed}>
          <MegaDropdown
            menuData={CAREER_GROWTH_MENU}
            accent="#fb923c"
            title="Career & Growth"
            onClose={() => setOpenMenu(null)}
            onViewAll={() => {
              setRole('user');
              setActiveTab('overview');
              setCareerSubTab('jobs');
              setOpenMenu(null);
              pushNotification('Redirected to Career & Growth Board.');
            }}
            pushNotification={pushNotification}
          />
        </div>
      )}

    </div>
  );
}
