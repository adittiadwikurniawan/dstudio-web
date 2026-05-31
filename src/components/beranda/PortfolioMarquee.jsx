import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const PortfolioMarquee = () => {
  const [activeTab, setActiveTab] = useState('ktm'); // 'ktm' | 'cpns' | 'jashitam'

  const tabs = [
    { id: 'ktm', label: 'Pas Foto KTM', icon: 'solar:square-academic-cap-bold' },
    { id: 'cpns', label: 'Pas Foto CPNS', icon: 'solar:document-bold' },
    { id: 'jashitam', label: 'Pas Foto Jas Hitam', icon: 'solar:user-bold' },
  ];

  // Dummy portfolio data with strict, equal sizes (w-48 h-64, aspect ratio 3:4)
  const portfolioData = {
    ktm: [
      {
        before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=270&bg=blue',
        label: 'KTM Univ Brawijaya'
      },
      {
        before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=270&bg=red',
        label: 'KTM Univ Indonesia'
      },
      {
        before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=270&bg=blue',
        label: 'KTM Univ Gadjah Mada'
      },
      {
        before: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=270&bg=red',
        label: 'KTM Univ Airlangga'
      },
      {
        before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=270&bg=blue',
        label: 'KTM Institut Teknologi Bandung'
      }
    ],
    cpns: [
      {
        before: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=270',
        label: 'CPNS Kemenkumham'
      },
      {
        before: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200&h=270',
        label: 'CPNS Kementerian Luar Negeri'
      },
      {
        before: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=200&h=270',
        label: 'CPNS Kementerian Kesehatan'
      },
      {
        before: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=270',
        label: 'CPNS Kemendikbud'
      }
    ],
    jashitam: [
      {
        before: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=270',
        label: 'Profil LinkedIn Formal'
      },
      {
        before: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=270',
        label: 'Foto Berkas Kerja BUMN'
      },
      {
        before: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=270',
        after: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=270',
        label: 'Pas Foto Kerja Swasta'
      }
    ]
  };

  const activeItems = portfolioData[activeTab] || [];
  // Duplicate list to achieve infinite marquee scrolling effect
  const marqueeItems = [...activeItems, ...activeItems, ...activeItems, ...activeItems];

  return (
    <section className="bg-slate-50 dark:bg-zinc-900/40 py-24 overflow-hidden border-t border-slate-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-4">
          Tetap Jadi Diri Sendiri, <br className="sm:hidden" />
          Pesan Pas Foto Anda Sekarang
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto mb-8">
          Hasil editing profesional kami terbukti rapi dan sesuai kebutuhan administrasi instansi terkait.
        </p>

        {/* Tab buttons */}
        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-slate-200/70 dark:bg-zinc-800/80 rounded-2xl border border-slate-300/30">
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 focus:outline-none ${
                  isTabActive
                    ? 'bg-white dark:bg-zinc-700 text-primary-600 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon icon={tab.icon} className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliding Marquee - Strictly consistent image sizes (w-48 h-64 equivalent in tailwind: w-[190px] h-[260px]) */}
      <div className="relative w-full flex items-center justify-center overflow-hidden py-4 select-none">
        {/* Left and Right Blur Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-zinc-950 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent dark:from-zinc-950 z-10 pointer-events-none" />

        {/* Scrolling Inner Track */}
        <div className="flex gap-6 animate-marquee w-max py-2">
          {marqueeItems.map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[190px] h-[260px] bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-md border border-slate-200/40 dark:border-zinc-700/50 hover:-translate-y-1 transition-transform duration-300 relative group"
            >
              {/* Split Before/After layout */}
              <div className="h-full w-full flex">
                {/* Before Half */}
                <div className="w-1/2 h-full relative overflow-hidden bg-slate-100 border-r border-white/50">
                  <img 
                    src={item.before} 
                    alt="Sebelum" 
                    className="w-[190px] h-full object-cover max-w-none grayscale brightness-95" 
                  />
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-bold text-white uppercase tracking-wider">
                    Before
                  </div>
                </div>
                {/* After Half */}
                <div className="w-1/2 h-full relative overflow-hidden bg-primary-50">
                  <img 
                    src={item.after} 
                    alt="Sesudah" 
                    className="w-[190px] h-full object-cover max-w-none ml-[-95px]" 
                  />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-primary-500/80 text-[9px] font-bold text-white uppercase tracking-wider">
                    After
                  </div>
                </div>
              </div>
              
              {/* Hover Overlay Detail */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">D Studio Edit</span>
                <h4 className="text-xs font-bold text-white truncate">{item.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mt-12">
        <Link to="/pesanan">
          <Button className="shadow-lg shadow-primary-500/20">
            Pesan Pas Foto Sekarang
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PortfolioMarquee;
