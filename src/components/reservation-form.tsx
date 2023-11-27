import ModalDate from "./modal-date";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {Reservation, useReservationDispatch} from "../context/reservation-context";
import {useNavigate} from "react-router-dom";

export default function ReservationForm({data}: {data?: Reservation}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReservationDispatch();
  const navigate = useNavigate();
  const [guests, setGuests] = useState(data?.guests ?? 1);

  const {register, handleSubmit} = useForm({defaultValues: {
      name: data?.name ?? '',
      phone: data?.phone ?? '',
      date: data?.date ?? '',
      time: data?.time ?? '',
      table: data?.table ?? '',
      description: data?.description ?? '',
    }});

  const onSubmit = (formData: any) => {
    const formDataFormat = {...formData, guests};
    if(data) dispatch({type: "UPDATE", data: {id: data.id, ...formDataFormat}});
    if(!data) dispatch({type: "CREATE", data: formDataFormat});
    navigate("/");
  }
  const onClickDate = () => {}
  const handlePlus = () => {
    setGuests(prev => prev + 1);
  }
  const handleMinus = () => {
    setGuests(prev => prev - 1);
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
            <div className={"flex flex-wrap justify-center items-center border rounded w-full"} onClick={onClickDate}>
              {isOpen ? (<ModalDate />) : (
                  <>
                    <img src={"/assets/event_available.svg"} alt={"Date"}/>
                    <span>Select Date</span>
                  </>
              )}
            </div>
          </div>
          <div className={"flex justify-between mb-5"}>
            <div className={"flex items-center"}>
              <span className={"mr-3"}>Guests</span>
              <img className={"border rounded-lg"} src={"/assets/math-minus.svg"} alt={"minus"} onClick={handleMinus} />
              <span className={"text-2xl mx-5"}>{guests}</span>
              <img className={"border rounded-lg"} src={"/assets/math-plus.svg"} alt={"plus"} onClick={handlePlus} />
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
          <button className={"w-full py-4 rounded bg-gradient-to-r from-purple-500 to-pink-500"}>Save</button>
        </form>
      </div>
  )
}
