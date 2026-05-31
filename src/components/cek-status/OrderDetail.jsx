import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatDate } from '../../lib/helpers';

const OrderDetail = ({ order, onDownload }) => {
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  if (!order) return null;

  const isCompleted = order.status === 'SELESAI' || order.status === 'DIAMBIL';

  const getStatusBadgeVariant = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING': return 'warning';
      case 'PROSES': return 'info';
      case 'SELESAI': return 'success';
      case 'DIAMBIL': return 'indigo';
      default: return 'neutral';
    }
  };

  const handleRating = (stars) => {
    setRating(stars);
    setRated(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-6 animate-fade-in pb-16">
      
      {/* Overview Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-slate-800 dark:text-slate-100">
              #{order.ticket_code}
            </span>
            <Badge variant={getStatusBadgeVariant(order.status)}>
              {order.status}
            </Badge>
          </div>
          <span className="text-xs text-slate-400">
            Dibuat: {formatDate(order.created_at || new Date())}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-zinc-800/40">
              <span className="font-semibold text-slate-400">Nama Customer</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{order.customer_name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-zinc-800/40">
              <span className="font-semibold text-slate-400">Nomor WhatsApp</span>
              <a 
                href={`https://wa.me/${order.whatsapp_number.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noreferrer" 
                className="font-bold text-primary-500 hover:underline flex items-center gap-1"
              >
                <Icon icon="bi:whatsapp" />
                {order.whatsapp_number}
              </a>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-semibold text-slate-400">Email</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{order.email}</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-zinc-800/40">
              <span className="font-semibold text-slate-400">Layanan</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{order.service_name || 'Pas Foto'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-zinc-800/40">
              <span className="font-semibold text-slate-400">Estimasi Selesai</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">1x24 Jam Kerja</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-semibold text-slate-400">Link Foto Mentah</span>
              <a 
                href={order.raw_photo_link} 
                target="_blank" 
                rel="noreferrer" 
                className="font-bold text-primary-500 hover:underline flex items-center gap-1 max-w-[180px] truncate"
              >
                <Icon icon="solar:link-round-linear" />
                Buka Link Drive
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Completion status download action */}
      {isCompleted ? (
        <div className="flex flex-col gap-6 w-full">
          {/* Download box */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-[32px] p-8 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Icon icon="solar:cloud-storage-bold" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">
                Foto Anda Sudah Siap!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                Tim editor kami telah selesai mengedit pas foto Anda dengan kualitas terbaik. Unduh berkas foto resmi Anda sekarang melalui tombol di bawah.
              </p>
            </div>
            
            <a 
              href={order.finished_photo_link || '#'} 
              target="_blank" 
              rel="noreferrer" 
              className="mt-2"
              onClick={onDownload}
            >
              <Button className="bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500 shadow-md shadow-emerald-500/10">
                <Icon icon="solar:download-minimalistic-bold" className="w-5 h-5 mr-2" />
                Unduh Hasil Foto Sekarang
              </Button>
            </a>
          </div>

          {/* Review star rating feedback widget */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 text-center">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Bagaimana Hasil Editannya?
            </h4>
            <div className="flex justify-center items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-2xl transition-transform hover:scale-110 focus:outline-none ${
                    star <= (rating || 5) ? 'text-amber-400' : 'text-slate-200'
                  }`}
                  disabled={rated}
                >
                  <Icon icon="solar:star-bold" />
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400">
              {rated ? 'Terima kasih atas ulasan Anda! ❤️' : 'Ulasan Anda membantu kami untuk terus berkembang.'}
            </p>
          </div>
        </div>
      ) : (
        /* Processing status waiting card */
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-8 text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center animate-pulse">
            <Icon icon="solar:magic-stick-bold" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">
              Foto Anda Sedang Diproses
            </h3>
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
              Editor kami sedang merapikan wajah, menyesuaikan jas almamater digital, dan membersihkan latar belakang foto Anda. Halaman ini akan diperbarui otomatis setelah pengerjaan selesai.
            </p>
          </div>
          
          <a 
            href={`https://wa.me/6287766086204?text=Halo%20DStudio%20saya%20ingin%20tanya%20progres%20tiket%20${order.ticket_code}`} 
            target="_blank" 
            rel="noreferrer"
            className="mt-2"
          >
            <Button variant="outline" className="flex items-center gap-2">
              <Icon icon="bi:whatsapp" className="text-emerald-500" />
              Chat Admin via WhatsApp
            </Button>
          </a>
        </div>
      )}

    </div>
  );
};

export default OrderDetail;
