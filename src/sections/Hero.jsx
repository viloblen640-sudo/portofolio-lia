import { useEffect, useState } from "react";
import { LuMail } from "react-icons/lu";
import { SiGithub, SiInstagram, SiTiktok } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { profile } from "../data/content";
import IdCard from "../components/IdCard";
function useTyper(words) {
  const [t, setT] = useState("");
  useEffect(() => {
    let w = 0, c = 0, del = false, id;
    const tick = () => {
      const word = words[w]; c += del ? -1 : 1; setT(word.slice(0, c));
      let d = del ? 40 : 90;
      if (!del && c === word.length) { del = true; d = 1500; } else if (del && c === 0) { del = false; w = (w + 1) % words.length; d = 300; }
      id = setTimeout(tick, d);
    };
    id = setTimeout(tick, 400);
    return () => clearTimeout(id);
  }, []);
  return t;
}
const socials = [["github", SiGithub], ["instagram", SiInstagram], ["tiktok", SiTiktok], ["linkedin", FaLinkedin]];
export default function Hero() {
  const role = useTyper(profile.roles);
  const links = socials.filter(([k]) => profile[k]);
  return (
    <header id="top" className="mx-auto max-w-6xl px-5 pt-32 pb-24 grid md:grid-cols-2 gap-14 items-center">
      <div className="rise">
        <h1 className="font-display font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl leading-[1.05]"><span className="grad">Selamat datang di</span><br />Portofolio Saya</h1>
        <p className="caret text-accent font-semibold mt-5 min-h-7">{role}</p>
        <p className="mt-4 text-mute leading-relaxed max-w-md text-sm">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#skill" className="bg-accent text-white font-semibold text-sm px-6 py-3 rounded-lg hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/40 active:scale-95 transition">Lihat Keahlian →</a>
          <a href={profile.cvPath} download={"CV-" + profile.name + ".pdf"} type="application/pdf" className="border border-line bg-card/70 font-semibold text-sm px-6 py-3 rounded-lg hover:-translate-y-1 hover:border-accent active:scale-95 transition">Unduh CV</a>
        </div>
        <div className="mt-10 flex items-center gap-3">
          <span className="text-[10px] tracking-widest font-bold text-mute">FIND ME</span>
          {links.map(([k, Icon]) => <a key={k} href={profile[k]} target="_blank" rel="noreferrer" aria-label={k} className="size-9 grid place-items-center rounded-lg border border-line bg-card/70 hover:border-accent hover:-translate-y-1 hover:text-accent transition"><Icon /></a>)}
          <a href={"mailto:" + profile.email} aria-label="Email" className="size-9 grid place-items-center rounded-lg border border-line bg-card/70 hover:border-accent hover:-translate-y-1 hover:text-accent transition"><LuMail /></a>
        </div>
      </div>
      <div className="rise" style={{ animationDelay: ".15s" }}><IdCard /></div>
    </header>
  );
}
