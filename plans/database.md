# Database Plan - Kenangan Jago NganDev (Revised)

Dokumen ini merinci rencana struktur database menggunakan **Supabase**, **Prisma 6.x**, dan skema tabel untuk aplikasi Scrapbook Digital.

## 1. Koneksi Supabase & Environment Variables

Sesuai dengan konfigurasi Supabase dengan dukungan *connection pooling* (PgBouncer), kita akan menggunakan dua URL koneksi di file `.env`:

```env
# URL untuk Transaction Mode (digunakan oleh aplikasi via PgBouncer)
DATABASE_URL="postgresql://postgres.jlpbbhqypskppnxgstyk:p3D5t40GL7bXkJ4h@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

# URL untuk Session Mode (digunakan oleh Prisma untuk migrasi)
DIRECT_URL="postgresql://postgres.jlpbbhqypskppnxgstyk:p3D5t40GL7bXkJ4h@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres"
```

## 2. Prisma Schema (Prisma 6.x)

Skema database akan menggunakan penyedia `postgresql`. Kita akan mendefinisikan tabel `Memory` untuk menyimpan metadata unggahan kenangan.

### File: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Memory {
  id          String   @id @default(uuid())
  caption     String   @db.Text
  imageUrl    String   // URL preview/embed gambar dari Google Drive
  userName    String?  // Nama pemilik untuk ditampilkan
  userAvatar  String?  // Avatar URL pemilik dari Google OAuth
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("memories")
}
```

## 3. Detail Tabel `Memory`

| Field | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key, unik untuk setiap record. |
| `caption` | Text | Caption atau cerita singkat kenangan. |
| `imageUrl` | String | Link gambar yang bisa dirender di Next.js. |
| `userName` | String | Nama user yang mengunggah kenangan. |
| `userAvatar` | String | URL avatar profil user dari Google. |
| `createdAt` | DateTime | Waktu saat kenangan diunggah. |
| `updatedAt` | DateTime | Waktu terakhir kali kenangan diperbarui. |

## 4. Alur Kerja Migrasi

Karena kita menggunakan Prisma 6.x, langkah-langkah untuk sinkronisasi database adalah sebagai berikut:

1.  **Inisialisasi Prisma** (Jika belum): `npx prisma init`
2.  **Generate Client**: `npx prisma generate`
3.  **Membuat & Menjalankan Migrasi**:
    ```bash
    npx prisma migrate dev --name init_memory_table
    ```
4.  **Verifikasi di Supabase Dashboard**: Pastikan tabel `memories` sudah muncul di skema `public`.

## 5. Integrasi dengan Next.js 15

- Kita akan menggunakan **Prisma Client** di Server Components atau Server Actions.
- Koneksi database menggunakan pooling via `DATABASE_URL` untuk performa optimal di Next.js.
