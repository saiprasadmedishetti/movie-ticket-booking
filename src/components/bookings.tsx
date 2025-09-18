import { useState } from "react";
import Tickets from "./tickets";
import booking from "../constants/booking.json";

export type SelectedItem = {
  name: string;
  price: number;
  seats: string[];
};

export default function Bookings() {
  const [showTime, setShowTime] = useState(booking.timings[1]);
  const [selected, setSelected] = useState<SelectedItem[]>([]);

  const onTicketSelect = (
    name: string,
    price: number,
    rowName: string,
    seatNumber: number
  ) => {
    setSelected((prev) => {
      const newItem = {
        name,
        price,
        seats: [`${rowName}-${seatNumber}`],
      };

      const findItem = prev.find((item) => item.name === name);

      if (prev.length === 0 || !findItem) {
        prev.push(newItem);
      } else {
        prev.map((item) => {
          if (item?.name === name) {
            item.seats = [...new Set([...item.seats, ...newItem.seats])];
          }
          return item;
        });
      }
      return [...prev];
    });
  };

  const price = selected.reduce(
    (acc, cur) => acc + cur.price * cur.seats.length,
    0
  );

  return (
    <>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold mb-1">{booking.theatre.movie}</h1>
        <div className="flex items-center flex-1 gap-4">
          <h4 className="text-md text-neutral-500">{booking.theatre.name}</h4>
          {booking.timings.map((time) => (
            <button
              key={time}
              className={`cursor-pointer ${
                showTime === time
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-md text-neutral-500"
              } px-3 py-1 border rounded-xl`}
              onClick={() => {
                setShowTime(time);
                setSelected([]);
              }}
            >
              {time}
            </button>
          ))}

          <div className={`flex ml-auto ${price ? "" : "invisible"}`}>
            <button className="bg-green-700 text-lg text-white cursor-pointer px-4 py-2 rounded-lg">
              Pay ₹ {price}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 pt-6">
        <Tickets
          tickets={booking.tickets}
          onTicketSelect={onTicketSelect}
          selected={selected}
        />
      </div>
    </>
  );
}
