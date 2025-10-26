import { useMemo, useState } from 'react';
import Hero from './components/Hero';
import TripSearch from './components/TripSearch';
import SeatMap from './components/SeatMap';
import BookingSidebar from './components/BookingSidebar';

export default function App() {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
  });
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSearch = (params) => {
    setSearchParams(params);
    // Mock trips generation for MVP
    const basePrice = 19.99;
    const generated = [
      {
        id: 'T1',
        operator: 'Neon Express',
        departTime: '08:30',
        arriveTime: '12:15',
        duration: '3h 45m',
        price: basePrice,
        amenities: ['WiFi', 'AC', 'USB'],
        busConfig: { rows: 10, cols: 4, aisleAfter: 2 },
        reserved: ['1A', '1B', '3C', '4D', '5B', '6A', '7C'],
      },
      {
        id: 'T2',
        operator: 'HoloBus Lines',
        departTime: '11:00',
        arriveTime: '14:20',
        duration: '3h 20m',
        price: basePrice + 5,
        amenities: ['WiFi', 'AC', 'USB', 'WC'],
        busConfig: { rows: 11, cols: 4, aisleAfter: 2 },
        reserved: ['2A', '2B', '2C', '8D', '9A', '9B'],
      },
      {
        id: 'T3',
        operator: 'Quantum Coach',
        departTime: '17:15',
        arriveTime: '21:10',
        duration: '3h 55m',
        price: basePrice - 3,
        amenities: ['WiFi', 'USB'],
        busConfig: { rows: 9, cols: 4, aisleAfter: 2 },
        reserved: ['1C', '1D', '4B', '5A', '7B', '8C'],
      },
    ].map((t, idx) => ({ ...t, code: `${params.origin.slice(0,2).toUpperCase()}-${params.destination.slice(0,2).toUpperCase()}-${idx+1}` }))
    setTrips(generated);
    setSelectedTrip(null);
    setSelectedSeats([]);
  };

  const toggleSeat = (seatId) => {
    if (!selectedTrip) return;
    setSelectedSeats((prev) => {
      const exists = prev.includes(seatId);
      if (exists) return prev.filter((s) => s !== seatId);
      if (prev.length >= searchParams.passengers) return prev; // limit by passengers
      return [...prev, seatId];
    });
  };

  const total = useMemo(() => {
    if (!selectedTrip) return 0;
    return (selectedSeats.length * selectedTrip.price).toFixed(2);
  }, [selectedSeats, selectedTrip]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-24 relative z-10">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <TripSearch
            onSearch={handleSearch}
            trips={trips}
            selectedTrip={selectedTrip}
            setSelectedTrip={(trip) => {
              setSelectedTrip(trip);
              setSelectedSeats([]);
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
              <SeatMap
                config={selectedTrip?.busConfig || { rows: 0, cols: 0, aisleAfter: 2 }}
                reservedSeats={selectedTrip?.reserved || []}
                selectedSeats={selectedSeats}
                onToggleSeat={toggleSeat}
                disabled={!selectedTrip}
                passengers={searchParams.passengers}
              />
            </div>
          </div>
          <div>
            <BookingSidebar
              searchParams={searchParams}
              selectedTrip={selectedTrip}
              selectedSeats={selectedSeats}
              total={total}
              onCheckout={() => {
                if (!selectedTrip) return;
                if (selectedSeats.length !== Number(searchParams.passengers)) {
                  alert(`Please select ${searchParams.passengers} seat(s) before checkout.`);
                  return;
                }
                alert(
                  `Booking confirmed!\n\nTrip: ${selectedTrip.operator} ${selectedTrip.code}\nDate: ${searchParams.date}\nFrom: ${searchParams.origin} -> ${searchParams.destination}\nDepart: ${selectedTrip.departTime}\nSeats: ${selectedSeats.join(', ')}\nTotal: $${total}`
                );
              }}
            />
          </div>
        </div>
      </div>

      <footer className="mt-16 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} HoloTicket. All rights reserved.
      </footer>
    </div>
  );
}
