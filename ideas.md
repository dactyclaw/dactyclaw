# DACTYLOG Design Brainstorm

## Konsep Terpilih: **Terminal-First Dark Mode dengan Neon Accent**

Setelah menganalisis referensi `clawn.ch` dan `basedaemon.github.io`, saya memilih pendekatan desain yang menggabungkan estetika **CRT Terminal Retro** dengan nuansa **Cyberpunk Modern**.

### Design Philosophy

**DACTYLOG** adalah "Stasiun Pemantau & Peluncuran Agent"—sebuah platform yang terasa seperti sistem operasi rahasia untuk ekosistem Clawn. Desainnya harus terasa:
- **Raw & Teknis:** Seperti terminal hacker yang serius, bukan UI yang ramah.
- **Hidup & Dinamis:** Data mengalir seperti aliran kode di layar monitor lama.
- **Eksklusif & Underground:** Estetika yang membuat pengguna merasa bagian dari komunitas elite.

### Core Design Elements

**1. Palet Warna**
- **Background:** Hitam absolut (#0a0a0a) dengan efek CRT scanline halus
- **Text Utama:** Hijau neon (#00ff00 atau #00ff33) untuk kesan terminal klasik
- **Accent Sekunder:** Abu-abu gelap (#1a1a1a) untuk borders dan dividers
- **Highlight:** Hijau terang (#33ff00) untuk elemen interaktif dan hover states
- **Danger/Alert:** Merah neon (#ff0033) untuk warning atau status penting

**2. Tipografi**
- **Font Monospace:** 'IBM Plex Mono' atau 'JetBrains Mono' untuk kesan teknis
- **Heading:** Monospace dengan letter-spacing tinggi (0.15em) untuk kesan "spaced out"
- **Body:** Monospace dengan line-height 1.6 untuk keterbacaan maksimal di terminal

**3. Elemen Visual Signature**
- **Border Dashed:** Putus-putus hijau neon (ala clawn.ch) untuk card dan section
- **CRT Scanlines:** Overlay halus dengan garis horizontal yang sangat tipis
- **Glitch Effect:** Animasi subtle pada judul atau elemen penting (offset shadow merah/hijau)
- **Cursor Blink:** Animasi blinking cursor pada area input atau live data
- **Pixel Art Icons:** Ikon kecil dalam gaya pixel/retro untuk toolbar

**4. Layout Paradigm**
- **Sidebar Navigation:** Navigasi vertikal di sebelah kiri dengan tab-style buttons
- **Main Content Area:** Dua kolom utama: Monitor (kiri) dan Deploy (kanan)
- **Terminal-Style Logs:** Baris-baris teks yang muncul dari atas ke bawah, seperti terminal output
- **Asymmetric Spacing:** Jangan gunakan grid yang terlalu rapi—biarkan ada "breathing room" yang tidak simetris

**5. Interaction Philosophy**
- **Hover Effects:** Border berubah warna (hijau → hijau terang), atau shadow glow
- **Click Feedback:** Animasi scale-down yang sangat cepat (50ms)
- **Loading State:** Animasi rotating line atau blinking dots
- **Success/Error:** Toast notifications dengan styling terminal (monospace, border dashed)

**6. Animation Guidelines**
- **Entrance:** Fade-in dengan delay staggered untuk baris-baris log
- **Data Update:** Pulse glow pada elemen yang baru diupdate
- **Transition:** Smooth fade (200ms) antar halaman/tab
- **Micro-interaction:** Cursor blink pada input, rotating icon pada loading

### Signature Visual Motifs

1. **The Dactylus Icon:** Representasi abstrak dari ujung capit lobster—bisa berupa garis-garis yang bertemu di satu titik
2. **Neon Border Frame:** Setiap card atau section dibungkus dengan border dashed hijau neon
3. **CRT Scanline Overlay:** Efek garis horizontal yang sangat tipis di seluruh halaman untuk nuansa monitor lama

### Typography System

- **Display (Judul Besar):** IBM Plex Mono, 32px, Bold, letter-spacing 0.15em
- **Heading (Judul Seksi):** IBM Plex Mono, 20px, Bold, letter-spacing 0.1em
- **Body (Teks Utama):** IBM Plex Mono, 14px, Regular, line-height 1.6
- **Caption (Teks Kecil):** IBM Plex Mono, 12px, Regular, color: muted

### Kesimpulan

DACTYLOG akan terasa seperti **"Sistem Operasi Rahasia"** yang dirancang khusus untuk para agent dan developer di ekosistem Clawn. Setiap elemen visual—dari warna hijau neon hingga efek CRT scanline—akan memperkuat kesan bahwa ini adalah platform yang serius, teknis, dan eksklusif.
