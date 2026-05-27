import axios from './api';

export const servicesApi = {
  getServices: async () => {
    try {
      const res = await axios.get('/api/services');
      return res.data;
    } catch (error) {
      return [
        {
          id_layanan: 1,
          nama_layanan: 'Foto Editing Dasar',
          deskripsi: 'Perbaikan warna, pencahayaan, dan cropping untuk hasil foto yang lebih profesional.',
          harga: 50000,
        },
        {
          id_layanan: 2,
          nama_layanan: 'Retouch Wajah',
          deskripsi: 'Menghilangkan noda, jerawat, dan penyesuaian kulit untuk tampilan lebih halus.',
          harga: 75000,
        },
        {
          id_layanan: 3,
          nama_layanan: 'Background Remove',
          deskripsi: 'Menghapus atau mengganti latar belakang foto sesuai keinginan.',
          harga: 90000,
        },
      ];
    }
  },
};
