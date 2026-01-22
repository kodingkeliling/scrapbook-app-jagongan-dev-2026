CERITANYA:
jangan melakukan apa apa, hanya simak plans singakat berikut ini:
Aku ingin membuat website scrapbook digital sederhana, dengan nama website nya Kenangan Jago NganDev. dengan fitur sebagai berikut:
1. Data di simpan ke database.
2. Hanya ada satu halaman (tidak termasuk page callback page) saja berisi modal popup form unggah kenangan dan list unggahan kenangan.
3. Upload gambar menggunakan google drive oauth, yang mana user connect terlebih dahulu ke google drive lalu gambar tersebut akan di upload terlebih dahulu ke google drive masing masing pengguna dan harus support di tampilkan lagi di website dengan tech next 15.




STRUCTURE DATABASE:
Buat Planing khusus database terlebih dahulu berbentuk file database.md (jangan langsung eksekusi) untuk database scrapbook-app, database akan menggunakan supabase dan buatkan structure connection supabase nya dari env yang di sediakan. Harapan saya ada satu tabel yaitu Memory (gunakan bahasa inggris).

Gunakan prisma versi 6.x untuk membuat migrations nya (tidak perlu menggunakan prisma config).
Dengan .env database seperti berikut:
DATABASE_URL=
DIRECT_URL=




SOFTWARE REQUIREMENT:
Buatkan saya beberapa planing yang di masukan ke file .md untuk membuat tampilan website Kenangan Jago Ngan Dev bertema scrapbook digital.

berikut beberapa tools dan aturan yg harus anda gunakan:
1. next.js v15+ app route versi terbaru support dengan bahasa pemrograman typescript (sudah saya install)
2. tailwind css versi terbaru.
3. Next js ini harus bisa handle backend api dan menggunakan prisma.
4. gunakan konsep re-use components, hooks, dan stores.
5. Gunakan zod untuk validasi input form
6. untuk struktur folder dan file selalu menamakan folder menggunakan kebab-case lalu kasih index.tsx, jangan menamakan langsung di file.
7. Hanya ada satu halaman saja berisi unggah kenangan berupa modal dan list unggahan kenangan.
8. Upload gambar menggunakan google drive oauth, yang mana di field upload image nya itu user harus connect terlebih dahulu ke google drive lalu gambar tersebut akan di upload terlebih dahulu ke google drive masing masing pengguna dan url gambar nya harus support public agar tampil di website. Lalu akan disimpan di database dan untuk connect nya ini akan new tab, ketika telah connect baru tab tersebut di close otomatis dan token hasil connect google nya di simpan di local storage.
9. Form unggah kenangan cukup: caption dan upload image (jika belum connect google maka akan diharuskan connect terlebih dahulu)
10. Untuk username dan avatar user data nya itu di ambil dari google oauth.
11 .Component menggunakan Shadcn UI supports dark dan light mode.
12. Untuk gaya website nya seperti cyberpunk 2077.

Page yang harus ada hanya:
/ (Lending page)

ENV yang akan ada di project ini:
OAUTH_REDIRECT_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DATABASE_URL=
DIRECT_URL=
