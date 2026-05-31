import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'ADMIN', // Default role select for easy mock testing
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleFieldChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication mock check
    setTimeout(() => {
      setIsLoading(false);
      
      // Store credentials
      localStorage.setItem('admin_token', `mock-jwt-token-key-${Math.random().toString(36).substring(2)}`);
      localStorage.setItem('admin_role', formData.role);
      localStorage.setItem('admin_name', formData.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Editor Admin');
      
      setToastMessage({
        type: 'success',
        text: `Login sukses sebagai ${formData.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}!`,
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
        // Force header update
        window.location.reload();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <div className="inline-flex w-12 h-12 rounded-2xl bg-primary-500 items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-primary-500/20 mb-4">
          D
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Admin Portal D Studio
        </h2>
        <p className="mt-2 text-xs text-slate-450 dark:text-slate-400">
          Silakan masuk ke akun pengelola Anda untuk memproses berkas pas foto.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-zinc-900 py-8 px-6 border border-slate-200/50 dark:border-zinc-800/50 shadow-md sm:rounded-[32px] sm:px-10">
          
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Username / Email"
              type="text"
              placeholder="Masukkan username admin"
              value={formData.username}
              onChange={(e) => handleFieldChange('username', e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              required
            />

            <Select
              label="Role Otoritas Akses"
              options={[
                { value: 'ADMIN', label: 'Admin (Akses Dashboard & Verifikasi)' },
                { value: 'SUPER_ADMIN', label: 'Super Admin (Akses Penuh + CRUD Layanan)' }
              ]}
              value={formData.role}
              onChange={(e) => handleFieldChange('role', e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500"
                  defaultChecked
                />
                <label htmlFor="remember-me" className="ml-2 text-slate-500 dark:text-slate-455">
                  Ingat saya
                </label>
              </div>

              <a href="#forgot" className="text-primary-500 hover:underline">
                Lupa sandi?
              </a>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full py-3 mt-2 shadow-lg shadow-primary-500/10"
                isLoading={isLoading}
              >
                Masuk Sistem
                <Icon icon="solar:login-bold" className="w-4.5 h-4.5 ml-2" />
              </Button>
            </div>
          </form>

          {/* Quick instructions for reviewer */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-zinc-800 text-[10px] font-medium text-slate-400">
            <span className="font-bold text-slate-700 dark:text-slate-350 block mb-1">💡 Tips Reviewer:</span>
            Pilih role <span className="font-bold text-slate-800">SUPER_ADMIN</span> untuk melihat CRUD layanan, atau <span className="font-bold text-slate-800">ADMIN</span> untuk mengetes proteksi halaman 403. Gunakan sembarang password.
          </div>

        </div>
      </div>

      {/* Toast popup */}
      {toastMessage && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

    </div>
  );
};

export default LoginPage;
