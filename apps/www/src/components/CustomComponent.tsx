export default function CustomComponent({ title }: { title: string }) {
  return (
    <span>
      <h3 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h3>
      <div style={{ color: "green" }}>This is a custom component!</div>
    </span>
  );
}
