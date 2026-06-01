import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-10 max-w-md w-full shadow-lg flex flex-col items-center">
        
        {/* Error icon */}
        <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/30 flex items-center justify-center text-primary-500 mb-6 shadow-md shadow-primary-500/5">
          <Icon icon="solar:link-broken-minimalistic-bold" className="w-9 h-9" />
        </div>

        <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">
          404
        </h1>
        <h2 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-8">
          Halaman yang Anda tuju telah dipindahkan, dihapus, atau tautan yang dimasukkan salah.
        </p>

        <Link to="/" className="w-full">
          <Button className="w-full shadow-md shadow-primary-500/10">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
