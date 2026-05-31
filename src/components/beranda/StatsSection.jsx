import React from 'react';
import { Icon } from '@iconify/react';

const StatsSection = () => {
  const stats = [
    {
      value: '500+',
      label: 'Foto Selesai Diedit',
      icon: <Icon icon="solar:camera-add-bold-duotone" className="w-6 h-6 text-primary-500" />,
    },
    {
      value: '1x24 Jam',
      label: 'Proses Pengerjaan',
      icon: <Icon icon="solar:clock-circle-bold-duotone" className="w-6 h-6 text-indigo-500" />,
    },
    {
      value: '100%',
      label: 'Privasi Terjamin',
      icon: <Icon icon="solar:shield-check-bold-duotone" className="w-6 h-6 text-emerald-500" />,
    },
    {
      value: '5.0 ★',
      label: 'Rating Rata-Rata',
      icon: <Icon icon="solar:star-bold-duotone" className="w-6 h-6 text-amber-500" />,
    },
  ];

  return (
    <section className="bg-slate-50 dark:bg-zinc-900/50 py-12 border-y border-slate-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-zinc-800">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center p-4 ${
                idx > 1 ? 'pt-8 lg:pt-4' : 'pt-4'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-slate-100 dark:border-zinc-700/50 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
                {stat.value}
              </h3>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
