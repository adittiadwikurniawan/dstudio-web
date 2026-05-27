import axios from './api';

export const homeApi = {
  getHome: async () => {
    try {
      const res = await axios.get('/api/home');
      const { hero_title, hero_subtitle, about_text } = res.data;
      return {
        heroTitle: hero_title,
        heroSubtitle: hero_subtitle,
        aboutText: about_text,
      };
    } catch (error) {
      return {
        heroTitle: 'DStudio Photography',
        heroSubtitle: 'Jasa Edit Foto Profesional',
        aboutText:
          'Selamat datang di DStudio. Kami menyediakan jasa edit foto cepat, rapi, dan profesional meskipun layanan API sedang tidak tersedia.',
      };
    }
  },
};
