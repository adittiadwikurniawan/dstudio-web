import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';

const StepSelesai = ({ ticketCode, whatsapp }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ticketCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-6 pb-20 text-center animate-scale-up">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-8 shadow-xl flex flex-col items-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-emerald-500 mb-6 shadow-md">
          <Icon icon="solar:check-circle-bold" className="w-9 h-9" />
        </div>

        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">
          Pesanan Berhasil Dibuat!
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Tiket pesanan Anda telah diterbitkan. Silakan catat dan simpan kode tiket di bawah untuk melacak progres editing foto Anda.
        </p>

        {/* Ticket Box */}
        <div className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-dashed border-slate-350 dark:border-zinc-700 rounded-2xl p-5 mb-6 flex flex-col gap-2 relative">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            KODE TIKET PELACAKAN
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-wider">
              {ticketCode || '#DSTxxxxxxxxxx'}
            </span>
            <button 
              onClick={copyToClipboard}
              className="p-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-zinc-700 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
              title="Salin Kode Tiket"
            >
              <Icon icon={copied ? "solar:check-circle-bold" : "solar:copy-bold"} className={`w-5 h-5 ${copied ? 'text-emerald-500' : ''}`} />
            </button>
          </div>
          {copied && (
            <span className="text-[10px] font-bold text-emerald-500 animate-fade-in absolute bottom-1.5 left-1/2 -translate-x-1/2">
              Berhasil disalin!
            </span>
          )}
        </div>

        {/* Informative Instructions */}
        <div className="flex flex-col gap-3 text-xs font-semibold text-slate-500 text-left border-t border-slate-100 dark:border-zinc-800 pt-5 w-full mb-8">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-950/20 text-primary-500 flex items-center justify-center text-[10px] font-black mt-0.5">
              1
            </div>
            <p className="flex-1 text-slate-500">
              Tim editor kami akan meninjau kelayakan foto mentah Anda.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-950/20 text-primary-500 flex items-center justify-center text-[10px] font-black mt-0.5">
              2
            </div>
            <p className="flex-1 text-slate-500">
              Ubah status pengerjaan dapat dilacak sewaktu-waktu di halaman Cek Status.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-950/20 text-primary-500 flex items-center justify-center text-[10px] font-black mt-0.5">
              3
            </div>
            <p className="flex-1 text-slate-500">
              Notifikasi selesai beserta link download foto juga akan dikirim langsung via WhatsApp ke <span className="font-bold text-slate-700 dark:text-slate-350">{whatsapp}</span>.
            </p>
          </div>
        </div>

        {/* Buttons Links */}
        <div className="flex flex-col gap-2.5 w-full">
          <Link to={`/cek-status?ticket=${ticketCode}`}>
            <Button className="w-full shadow-md shadow-primary-500/10">
              Lacak Pesanan Sekarang
              <Icon icon="solar:double-alt-arrow-right-bold" className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StepSelesai;
