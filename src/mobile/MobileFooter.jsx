// Compact mobile footer — used on pages without a bottom NavigationBar focus
// (currently unused; kept for completeness).

export default function MobileFooter() {
  return (
    <footer className="px-4 py-6 text-center text-xs text-base-content/45">
      © {new Date().getFullYear()} MD Shahajalal Mahmud
    </footer>
  );
}