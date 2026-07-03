// Lightweight placeholder rendered while a lazy mobile chunk is loading.
// Lives in its own file so the router can co-locate Suspense fallbacks
// without tripping Fast Refresh's "only-export-components" rule.

export default function MobileLoading() {
  return <div className="min-h-screen bg-base-100" aria-hidden="true" />;
}