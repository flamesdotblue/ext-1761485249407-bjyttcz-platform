import { useState } from 'react';
import { Bus, Calendar, MapPin, Search } from 'lucide-react';

export default function TripSearch({ onSearch, trips, selectedTrip, setSelectedTrip }) {
  const [origin, setOrigin] = useState('San Francisco');
  const [destination, setDestination] = useState('Los Angeles');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [passengers, setPassengers] = useState(1);

  const submit = (e) => {
    e.preventDefault();
    onSearch({ origin, destination, date, passengers: Number(passengers) });
  };

  return (
    <div>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-3">
          <label className="text-xs text-white/70">Origin</label>
          <div className="mt-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <MapPin className="w-4 h-4 text-white/70" />
            <input
              className="bg-transparent flex-1 outline-none placeholder-white/40"
              placeholder="City or stop"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <label className="text-xs text-white/70">Destination</label>
          <div className="mt-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <MapPin className="w-4 h-4 text-white/70" />
            <input
              className="bg-transparent flex-1 outline-none placeholder-white/40"
              placeholder="City or stop"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <label className="text-xs text-white/70">Date</label>
          <div className="mt-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-white/70" />
            <input
              type="date"
              className="bg-transparent flex-1 outline-none placeholder-white/40"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-white/70">Passengers</label>
          <div className="mt-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <Bus className="w-4 h-4 text-white/70" />
            <input
              type="number"
              min={1}
              max={6}
              className="bg-transparent flex-1 outline-none"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-[0.99] transition text-white font-semibold rounded-lg px-4 py-2.5"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </form>

      {trips.length > 0 && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          {trips.map((trip) => (
            <button
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className={`text-left group rounded-xl border transition p-4 bg-white/5 hover:bg-white/10 ${
                selectedTrip?.id === trip.id ? 'border-cyan-400' : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{trip.operator}</div>
                <div className="text-xs text-white/60">{trip.code}</div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-sm">
                    {trip.departTime} → {trip.arriveTime}
                  </div>
                  <div className="text-xs text-white/60">{trip.duration}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${trip.price.toFixed(2)}</div>
                  <div className="text-xs text-white/60">per seat</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {trip.amenities.map((a) => (
                  <span key={a} className="text-[10px] uppercase tracking-wide bg-white/10 border border-white/10 rounded-full px-2 py-1 text-white/80">
                    {a}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
