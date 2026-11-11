import { useState } from "react";
import { profile } from "../data/content";
// Foto: simpan sebagai public/foto-saya.jpg. Sebelum ada, tampil placeholder.
export default function Photo({ className = "" }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img src="/foto-saya.jpg" width="500" height="500" onError={() => setOk(false)}
      alt={"Foto " + profile.name + ", mahasiswa " + profile.major + " " + profile.school}
      className={"object-cover " + className} />
  ) : (
    <div className={"bg-soft border border-dashed border-accent/40 grid place-items-center text-mute text-sm " + className}>[ISI: foto saya]</div>
  );
}
