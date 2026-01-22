# Implementation Roadmap - Kenangan Jago NganDev

## Fase 1: Dasar & Database
1. [ ] Setup `.env` dengan kredensial Google OAuth dan Supabase.
2. [ ] Inisialisasi Prisma dan migrasi tabel `Memory` (berdasarkan `database.md`).
3. [ ] Setup Folder Structure (Kebab-case).

## Fase 2: Auth & Google Drive Integration
1. [ ] Buat API Route `/api/auth/google/login` dan `/api/auth/google/callback`.
2. [ ] Buat halaman `/auth/google/callback` untuk menangani penutupan tab dan pengiriman token.
3. [ ] Implementasi `useAuthStore` (Zustand) untuk menyimpan token dan info profil di Local Storage.
4. [ ] Implementasi utilitas `google-drive.ts` untuk fungsi upload dan set permission public.

## Fase 3: UI Dasar (Cyberpunk Style)
1. [ ] Setup `globals.css` dengan variabel warna Cyberpunk.
2. [ ] Buat komponen atom: `CyberButton`, `NeonCard`, dan `ScanlineOverlay`.
3. [ ] Implementasi Dark Mode sebagai default.

## Fase 4: Fitur Utama (Single Page)
1. [ ] **List Kenangan**: Implementasi list feed yang fetching data dari API `/api/memories`.
2. [ ] **Modal Unggah**: 
   - Gunakan `react-hook-form` + `zod`.
   - Logika: Cek koneksi Drive -> Pilih File -> Upload ke Drive -> Simpan Metadata ke DB.
3. [ ] **Real-time Update**: Refresh list setelah unggahan berhasil (atau optimistik update).

## Fase 5: Polish & Finalisasi
1. [ ] Tambahkan animasi Glitch dan transisi halus.
2. [ ] Testing alur OAuth di tab baru.
3. [ ] Optimasi performa gambar.
