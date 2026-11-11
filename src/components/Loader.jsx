import { useEffect, useState } from "react";
export default function Loader() {
  const [n, setN] = useState(0), [gone, setGone] = useState(false);
  useEffect(() => {
    const t0 = performance.now(); let id;
    const f = (t) => { const v = Math.min(100, Math.round((t - t0) / 2400 * 100)); setN(v); if (v < 100) id = requestAnimationFrame(f); else { window.__loaderDone = true; window.dispatchEvent(new Event("loader-done")); setTimeout(() => setGone(true), 500); } };
    id = requestAnimationFrame(f); return () => cancelAnimationFrame(id);
  }, []);
  if (gone && typeof window !== "undefined") return null;
  return (
    <div className={"fixed inset-0 z-[100] grid place-items-center bg-[#04060f] transition-opacity duration-500 " + (n === 100 ? "opacity-0" : "opacity-100")}>
      <div className="text-center">
        <p className="font-display font-extrabold text-8xl text-white tabular-nums">{n}<span className="text-accent text-5xl">%</span></p>
        <div className="mt-4 mx-auto w-56 h-0.5 bg-white/15"><div className="h-full bg-accent" style={{ width: n + "%" }} /></div>
        <p className="mt-3 text-[11px] text-white/70">Memuat assets...</p>
      </div>
    </div>
  );
}
