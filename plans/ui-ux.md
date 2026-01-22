# UI/UX Design Plan - Cyberpunk 2077 Aesthetic

## 1. Visual Identity
Aplikasi ini akan mengadopsi gaya visual **Cyberpunk 2077**: distopia, futuristik, kontras tinggi, dan penuh dengan elemen neon.

### Color Palette
- **Primary (Main)**: `#fcee0a` (Cyberpunk Yellow)
- **Secondary**: `#00f0ff` (Cyan/Cyber Blue)
- **Accent**: `#ff003c` (Hot Pink/Red)
- **Background**: `#050505` (Pitch Black) atau `#1a1a1a` (Dark Grey)
- **Surface**: `#222222` dengan transparansi/glassmorphism.

### Typography
- Menggunakan font sans-serif tebal (Inter atau Roboto) dengan variasi font monospace untuk elemen teknis/data.
- Judul menggunakan efek *uppercase* dan *skew* (miring).

## 2. Cyberpunk UI Elements
- **Borders**: Sudut terpotong (clipped corners) menggunakan CSS `clip-path`.
- **Glow**: Efek `shadow-[0_0_15px_rgba(252,238,10,0.5)]` pada tombol dan kartu.
- **Scanlines**: Overlay pola garis halus horizontal pada seluruh layar untuk kesan layar monitor lama.
- **Glitch Effect**: Animasi hover pada tombol yang memberikan efek distorsi singkat.
- **Grid Background**: Latar belakang pola kotak-kotak halus dengan garis neon tipis.

## 3. Component Breakdown

### A. Landing Page (`/`)
- **Header**: Logo "Kenangan Jago NganDev" dengan font bertema glitch. Tombol "Connect Drive" di sisi kanan.
- **Hero Section**: Judul besar dengan efek neon dan tombol "Upload Kenangan" (trigger modal).
- **Feed List**: Grid kartu kenangan. Setiap kartu memiliki:
  - Header: Nama User + Avatar (lingkaran dengan border neon cyan).
  - Body: Foto dari Drive dengan filter *grainy*.
  - Footer: Caption dengan font monospace.

### B. Upload Modal
- **Overlay**: Background gelap semi-transparan.
- **Form Layout**:
  - Area Dropzone/Input File: Border kuning neon putus-putus.
  - Textarea Caption: Gaya input terminal (curson berkedip).
  - Submit Button: Tombol besar berwarna kuning dengan teks hitam "INITIALIZE UPLOAD".

### C. Interactions
- **Transitions**: Fade-in dengan efek glitched.
- **State Changes**: Saat mengunggah, tampilkan progress bar bertema "Hacking progress...".
- **Dark/Light Mode**: Default adalah Dark Mode (Cyberpunk standar). Light Mode akan menjadi varian "Arasaka Corporate White" dengan aksen emas/merah.

## 4. Animations (Framer Motion / CSS)
- Glitch jitter pada teks saat hover.
- Border neon yang "berjalan" (animated stroke).
- Animasi munculnya list kenangan satu per satu (stagger effect).
