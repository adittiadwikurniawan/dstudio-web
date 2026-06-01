import React from 'react';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import { formatRupiah } from '../../lib/helpers';

const StepKonfirmasi = ({
  formData,
  selectedService,
  isLoading,
  onBack,
  onSubmit,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 flex flex-col gap-6 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-sm">
        
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2.5 border-b border-slate-100 dark:border-zinc-800 pb-4 mb-6">
          <Icon icon="solar:bill-list-bold-duotone" className="text-primary-500 w-5.5 h-5.5" />
          Konfirmasi Pesanan & Detail Pembayaran
        </h2>

        {/* Selected Package Details */}
        {selectedService && (
          <div className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 mb-6 flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black text-[#2101FC] uppercase tracking-widest">
                Paket Yang Dipilih
              </span>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                {selectedService.name}
              </h3>
              <p className="text-xs text-slate-400">
                Durasi edit: {selectedService.duration} • Revisi Gratis
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                {formatRupiah(selectedService.price)}
              </span>
            </div>
          </div>
        )}

        {/* Data Diri Grid */}
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
          Informasi Kontak & Berkas
        </h4>
        <div className="grid grid-cols-1 gap-3.5 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4.5 mb-6">
          <div className="flex justify-between text-xs py-1.5 border-b border-slate-100 dark:border-zinc-800/40">
            <span className="font-semibold text-slate-400">Nama Customer</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{formData.name}</span>
          </div>
          <div className="flex justify-between text-xs py-1.5 border-b border-slate-100 dark:border-zinc-800/40">
            <span className="font-semibold text-slate-400">Nomor WhatsApp</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{formData.whatsapp}</span>
          </div>
          <div className="flex justify-between text-xs py-1.5 border-b border-slate-100 dark:border-zinc-800/40">
            <span className="font-semibold text-slate-400">Alamat Email</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{formData.email}</span>
          </div>
          <div className="flex flex-col gap-1 py-1.5 border-b border-slate-100 dark:border-zinc-800/40">
            <span className="font-semibold text-slate-400">Link Google Drive Foto Mentah</span>
            <a 
              href={formData.photo_link} 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs font-bold text-primary-500 hover:underline flex items-center gap-1.5 break-all"
            >
              <Icon icon="solar:link-round-linear" />
              {formData.photo_link}
            </a>
          </div>
          <div className="flex flex-col gap-1 py-1.5">
            <span className="font-semibold text-slate-400">Catatan Edit</span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-zinc-800/20 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800/40 mt-1">
              {formData.notes || 'Tidak ada catatan khusus.'}
            </p>
          </div>
        </div>

        {/* Pricing Summary */}
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
          Ringkasan Invoice
        </h4>
        <div className="flex flex-col gap-2.5 border border-slate-150 dark:border-zinc-800/60 rounded-2xl p-4.5 bg-slate-50/50 dark:bg-zinc-850/20 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Harga Layanan</span>
            <span className="font-medium text-slate-700 dark:text-slate-350">{formatRupiah(selectedService?.price)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Biaya Administrasi</span>
            <span className="font-medium text-emerald-600">Gratis (Rp 0)</span>
          </div>
          <div className="h-px bg-slate-200 dark:bg-zinc-800 my-1" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Total Pembayaran</span>
            <span className="text-xl font-black text-[#2101FC]">
              {formatRupiah(selectedService?.price)}
            </span>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4 flex gap-3 items-start mb-6">
          <Icon icon="solar:info-circle-bold-duotone" className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-xs font-medium text-amber-800 dark:text-amber-400">
            <span className="font-bold block mb-0.5">Langkah Selanjutnya:</span>
            Setelah mengklik tombol di bawah, Anda akan diarahkan ke halaman <strong>pembayaran via QRIS</strong>. Proses pengerjaan 1×24 jam dimulai setelah pembayaran dikonfirmasi.
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <Button 
            variant="outline" 
            onClick={onBack} 
            className="w-full sm:w-auto" 
            disabled={isLoading}
          >
            <Icon icon="solar:arrow-left-linear" className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <Button 
            onClick={onSubmit} 
            className="w-full sm:flex-1 shadow-lg shadow-[#2101FC]/20" 
            isLoading={isLoading}
          >
            Lanjut ke Pembayaran QRIS
            <Icon icon="mdi:qrcode-scan" className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default StepKonfirmasi;
