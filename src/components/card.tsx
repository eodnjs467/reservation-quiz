import {useNavigate} from "react-router-dom";

export default function Card(
  {
    id, name, phone, date, time, guest, table, description
  }: {
    id: number, name: string; phone:string; date: string; time: string, guest: string, table: string, description: string
  }) {
  const navigate = useNavigate();
  const onClickEdit = () => {
    navigate('edit/:id');
  }
  return(
      <div>
        <div>
          <h1>{name}</h1>
          <span><img src={'assets/phone.svg'} alt={'phone'} /> {phone}</span>
        </div>
        <div>
          <img src={'assets/today.svg'} alt={'date'} />
          <span>{date}, {time}</span>
        </div>
        <img src={'assets/group.svg'} alt={'people'} />
        {guest}
        {table &&
          <p>Reserved Table {table} , Floor 1</p>
        }
        <div>
          {description}
          <img src={'/assets/edit.svg'} alt={'edit'} onClick={onClickEdit}/>
        </div>
      </div>
  )
}
