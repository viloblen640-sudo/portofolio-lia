import MaskPhoto from "../components/MaskPhoto";
import { profile } from "../data/content";
export default function About() {
  const rows = [["Kampus", profile.school], ["Jurusan", profile.major + ", " + profile.semester], ["Lokasi", profile.city], ["Email", profile.email]];
  return (
    <section id="tentang" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="glitch font-display font-extrabold tracking-tight text-center text-4xl md:text-5xl mb-14" data-text="About Me">About Me</h2>
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-4 text-center md:text-left order-2 md:order-1">
          <p className="grad font-display font-bold text-4xl md:text-5xl">Hi, I'm</p>
          <p className="font-display font-extrabold tracking-tight text-5xl md:text-6xl leading-[1.05] mt-1">{profile.name}</p>
          <p className="text-mute text-sm mt-3">{profile.major} • {profile.school}</p>
          <a href="#kontak" className="inline-block mt-7 bg-accent text-white font-semibold text-sm px-6 py-3 rounded-lg hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/40 active:scale-95 transition">Hubungi Saya</a>
        </div>
        <div className="md:col-span-4 order-1 md:order-2 flex flex-col items-center">
          <MaskPhoto className="w-full max-w-[19rem] aspect-[4/5] rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-accent/30" />
          <p className="mt-3 text-[11px] text-mute tracking-wide">Arahkan kursor ke foto</p>
        </div>
        <div className="md:col-span-4 text-mute leading-relaxed text-sm order-3 space-y-4">
          <p>{profile.who}</p>
          <p>{profile.approach}</p>
          <a href="#skill" className="inline-flex items-center gap-2 border border-line bg-card/70 text-ink font-semibold px-5 py-2.5 rounded-lg hover:border-accent hover:-translate-y-1 active:scale-95 transition">&lt;/&gt; Lihat Keahlian ↗</a>
        </div>
      </div>
      <dl className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-line pt-8">
        {rows.map(([k, v]) => <div key={k}><dt className="text-xs text-mute">{k}</dt><dd className="font-semibold break-words">{v}</dd></div>)}
      </dl>
    </section>
  );
}
