import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const TestimonialsIphone = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const reviews = [
    {
      name: 'Rizky Pratama',
      university: 'Universitas Brawijaya',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
      message: 'Asli gila cepet banget! Cuma nunggu 20 menit, pas foto KTM almamater saya udah jadi dan rapi banget jasnya. Gak keliatan tempelan sama sekali. Recommended parah! 👍',
      time: '09:42',
      rating: 5,
    },
    {
      name: 'Amira Salma',
      university: 'Pendaftar CPNS 2026',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      message: 'Sempet deg-degan karena upload foto CPNS mepet deadline. Edit dasi sama kemeja putih di sini cuma hitungan menit, langsung lolos verifikasi berkas administrasi portal SSCASN. Makasih admin!',
      time: '14:15',
      rating: 5,
    },
    {
      name: 'Muhammad Nur Hadi',
      university: 'Pencari Kerja / LinkedIn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      message: 'Foto selfie biasa diubah jadi pas foto jas hitam profesional buat CV & LinkedIn. Harganya murah banget dibanding ke studio foto beneran, prosesnya juga praktis banget tinggal kirim gdrive.',
      time: '18:02',
      rating: 5,
    }
  ];

  return (
    <section className="bg-white dark:bg-zinc-950 py-24 border-t border-slate-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column - Heading and Description */}
        <div className="lg:col-span-6 flex flex-col gap-6 items-start">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800/30">
            <Icon icon="solar:chat-round-like-bold" />
            Apa Kata Mereka?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Kepuasan Pelanggan Adalah <br className="hidden sm:inline" />
            <span className="text-primary-500">Prioritas Utama Kami</span>
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            Ratusan mahasiswa, pelamar kerja, dan peserta seleksi CPNS telah membuktikan kepraktisan layanan kami. Dapatkan kualitas edit pas foto terbaik tanpa perlu keluar rumah.
          </p>
          
          {/* Review Switcher Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-md mt-4">
            {reviews.map((rev, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReviewIndex(idx)}
                className={`flex items-center gap-4 p-4 rounded-2xl text-left border transition-all duration-300 ${
                  activeReviewIndex === idx
                    ? 'bg-slate-50 dark:bg-zinc-900 border-primary-200 dark:border-zinc-700 shadow-sm'
                    : 'bg-transparent border-slate-100 dark:border-transparent hover:bg-slate-50/50'
                }`}
              >
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-zinc-700" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{rev.name}</h4>
                  <p className="text-xs text-slate-400 truncate">{rev.university}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/20 px-2.5 py-1 rounded-lg">
                  <Icon icon="solar:star-bold" className="w-3.5 h-3.5" />
                  {rev.rating.toFixed(1)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Premium iPhone Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-[310px] h-[620px] rounded-[48px] bg-slate-900 border-[12px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-700/50">
            {/* Notch / Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3">
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-900/40" />
            </div>

            {/* Speaker bar */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-1 bg-zinc-800 rounded-full z-30" />

            {/* Inner Screen Screen Area */}
            <div className="w-full h-full bg-[#efeae2] dark:bg-zinc-900 flex flex-col font-sans">
              {/* WhatsApp Header */}
              <div className="pt-10 pb-3 px-4 bg-slate-100/90 dark:bg-zinc-850/90 border-b border-slate-200/50 dark:border-zinc-800/50 flex items-center gap-2 shadow-sm z-20">
                <Icon icon="solar:alt-arrow-left-outline" className="text-primary-500 w-5 h-5 cursor-pointer" />
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-xs border border-primary-200">
                  DS
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[11px] font-black text-slate-800 dark:text-slate-100 leading-tight">Customer Care D Studio</h5>
                  <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </p>
                </div>
                <Icon icon="solar:phone-bold" className="text-primary-500 w-4 h-4" />
                <Icon icon="solar:videocamera-record-bold" className="text-primary-500 w-4 h-4" />
              </div>

              {/* Chat Body area */}
              <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3.5 relative bg-[#e5ddd5] dark:bg-zinc-950">
                {/* Background WhatsApp style texture fallback */}
                <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay" />

                {/* Date Stamp */}
                <div className="self-center px-3 py-1 bg-white/60 dark:bg-zinc-800/60 rounded-lg text-[9px] font-bold text-slate-500 uppercase shadow-sm">
                  Hari Ini
                </div>

                {/* Chat bubble Client (Left side green/white) */}
                <div className="self-start max-w-[85%] bg-white dark:bg-zinc-850 p-2.5 rounded-2xl rounded-tl-none shadow-sm relative">
                  <p className="text-[10px] font-medium text-slate-700 dark:text-slate-300">
                    Halo Kak, mau nanya. Bisa edit pas foto KTM pake almamater kampus saya gak ya? Saya cuma punya foto selfie biasa.
                  </p>
                  <span className="block text-[8px] text-right text-slate-400 mt-1">09:30</span>
                </div>

                {/* Chat bubble Admin (Right side light-blue) */}
                <div className="self-end max-w-[85%] bg-[#d9fdd3] dark:bg-primary-950/20 p-2.5 rounded-2xl rounded-tr-none shadow-sm relative">
                  <p className="text-[10px] font-medium text-slate-700 dark:text-slate-300">
                    Bisa banget Kak! Kirim aja link Google Drive foto selfie Kakak pas order. Nanti kami pasangkan jas almamater digital & rapihin sekalian wajah & background-nya.
                  </p>
                  <span className="block text-[8px] text-right text-slate-400 mt-1">09:32</span>
                </div>

                {/* Chat bubble client review testimonial */}
                <div className="self-start max-w-[85%] bg-white dark:bg-zinc-850 p-2.5 rounded-2xl rounded-tl-none shadow-sm relative animate-fade-in">
                  <div className="flex items-center gap-1 text-[9px] text-amber-500 mb-1.5">
                    <Icon icon="solar:star-bold" />
                    <Icon icon="solar:star-bold" />
                    <Icon icon="solar:star-bold" />
                    <Icon icon="solar:star-bold" />
                    <Icon icon="solar:star-bold" />
                  </div>
                  <p className="text-[10.5px] font-semibold text-slate-800 dark:text-slate-200 italic leading-snug">
                    "{reviews[activeReviewIndex].message}"
                  </p>
                  <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-slate-100 dark:border-zinc-800">
                    <img 
                      src={reviews[activeReviewIndex].avatar} 
                      alt="" 
                      className="w-5 h-5 rounded-full object-cover" 
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block text-[9px] font-bold text-slate-800 dark:text-slate-200 truncate leading-none">
                        {reviews[activeReviewIndex].name}
                      </span>
                      <span className="block text-[8px] text-slate-400 truncate leading-none mt-0.5">
                        {reviews[activeReviewIndex].university}
                      </span>
                    </div>
                  </div>
                  <span className="block text-[8px] text-right text-slate-400 mt-1">{reviews[activeReviewIndex].time}</span>
                </div>

                {/* Reply from Admin */}
                <div className="self-end max-w-[85%] bg-[#d9fdd3] dark:bg-primary-950/20 p-2.5 rounded-2xl rounded-tr-none shadow-sm relative">
                  <p className="text-[10px] font-medium text-slate-700 dark:text-slate-300">
                    Alhamdulillah, terima kasih banyak atas ulasannya Kak! Sukses terus ya kuliah/urusannya! 🙏✨
                  </p>
                  <span className="block text-[8px] text-right text-slate-400 mt-1">09:50</span>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-2.5 bg-slate-100 dark:bg-zinc-850 border-t border-slate-200/50 dark:border-zinc-800/50 flex items-center gap-2">
                <Icon icon="solar:add-circle-linear" className="text-slate-500 w-5 h-5" />
                <div className="flex-1 py-1.5 px-3 bg-white dark:bg-zinc-900 rounded-full border border-slate-200 dark:border-zinc-800 text-[10px] text-slate-400">
                  Tulis pesan...
                </div>
                <Icon icon="solar:microphone-bold" className="text-slate-500 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsIphone;
