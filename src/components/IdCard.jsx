import { useEffect, useRef } from "react";
import { profile } from "../data/content";

// ID card bergantung pada tali. Klik/sentuh lalu seret ke mana saja (bebas),
// lepas dan kartu akan berayun kembali seperti tali sungguhan.
const REST_SWAY = 0.035; // ayunan kecil saat diam

export default function IdCard() {
  const box = useRef(null);   // wadah (titik gantung ada di tengah atas)
  const strap = useRef(null); // tali
  const hang = useRef(null);  // klip + kartu
  const glare = useRef(null);
  const tilt = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = { x: 0, y: 0, vx: 0, vy: 0, drag: false, ox: 0, oy: 0, px: 0, py: 0, t: 0 };
    const H = () => (window.innerWidth >= 768 ? 288 : 160); // panjang tali saat diam
    S.y = H();
    let raf, last = performance.now();
    // animasi jatuh dari atas: mulai di luar layar, jatuh, memantul, lalu berayun
    const D = { y: reduce ? 0 : -(H() + 700), v: 0, wait: !reduce && !window.__loaderDone };
    let started = !D.wait;
    const start = () => { started = true; };
    window.addEventListener("loader-done", start);
    const fallback = setTimeout(start, 4000);

    const clamp = () => {
      const h = H(), max = h * 1.45;
      if (S.y < 24) S.y = 24;
      const d = Math.hypot(S.x, S.y);
      if (d > max) { S.x *= max / d; S.y *= max / d; }
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.032); last = now; S.t += dt;
      const h = H();
      if (started && D.y < 0 || D.v !== 0) {
        D.v += 2600 * dt; D.y += D.v * dt;
        if (D.y >= 0) {
          D.y = 0;
          if (D.v > 220) { D.v *= -0.3; S.vx += 260; } else { D.v = 0; }
        }
      }
      if (box.current) box.current.style.transform = `translateY(${D.y}px)`;
      if (!S.drag) {
        const tx = reduce ? 0 : Math.sin(S.t * 1.3) * h * REST_SWAY, ty = h;
        const k = 42, c = 3.2; // kekakuan & redaman pegas
        S.vx += (-k * (S.x - tx) - c * S.vx) * dt;
        S.vy += (-k * (S.y - ty) - c * S.vy) * dt;
        S.x += S.vx * dt; S.y += S.vy * dt;
        clamp();
      }
      const L = Math.hypot(S.x, S.y), a = -Math.atan2(S.x, S.y) * 180 / Math.PI;
      const extra = S.drag ? 0 : Math.max(-14, Math.min(14, S.vx * 0.03)); // kartu berputar saat melesat
      if (strap.current) { strap.current.style.height = L + "px"; strap.current.style.transform = `translateX(-50%) rotate(${a}deg)`; }
      if (hang.current) hang.current.style.transform = `translate(${S.x}px,${S.y - h}px) rotate(${a + extra}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const el = hang.current;
    const down = (e) => {
      S.drag = true; S.vx = S.vy = 0;
      S.ox = e.clientX; S.oy = e.clientY; S.px = S.x; S.py = S.y; S.lx = e.clientX; S.ly = e.clientY; S.lt = performance.now();
      el.setPointerCapture(e.pointerId); el.style.cursor = "grabbing";
    };
    const move = (e) => {
      if (S.drag) {
        S.x = S.px + (e.clientX - S.ox); S.y = S.py + (e.clientY - S.oy); clamp();
        const n = performance.now(), dt = Math.max((n - S.lt) / 1000, 0.001);
        S.vx = S.vx * 0.5 + ((e.clientX - S.lx) / dt) * 0.5; S.vy = S.vy * 0.5 + ((e.clientY - S.ly) / dt) * 0.5;
        S.lx = e.clientX; S.ly = e.clientY; S.lt = n;
      }
      // kilau cahaya + sedikit miring 3D mengikuti kursor
      const r = tilt.current.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      if (px >= -0.1 && px <= 1.1 && py >= -0.1 && py <= 1.1) {
        tilt.current.style.transform = `perspective(900px) rotateX(${(py - .5) * -14}deg) rotateY(${(px - .5) * 16}deg)`;
        glare.current.style.opacity = 1;
        glare.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.4), transparent 55%)`;
      }
    };
    const up = (e) => {
      if (!S.drag) return;
      S.drag = false; el.style.cursor = "grab";
      const v = Math.hypot(S.vx, S.vy), cap = 1800; // batasi kecepatan lempar
      if (v > cap) { S.vx *= cap / v; S.vy *= cap / v; }
      if (performance.now() - S.lt > 80) { S.vx = S.vy = 0; } // ditahan lalu dilepas = tidak melesat
      try { el.releasePointerCapture(e.pointerId); } catch {}
    };
    const leave = () => {
      tilt.current.style.transform = ""; glare.current.style.opacity = 0;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(fallback); window.removeEventListener("loader-done", start);
      el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={box} className="relative flex flex-col items-center md:-mt-32 pt-40 md:pt-72 select-none">
      {/* tali: panjang & sudut dihitung tiap frame */}
      <div ref={strap} className="absolute top-0 left-1/2 w-8 origin-top rounded-b-sm bg-gradient-to-b from-[#0b1020] to-[#1a2547] border-x border-white/10 grid place-items-center overflow-hidden pointer-events-none" style={{ transform: "translateX(-50%)" }}>
        <span className="[writing-mode:vertical-rl] text-[9px] tracking-[.35em] font-bold text-white/70 whitespace-nowrap">{profile.name.toUpperCase()} • {profile.major.toUpperCase()}</span>
      </div>
      {/* klip + kartu: ini yang diseret */}
      <div ref={hang} className="flex flex-col items-center origin-top touch-none cursor-grab will-change-transform" style={{ touchAction: "none" }}>
        <div className="w-6 h-5 rounded-b-md bg-gradient-to-b from-zinc-300 to-zinc-500" />
        <div ref={tilt} style={{ transition: "transform .25s ease-out" }}
          className="relative w-64 sm:w-72 rounded-2xl bg-[#ece9df] text-[#0b1020] p-4 shadow-2xl shadow-accent/30 ring-1 ring-white/20">
          <div className="mx-auto mb-2 w-12 h-2 rounded-full bg-[#0b1020]/80" />
          <p className="font-display font-extrabold text-3xl tracking-tight text-center leading-none">MAHASISWA</p>
          <div className="relative mt-3 rounded-lg overflow-hidden aspect-[4/5]">
            <img src="/foto-saya.jpg" alt={"Foto " + profile.name} draggable="false" className="w-full h-full object-cover pointer-events-none" />
            <div ref={glare} className="absolute inset-0 pointer-events-none transition-opacity" style={{ opacity: 0 }} />
          </div>
          <p className="mt-3 text-center font-display font-bold text-sm tracking-wide">{profile.name.toUpperCase()}</p>
          <p className="text-center text-[11px] opacity-70">{profile.major} • {profile.school}</p>
        </div>
      </div>
    </div>
  );
}
