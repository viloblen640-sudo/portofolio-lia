import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Empty from "../components/Empty";
import { certificates } from "../data/certificates";
// Klik gambar sertifikat untuk memperbesar. Tekan Esc atau klik di luar untuk menutup.
export default function Certificates() {
  const [zoom, setZoom] = useState(null);
  useEffect(() => {
    const f = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f);
  }, []);
  return (
    <section id="sertifikat" className="mx-auto max-w-6xl px-5 py-24">
      <Heading sub="Pencapaian belajar" title="Sertifikat" />
      {certificates.length === 0 ? <Empty text="Sertifikat akan ditambahkan di sini. Isi file src/data/certificates.js." /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((c, k) => (
            <div key={c.title + k} className="bg-card border border-line rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10 transition duration-300">
              {c.image && <button onClick={() => setZoom(c)} aria-label={"Perbesar sertifikat " + c.title} className="block w-full cursor-zoom-in"><img src={c.image} alt={"Sertifikat " + c.title} loading="lazy" className="w-full aspect-[7/5] object-cover" /></button>}
              <div className="p-5">
                <h3 className="font-display font-bold text-lg">{c.title}</h3>
                <p className="mt-1 text-sm text-mute">{[c.issuer, c.year].filter(Boolean).join(" • ")}</p>
                {c.link && <a href={c.link} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm font-semibold text-accent hover:underline">Lihat sertifikat ↗</a>}
              </div>
            </div>
          ))}
        </div>
      )}
      {zoom && (
        <div onClick={() => setZoom(null)} className="pop fixed inset-0 z-[60] bg-ink/85 grid place-items-center p-5 cursor-zoom-out">
          <img src={zoom.image} alt={"Sertifikat " + zoom.title} className="max-h-full max-w-full rounded-lg bg-white" />
        </div>
      )}
    </section>
  );
}
