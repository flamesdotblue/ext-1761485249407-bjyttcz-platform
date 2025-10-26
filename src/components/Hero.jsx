import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black pointer-events-none" />

      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Book Your Futuristic Bus Ticket
          </h1>
          <p className="mt-4 text-white/80 text-base sm:text-lg">
            A holographic, digital ticketing experience. Search trips, pick seats, and checkout in minutes.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-white/60">
            <span>Secure payments</span>
            <span className="opacity-40">•</span>
            <span>Real-time seat selection</span>
            <span className="opacity-40">•</span>
            <span>Instant confirmation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
