import Title from "../components/title";
import {useParams} from "react-router-dom";
import {useReservationState} from "../context/reservation-context";
import ReservationForm from "../components/reservation-form";

export default function EditReservation() {
  const { id } = useParams();
  const reservations = useReservationState();
  const reservation = reservations.find(r => r.id === Number(id));

  return(
      <>
        <Title title={"Edit Reservation"} />
        <ReservationForm data={reservation}/>
      </>
  )
}
