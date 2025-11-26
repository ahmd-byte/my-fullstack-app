import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Bot,
    BarChart2,
    FileText,
    Settings,
    LogOut,
    Menu,
    Bell,
    Moon,
    Sun,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDark(true);
        }
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/automations', icon: Bot, label: 'Automations' },
        { path: '/analytics', icon: BarChart2, label: 'Analytics' },
        { path: '/logs', icon: FileText, label: 'Logs' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-200 flex">
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen bg-card-light dark:bg-card-dark border-r border-divider-light dark:border-divider-dark transition-all duration-300
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className={`h-16 flex items-center ${isSidebarOpen ? 'px-6' : 'justify-center'} border-b border-divider-light dark:border-divider-dark`}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white shrink-0">
                            <Bot size={20} />
                        </div>
                        {isSidebarOpen && (
                            <span className="ml-3 font-bold text-lg tracking-tight">Automation Hub</span>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6 px-3 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                  flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group
                  ${isActive
                                        ? 'bg-accent/10 text-accent'
                                        : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-primary-light dark:hover:text-text-primary-dark'
                                    }
                  ${!isSidebarOpen && 'justify-center'}
                `}
                                title={!isSidebarOpen ? item.label : ''}
                            >
                                <item.icon size={20} className={isSidebarOpen ? 'mr-3' : ''} />
                                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="p-3 border-t border-divider-light dark:border-divider-dark space-y-1">
                        <button
                            onClick={toggleTheme}
                            className={`
                w-full flex items-center px-3 py-2.5 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors
                ${!isSidebarOpen && 'justify-center'}
              `}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            {isSidebarOpen && <span className="ml-3 font-medium">Theme</span>}
                        </button>

                        <button
                            onClick={handleLogout}
                            className={`
                w-full flex items-center px-3 py-2.5 rounded-lg text-error-light dark:text-error-dark hover:bg-error-light/10 dark:hover:bg-error-dark/10 transition-colors
                ${!isSidebarOpen && 'justify-center'}
              `}
                        >
                            <LogOut size={20} />
                            {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                        </button>
                    </div>
                </div>

                {/* Collapse Toggle (Desktop) */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-card-light dark:bg-card-dark border border-divider-light dark:border-divider-dark rounded-full flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:text-accent shadow-sm hidden lg:flex"
                >
                    {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md border-b border-divider-light dark:border-divider-dark flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="p-2 -ml-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <button className="relative p-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-light rounded-full border-2 border-card-light dark:border-card-dark"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-divider-light dark:border-divider-dark">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{user?.username || 'User'}</p>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Admin</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 ring-2 ring-white dark:ring-gray-800 cursor-pointer flex items-center justify-center text-white font-bold text-xs">
                                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
