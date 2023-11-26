import {useNavigate} from "react-router-dom";

export default function Title({ addButton, title }: {
  addButton?: boolean;
  title: string;
}) {
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/add-reservation');
  }

  return (
      <div className="flex flex-row justify-between items-center mx-5 my-5">
        <div className={'border rounded-lg'}>
          {addButton ? (
              <div className={"flex m-3"} onClick={handleAddClick}>
                <img src={"assets/add.svg"} alt={"add"}/>
                <span className={"text-orange-500"}>New Reservation</span>
              </div>
          ): <img src={"assets/keyboard_backspace.svg"} alt={"back"} onClick={() => navigate(-1)}/>}
        </div>
        <h1 className={"text-2xl"}>{title}</h1>
        <div>
          <img src={"assets/close.svg"} alt={'closed'}/>
        </div>
      </div>
  );
}
