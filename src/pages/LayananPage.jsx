import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import Button from '../components/ui/Button';
import BeforeAfterSlider from '../components/layanan/BeforeAfterSlider';
import { fallbackServices } from '../data/services';
import { formatRupiah } from '../lib/helpers';
import axiosInstance from '../lib/axios';

const LayananPage = () => {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState(fallbackServices);
  const [selectedService, setSelectedService] = useState(fallbackServices[0]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/services');
      // Map backend fields to frontend expected format
      const mappedServices = response.data.map(service => ({
        id: service.id_layanan,
        name: service.nama_layanan,
        price: service.harga,
        description: service.deskripsi || '',
        bgSpec: 'Latar Belakang Solid', // Default value since backend doesn't have this
        duration: '1-24 Jam', // Default value since backend doesn't have this
        slug: service.nama_layanan.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        specs: ['Pemberian aksesoris pakaian digital rapi', 'Penyesuaian latar belakang solid', 'Retouching wajah alami'],
        sampleBefore: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        sampleAfter: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      }));
      setServices(mappedServices);
      if (!selectedService || mappedServices.length > 0) {
        setSelectedService(mappedServices[0]);
      }
    } catch (error) {
      console.warn('API Services fetch failed, using fallback: ', error.message);
      // Keep fallback services if API fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const slug = searchParams.get('slug');
    if (slug) {
      const match = services.find((s) => s.slug === slug);
      if (match) {
        setSelectedService(match);
      }
    }
  }, [searchParams, services]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <PageHero
        badge="Katalog Layanan"
        title="Pilih Layanan Pas Foto Terbaik"
        subtitle="Kami menyediakan berbagai paket edit pas foto formal digital dengan standar instansi resmi nasional maupun kedutaan internasional."
      />

      <main className="max-w-7xl mx-auto px-6 pb-20 space-y-14">
        <section>
          <BeforeAfterSlider
            services={services}
            selectedService={selectedService}
            onServiceChange={setSelectedService}
          />
        </section>

        <section className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-500">
              Menu Layanan
            </span>
            <h2 className="mt-4 text-3xl font-black text-slate-900 dark:text-slate-100">
              Layanan kami tanpa gambar — hanya nama, deskripsi, harga, dan tombol pesan.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Pilih paket pas foto formal yang sesuai keperluanmu, mulai dari KTM, KTP, CPNS, hingga Visa.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/70 dark:bg-zinc-950"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                        Harga layanan
                      </p>
                      <p className="mt-2 text-2xl font-black text-primary-600 dark:text-primary-400">
                        {formatRupiah(service.price)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 text-slate-500 dark:text-slate-400">
                      <span className="text-xs uppercase tracking-[0.28em]">Durasi</span>
                      <span className="text-sm font-semibold">{service.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      {service.bgSpec}
                    </span>
                    <Link to={`/pesanan?serviceId=${service.id}`}>
                      <Button size="md" className="shadow-lg shadow-primary-500/10">
                        Pesan Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LayananPage;
