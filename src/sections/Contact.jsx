import { useState } from "react";
import Heading from "../components/Heading";
import { profile } from "../data/content";
// Form ini membuka aplikasi email dengan isi yang sudah terisi (tanpa server).
const field = "w-full bg-bg border border-line rounded-xl px-4 py-3 focus:border-accent outline-none transition";
export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const body = f.msg + "\n\nDari: " + f.name + " (" + f.email + ")";
    window.location.href = "mailto:" + profile.email + "?subject=" + encodeURIComponent("Pesan dari " + f.name) + "&body=" + encodeURIComponent(body);
    setSent(true); setTimeout(() => setSent(false), 2500);
  };
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <section id="kontak" className="mx-auto max-w-3xl px-5 py-24">
      <Heading sub="Hubungi saya" title="Kirim email langsung" />
      <form onSubmit={submit} className="bg-card border border-line rounded-3xl p-6 sm:p-8 space-y-5">
        <label className="block text-sm font-semibold">Nama<input required value={f.name} onChange={set("name")} placeholder="Nama kamu" className={field + " mt-2 font-normal"} /></label>
        <label className="block text-sm font-semibold">Email<input required type="email" value={f.email} onChange={set("email")} placeholder="email@kamu.com" className={field + " mt-2 font-normal"} /></label>
        <label className="block text-sm font-semibold">Pesan<textarea required rows="5" value={f.msg} onChange={set("msg")} placeholder="Tulis pesanmu di sini" className={field + " mt-2 font-normal resize-none"} /></label>
        <button className={"w-full font-semibold py-3.5 rounded-xl active:scale-[.98] transition " + (sent ? "bg-accent text-white" : "bg-ink text-bg hover:bg-accent hover:text-white")}>{sent ? "Membuka aplikasi email" : "Kirim pesan"}</button>
      </form>
      <p className="mt-6 text-center text-mute text-sm">Atau salin alamatku: <button onClick={copy} className="font-semibold text-ink underline underline-offset-4 hover:text-accent">{profile.email}</button><span aria-live="polite" className="ml-2 text-accent">{copied ? "Tersalin" : ""}</span></p>
    </section>
  );
}
