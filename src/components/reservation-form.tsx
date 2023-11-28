import ModalDate from "./modal-date";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {Reservation, useReservationDispatch} from "../context/reservation-context";
import {useNavigate} from "react-router-dom";

export default function ReservationForm({data}: {data?: Reservation }) {

  const dispatch = useReservationDispatch();
  const navigate = useNavigate();
  const [guests, setGuests] = useState(data?.guests ?? 1);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState('2023-11-28');
  const [time, setTime] = useState('01:00');
  const hour = time.split(':')[0];
  const minute = time.split(':')[1];
  let meridiem = Number(hour) > 0 && Number(hour) < 13 ? 'am' : 'pm';

  const onClose = () => {
    setIsOpen(false);
  }
  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }
  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  }
  const onIncreaseHour = () => {
    if(Number(hour) + 1 === 24) {
      setTime('00:00');
      return;
    }
    if(Number(hour)+1 > 24) {
      setTime(`01:${minute}`);
      return;
    }
    setTime(`${Number(hour) < 9 ? '0' + (Number(hour) + 1) : Number(hour)+1}:${minute}`);
  }
  const onDecreaseHour = () => {
    const hour = time.split(':')[0];
    const minute = time.split(':')[1];
    if(Number(hour)-1 < 1) {
      setTime(`12:${minute}`)
      return;
    }
    setTime(`${Number(hour) < 11 ? '0' + (Number(hour) - 1) : Number(hour)-1}:${minute}`);
  }
  const onIncreaseMinute = () => {
    const hour = time.split(":")[0];
    const minute = Number(time.split(':')[1]);
    if(Number(minute+1 > 59)){
      setTime(`${hour}:00`);
      return;
    }
    setTime(`${hour}:${minute < 9 ? '0' + (Number(minute) + 1) : Number(minute) + 1}`);
  }
  const onDecreaseMinute = () => {
    const hour = time.split(":")[0];
    const minute = Number(time.split(':')[1]);
    if(Number(minute) -1 <0){
      setTime(`${hour}:59`);
      return;
    }
    setTime(`${hour}:${minute < 11 ? '0' + (Number(minute) - 1) : Number(minute) - 1}`);
  }
  const onChangeMeridiem = () => {
    if(Number(hour) + 12 < 24){
      setTime(`${Number(hour) + 12}:${minute}`);
      return;
    }
    if(Number(hour) + 12 > 24){
      setTime(`0${Math.abs(Number(hour) - 12)}:${minute}`);
      return;
    }
  }
  const {register, handleSubmit} = useForm({defaultValues: {
      name: data?.name ?? '',
      phone: data?.phone ?? '',
      date: data?.date ?? '',
      time: data?.time ?? '',
      table: data?.table ?? '',
      description: data?.description ?? '',
    }});

  const onSubmit = (formData: any) => {
    const formDataFormat = {...formData, guests, date, time};
    if(data) dispatch({type: "UPDATE", data: {id: data.id, ...formDataFormat}});
    if(!data) dispatch({type: "CREATE", data: formDataFormat});
    navigate("/");
  }
  const handlePlus = () => {
    setGuests(prev => prev + 1);
  }
  const handleMinus = () => {
    setGuests(prev => prev - 1);
  }
  const onDelete = () => {
    dispatch({type: "DELETE", id: data!.id});
    navigate('/');
  }
  return(
      <div className={"mx-5"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"flex justify-between mb-5"}>
            <input className={"border rounded w-full mr-3 py-3"} placeholder={"Name"}
                   {...register("name", {required: true})}
            />
            <input className={"border rounded w-full mr-3"} placeholder={"Phone"}
                   {...register("phone", {
                     required: true,
                   })}
            />
            <div className={"flex flex-wrap justify-center items-center border rounded-2xl w-full shadow-lg"} onClick={() => setIsOpen(true)}>
              <img src={"/assets/event_available.svg"} alt={"Date"}/>
              <span>Select Date</span>
            </div>
          </div>
          <div className={"flex justify-between mb-5"}>
            <div className={"flex items-center"}>
              <span className={"mr-3"}>Guests</span>
              <img className={"border rounded-lg shadow-lg"} src={"/assets/math-minus.svg"} alt={"minus"} onClick={handleMinus} />
              <span className={"text-2xl mx-5"}>{guests}</span>
              <img className={"border rounded-lg shadow-lg"} src={"/assets/math-plus.svg"} alt={"plus"} onClick={handlePlus} />
            </div>
            <select className={"w-1/2 border rounded-lg p-3"}
                    {...register("table")}>
              <option value={""}>Select Table</option>
              <option value={'1'}>1</option>
              <option value={'2'}>2</option>
              <option value={'3'}>3</option>
              <option value={'4'}>4</option>
              <option value={'5'}>5</option>
              <option value={'6'}>6</option>
              <option value={'7'}>7</option>
              <option value={'8'}>8</option>
              <option value={'9'}>9</option>
            </select>
          </div>
          <div className={"mb-10"}>
            <textarea className={"w-full h-52 border rounded"} placeholder={"Add Note..."}
                      {...register("description")}
            />
          </div>
          <div className={"flex"}>
          {data &&
            <button className={'border p-3 mr-5 rounded-lg shadow-lg'} onClick={onDelete}>
              <img src={'/assets/trash.svg'} alt={'delete'}/>
            </button>
          }
          <button className={"w-full py-4 rounded bg-red-600 text-white"}>Save</button>
          </div>
        </form>
        {isOpen && <ModalDate
            meridiem={meridiem}
            onChangeMeridiem={onChangeMeridiem}
            onChangeDate={onChangeDate}
            onChangeTime={onChangeTime}
            date={date}
            time={time}
            addHour={onIncreaseHour}
            addMinute={onIncreaseMinute}
            minusHour={onDecreaseHour}
            minusMinute={onDecreaseMinute}
            closed={onClose}/>}
      </div>
  )
}
