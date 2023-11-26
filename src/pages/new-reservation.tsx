import Title from "../components/title";
import {useForm} from "react-hook-form";
import {useRef, useState} from "react";
import ModalDate from "../components/modal-date";
import {useReservationDispatch} from "../context/reservation-context";
import {useNavigate} from "react-router-dom";

export default function NewReservation(){
  const navigate = useNavigate();
  const dispatch = useReservationDispatch();

  const ref = useRef<HTMLSelectElement | null>(null);
  const [guests, setGuests] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});


  const onSubmit = (data: any) => {
    const formData = {...data, guests, date: 'Jan 07 ', time: '13:18', table: ref.current!.value}
    dispatch({type: "CREATE", data: formData});
    navigate("/");
  }
  //TODO: Date 구현
  const onClickDate = () => {
    console.log('onclick Date');
    setIsOpen(prev => !prev);
  }
  const handlePlus = () => setGuests(prev => prev + 1);
  const handleMinus = () => setGuests(prev => prev - 1);

  return(
    <>
      <Title title={"New Reservation"} />
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
            <select className={"w-1/2 border rounded-lg p-3"} ref={ref}>
              <option value={""}>Select Table</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
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
    </>
  )
}
