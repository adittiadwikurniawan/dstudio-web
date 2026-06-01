import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import TicketInput from '../components/cek-status/TicketInput';
import StatusProgress from '../components/cek-status/StatusProgress';
import OrderDetail from '../components/cek-status/OrderDetail';
import Toast from '../components/ui/Toast';
import axiosInstance from '../lib/axios';

const CekStatusPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleSearchTicket = async (ticketCode) => {
    setIsLoading(true);
    setOrder(null);
    
    // Set query params so the URL updates
    setSearchParams({ ticket: ticketCode });

    // Try API call
    try {
      const response = await axiosInstance.post('/order/status', { ticket_id: ticketCode });
      // Map backend fields to frontend expected format
      const mappedOrder = {
        ticket_code: response.data.kode_tiket,
        customer_name: response.data.nama_pelanggan,
        whatsapp_number: response.data.no_wa,
        email: response.data.email || '-',
        service_name: response.data.layanan?.nama_layanan || 'Pas Foto',
        raw_photo_link: response.data.link_foto_mentah,
        finished_photo_link: response.data.link_foto_hasil,
        notes: response.data.catatan,
        total_bayar: response.data.total_bayar,
        status: (response.data.keterangan_status?.toLowerCase() === 'revisi' ? 'REVISI' : response.data.status_pesanan?.toUpperCase()) || 'PENDING',
        created_at: response.data.created_at,
      };
      setOrder(mappedOrder);
      setToastMessage({
        type: 'success',
        text: 'Data pesanan berhasil ditemukan dari server.',
      });
    } catch (error) {
      console.warn('API status query failed, running fallbacks: ', error.message);
      
      // Fallback 1: Local Storage search
      const localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      const localMatch = localOrders.find((o) => o.ticket_code === ticketCode);
      
      if (localMatch) {
        setOrder(localMatch);
        setToastMessage({
          type: 'info',
          text: 'Data ditemukan di penyimpanan lokal (Offline Mode).',
        });
        setIsLoading(false);
        return;
      }

      // Fallback 2: Demo Mock Ticket codes
      const mockOrderTemplate = {
        ticket_code: ticketCode,
        customer_name: 'Rizky Pratama',
        whatsapp_number: '087766086204',
        email: 'rizky.pratama@student.ub.ac.id',
        service_name: 'Pas Foto KTM (Kartu Tanda Mahasiswa)',
        raw_photo_link: 'https://drive.google.com/file/d/demo-raw-file',
        finished_photo_link: 'https://drive.google.com/file/d/demo-finished-file',
        notes: 'Almamater Universitas Brawijaya warna biru laut. Latar belakang merah terang.',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
      };

      if (ticketCode === 'DST-DEMO-PENDING') {
        setOrder({ ...mockOrderTemplate, status: 'PENDING' });
      } else if (ticketCode === 'DST-DEMO-PROSES') {
        setOrder({ ...mockOrderTemplate, status: 'PROSES' });
      } else if (ticketCode === 'DST-DEMO-SELESAI') {
        setOrder({ ...mockOrderTemplate, status: 'SELESAI' });
      } else {
        // Not found at all
        setToastMessage({
          type: 'error',
          text: `Kode tiket "${ticketCode}" tidak terdaftar.`,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Autoload ticket code if present in URL query
  useEffect(() => {
    const ticketQuery = searchParams.get('ticket');
    if (ticketQuery) {
      handleSearchTicket(ticketQuery);
    }
  }, [searchParams]);

  // Handle mock download status transition (Selesai -> Diambil)
  const handleDownload = () => {
    if (order && order.status === 'SELESAI') {
      const updatedOrder = { ...order, status: 'DIAMBIL' };
      setOrder(updatedOrder);
      
      // Update local storage order status too
      const localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      const index = localOrders.findIndex((o) => o.ticket_code === order.ticket_code);
      if (index !== -1) {
        localOrders[index].status = 'DIAMBIL';
        localStorage.setItem('local_orders', JSON.stringify(localOrders));
      }
      
      setToastMessage({
        type: 'success',
        text: 'Berkas berhasil diunduh. Status diperbarui menjadi "Diambil".',
      });
    }
  };

  const initialTicketQuery = searchParams.get('ticket') || '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      
      {/* Page Hero */}
      <PageHero
        badge="Lacak Progres"
        title="Lacak Status Pesanan Anda"
        subtitle="Masukkan kode tiket pelacakan Anda di bawah ini untuk melihat progres editing foto Anda secara real-time."
      />

      {/* Search Input */}
      <TicketInput
        initialValue={initialTicketQuery}
        isLoading={isLoading}
        onSearch={handleSearchTicket}
      />

      {/* Search Result display */}
      {order && (
        <div className="flex flex-col">
          <StatusProgress status={order.status} />
          <OrderDetail order={order} onDownload={handleDownload} />
        </div>
      )}

      {/* Toast Notification */}
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

export default CekStatusPage;
