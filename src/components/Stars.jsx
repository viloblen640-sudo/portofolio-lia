import { useEffect, useRef } from "react";
export default function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d"); let id, W, H;
    const st = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + .3, p: Math.random() * 6, v: Math.random() * .02 + .005 }));
    const fit = () => { W = c.width = innerWidth; H = c.height = innerHeight; };
    const draw = (t) => {
      x.clearRect(0, 0, W, H);
      for (const s of st) { x.globalAlpha = .35 + .65 * Math.abs(Math.sin(t / 1000 * s.v * 20 + s.p)); x.fillStyle = "#cfe0ff"; x.beginPath(); x.arc(s.x * W, s.y * H, s.r, 0, 7); x.fill(); }
      id = requestAnimationFrame(draw);
    };
    fit(); addEventListener("resize", fit); id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); removeEventListener("resize", fit); };
  }, []);
  return <><canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" /><span className="shoot" /></>;
}
