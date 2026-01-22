# Google Drive Integration Plan

## 1. OAuth Workflow
Karena data (gambar) harus diunggah ke Drive masing-masing pengguna, kita menggunakan **Client-Side OAuth** untuk mendapatkan token yang akan digunakan langsung untuk berkomunikasi dengan API Google Drive dari browser.

### Langkah Koneksi:
1. Klik tombol **"Connect Google Drive"**.
2. Aplikasi membuka window baru/tab baru ke `/api/auth/google/login`.
3. Server me-redirect user ke Google OAuth Consent Screen dengan scopes:
   - `https://www.googleapis.com/auth/drive.file` (Hanya akses file yang dibuat oleh aplikasi ini).
   - `https://www.googleapis.com/auth/userinfo.profile` (Untuk nama dan avatar).
   - `https://www.googleapis.com/auth/userinfo.email`.
4. Setelah disetujui, Google me-redirect ke `/auth/google/callback?code=...`.
5. Halaman callback menukar `code` dengan `access_token` melalui API route.
6. Token dan info user dikirim ke window utama via `window.opener.postMessage` atau disimpan di `localStorage`.
7. Window/tab callback menutup sendiri (`window.close()`).

## 2. Proses Unggah Gambar
1. User memilih file gambar di Modal.
2. Frontend menggunakan `access_token` untuk memanggil Google Drive API `multipart/form-data`.
3. **Penting**: File diunggah dengan permission `public` agar bisa ditampilkan di website.
   - Setelah upload, aplikasi akan memanggil API Drive `permissions.create` dengan role `reader` dan type `anyone`.
4. Mendapatkan `webViewLink` atau mengkonstruksi URL direct link menggunakan `fileId`.

## 3. Public Image URL Strategy
Google Drive tidak memberikan link langsung (`.jpg`) secara default. Kita akan menggunakan format:
`https://lh3.googleusercontent.com/u/0/d/{FILE_ID}` atau proxy via Next.js API jika diperlukan untuk menghindari CORS atau masalah tampilan.

## 4. Keamanan
- Token disimpan di `localStorage` (sesuai permintaan user).
- Metadata seperti `fileId` disimpan di database Supabase untuk referensi list kenangan.
- Token Google Drive user tidak perlu disimpan di DB kita (stateless), cukup di browser user untuk sesi unggah saja.
