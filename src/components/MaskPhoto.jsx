import { useEffect, useRef } from "react";
import { profile } from "../data/content";

// Foto dengan karakter pengganti. Gambar karakter (public/karakter.jpg) ditumpuk persis di atas foto
// dan hanya terlihat di sekitar kursor (atau jari). Jadi kursor di kepala -> kepala karakter muncul,
// kursor di badan -> badan karakter muncul. Ganti file public/karakter.jpg untuk karakter lain.
// Geser/zoom karakter supaya pas dengan foto: ubah 3 angka di CHAR (satuan: % lebar foto).
const CHAR = { width: 160, left: -33, top: -36 };
const RADIUS = 0.3; // besar lingkaran pengungkap (x lebar foto)

export default function MaskPhoto({ className = "" }) {
  const wrap = useRef(null), layer = useRef(null), ring = useRef(null);
  useEffect(() => {
    const el = wrap.current;
    const S = { tx: 0, ty: 0, x: 0, y: 0, on: false, k: 0 }; // k = 0..1 besar lingkaran
    let raf;
    const frame = () => {
      S.x += (S.tx - S.x) * 0.25; S.y += (S.ty - S.y) * 0.25;
      S.k += ((S.on ? 1 : 0) - S.k) * 0.18;
      const R = el.clientWidth * RADIUS * S.k;
      const m = `radial-gradient(circle ${Math.max(R, 0.1)}px at ${S.x}px ${S.y}px, #000 ${R * 0.72}px, transparent ${R}px)`;
      layer.current.style.webkitMaskImage = m; layer.current.style.maskImage = m;
      ring.current.style.transform = `translate(${S.x - R}px,${S.y - R}px)`;
      ring.current.style.width = ring.current.style.height = R * 2 + "px";
      ring.current.style.opacity = S.k;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const pos = (e) => { const r = el.getBoundingClientRect(); S.tx = e.clientX - r.left; S.ty = e.clientY - r.top; };
    const enter = (e) => { pos(e); S.x = S.tx; S.y = S.ty; S.on = true; };
    const leave = () => { S.on = false; };
    el.addEventListener("pointerenter", enter); el.addEventListener("pointermove", pos);
    el.addEventListener("pointerleave", leave); el.addEventListener("pointercancel", leave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointerenter", enter); el.removeEventListener("pointermove", pos); el.removeEventListener("pointerleave", leave); el.removeEventListener("pointercancel", leave); };
  }, []);
  return (
    <div ref={wrap} className={"relative overflow-hidden touch-pan-y bg-black " + className} style={{ containerType: "inline-size" }}>
      <img src="/foto-saya.jpg" alt={"Foto " + profile.name + ", mahasiswa " + profile.major + " " + profile.school} draggable="false" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div ref={layer} className="absolute inset-0 pointer-events-none bg-[#161616]" style={{ WebkitMaskImage: "radial-gradient(circle 0.1px at 0 0,#000,transparent)", maskImage: "radial-gradient(circle 0.1px at 0 0,#000,transparent)" }}>
        <img src="/karakter.jpg" alt="" draggable="false" className="absolute max-w-none"
          style={{ width: CHAR.width + "cqw", left: CHAR.left + "cqw", top: CHAR.top + "cqw" }} />
      </div>
      <div ref={ring} className="absolute top-0 left-0 rounded-full pointer-events-none border border-white/40" style={{ opacity: 0, boxShadow: "0 0 24px rgba(59,130,246,.45)" }} />
    </div>
  );
}
