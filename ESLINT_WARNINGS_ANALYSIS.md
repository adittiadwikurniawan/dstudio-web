# Analisis ESLint Warnings - DStudio Web

## Ringkasan
Dokumentasi ini menjelaskan setiap warning ESLint yang muncul saat kompilasi, penyebabnya, dan cara memperbaikinya.

---

## 1. ServiceCard.js - Line 4:11

### ⚠️ Warning
```
'id_layanan' is assigned a value but never used  no-unused-vars
```

### 📍 Lokasi File
**File:** `src/components/services/ServiceCard.js`  
**Line:** 4  
**Column:** 11

### 📝 Analisis Kode
```javascript
// Line 3-4
export function ServiceCard({ service }) {
  const { id_layanan, nama_layanan, deskripsi, harga } = service;
                    ↑ Di-destructure tapi tidak digunakan
```

### 🔍 Penyebab
Variabel `id_layanan` di-destructure dari object `service` tetapi tidak pernah digunakan di dalam komponen. Hanya `nama_layanan`, `deskripsi`, dan `harga` yang digunakan untuk menampilkan UI.

### 📊 Kode Lengkap dengan Fungsi
```javascript
/**
 * ServiceCard Component
 * 
 * Props:
 * - service: Object { id_layanan, nama_layanan, deskripsi, harga }
 * 
 * Fungsi:
 * Menampilkan kartu layanan dengan informasi nama, deskripsi, harga, dan tombol pesan.
 * 
 * Flow:
 * 1. Extract data dari prop service
 * 2. Format harga ke format IDR
 * 3. Render UI: gambar placeholder → nama → deskripsi → harga → tombol pesan
 */
export function ServiceCard({ service }) {
  // ❌ UNUSED: const { id_layanan, ... } = service;
  const { id_layanan, nama_layanan, deskripsi, harga } = service;

  /**
   * formatPrice()
   * Mengonversi angka ke format currency IDR
   * @param {number} price - Nilai harga
   * @returns {string} - Format: "Rp X.XXX"
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Gambar placeholder */}
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        <span className="text-gray-400">Gambar Layanan</span>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-dstudio-dark mb-2">
          {nama_layanan}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {deskripsi}
        </p>
        <p className="text-2xl font-bold text-dstudio-gold mb-4">
          {formatPrice(harga)}
        </p>
        
        {/* Button Pesan */}
        <Link
          to="/pesan/step-1"
          className="block text-center bg-dstudio-dark text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Pesan
        </Link>
      </div>
    </div>
  );
}
```

### ✅ Solusi
**Opsi 1:** Hapus `id_layanan` dari destructuring (jika benar-benar tidak dipakai)
```javascript
const { nama_layanan, deskripsi, harga } = service;
```

**Opsi 2:** Gunakan `id_layanan` jika diperlukan (contoh: sebagai key atau identifikasi)
```javascript
<div key={id_layanan} className="...">
```

---

## 2. AdminDashboardPage.js - Line 7:10

### ⚠️ Warning
```
'Loader2' is defined but never used  no-unused-vars
```

### 📍 Lokasi File
**File:** `src/pages/admin/AdminDashboardPage.js`  
**Line:** 7  
**Column:** 10

### 📝 Analisis Kode
```javascript
// Line 7
import { Loader2, X, Trash2 } from 'lucide-react';
           ↑ Di-import tapi tidak digunakan
```

### 🔍 Penyebab
Icon `Loader2` dari library `lucide-react` di-import di awal file tetapi tidak pernah digunakan dalam render. Hanya `X` dan `Trash2` yang digunakan.

### 📊 Kode Lengkap dengan Fungsi
```javascript
/**
 * AdminDashboardPage Component
 * 
 * Fungsi Utama:
 * Menampilkan dashboard admin dengan tabel daftar pesanan yang dapat disaring
 * berdasarkan status (all, terkirim, diproses, selesai, revisi).
 * 
 * Features:
 * - Tab filter berdasarkan status
 * - Search pesanan
 * - Update status pesanan
 * - Delete pesanan
 * - Real-time refresh setelah action
 * 
 * Flow Data:
 * 1. Fetch orders dari API dengan filter status & search
 * 2. Tampilkan dalam tabel
 * 3. User bisa update status atau delete
 * 4. Refetch data setelah action berhasil
 */
export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // ✅ Query untuk fetch orders
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['orders', activeTab, search],
    queryFn: () => adminApi.getOrders({ 
      status: activeTab === 'all' ? '' : activeTab, 
      search 
    }),
  });

  // ✅ Mutation untuk update status
  const statusUpdateMutation = useMutation({
    mutationFn: ({ ticketId, requestBody }) => 
      adminApi.updateOrderStatus(ticketId, requestBody),
    onSuccess: () => {
      alert('Status pesanan berhasil diperbarui!');
      refetch();
    },
  });

  // ✅ Mutation untuk delete pesanan
  const deleteMutation = useMutation({
    mutationFn: (ticketId) => adminApi.deleteOrder(ticketId),
    onSuccess: () => {
      alert('Pesanan berhasil dihapus!');
      refetch();
    },
  });

  // ❌ UNUSED: import { Loader2, X, Trash2 } from 'lucide-react';
  // Hanya X dan Trash2 yang digunakan:
  // - X: icon clear search
  // - Trash2: icon delete pesanan
}
```

### ✅ Solusi
**Hapus `Loader2` dari import:**
```javascript
import { X, Trash2 } from 'lucide-react'; // ✅ Hapus Loader2
```

---

## 3. AdminEditUserPage.js - Line 21:11 & 21:17

### ⚠️ Warning
```
Line 21:11: 'data' is assigned a value but never used       no-unused-vars
Line 21:17: 'isLoading' is assigned a value but never used  no-unused-vars
```

### 📍 Lokasi File
**File:** `src/pages/admin/AdminEditUserPage.js`  
**Line:** 21 (2 variables)  
**Column:** 11 & 17

### 📝 Analisis Kode
```javascript
// Line 21-33
const { data, isLoading } = useQuery({
         ↑    ↑ Keduanya tidak digunakan di render
  queryKey: ['admin', id],
  queryFn: () => adminApi.getAdmin(id),
  onSuccess: (adminData) => {
    // Data diakses via parameter onSuccess, bukan via 'data'
    setFormData({
      nama_admin: adminData.nama_admin,
      username: adminData.username,
      password: '',
      password_confirmation: '',
      role: adminData.role,
    });
  },
});
```

### 🔍 Penyebab
`data` dan `isLoading` di-destructure dari `useQuery` tetapi:
1. Data diproses langsung di `onSuccess` callback, tidak perlu destructure ke variabel
2. `isLoading` tidak ditampilkan di UI (tidak ada loading state untuk form)

### 📊 Kode Lengkap dengan Fungsi
```javascript
/**
 * AdminEditUserPage Component
 * 
 * Fungsi Utama:
 * Form untuk edit data admin (nama, username, password, role).
 * 
 * Flow:
 * 1. Fetch data admin berdasarkan ID dari URL params
 * 2. Populate form dengan data yang di-fetch
 * 3. User edit field
 * 4. Submit perubahan
 * 5. Redirect ke halaman admin list jika berhasil
 * 
 * Validasi:
 * - Nama admin dan username wajib
 * - Password baru harus di-confirm jika diisi
 */
export function AdminEditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    nama_admin: '',
    username: '',
    password: '',
    password_confirmation: '',
    role: 'admin',
  });
  const [errors, setErrors] = useState({});

  /**
   * useQuery untuk fetch admin data
   * ❌ data dan isLoading tidak digunakan di return/render
   * Data hanya diproses di onSuccess callback
   */
  const { data, isLoading } = useQuery({
    queryKey: ['admin', id],
    queryFn: () => adminApi.getAdmin(id),
    onSuccess: (adminData) => {
      // 📍 Data diproses di sini, bukan di render
      setFormData({
        nama_admin: adminData.nama_admin,
        username: adminData.username,
        password: '',
        password_confirmation: '',
        role: adminData.role,
      });
    },
  });

  /**
   * handleSubmit()
   * Validasi form dan submit perubahan
   * Flow:
   * 1. Prevent default form submission
   * 2. Clear error states
   * 3. Prepare data (remove password jika kosong)
   * 4. Call mutation
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    
    const submitData = { ...formData };
    if (!submitData.password) {
      delete submitData.password;
      delete submitData.password_confirmation;
    }
    
    mutation.mutate(submitData);
  };

  return (
    <AdminLayout>
      <div className="bg-dstudio-dark min-h-screen py-12 px-6">
        {/* Form fields... */}
      </div>
    </AdminLayout>
  );
}
```

### ✅ Solusi
**Hapus `data` dan `isLoading` dari destructuring:**
```javascript
const {} = useQuery({
  queryKey: ['admin', id],
  queryFn: () => adminApi.getAdmin(id),
  onSuccess: (adminData) => {
    setFormData({
      nama_admin: adminData.nama_admin,
      username: adminData.username,
      password: '',
      password_confirmation: '',
      role: adminData.role,
    });
  },
});
```

Atau lebih rapi:
```javascript
useQuery({
  queryKey: ['admin', id],
  queryFn: () => adminApi.getAdmin(id),
  onSuccess: (adminData) => {
    setFormData({
      nama_admin: adminData.nama_admin,
      username: adminData.username,
      password: '',
      password_confirmation: '',
      role: adminData.role,
    });
  },
});
```

---

## 4. AdminServiceFormPage.js - Line 22:28

### ⚠️ Warning
```
'isLoadingService' is assigned a value but never used  no-unused-vars
```

### 📍 Lokasi File
**File:** `src/pages/admin/AdminServiceFormPage.js`  
**Line:** 22  
**Column:** 28

### 📝 Analisis Kode
```javascript
// Line 22-26
const { data, isLoading: isLoadingService } = useQuery({
                  ↑ Renamed tapi tidak digunakan
  queryKey: ['service', id],
  queryFn: () => adminApi.getService(id),
  enabled: isEdit,
});
```

### 🔍 Penyebab
`isLoading` di-rename menjadi `isLoadingService` tetapi tidak pernah digunakan di render atau conditional logic. Tidak ada loading state untuk form.

### 📊 Kode Lengkap dengan Fungsi
```javascript
/**
 * AdminServiceFormPage Component
 * 
 * Fungsi Utama:
 * Form untuk membuat atau edit layanan (service).
 * Supports:
 * - Create new service (POST)
 * - Edit existing service (PUT)
 * 
 * Flow:
 * 1. Check URL param 'id' untuk determine mode (create/edit)
 * 2. Jika edit: fetch service data by ID
 * 3. Populate form dengan data
 * 4. User edit fields
 * 5. Submit
 * 6. Redirect ke service list
 * 
 * Fields:
 * - Nama Layanan (required)
 * - Harga (required, number)
 * - Deskripsi (optional)
 * - Is Active (checkbox)
 */
export function AdminServiceFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id; // ✅ Determine mode

  const [formData, setFormData] = useState({
    nama_layanan: '',
    harga: '',
    deskripsi: '',
    is_active: true,
  });
  const [errors, setErrors] = useState({});

  /**
   * useQuery untuk fetch service data (hanya jika edit mode)
   * ❌ isLoadingService tidak digunakan di render
   * Tidak ada loading skeleton atau spinner saat fetch
   */
  const { data, isLoading: isLoadingService } = useQuery({
    queryKey: ['service', id],
    queryFn: () => adminApi.getService(id),
    enabled: isEdit, // ✅ Hanya fetch jika isEdit === true
  });

  /**
   * useEffect untuk populate form dengan data yang di-fetch
   * Trigger ketika 'data' berubah (setelah fetch selesai)
   */
  useEffect(() => {
    if (data?.service) {
      setFormData({
        nama_layanan: data.service.nama_layanan,
        harga: data.service.harga,
        deskripsi: data.service.deskripsi || '',
        is_active: data.service.is_active,
      });
    }
  }, [data]); // 📍 Dependency pada 'data'

  /**
   * useMutation untuk create atau update service
   * Conditional: isEdit ? PUT : POST
   */
  const mutation = useMutation({
    mutationFn: (data) => (
      isEdit 
        ? adminApi.updateService(id, data) 
        : adminApi.createService(data)
    ),
    onSuccess: () => {
      navigate('/admin/services'); // ✅ Redirect setelah sukses
    },
    onError: (err) => {
      setErrors(err.response?.data?.errors || {});
    },
  });

  /**
   * handleSubmit()
   * Validate dan submit form
   * Convert harga dari string ke number
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    mutation.mutate({
      ...formData,
      harga: Number(formData.harga), // ✅ Convert to number
    });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-dstudio-dark mb-6">
        {isEdit ? 'Edit Layanan' : 'Tambah Layanan'}
      </h1>
      {/* Form... */}
    </AdminLayout>
  );
}
```

### ✅ Solusi
**Hapus `isLoadingService` dari destructuring:**
```javascript
const { data } = useQuery({
  queryKey: ['service', id],
  queryFn: () => adminApi.getService(id),
  enabled: isEdit,
});
```

---

## 5. Step3Page.js - Line 13:34

### ⚠️ Warning
```
'reset' is assigned a value but never used  no-unused-vars
```

### 📍 Lokasi File
**File:** `src/pages/order/Step3Page.js`  
**Line:** 13  
**Column:** 34

### 📝 Analisis Kode
```javascript
// Line 13
const { orderState, setTicket, reset } = useOrder();
                                   ↑ Destructure tapi tidak digunakan
```

### 🔍 Penyebab
Function `reset` dari context `useOrder()` di-destructure tetapi tidak pernah dipanggil. `reset` seharusnya digunakan saat user menyelesaikan pesanan.

### 📊 Kode Lengkap dengan Fungsi
```javascript
/**
 * Step3Page Component
 * 
 * Fungsi Utama:
 * Menampilkan halaman pembayaran QRIS di step 3 (terakhir) proses pemesanan.
 * 
 * Flow:
 * 1. Check guard: redirect jika step 2 belum completed
 * 2. Fetch QRIS image dan service detail dari API
 * 3. Tampilkan QRIS code & instruksi pembayaran
 * 4. User confirm pesanan → POST ke API
 * 5. Jika sukses: set ticket_id dan redirect ke success page
 * 
 * Validasi Guard:
 * - Harus ada photo_link dari step 2
 * - Harus ada service_id dari step 1
 */
export function Step3Page() {
  const navigate = useNavigate();
  const { orderState, setTicket, reset } = useOrder();
  //                                   ↑ UNUSED
  const [error, setError] = useState(null);

  /**
   * Guard: redirect jika photo_link kosong (step 2 belum done)
   */
  useEffect(() => {
    if (!orderState.photo_link) {
      navigate('/pesan/step-1');
    }
  }, [orderState.photo_link, navigate]);

  /**
   * useQuery untuk fetch step3 data
   * Fetch: QRIS image, service details, harga
   */
  const { data, isLoading } = useQuery({
    queryKey: ['step3', orderState.service_id],
    queryFn: () => orderApi.getStep3(orderState.service_id),
    enabled: !!orderState.service_id,
  });

  /**
   * useMutation untuk post order (submit pesanan)
   * 
   * Flow:
   * 1. Send order data ke API
   * 2. Jika sukses: get ticket_id dari response
   * 3. Set ticket_id ke context
   * 4. Redirect ke success page
   * 5. ❌ UNUSED: reset() tidak dipanggil di sini
   */
  const mutation = useMutation({
    mutationFn: orderApi.postStep3,
    onSuccess: (response) => {
      if (response.success && response.ticket_id) {
        setTicket(response.ticket_id); // ✅ Set ticket_id
        navigate('/pesan/selesai'); // ✅ Redirect ke success
        // ❌ SHOULD BE: reset(); untuk clear context
      }
    },
    onError: (err) => {
      setError('Terjadi kesalahan saat membuat pesanan');
    },
  });

  /**
   * handleSubmit()
   * Collect order data dan submit
   */
  const handleSubmit = () => {
    setError(null);
    mutation.mutate({
      name: orderState.name,
      phone: orderState.phone,
      service_id: orderState.service_id,
      notes: orderState.notes,
      photo_link: orderState.photo_link,
    });
  };

  /**
   * handleBack()
   * Navigate ke step sebelumnya
   */
  const handleBack = () => {
    navigate('/pesan/step-2');
  };

  /**
   * formatPrice()
   * Format harga ke IDR
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  if (!orderState.photo_link) return null;

  return (
    <PublicLayout>
      <div className="bg-dstudio-dark min-h-screen py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <OrderStepper current={3} />

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-dstudio-dark mb-6">
              Pembayaran QRIS
            </h1>

            {error && <AlertBanner type="error" message={error} />}

            {/* QRIS Image */}
            <div className="bg-gray-100 rounded-lg p-4 inline-block mb-6">
              {data?.qris_image ? (
                <img
                  src={data.qris_image}
                  alt="QRIS Code"
                  className="w-64 h-64 object-contain"
                />
              ) : (
                <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">QRIS Image</span>
                </div>
              )}
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-dstudio-gold mb-6">
              {isLoading ? 'Memuat...' : formatPrice(data?.service?.harga)}
            </p>

            {/* Instructions */}
            <div className="bg-yellow-50 rounded-lg p-4 text-sm text-left mb-8">
              <p className="font-semibold text-yellow-800 mb-2">
                Instruksi Pembayaran:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-yellow-700">
                <li>Buka aplikasi e-wallet atau mobile banking</li>
                <li>Pilih pembayaran QRIS/Scan QR</li>
                <li>Scan QR code di atas</li>
                <li>Konfirmasi pembayaran</li>
                <li>Screenshot bukti pembayaran</li>
              </ol>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <ButtonSecondary onClick={handleBack} fullWidth>
                Kembali
              </ButtonSecondary>
              <ButtonPrimary 
                onClick={handleSubmit} 
                fullWidth 
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Memproses...' : 'Konfirmasi Pesanan'}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
```

### ✅ Solusi
**Gunakan `reset()` setelah berhasil membuat pesanan:**
```javascript
const mutation = useMutation({
  mutationFn: orderApi.postStep3,
  onSuccess: (response) => {
    if (response.success && response.ticket_id) {
      setTicket(response.ticket_id);
      reset(); // ✅ TAMBAH INI - Clear order context
      navigate('/pesan/selesai');
    }
  },
  onError: (err) => {
    setError('Terjadi kesalahan saat membuat pesanan');
  },
});
```

---

## 6. SuccessPage.js - Line 5:10 & 5:25

### ⚠️ Warning
```
Line 5:10:  'ButtonPrimary' is defined but never used    no-unused-vars
Line 5:25:  'ButtonSecondary' is defined but never used  no-unused-vars
```

### 📍 Lokasi File
**File:** `src/pages/order/SuccessPage.js`  
**Line:** 5  
**Column:** 10 & 25

### 📝 Analisis Kode
```javascript
// Line 5
import { ButtonPrimary, ButtonSecondary } from '../../components/common/Button';
           ↑                  ↑ Di-import tapi tidak digunakan
```

### 🔍 Penyebab
Components `ButtonPrimary` dan `ButtonSecondary` di-import di awal file tetapi dalam render, halaman menggunakan regular `Link` dan `<a>` tags untuk buttons, bukan component-nya.

### 📊 Kode Lengkap dengan Fungsi
```javascript
/**
 * SuccessPage Component
 * 
 * Fungsi Utama:
 * Menampilkan halaman kesuksesan setelah pesanan berhasil dibuat.
 * 
 * Features:
 * - Display ticket code (untuk di-screenshot)
 * - Show order details (nama, phone, service, total, catatan, timestamp)
 * - Tombol konfirmasi via WhatsApp
 * - Tombol cek status tiket
 * - Tombol pesan lagi (reset form)
 * 
 * Guard:
 * - Redirect ke home jika tidak ada ticket_id di context
 * 
 * Flow:
 * 1. Check if ticket_id exists (guard)
 * 2. Fetch order details by ticket_id
 * 3. Display ticket code & order info
 * 4. User bisa:
 *    a. Konfirmasi via WhatsApp
 *    b. Cek status tiket
 *    c. Pesan lagi (clear context & redirect ke step 1)
 */
export function SuccessPage() {
  const navigate = useNavigate();
  const { orderState, reset } = useOrder();

  // ❌ UNUSED IMPORTS:
  // import { ButtonPrimary, ButtonSecondary } from '../../components/common/Button';
  // Hanya menggunakan <Link> dan <a> tags, bukan components

  /**
   * Guard: redirect jika tidak ada ticket_id
   */
  useEffect(() => {
    if (!orderState.ticket_id) {
      navigate('/');
    }
  }, [orderState.ticket_id, navigate]);

  /**
   * useQuery untuk fetch order details
   * Fetch berdasarkan ticket_id yang ada di context
   */
  const { data, isLoading } = useQuery({
    queryKey: ['order', orderState.ticket_id],
    queryFn: () => orderApi.getOrder(orderState.ticket_id),
    enabled: !!orderState.ticket_id,
  });

  const order = data; // Assign for easier reference

  /**
   * formatPrice()
   * Format harga ke IDR format
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  /**
   * formatDate()
   * Format date string ke Indonesian format dengan jam
   * @param {string} dateString - ISO date string
   * @returns {string} - "DD/MM/YYYY HH:MM"
   */
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * waMessage
   * Generate WhatsApp message text dengan order details
   * Digunakan untuk confirm order via WhatsApp link
   */
  const waMessage = order
    ? encodeURIComponent(
        `Halo DStudio! Saya sudah melakukan pemesanan.\n` +
        `Kode Tiket: #${order.kode_tiket}\n` +
        `Nama: ${order.nama_pelanggan}\n` +
        `Layanan: ${order.layanan?.nama_layanan}\n` +
        `Total: ${formatPrice(order.total_bayar)}\n` +
        `Mohon dikonfirmasi. Terima kasih!`
      )
    : '';

  /**
   * handleNewOrder()
   * Clear order context dan prepare untuk order baru
   * Sebelum navigate ke step 1
   */
  const handleNewOrder = () => {
    reset(); // ✅ Clear context
  };

  // Guard: jangan render jika tidak ada ticket_id
  if (!orderState.ticket_id) return null;

  return (
    <PublicLayout>
      <div className="bg-dstudio-dark min-h-screen py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-8">
            Pesanan Berhasil!
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            {isLoading ? (
              <div>Memuat detail pesanan...</div>
            ) : (
              <>
                {/* Ticket Code Display */}
                <div className="mb-8">
                  <p className="text-5xl font-bold text-dstudio-gold font-mono mb-2">
                    #{order?.kode_tiket}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Screenshot kode ini!
                  </p>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-left mb-8">
                  <div>
                    <p className="text-gray-500 text-sm">Nama</p>
                    <p className="font-semibold">
                      {order?.nama_pelanggan}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">No HP</p>
                    <p className="font-semibold">{order?.no_wa}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Layanan</p>
                    <p className="font-semibold">
                      {order?.layanan?.nama_layanan}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Bayar</p>
                    <p className="font-semibold">
                      {formatPrice(order?.total_bayar)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-sm">Catatan</p>
                    <p className="font-semibold">
                      {order?.catatan || '-'}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-sm">Waktu Pesan</p>
                    <p className="font-semibold">
                      {formatDate(order?.created_at)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {/* ❌ USING <a> and <Link> instead of ButtonPrimary/ButtonSecondary */}
                <div className="space-y-3">
                  {order?.whatsappNumber && (
                    <a
                      href={`https://wa.me/${order.whatsappNumber}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                    >
                      Konfirmasi via WhatsApp
                    </a>
                  )}
                  <Link
                    to="/cek-status"
                    className="block w-full py-3 rounded-lg bg-dstudio-dark text-white font-semibold hover:bg-gray-800 transition"
                  >
                    Cek Status Tiket
                  </Link>
                  <Link
                    to="/pesan/step-1"
                    onClick={handleNewOrder}
                    className="block w-full py-3 rounded-lg bg-dstudio-gold text-dstudio-dark font-semibold hover:bg-yellow-500 transition"
                  >
                    Pesan Lagi
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
```

### ✅ Solusi
**Hapus import components yang tidak digunakan:**
```javascript
// ❌ BEFORE
import { ButtonPrimary, ButtonSecondary } from '../../components/common/Button';

// ✅ AFTER (hapus import ini)
// Jika ButtonPrimary & ButtonSecondary ingin digunakan:
// Ganti <Link> dengan <ButtonPrimary>
// Tapi saat ini cukup hapus import jika menggunakan <Link> dan <a>
```

---

## 📊 Ringkasan Semua Warning

| File | Line | Warning | Penyebab | Solusi |
|------|------|---------|---------|--------|
| ServiceCard.js | 4:11 | `id_layanan` unused | Destructure tapi tidak dipakai | Hapus dari destructure |
| AdminDashboardPage.js | 7:10 | `Loader2` unused | Import tapi tidak dipakai | Hapus dari import |
| AdminEditUserPage.js | 21:11 | `data` unused | Destructure tapi tidak di-render | Hapus destructure |
| AdminEditUserPage.js | 21:17 | `isLoading` unused | Destructure tapi tidak di-render | Hapus destructure |
| AdminServiceFormPage.js | 22:28 | `isLoadingService` unused | Rename tapi tidak dipakai | Hapus destructure |
| Step3Page.js | 13:34 | `reset` unused | Destructure tapi tidak dipanggil | Gunakan di onSuccess |
| SuccessPage.js | 5:10 | `ButtonPrimary` unused | Import tapi menggunakan <Link> | Hapus import |
| SuccessPage.js | 5:25 | `ButtonSecondary` unused | Import tapi menggunakan <a> | Hapus import |

---

## 🔧 Cara Memperbaiki (Quick Fix)

### Batch 1: Hapus dari Imports
```javascript
// AdminDashboardPage.js - Line 7
import { X, Trash2 } from 'lucide-react'; // Remove Loader2

// SuccessPage.js - Line 5
// Hapus seluruh line import ButtonPrimary & ButtonSecondary
```

### Batch 2: Hapus dari Destructuring
```javascript
// ServiceCard.js - Line 4
const { nama_layanan, deskripsi, harga } = service;

// AdminEditUserPage.js - Line 21
useQuery({...});  // Remove data, isLoading

// AdminServiceFormPage.js - Line 22
const { data } = useQuery({...}); // Remove isLoadingService rename

// Step3Page.js - Line 13
const { orderState, setTicket } = useOrder(); // Remove reset
```

### Batch 3: Gunakan Function yang Tidak Digunakan
```javascript
// Step3Page.js - Add reset() call
const mutation = useMutation({
  mutationFn: orderApi.postStep3,
  onSuccess: (response) => {
    if (response.success && response.ticket_id) {
      setTicket(response.ticket_id);
      reset(); // ✅ TAMBAH INI
      navigate('/pesan/selesai');
    }
  },
  // ...
});
```

---

## 📌 Kesimpulan

**Semua warning adalah "dead code" yang tidak mempengaruhi fungsionalitas aplikasi, tetapi:**
- ❌ Membuatkan bundle size sedikit lebih besar
- ❌ Menambah technical debt
- ❌ Bisa membingungkan developer lain

**Dengan memperbaiki semua warning, Anda akan:**
- ✅ Clean code yang lebih mudah dimengerti
- ✅ Mengurangi bundle size
- ✅ Menghindari future bugs karena confusion
- ✅ Best practice untuk production code
