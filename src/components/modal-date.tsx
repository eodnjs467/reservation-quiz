import React from "react";

// @ts-ignore
export default function ModalDate({meridiem, onChangeMeridiem, onChangeDate, onChangeTime, date, time, addHour, addMinute, minusHour, minusMinute, closed}) {
  const hour = time.split(':')[0] % 12 === 0 ? 12 : time.split(':')[0] % 12;
  const minute = time.split(':')[1];

  return(
      <div className={"w-1/3 p-5"}>
        <div className={"flex"}>
          <img src={'/assets/alarm_on.svg'} alt={'time'} />
          <input type={'time'} value={time} onChange={onChangeTime} className={"w-full border rounded-lg ml-2 p-2"}/>
        </div>
        <div className={"flex mt-2"}>
          <img src={'/assets/today.svg'} alt={'date'} />
          <input type={"date"} defaultValue={date} onChange={onChangeDate} className={"w-full border rounded-lg ml-2 p-2"} />
        </div>
        <div className={"mt-2"}>
          <div className={"flex justify-evenly"}>
            <img src={'/assets/chevron-up.svg'} alt={'up'} onClick={addHour}/>
            <img src={'/assets/chevron-up.svg'} alt={'up'} onClick={addMinute}/>
            <img src={'/assets/chevron-up.svg'} alt={'up'} onClick={onChangeMeridiem}/>
          </div>
          <div className={"flex items-center justify-evenly"}>
            <span>{hour}</span>
            <span className={""}>:</span>
            <span>{minute}</span>
            <span>{meridiem}</span>
          </div>
          <div className={"flex justify-evenly"}>
            <img src={'/assets/chevron-down.svg'} alt={'down'} onClick={minusHour}/>
            <img src={'/assets/chevron-down.svg'} alt={'down'} onClick={minusMinute}/>
            <img src={'/assets/chevron-down.svg'} alt={'down'} onClick={onChangeMeridiem}/>
          </div>
        </div>
        <div className={"flex mt-2"}>
          <img className={"border rounded-xl p-3 mr-5"} src={"/assets/trash.svg"} alt={'trash'}/>
          <button className={"w-full py-4 rounded bg-gradient-to-r from-purple-500 to-pink-500"} onClick={closed} >Save</button>
        </div>
      </div>
  )
}
