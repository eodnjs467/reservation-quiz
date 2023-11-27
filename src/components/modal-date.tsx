import {useState} from "react";

export default function ModalDate() {
  const [hour, setHour] = useState(2);
  const [minute, setMinute] = useState(15);
  const [meridiem, setMeridiem] = useState('am');

  const increaseHour = () => setHour(hour => hour + 1);
  const decreaseHour = () => setHour(hour => hour - 1);
  const increaseMinute = () => setMinute(minute => minute + 1);
  const decreaseMinute = () => setMinute(minute => minute - 1);
  const handleMeridiem = () => {
    if(meridiem === 'am') return setMeridiem('pm');
    return setMeridiem('am');
  }

  return(
      <div className={"p-5"}>
        <div className={"flex"}>
          <img src={'assets/alarm_on.svg'} alt={'time'} />
          <input type={'time'} className={"border rounded-lg ml-2 p-2"}/>
        </div>
        <div className={"flex mt-2"}>
          <img src={'assets/today.svg'} alt={'date'} />
          <input type={"date"} pattern="\d{2}-\d{2}" className={"border rounded-lg ml-2 p-2"} />
        </div>
        <div className={"mt-2"}>
          <div className={"flex justify-evenly"}>
            <img src={'assets/chevron-up.svg'} alt={'up'} onClick={increaseHour}/>
            <img src={'assets/chevron-up.svg'} alt={'up'} onClick={increaseMinute}/>
            <img src={'assets/chevron-up.svg'} alt={'up'} onClick={handleMeridiem}/>
          </div>
          <div className={"flex items-center justify-evenly"}>
            <span>{hour}</span>
            <span className={""}>:</span>
            <span>{minute}</span>
            <span>{meridiem}</span>
          </div>
          <div className={"flex justify-evenly"}>
            <img src={'assets/chevron-down.svg'} alt={'down'} onClick={decreaseHour}/>
            <img src={'assets/chevron-down.svg'} alt={'down'} onClick={decreaseMinute}/>
            <img src={'assets/chevron-down.svg'} alt={'down'} onClick={handleMeridiem}/>
          </div>
        </div>
        <div className={"flex mt-2"}>
          <img className={"border rounded-xl p-3 mr-5"} src={"assets/trash.svg"} alt={'trash'}/>
          <button className={"w-full py-4 rounded bg-gradient-to-r from-purple-500 to-pink-500"}>Save</button>
        </div>
      </div>
  )
}
