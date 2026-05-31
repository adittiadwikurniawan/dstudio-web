import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageHero from '../components/layout/PageHero';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { fallbackServices } from '../data/services';
import { formatRupiah } from '../lib/helpers';

const LayananPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState(fallbackServices[0]);

  // Handle query parameter filtering (e.g., from landing page quick links)
  useEffect(() => {
    const slug = searchParams.get('slug');
    if (slug) {
      const match = fallbackServices.find((s) => s.slug === slug);
      if (match) {
        setSelectedService(match);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      
      {/* Page Hero */}
      <PageHero
        badge="Katalog Layanan"
        title="Pilih Layanan Pas Foto Terbaik"
        subtitle="Kami menyediakan berbagai paket edit pas foto formal digital dengan standar instansi resmi nasional maupun kedutaan internasional."
      />

      {/* Services Grid Selection */}
      <section className="py-12 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Services Grid Cards List */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
            Pilih Paket Layanan
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fallbackServices.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`cursor-pointer border rounded-[28px] p-4 bg-white dark:bg-zinc-900 transition-all duration-350 flex flex-col gap-4 group ${
                    isSelected
                      ? 'border-primary-500 ring-2 ring-primary-500/10 shadow-md'
                      : 'border-slate-200/50 dark:border-zinc-800 hover:border-slate-350 dark:hover:border-zinc-700 hover:shadow-sm'
                  }`}
                >
                  {/* Image Grid Preview */}
                  <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-slate-100 flex">
                    <div className="w-1/2 h-full relative overflow-hidden border-r border-white">
                      <img src={service.sampleBefore} alt="" className="w-full h-full object-cover grayscale brightness-95" />
                    </div>
                    <div className="w-1/2 h-full relative overflow-hidden">
                      <img src={service.sampleAfter} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant={isSelected ? 'success' : 'neutral'}>
                        {service.duration}
                      </Badge>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150 leading-tight mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {service.name.replace(/\(.*?\)/g, '')}
                      </h4>
                      <p className="text-[10px] font-bold text-primary-500 tracking-wider">
                        {formatRupiah(service.price)}
                      </p>
                    </div>
                    <div className="flex justify-end items-center mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800/40 text-[10px] font-black text-slate-400 group-hover:text-primary-500 transition-colors">
                      Detail Selengkapnya
                      <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 ml-1.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Selection Panel */}
        <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col gap-6 sticky top-24">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest">
              Layanan Detail Penjelasan
            </span>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
              {selectedService.name}
            </h2>
          </div>

          {/* Large split image rendering */}
          <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden bg-slate-150 border border-slate-200/40 dark:border-zinc-800 flex">
            {/* Before Half */}
            <div className="w-1/2 h-full relative overflow-hidden border-r border-white">
              <img src={selectedService.sampleBefore} alt="Sebelum" className="w-full h-full object-cover grayscale brightness-95" />
              <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-black/50 text-[9px] font-bold text-white uppercase tracking-wider">
                Foto Selfie
              </div>
            </div>
            {/* After Half */}
            <div className="w-1/2 h-full relative overflow-hidden">
              <img src={selectedService.sampleAfter} alt="Sesudah" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-primary-500/80 text-[9px] font-bold text-white uppercase tracking-wider">
                Hasil Edit Pas Foto
              </div>
            </div>
          </div>

          {/* Description & Specifications list */}
          <div className="flex flex-col gap-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              {selectedService.description}
            </p>
            
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Spesifikasi & Fitur:
              </span>
              <ul className="text-xs font-medium text-slate-600 dark:text-slate-400 space-y-2 pl-1">
                <li className="flex items-start gap-2.5">
                  <Icon icon="solar:round-transfer-horizontal-bold" className="text-primary-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Spesifikasi Warna:</strong> {selectedService.bgSpec}</span>
                </li>
                {selectedService.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Icon icon="solar:check-circle-bold-duotone" className="text-emerald-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-6 pt-6 border-t border-slate-100 dark:border-zinc-800">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">Total Biaya</span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                {formatRupiah(selectedService.price)}
              </span>
            </div>
            <Link to={`/pesanan?serviceId=${selectedService.id}`}>
              <Button size="lg" className="shadow-lg shadow-primary-500/10">
                Pesan Sekarang
                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
};

export default LayananPage;
