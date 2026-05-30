export default function Footer() {
  return (
    <footer className="max-w-portfolio mx-auto px-5 sm:px-10 py-5 flex justify-between items-center">
      <p className="text-[11px] text-slate-400">Dev Pradeep · {new Date().getFullYear()}</p>
      <p className="text-[11px] text-slate-400">Built with Next.js + Tailwind</p>
    </footer>
  );
}
