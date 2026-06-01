import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdminLoggedIn = !!localStorage.getItem('admin_token') && !!localStorage.getItem('admin_id');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Layanan', path: '/layanan' },
    { name: 'Cek Status', path: '/cek-status' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-zinc-800/50 shadow-sm' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group focus:outline-none">
          <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
            D
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-primary-600 transition-colors duration-200">
            Studio<span className="text-primary-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-zinc-900/80 p-1.5 rounded-full border border-slate-200/40 dark:border-zinc-800/40">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {navLinks.findIndex(l => l.name === link.name) === 2 && isActive ? (
                  <span className="flex items-center gap-1.5">
                    <Icon icon="solar:ticket-bold" className="w-4 h-4 text-primary-500" />
                    {link.name}
                  </span>
                ) : (
                  link.name
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Side CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAdminLoggedIn ? (
            <Link to="/admin/dashboard">
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Icon icon="solar:user-bold" className="w-4 h-4 text-primary-500" />
                Dashboard Admin
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/admin/register" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                Admin Register
              </Link>
              <Link to="/admin/login" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                Admin Login
              </Link>
            </>
          )}
          <Link to="/pesanan">
            <Button size="sm" className="shadow-primary-500/10">
              Pesan Sekarang
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <Icon icon={isOpen ? "solar:close-circle-bold" : "solar:menu-hamburger-bold"} className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] z-30 bg-white dark:bg-zinc-950 flex flex-col p-6 animate-fade-in">
          <nav className="flex flex-col gap-4 mt-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 p-4 text-base font-bold rounded-2xl transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Icon icon={
                    link.name === 'Beranda' ? 'solar:home-smile-angle-bold' :
                    link.name === 'Layanan' ? 'solar:case-minimalistic-bold' : 'solar:ticket-bold'
                  } className="w-5 h-5 text-current" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto flex flex-col gap-3 pb-12">
            <Link to="/pesanan" className="w-full">
              <Button className="w-full py-3.5">Pesan Sekarang</Button>
            </Link>
            {isAdminLoggedIn ? (
              <Link to="/admin/dashboard" className="w-full">
                <Button variant="outline" className="w-full py-3.5 flex justify-center items-center gap-2">
                  <Icon icon="solar:user-bold" className="w-4 h-4 text-primary-500" />
                  Dashboard Admin
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/admin/register" className="w-full">
                  <Button variant="ghost" className="w-full py-3.5 text-slate-600">
                    Register Admin
                  </Button>
                </Link>
                <Link to="/admin/login" className="w-full">
                  <Button variant="ghost" className="w-full py-3.5 text-slate-600">
                    Login Admin
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
