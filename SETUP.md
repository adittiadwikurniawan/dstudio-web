# Setup Proyek DStudio Web

## Tujuan
Panduan ini membantu kamu menyiapkan lingkungan pengembangan proyek React ini tanpa mengubah arsitektur aplikasi.

## Kondisi saat ini
- Proyek ini adalah aplikasi React biasa menggunakan `react-scripts`.
- Bukan Next.js.
- Routing menggunakan `react-router-dom`.
- Styling Tailwind saat ini menggunakan `@tailwindcss/browser` CDN di `public/index.html`.

## Prasyarat
1. Node.js terpasang pada sistem.
2. `npm` tersedia pada PATH.

Jika `node` belum terpasang, install salah satu cara berikut:
- macOS Homebrew: `brew install node`
- nvm: `nvm install --lts`
- Download langsung dari https://nodejs.org

## Setup Lokal
1. Buka terminal di folder proyek:
   ```bash
   cd '/Users/mymac/Downloads/KULIAH/Semester 2/UAS/dstudio-web'
   ```
2. Install dependency:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm start
   ```
4. Untuk build produksi:
   ```bash
   npm run build
   ```

## Catatan penting
- Karena proyek ini menggunakan `react-scripts`, jangan ubah struktur folder untuk dijadikan Next.js pada tahap setup awal.
- Jika kamu ingin menambahkan library modern seperti Framer Motion, React Bits, atau tooltip/react-toast, lakukan setelah environment lokal berjalan stabil.

## Troubleshooting
- Jika terminal memberi pesan `command not found: node` atau `command not found: npm`, berarti Node.js belum terpasang atau PATH belum terset.
- Jika ingin memakai `nvm`:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  source ~/.zshrc
  nvm install --lts
  nvm use --lts
  ```

## Ringkasannya
Kamu perlu memastikan Node.js dan npm tersedia terlebih dahulu. Setelah environment siap, jalankan `npm install` dan `npm start` untuk mulai mengembangkan proyek tanpa mengubah arsitektur saat ini.
