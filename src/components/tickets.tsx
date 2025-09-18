import type { SelectedItem } from "./bookings";

type Ticket = {
  id: number;
  name: string;
  price: number;
  rows: number;
  seatsPerRow: number;
  aisle: number[];
  booked?: number[];
};
type TicketsProps = {
  tickets: Ticket[];
  onTicketSelect: (
    name: string,
    price: number,
    rowName: string,
    seatNumber: number
  ) => void;
  selected: SelectedItem[];
};

export default function Tickets({
  tickets,
  onTicketSelect,
  selected,
}: TicketsProps) {
  let count = 0;
  const selectedSeats = selected.map((item) => item.seats).flat() || [];
  const generateSeats = (tickets: Ticket[]) => {
    return tickets.map(
      ({ id, rows, seatsPerRow, aisle, booked, price, name }) => {
        return Array.from({ length: rows }).map((_, row) => {
          const rowName = String.fromCharCode(65 + count);
          count++;
          let aisleCount = 0;
          return (
            <div key={`${id}-${row}`} className="flex gap-4 items-center mb-4">
              <div className="text-lg w-5">{rowName}</div>

              {Array.from({ length: seatsPerRow }).map((_, i) => {
                if (aisle.includes(i + 1)) {
                  aisleCount++;
                }
                const seatNumber = aisle.includes(i + 1)
                  ? null
                  : i + 1 - aisleCount;
                const bookedSeat = booked?.includes(i + 1);
                return (
                  <div
                    key={i}
                    className={`${
                      seatNumber ? "border" : "border-transparent"
                    } ${
                      bookedSeat
                        ? "bg-gray-100 border-neutral-300 cursor-no-drop"
                        : "border-green-500  cursor-pointer"
                    } ${
                      selectedSeats?.includes(`${rowName}-${seatNumber}`)
                        ? "bg-green-600 border-green-600 text-green-50  cursor-pointer"
                        : ""
                    } text-lg select-none rounded-t-md h-11 w-11 inline-flex items-center justify-center`}
                    onClick={() => {
                      if (
                        seatNumber &&
                        !bookedSeat &&
                        !selectedSeats?.includes(`${rowName}-${seatNumber}`)
                      ) {
                        onTicketSelect(name, price, rowName, seatNumber);
                      }
                    }}
                  >
                    {seatNumber}
                  </div>
                );
              })}
            </div>
          );
        });
      }
    );
  };

  return (
    <div className="flex justify-center">
      <div className="inline-flex flex-col mx-auto">
        <div className="flex flex-col-reverse mb-6">
          {generateSeats(tickets)}
        </div>
        <div className=" h-15 bg-blue-300 [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]"></div>
      </div>
    </div>
  );
}
