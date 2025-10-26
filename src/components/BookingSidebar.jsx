import { Calendar, MapPin, Ticket } from 'lucide-react';

export default function BookingSidebar({ searchParams, selectedTrip, selectedSeats, total, onCheckout }) {
  return (
    <aside className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 sticky top-6">
      <h3 className="font-semibold text-lg">Your Booking</h3>
      <div className="mt-3 space-y-3 text-sm">
        <div className="flex items-center gap-2 text-white/80">
          <MapPin className="w-4 h-4" />
          <span>{searchParams.origin || '—'} → {searchParams.destination || '—'}</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Calendar className="w-4 h-4" />
          <span>{searchParams.date || 'Select date'}</span>
        </div>
        {selectedTrip ? (
          <div className="rounded-lg bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{selectedTrip.operator}</div>
              <div className="text-xs text-white/60">{selectedTrip.code}</div>
            </div>
            <div className="mt-1 text-xs text-white/70">
              {selectedTrip.departTime} → {selectedTrip.arriveTime} • {selectedTrip.duration}
            </div>
            <div className="mt-2 text-xs text-white/60">${selectedTrip.price.toFixed(2)} per seat</div>
          </div>
        ) : (
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-white/60 text-sm">
            Select a trip to continue
          </div>
        )}

        <div className="mt-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              <span>Seats</span>
            </div>
            <span className="text-white/80">{selectedSeats.length} selected</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedSeats.length > 0 ? (
              selectedSeats.map((s) => (
                <span key={s} className="text-xs rounded-full px-2 py-1 border border-white/10 bg-white/5">
                  {s}
                </span>
              ))
            ) : (
              <span className="text-xs text-white/60">No seats selected yet</span>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 my-3" />

        <div className="flex items-center justify-between">
          <span className="text-white/70">Total</span>
          <span className="text-xl font-bold">${total}</span>
        </div>

        <button
          className={`mt-4 w-full rounded-lg px-4 py-2.5 font-semibold transition ${
            selectedTrip && selectedSeats.length > 0
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
              : 'bg-white/10 text-white/60 cursor-not-allowed'
          }`}
          onClick={onCheckout}
          disabled={!selectedTrip || selectedSeats.length === 0}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
}
