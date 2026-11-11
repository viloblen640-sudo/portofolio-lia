import { useEffect, useState } from "react";
import { profile } from "../data/content";
import { playClick } from "../lib/sound";
import { subscribe, toggleMusic } from "../lib/music";
import { LuVolume2, LuVolumeX } from "react-icons/lu";
const links = [["Beranda", "top"], ["Tentang", "tentang"], ["Skill", "skill"], ["Project", "proyek"], ["Sertifikat", "sertifikat"], ["Kontak", "kontak"]];
// Navbar melayang. Menu aktif mengikuti posisi scroll. Tombol kanan: mode gelap/terang.
export default function Nav() {
  const [active, setActive] = useState("top");
  const [dark, setDark] = useState(() => { try { return localStorage.getItem("theme") !== "light"; } catch { return true; } });
  const [menu, setMenu] = useState(false);
  const [music, setMusic] = useState({ playing: false, available: true });
  useEffect(() => subscribe(setMusic), []);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {} }, [dark]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(([, id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[min(92%,62rem)]">
      <div className="bg-card/90 backdrop-blur border border-line rounded-full shadow-lg shadow-ink/5 h-14 px-6 flex items-center justify-between">
        <a href="#top" onClick={playClick} className="font-display font-extrabold tracking-tight">{profile.name.toUpperCase()}<span className="text-accent">.</span></a>
        <div className="hidden md:flex gap-8 text-sm">
          {links.map(([t, id]) => (
            <a key={id} href={"#" + id} onClick={playClick} className={"transition-colors " + (active === id ? "text-ink font-semibold" : "text-mute hover:text-ink")}>{t}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {music.available && (
            <button onClick={() => { playClick(); toggleMusic(); }} aria-label={music.playing ? "Matikan musik" : "Nyalakan musik"} className="size-9 grid place-items-center rounded-full hover:bg-soft active:scale-90 transition text-lg">
              {music.playing ? <LuVolume2 /> : <LuVolumeX />}
            </button>
          )}
          <button onClick={() => { playClick(); setDark(!dark); }} aria-label="Ganti mode gelap atau terang" className="size-9 grid place-items-center rounded-full hover:bg-soft active:scale-90 transition">
            <svg viewBox="0 0 24 24" className="size-5"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 4a8 8 0 0 0 0 16z" fill="currentColor" /></svg>
          </button>
          <button onClick={() => { playClick(); setMenu(!menu); }} aria-label="Buka menu" className="md:hidden size-9 grid place-items-center rounded-full hover:bg-soft active:scale-90 transition text-xl">{menu ? "×" : "≡"}</button>
        </div>
      </div>
      {menu && (
        <div className="pop md:hidden mt-2 bg-card border border-line rounded-3xl p-3 shadow-lg">
          {links.map(([t, id]) => <a key={id} href={"#" + id} onClick={() => { playClick(); setMenu(false); }} className="block px-4 py-3 rounded-2xl hover:bg-soft">{t}</a>)}
        </div>
      )}
    </nav>
  );
}
