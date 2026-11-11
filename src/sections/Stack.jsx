import Heading from "../components/Heading";
import { stack } from "../data/content";
import { LuHeartHandshake, LuHeadset, LuBookOpen, LuMessagesSquare, LuTrendingUp, LuCalculator } from "react-icons/lu";
import { Office, Word, Excel, PowerPoint } from "../components/Logos";
const I = {
  "Service Excellence": <LuHeartHandshake color="#fb923c" />, "Complaint Handling": <LuHeadset color="#f472b6" />, "Product Knowledge": <LuBookOpen color="#34d399" />,
  "Komunikasi Interpersonal": <LuMessagesSquare color="#22d3ee" />, "Analisis Finansial": <LuTrendingUp color="#60a5fa" />, "Penganggaran Bisnis": <LuCalculator color="#facc15" />,
  "Microsoft Office": <Office />, Word: <Word />, Excel: <Excel />, PowerPoint: <PowerPoint />,
};
export default function Stack() {
  return (
    <section id="skill" className="mx-auto max-w-6xl px-5 py-24">
      <Heading sub="Skill dan alat" title="Tumpukan teknologi saya" />
      <div className="space-y-10">
        {stack.map((g) => (
          <div key={g.title} className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4"><h3 className="font-display font-bold text-xl">{g.title}</h3><p className="mt-2 text-mute text-sm">{g.desc}</p></div>
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {g.items.map((s) => (
                <div key={s} className="group bg-card/80 backdrop-blur border border-line rounded-2xl py-6 px-3 text-center hover:-translate-y-2 hover:scale-105 hover:border-accent hover:shadow-xl hover:shadow-accent/30 transition duration-300 cursor-default">
                  <span className="mx-auto size-12 grid place-items-center text-4xl transition duration-300 group-hover:scale-125 group-hover:-rotate-6 [&>svg]:size-full">{I[s]}</span>
                  <span className="block mt-3 text-sm font-semibold">{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
