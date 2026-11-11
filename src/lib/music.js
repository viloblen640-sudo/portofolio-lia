// Lagu latar: taruh file MP3 di public/lagu.mp3
// Diputar otomatis saat web dibuka. Kalau browser memblokir, mulai di klik/ketukan pertama.
// Tombol speaker di navbar untuk mematikan/menyalakan (pilihan tersimpan).
const SRC = "/lagu.mp3";
let audio;
const subs = new Set();
const state = { playing: false, available: true };
const emit = () => subs.forEach((f) => f({ ...state }));
export function subscribe(f) { subs.add(f); f({ ...state }); return () => subs.delete(f); }
const muted = () => { try { return localStorage.getItem("music") === "off"; } catch { return false; } };
export function initMusic() {
  if (audio) return;
  audio = new Audio(SRC); audio.loop = true; audio.volume = 0.5; audio.preload = "auto";
  audio.addEventListener("play", () => { state.playing = true; emit(); });
  audio.addEventListener("pause", () => { state.playing = false; emit(); });
  audio.addEventListener("error", () => { state.available = false; emit(); });
  if (muted()) return;
  const evs = ["pointerdown", "keydown", "touchend", "click"];
  const off = () => evs.forEach((e) => window.removeEventListener(e, start));
  const start = () => { audio.play().then(off).catch(() => {}); };
  evs.forEach((e) => window.addEventListener(e, start));
  audio.play().then(off).catch(() => {});
}
export function toggleMusic() {
  if (!audio) return;
  if (audio.paused) { try { localStorage.removeItem("music"); } catch {} audio.play().catch(() => {}); }
  else { audio.pause(); try { localStorage.setItem("music", "off"); } catch {} }
}
