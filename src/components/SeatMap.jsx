import { Ticket } from 'lucide-react';

function Seat({ id, status, onClick, disabled }) {
  const base = 'w-10 h-10 flex items-center justify-center rounded-md text-xs font-semibold transition select-none';
  const styles =
    status === 'reserved'
      ? 'bg-white/10 text-white/40 border border-white/10 cursor-not-allowed'
      : status === 'selected'
      ? 'bg-cyan-500/80 text-white border border-cyan-300 shadow-lg shadow-cyan-500/20'
      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10';
  return (
    <button
      onClick={onClick}
      disabled={disabled || status === 'reserved'}
      className={`${base} ${styles}`}
      aria-label={`Seat ${id} ${status}`}
    >
      {id}
    </button>
  );
}

export default function SeatMap({ config, reservedSeats = [], selectedSeats = [], onToggleSeat, disabled, passengers = 1 }) {
  const { rows, cols, aisleAfter = 2 } = config || {};

  if (!rows || !cols) {
    return (
      <div className="text-center py-10 text-white/60">
        Select a trip to view available seats.
      </div>
    );
  }

  // generate seat labels like 1A, 1B, 1C, 1D
  const colLabels = Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i));
  const grid = Array.from({ length: rows }, (_, r) => colLabels.map((c) => `${r + 1}${c}`));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Pick your seats</h3>
        <div className="text-xs text-white/60">Select up to {passengers} seat(s)</div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 overflow-auto">
          <div className="inline-flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/10">
            {grid.map((row, rIdx) => (
              <div key={rIdx} className="flex items-center gap-3">
                <div className="w-6 text-right text-[10px] text-white/50">{rIdx + 1}</div>
                <div className="flex items-center gap-2">
                  {row.map((id, cIdx) => (
                    <div key={id} className="flex items-center">
                      <Seat
                        id={id}
                        disabled={disabled}
                        status={reservedSeats.includes(id) ? 'reserved' : selectedSeats.includes(id) ? 'selected' : 'available'}
                        onClick={() => onToggleSeat(id)}
                      />
                      {cIdx + 1 === aisleAfter && cIdx + 1 !== row.length && (
                        <div className="w-6" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden sm:flex flex-col gap-3 min-w-[180px]">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-4 h-4 rounded bg-white/5 border border-white/10 inline-block" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-4 h-4 rounded bg-cyan-500/80 border border-cyan-300 inline-block" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-4 h-4 rounded bg-white/10 border border-white/10 inline-block" />
            <span className="text-white/70">Reserved</span>
          </div>
          <div className="mt-4 text-xs text-white/60">
            Pro tip: Seats closer to the front may have a smoother ride.
          </div>
          <div className="mt-auto flex items-center gap-2 text-white/70">
            <Ticket className="w-4 h-4" />
            <span className="text-xs">Tap a seat to select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
