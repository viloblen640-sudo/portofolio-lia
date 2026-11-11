import { useEffect, useState } from "react";
import Empty from "../components/Empty";
import { projects, projectsSubtitle } from "../data/projects";
const blocks = [["Latar belakang", "problem"], ["Peran saya", "role"], ["Metode", "solution"], ["Hasil", "result"]];
// Klik kartu untuk membuka detail proyek. Tekan Esc atau klik di luar untuk menutup.
export default function Projects() {
  const [p, setP] = useState(null);
  useEffect(() => {
    const f = (e) => e.key === "Escape" && setP(null);
    window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f);
  }, []);
  return (
    <section id="proyek" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center mb-14">
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">Project</h2>
        {projectsSubtitle && <p className="mt-3 text-accent font-medium max-w-2xl mx-auto">{projectsSubtitle}</p>}
      </div>
      {projects.length === 0 ? <Empty text="Project akan ditambahkan di sini. Isi file src/data/projects.js." /> : (
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((x, k) => (
            <button key={x.name + k} onClick={() => setP(x)} className="text-left w-full sm:w-[22rem] bg-card border border-line rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent/10 hover:border-accent active:scale-[.98] transition duration-300">
              {x.cover ? <img src={x.cover} alt={"Tampilan " + x.name} loading="lazy" className="w-full aspect-video object-cover object-top bg-white" />
                : <div className="w-full aspect-video bg-soft grid place-items-center text-mute text-sm">Tanpa gambar</div>}
              <div className="p-5">
                <h3 className="font-display font-bold text-lg leading-snug">{x.name}</h3>
                <p className="mt-2 text-sm text-mute">{x.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">{x.stack.map((s) => <span key={s} className="text-xs font-medium bg-soft text-accent px-2.5 py-1 rounded-md">{s}</span>)}</div>
              </div>
            </button>
          ))}
        </div>
      )}
      {p && (
        <div onClick={() => setP(null)} role="dialog" aria-modal="true" aria-label={p.name} className="pop fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm grid place-items-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-card rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-7 border border-line">
            <div className="flex justify-between gap-4">
              <h3 className="font-display font-bold text-2xl leading-snug">{p.name}</h3>
              <button onClick={() => setP(null)} aria-label="Tutup" className="size-9 shrink-0 rounded-full border border-line hover:bg-soft active:scale-90 transition">×</button>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              {blocks.map(([t, key]) => p[key] && <div key={key}><h4 className="text-sm font-semibold text-accent">{t}</h4><p className="mt-1 text-mute leading-relaxed text-sm">{p[key]}</p></div>)}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              {p.pdf && <a href={p.pdf} target="_blank" rel="noreferrer" className="bg-accent text-white px-5 py-2.5 rounded-xl active:scale-95 transition">Baca PDF ↗</a>}
              {p.pdf && <a href={p.pdf} download className="border border-line px-5 py-2.5 rounded-xl hover:border-accent active:scale-95 transition">Unduh PDF</a>}
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="border border-line px-5 py-2.5 rounded-xl hover:border-accent active:scale-95 transition">Lihat demo</a>}
              {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="border border-line px-5 py-2.5 rounded-xl hover:border-accent active:scale-95 transition">Kode di GitHub</a>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
