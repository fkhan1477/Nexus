import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  UserCircle, 
  LogOut, 
  Briefcase,
  CalendarDays
} from 'lucide-react';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine dashboard links dynamically based on role context
  const isInvestor = user?.role === 'investor';
  const baseDashboardPath = isInvestor ? '/investor' : '/entrepreneur';

  const navigationItems = [
    { 
      name: 'Main Workspace', 
      href: baseDashboardPath, 
      icon: LayoutDashboard 
    },
    { 
      name: 'Advanced Collaboration', 
      href: '/collaboration', 
      icon: CalendarDays 
    },
    { 
      name: 'Profile Control', 
      href: `${baseDashboardPath}/profile`, 
      icon: UserCircle 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Workspace Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="p-5">
          <div className="flex items-center space-x-3 pb-6 border-b border-slate-800">
            <Briefcase className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold tracking-tight">Business Nexus</span>
          </div>
          
          <nav className="mt-6 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Context Footer Area */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Logged in as</p>
              <p className="text-sm font-medium text-slate-200 truncate">{user?.email || 'Active Session'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Primary Application Render Container */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}