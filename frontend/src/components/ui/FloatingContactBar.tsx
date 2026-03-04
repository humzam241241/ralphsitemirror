export default function FloatingContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-blue px-4 py-3 shadow-2xl md:hidden">
      <div className="flex items-center justify-between gap-2">
        <a
          href="tel:+19055551234"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 font-bold text-dark transition-all hover:bg-gold-hover"
        >
          <span>📞</span>
          <span className="text-sm">Call Now</span>
        </a>
        <a
          href="mailto:info@ryansroofing.ca"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-white bg-brand-blue px-4 py-3 font-bold text-white transition-all hover:bg-white/10"
        >
          <span>✉️</span>
          <span className="text-sm">Email</span>
        </a>
      </div>
    </div>
  )
}
