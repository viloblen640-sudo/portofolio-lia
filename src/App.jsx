import { useEffect } from "react";
import { initMusic } from "./lib/music";
import Loader from "./components/Loader";
import Stars from "./components/Stars";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Projects from "./sections/Projects";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";
import { profile } from "./data/content";
export default function App() {
  useEffect(() => { initMusic(); }, []);
  return (
    <>
      <Loader /><Stars /><Nav />
      <main><Hero /><About /><Stack /><Projects /><Certificates /><Contact /></main>
      <footer className="border-t border-line py-8 text-center text-sm text-mute">© {new Date().getFullYear()} {profile.name}, {profile.school}</footer>
    </>
  );
}
