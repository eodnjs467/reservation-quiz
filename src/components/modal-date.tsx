export default function ModalDate() {
  return(
      <div>
        <div className={"flex"}>
          <img src={'assets/alarm_on.svg'} alt={'time'} />
          <input className={"border"}/>
        </div>
        <div className={"flex"}>
          <img src={'assets/today.svg'} alt={'date'} />
          <input className={"border"}/>
        </div>
        <div>
          <div className={"flex justify-evenly"}>
            <img src={'assets/chevron-up.svg'} alt={'up'} />
            <img src={'assets/chevron-up.svg'} alt={'up'} />
            <img src={'assets/chevron-up.svg'} alt={'up'} />
          </div>
          <div className={"flex items-center justify-evenly"}>
            <span>1</span>
            <span className={""}>:</span>
            <span>1</span>
            <span>1</span>
          </div>
          <div className={"flex justify-evenly"}>
            <img src={'assets/chevron-down.svg'} alt={'down'} />
            <img src={'assets/chevron-down.svg'} alt={'down'} />
            <img src={'assets/chevron-down.svg'} alt={'down'} />
          </div>
        </div>
        <div className={"flex"}>
          <img className={"border rounded-xl p-3 mr-5"} src={"assets/trash.svg"} alt={'trash'}/>
          <button className={"w-full py-4 rounded bg-gradient-to-r from-purple-500 to-pink-500"}>Save</button>
        </div>
      </div>
  )
}
