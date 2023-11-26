import {useNavigate} from "react-router-dom";
import {useReservationDispatch} from "../context/reservation-context";

export default function Card(
  {
    id, name, phone, date, time, guest, table, description
  }: {
    id: number, name: string; phone:string; date: string; time: string, guest: number, table: string, description: string
  }) {

  const dispatch  = useReservationDispatch()
  const navigate = useNavigate();
  const onClickEdit = () => {
    navigate(`edit/${id}`);
  }
  const onDelete = () => {
    dispatch({type: 'DELETE', id});
  }
  // TODO: onSeated 기능 알아보고 작성
  const onSeated = () => {
    console.log('seated');

  }
  return(
      <div className={"m-3"}>
        <div className={"flex"}>
          <h1>{name}</h1>
          <div className={"flex"}>
            <img src={'/assets/phone.svg'} alt={'phone'} />
            <span>{phone}</span>
          </div>
        </div>
        <div className={"flex"}>
          <img src={'/assets/today.svg'} alt={'date'} />
          <span>{date}, {time}</span>
        </div>
        <div className={"flex"}>
          <img src={'/assets/group.svg'} alt={'people'} />
          {guest}
        </div>
        {table &&
          <p>Reserved Table {table} , Floor 1</p>
        }
        <div className={"flex"}>
          {description}
          <img src={'/assets/edit.svg'} alt={'edit'} onClick={onClickEdit}/>
        </div>
        <div className={"flex"}>
          <img className={"border rounded-lg p-3 mr-5"} src={'/assets/trash.svg'} alt={'delete'} onClick={onDelete} />
          <button className={"border rounded-lg w-full"} onClick={onSeated}>Seated</button>
        </div>
      </div>
  )
}
