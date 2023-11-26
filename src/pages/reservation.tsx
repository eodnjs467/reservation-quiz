import Title from "../components/title";
import {useReservationState} from "../context/reservation-context";
import Card from "../components/card";

export default function Reservation() {
  const reservations = useReservationState();
  return (
      <>
        <Title title={'Reservation'} addButton={true}/>
        <div className={"grid grid-cols-3"}>
        {reservations.map(reservation => <Card
            key={reservation.id}
            id={reservation.id}
            name={reservation.name}
            phone={reservation.phone}
            date={reservation.date}
            time={reservation.time}
            guest={reservation.guests}
            table={reservation.table}
            description={reservation.description}
        />)}
        </div>
      </>
  );
}
