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
      <div className={"m-3 border rounded-lg p-5 shadow-lg"}>
        <div className={"flex items-center"}>
          <h1>{name}</h1>
          <div className={"flex min-w-[150px] ml-3 border rounded-full p-2 shadow-lg"}>
            <img src={'/assets/phone.svg'} alt={'phone'} />
            <span>{phone}</span>
          </div>
        </div>
        <div className={"flex items-center mt-2"}>
          <img src={'/assets/today.svg'} alt={'date'} />
          <span className={"ml-2"}>{date}, {time}</span>
        </div>
        <div className={"flex items-center mt-2"}>
          <img src={'/assets/group.svg'} alt={'people'} />
          <span className={"ml-2"}>{guest}</span>
        </div>
        {table &&
            <p className={"mt-2"}>Reserved Table <span>{table}</span> , Floor 1</p>
        }
        <div className={"flex mt-2"}>
          {description}
          <img src={'/assets/edit.svg'} alt={'edit'} onClick={onClickEdit}/>
        </div>
        <div className={"flex mt-5"}>
          <img className={"border rounded-lg p-3 mr-5 shadow-lg"} src={'/assets/trash.svg'} alt={'delete'} onClick={onDelete} />
          <button className={"w-full border rounded-lg shadow-lg bg-red-600 text-white"} onClick={onSeated}>Seated</button>
        </div>
      </div>
  )
}
