export default function Heading({ sub, title }) {
  return (
    <div className="text-center mb-14">
      <p className="text-sm text-accent font-medium">{sub}</p>
      <h2 className="font-display font-bold text-4xl md:text-5xl mt-2 tracking-tight">{title}</h2>
    </div>
  );
}
