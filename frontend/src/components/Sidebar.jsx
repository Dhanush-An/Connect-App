import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield, User, Briefcase, ShoppingBag, Sliders, Edit,
  TrendingUp, Heart, Settings, Plus, Star, Calendar, Users, FileText,
  LogOut, Sun, Moon, CreditCard
} from 'lucide-react';

const MENU_CONFIG = {
  admin: [
    { id: 'overview',    label: 'Overview',            icon: TrendingUp, group: 'Analytics'   },
    { id: 'users',       label: 'Users',                icon: User,       group: 'Management'  },
    { id: 'vendors',     label: 'Vendors',              icon: Users,      group: 'Management'  },
    { id: 'jobs',        label: 'Jobs',                 icon: Briefcase,  group: 'Management'  },
    { id: 'memberships', label: 'Membership Cards',     icon: CreditCard, group: 'Management'  },
    { id: 'products',    label: 'Products',             icon: ShoppingBag,group: 'Marketplace' },
    { id: 'services',    label: 'Services',             icon: Sliders,    group: 'Marketplace' },
    { id: 'categories',  label: 'Categories',           icon: Settings,   group: 'Config'      },
    { id: 'cms',         label: 'CMS',                  icon: Edit,       group: 'Config'      },
  ],
  user: [
    { id: 'overview',     label: 'Overview',             icon: TrendingUp, group: 'General'     },
    { id: 'profile',      label: 'My Profile',           icon: User,       group: 'General'     },
    { id: 'orders',       label: 'Orders & Bookings',    icon: ShoppingBag,group: 'Activity'    },
    { id: 'applications', label: 'Applications',         icon: FileText,   group: 'Activity'    },
    { id: 'saved',        label: 'Saved',                icon: Heart,      group: 'Activity'    },
    { id: 'membership',   label: 'Membership',           icon: CreditCard, group: 'Account'     },
    { id: 'settings',     label: 'Settings',             icon: Settings,   group: 'Account'     },
  ],
  vendor: [
    { id: 'overview',     label: 'Earnings',             icon: TrendingUp, group: 'Analytics'   },
    { id: 'add-service',  label: 'Add Service',          icon: Plus,       group: 'Services'    },
    { id: 'services',     label: 'My Services',          icon: Sliders,    group: 'Services'    },
    { id: 'orders',       label: 'Bookings',             icon: ShoppingBag,group: 'Services'    },
    { id: 'reviews',      label: 'Reviews',              icon: Star,       group: 'Services'    },
  ],
  employer: [
    { id: 'overview',     label: 'Reports',              icon: TrendingUp, group: 'Analytics'   },
    { id: 'post-job',     label: 'Post a Job',           icon: Plus,       group: 'Hiring'      },
    { id: 'jobs',         label: 'My Listings',          icon: Briefcase,  group: 'Hiring'      },
    { id: 'applicants',   label: 'Applicants',           icon: Users,      group: 'Hiring'      },
    { id: 'interviews',   label: 'Interviews',           icon: Calendar,   group: 'Hiring'      },
  ],
};

const ROLE_LABEL = {
  admin: 'Admin Console', user: 'Member Hub',
  vendor: 'Vendor Studio', employer: 'Recruiter Hub',
};
const ROLE_ICON = { admin: Shield, user: User, vendor: ShoppingBag, employer: Briefcase };

export default function Sidebar({ role, activeTab, setActiveTab, isOpen, onClose }) {
  const { currentUser, setCurrentUser, setRole: setGlobalRole, theme, toggleTheme } = useApp();
  const menu = MENU_CONFIG[role] || [];

  if (role === 'visitor' || role === 'login') return null;

  // Group items
  const groups = [...new Set(menu.map(i => i.group))];
  const RoleIcon = ROLE_ICON[role] || User;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-40 flex flex-col
          lg:static lg:z-0 lg:translate-x-0 lg:h-auto
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          width: '220px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
        }}
      >
        {/* ── Role header ── */}
        <div
          className="pt-[74px] lg:pt-5 px-4 pb-4 flex items-center gap-2.5"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
            <RoleIcon size={13} className="text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--text-base)' }}>
              {ROLE_LABEL[role] || role}
            </p>
            {currentUser && (
              <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
                {currentUser.name.split(' ')[0]}
              </p>
            )}
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {groups.map(group => (
            <div key={group}>
              <p className="section-label px-2 mb-2">{group}</p>
              <div className="space-y-0.5">
                {menu.filter(i => i.group === group).map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); onClose?.(); }}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                      <Icon size={14} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ── Footer status ── */}
        <div className="px-4 py-4 space-y-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-faint)' }}>
                Session active
              </span>
            </div>
            {role === 'admin' && (
              <button
                onClick={toggleTheme}
                className="text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors cursor-pointer"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
              </button>
            )}
          </div>
          {role === 'admin' && (
            <button
              onClick={() => {
                setCurrentUser(null);
                setGlobalRole('visitor');
              }}
              className="w-full py-2 px-3 rounded-lg border text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all text-red-400 border-red-500/20 hover:bg-red-500/10 cursor-pointer"
            >
              <LogOut size={12} />
              Logout Console
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
