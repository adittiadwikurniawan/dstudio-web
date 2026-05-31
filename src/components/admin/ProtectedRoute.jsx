import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('admin_token');
  const userRole = localStorage.getItem('admin_role'); // 'ADMIN' or 'SUPER_ADMIN'

  // 1. Guard: Check if token exists
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // 2. Guard: Check role authorization
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Render elegant Error 403 page
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-10 max-w-md w-full shadow-lg flex flex-col items-center">
          
          {/* Warning Icon */}
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center text-rose-500 mb-6 shadow-md shadow-rose-500/5">
            <Icon icon="solar:shield-warning-bold" className="w-9 h-9" />
          </div>

          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">
            Akses Ditolak (403)
          </h1>
          
          <p className="text-xs text-slate-400 leading-relaxed mb-8">
            Akun Anda tidak memiliki otoritas tingkat tinggi yang diperlukan untuk mengakses halaman pengelola ini. Halaman ini khusus untuk Super Admin.
          </p>

          <div className="flex flex-col gap-2.5 w-full">
            <Link to="/admin/dashboard" className="w-full">
              <Button className="w-full shadow-md shadow-primary-500/10">
                Kembali ke Dashboard
              </Button>
            </Link>
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.href = '/admin/login';
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-650 transition-colors py-2 focus:outline-none"
            >
              Keluar & Ganti Akun
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 3. Render children components
  return children;
};

export default ProtectedRoute;
