export default function GridOverlay() {
  return (
    <>
      {/* Noise grain texture */}
      <div className="paper-noise" aria-hidden="true" />

      {/* 12-column architectural grid lines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-6 lg:grid-cols-12 gap-4 opacity-[0.035]"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-r border-black" />
        ))}
      </div>
    </>
  );
}
