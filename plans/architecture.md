# Architecture & Folder Structure - Kenangan Jago NganDev

## 1. Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI (Radix UI)
- **Database/ORM**: Supabase (PostgreSQL) + Prisma 6.x
- **Validation**: Zod + React Hook Form
- **State Management**: Zustand (for OAuth tokens and global UI state)
- **Authentication**: Custom Google OAuth 2.0 flow (User-to-Server)

## 2. Folder Structure (Kebab-case with index.tsx)

Kami akan mengikuti aturan penamaan folder menggunakan **kebab-case** dan setiap komponen utama berada di dalam `index.tsx`.

```text
/src
  /app
    /api
      /auth/google/login/route.ts
      /auth/google/callback/route.ts
      /memories/route.ts
    /auth
      /google/callback/page.tsx  // Handle closing tab and sending token
    layout.tsx
    page.tsx  // Main Landing Page
  /components
    /ui  // Shadcn components
    /layouts
      /main-layout
        index.tsx
    /features
      /memory-form
        index.tsx
      /memory-list
        index.tsx
      /memory-card
        index.tsx
      /google-drive-button
        index.tsx
    /shared
      /cyber-button
        index.tsx
      /neon-card
        index.tsx
  /hooks
    /use-google-drive.ts
    /use-memories.ts
  /lib
    /prisma.ts
    /utils.ts
    /google-drive.ts
  /stores
    /use-auth-store.ts
  /types
    index.ts
  /schemas
    memory-schema.ts
```

## 3. Data Flow
1. **Google OAuth**:
   - Client mengklik "Connect Google Drive".
   - Buka `/api/auth/google/login` di tab baru.
   - Redirect ke Google Consent Screen.
   - Callback ke `/auth/google/callback`.
   - Simpan token di `localStorage` via Zustand.
   - Tab otomatis ditutup.
2. **Upload & Post**:
   - User mengisi caption dan memilih file.
   - Script frontend mengunggah file ke Google Drive user (menggunakan token di `localStorage`).
   - Mendapatkan `publicUrl` dari Drive.
   - Mengirim `caption`, `imageUrl`, `userName`, dan `userAvatar` ke Next.js API `/api/memories`.
   - Simpan ke Database via Prisma.
3. **Display**:
   - Landing page melakukan fetch data dari `/api/memories`.
   - Menampilkan list kenangan dengan gaya Cyberpunk.
