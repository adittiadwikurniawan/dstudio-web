import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import { formatRupiah } from '../../lib/helpers';

const EWALLET_LOGOS = [
  { name: 'GoPay', icon: 'simple-icons:gojek', color: '#00AED6' },
  { name: 'OVO', icon: 'simple-icons:ovo', color: '#4C3494' },
  { name: 'Dana', icon: 'simple-icons:dana', color: '#118EEA' },
  { name: 'ShopeePay', icon: 'simple-icons:shopee', color: '#EE4D2D' },
  { name: 'LinkAja', icon: 'mdi:link-variant', color: '#E82529' },
  { name: 'BCA Mobile', icon: 'mdi:bank-outline', color: '#0066AE' },
];

const COUNTDOWN_SECONDS = 15 * 60; // 15 menit

const StepPembayaran = ({ selectedService, onPaid, onBack, isLoading }) => {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const [copied, setCopied] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const isExpired = timeLeft <= 0;
  const isUrgent = timeLeft <= 60 && !isExpired;

  const copyNominal = () => {
    navigator.clipboard.writeText(String(selectedService?.price || ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 flex flex-col gap-6 animate-fade-in">

      {/* QRIS Card */}
      <div className="bg-white border border-slate-200/50 rounded-3xl overflow-hidden shadow-xl shadow-primary-500/5">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#2101FC] to-[#0030FC] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-0.5">Metode Pembayaran</p>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Icon icon="mdi:qrcode-scan" className="w-5 h-5" />
              QRIS Statis DStudio
            </h2>
          </div>
          {/* Countdown Timer */}
          <div className={`flex flex-col items-end ${isExpired ? 'opacity-60' : ''}`}>
            <span className="text-[10px] font-semibold text-blue-200 uppercase tracking-wider">
              {isExpired ? 'Sesi Kadaluarsa' : 'Batas Waktu Bayar'}
            </span>
            <span className={`text-2xl font-black tabular-nums tracking-wider ${isUrgent ? 'text-red-300 animate-pulse' : 'text-white'}`}>
              {isExpired ? '00:00' : `${minutes}:${seconds}`}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col items-center gap-5">

          {/* E-wallet logos */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {EWALLET_LOGOS.map((w) => (
              <div key={w.name} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
                <Icon icon={w.icon} style={{ color: w.color }} className="w-4 h-4" />
                <span className="text-[11px] font-bold text-slate-600">{w.name}</span>
              </div>
            ))}
          </div>

          {/* QR Code */}
          <div className="relative group">
            <div
              className="border-4 border-[#2101FC]/20 rounded-2xl overflow-hidden cursor-zoom-in transition-transform hover:scale-[1.02] shadow-lg"
              onClick={() => setZoomed(true)}
              title="Klik untuk perbesar QR"
            >
              <img
                src="/qris-dstudio.png"
                alt="QRIS DStudio"
                className="w-56 h-56 object-cover"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-full px-3 py-1 text-[10px] font-bold text-slate-500 shadow-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <Icon icon="solar:magnifer-zoom-in-linear" className="w-3 h-3" />
              Klik untuk perbesar
            </div>
          </div>

          {/* Merchant Info */}
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Merchant</p>
            <p className="text-base font-black text-slate-800">DStudio — Edit Pas Foto</p>
          </div>

          {/* Nominal */}
          <div className="w-full bg-[#2101FC]/5 border border-[#2101FC]/15 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nominal Transfer</p>
              <p className="text-2xl font-black text-[#2101FC]">
                {formatRupiah(selectedService?.price)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Pastikan nominal tepat agar verifikasi otomatis</p>
            </div>
            <button
              onClick={copyNominal}
              className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-[#2101FC]/40 hover:bg-[#2101FC]/5 text-slate-600 hover:text-[#2101FC] px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200"
            >
              <Icon icon={copied ? 'solar:check-circle-bold' : 'solar:copy-bold'} className={`w-4 h-4 ${copied ? 'text-success' : ''}`} />
              {copied ? 'Tersalin!' : 'Salin'}
            </button>
          </div>

          {/* Instructions */}
          <div className="w-full border-t border-slate-100 pt-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Cara Bayar via QRIS:</p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: 'solar:smartphone-bold-duotone', text: 'Buka aplikasi e-wallet atau m-banking Anda (GoPay, OVO, Dana, dll)' },
                { icon: 'mdi:qrcode-scan', text: 'Pilih menu "Bayar / Scan QR" lalu arahkan kamera ke QR di atas' },
                { icon: 'solar:dollar-minimalistic-bold-duotone', text: `Masukkan nominal tepat sebesar ${formatRupiah(selectedService?.price)}` },
                { icon: 'solar:check-circle-bold-duotone', text: 'Selesaikan pembayaran, lalu klik tombol "Konfirmasi Sudah Bayar" di bawah' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#2101FC]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon icon={item.icon} className="w-3.5 h-3.5 text-[#2101FC]" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning banner if expired */}
          {isExpired && (
            <div className="w-full bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 items-start">
              <Icon icon="solar:danger-triangle-bold-duotone" className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-red-700">
                Sesi pembayaran telah kadaluarsa. Silakan kembali ke langkah sebelumnya dan ulangi proses pesanan.
              </p>
            </div>
          )}

          {/* Info banner */}
          {!isExpired && (
            <div className="w-full bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start">
              <Icon icon="solar:shield-check-bold-duotone" className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-amber-700">
                <span className="font-bold block mb-0.5">⚠ Penting:</span>
                Screenshot bukti transfer WhatsApp ke <span className="font-bold">+62 851-XXXX-XXXX</span> setelah klik konfirmasi. Tim kami akan verifikasi pembayaran secara manual dalam 1–15 menit.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onBack} className="w-full sm:w-auto" disabled={isLoading}>
            <Icon icon="solar:arrow-left-linear" className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <Button
            onClick={onPaid}
            className="w-full sm:flex-1 shadow-lg shadow-[#2101FC]/20"
            isLoading={isLoading}
            disabled={isExpired}
          >
            <Icon icon="solar:check-circle-bold" className="w-4 h-4 mr-2" />
            Konfirmasi Sudah Bayar
          </Button>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setZoomed(false)}
        >
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full flex flex-col items-center gap-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm font-black text-slate-800">QRIS DStudio</p>
              <button onClick={() => setZoomed(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                <Icon icon="solar:close-linear" className="w-4 h-4" />
              </button>
            </div>
            <img src="/qris-dstudio.png" alt="QRIS DStudio Enlarged" className="w-full max-w-xs rounded-xl" />
            <p className="text-xs text-slate-400 text-center">Scan dengan e-wallet apapun yang mendukung QRIS</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepPembayaran;
