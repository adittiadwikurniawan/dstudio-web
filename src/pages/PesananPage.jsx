import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import OrderStepper from '../components/pesanan/OrderStepper';
import StepDataFoto from '../components/pesanan/StepDataFoto';
import StepKonfirmasi from '../components/pesanan/StepKonfirmasi';
import StepPembayaran from '../components/pesanan/StepPembayaran';
import StepSelesai from '../components/pesanan/StepSelesai';
import Toast from '../components/ui/Toast';
import { fallbackServices } from '../data/services';
import { generateTicketCode } from '../lib/helpers';
import axiosInstance from '../lib/axios';

const PesananPage = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service_id: '',
    photo_link: '',
    notes: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});

  // Pre-select service from URL param if available
  useEffect(() => {
    const serviceId = searchParams.get('serviceId');
    if (serviceId) {
      const match = fallbackServices.find((s) => s.id === serviceId);
      if (match) {
        setFormData((prev) => ({ ...prev, service_id: match.id }));
      }
    }
  }, [searchParams]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Validasi Google Drive / Dropbox link
  const isValidPhotoLink = (url) => {
    try {
      const parsed = new URL(url);
      const validHosts = [
        'drive.google.com',
        'docs.google.com',
        'photos.google.com',
        'drive.usercontent.google.com',
        'www.dropbox.com',
        'dropbox.com',
      ];
      return validHosts.some(h => parsed.hostname === h || parsed.hostname.endsWith('.' + h));
    } catch {
      return false;
    }
  };

  // Validasi nomor telepon Indonesia
  const isValidPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    // Harus mulai dengan 08, 62, atau +62, dan panjang 9-13 digit
    return /^(08|628|62)\d{7,11}$/.test(cleaned) || /^\+?628\d{7,11}$/.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!isValidPhoneNumber(formData.whatsapp)) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid. Contoh: 08123456789 atau +628123456789';
    }
    if (!formData.service_id) newErrors.service_id = 'Pilih jenis pas foto';
    if (!formData.photo_link.trim()) {
      newErrors.photo_link = 'Link foto Google Drive wajib diisi';
    } else if (!isValidPhotoLink(formData.photo_link)) {
      newErrors.photo_link = 'Hanya link Google Drive / Google Photos / Dropbox yang diterima';
    }
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'Anda harus menyetujui kebijakan privasi untuk melanjutkan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setToastMessage({
        type: 'error',
        text: 'Silakan lengkapi formulir dengan benar.',
      });
    }
  };

  const handleBackStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 → 3 (ke halaman pembayaran)
  const handleGoToPayment = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3 → 4 (konfirmasi bayar & submit order)
  const handleSubmitOrder = async () => {
    setIsLoading(true);

    const generatedTicket = generateTicketCode(formData.whatsapp);
    setTicketCode(generatedTicket);

    const payload = {
      ticket_code: generatedTicket,
      customer_name: formData.name,
      email: formData.email,
      whatsapp_number: formData.whatsapp,
      service_id: formData.service_id,
      service_name: fallbackServices.find(s => s.id === formData.service_id)?.name || 'Pas Foto Custom',
      raw_photo_link: formData.photo_link,
      notes: formData.notes,
      status: 'PENDING_PAYMENT',
    };

    try {
      await axiosInstance.post('/orders', payload);
      setToastMessage({
        type: 'success',
        text: 'Pesanan berhasil terdaftar di server backend.',
      });
      setStep(4);
    } catch (error) {
      console.warn('API POST failed, running offline fallback mode: ', error.message);
      const currentOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      currentOrders.push({
        id: Math.floor(Math.random() * 10000),
        ...payload,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('local_orders', JSON.stringify(currentOrders));

      setToastMessage({
        type: 'info',
        text: 'Server offline. Pesanan disimpan di penyimpanan lokal (Fallback Mode).',
      });
      setStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedService = fallbackServices.find((s) => s.id === formData.service_id);

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* Page Hero */}
      <PageHero
        badge="Buat Pesanan"
        title="Upload Foto, Kami yang Urus Sisanya"
        subtitle="Isi formulir pesanan di bawah ini. Proses edit pas foto Anda selesai dalam waktu kurang dari 24 jam!"
      />

      {/* Stepper indicator */}
      <OrderStepper currentStep={step} />

      {/* Render Steps */}
      {step === 1 && (
        <StepDataFoto
          formData={formData}
          errors={errors}
          services={fallbackServices}
          onChange={handleFieldChange}
          onNext={handleNextStep}
        />
      )}

      {step === 2 && (
        <StepKonfirmasi
          formData={formData}
          selectedService={selectedService}
          isLoading={isLoading}
          onBack={handleBackStep}
          onSubmit={handleGoToPayment}
        />
      )}

      {step === 3 && (
        <StepPembayaran
          selectedService={selectedService}
          isLoading={isLoading}
          onBack={handleBackStep}
          onPaid={handleSubmitOrder}
        />
      )}

      {step === 4 && (
        <StepSelesai
          ticketCode={ticketCode}
          whatsapp={formData.whatsapp}
        />
      )}

      {/* Toast popup */}
      {toastMessage && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default PesananPage;
