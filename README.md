# Portofolio Lia
Jalankan: `npm install` lalu `npm run dev`, buka http://localhost:5173

## Cara mengganti isi
- Teks, skill, email, link sosial: `src/data/content.js`
- Foto: ganti file `public/foto-saya.jpg` (nama harus sama)
- CV: simpan sebagai `public/cv.pdf`
- Warna dan font: `src/index.css` (baris --accent) dan `index.html`

## Deploy
Vercel: upload ke GitHub, import di vercel.com, klik Deploy. Build: `npm run build`, output: `dist`.
GitHub Pages: ubah `base` di `vite.config.js` jadi `'/nama-repo/'`.

## Sertifikat dan CV
- Sertifikat: isi `src/data/certificates.js`, gambar di `public/certificates/`.
- CV: tombol Unduh CV mengunduh `public/cv.pdf`. Timpa file itu dengan CV pribadi (nama tetap `cv.pdf`).

## Musik latar
File lagu ada di `public/lagu.mp3` (ganti file ini kalau mau lagu lain, nama harus sama). Diputar otomatis saat web dibuka; tombol speaker di navbar untuk mati/nyala.

## Proyek
Isi `src/data/projects.js`. File PDF dan gambar sampul di `public/projects/`.
