import React, {createContext, Dispatch, useContext, useReducer} from "react";
import Reservation from "../pages/reservation";

export type Reservation = {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  table: string;
  description: string;
  seated: boolean;
}

export type ReservationState = Reservation[];

type Action =
    | { type: 'DELETE'; id: number; }
    | { type: 'CREATE'; data: Omit<Reservation, 'id'>; }
    | { type: 'UPDATE'; data: Reservation; }
    | { type: 'FINISH'; id: number; };
export const ReservationContext = createContext<ReservationState | null>(null);


type ReservationDispatch = Dispatch<Action>;
export const ReservationDispatchContext = createContext<ReservationDispatch | null>(null);

function reservationReducer(state: ReservationState, action: Action): ReservationState {
  switch (action.type){
    case "CREATE":
      const nextId = Math.max(...state.map(s => s.id)) + 1;
      return state.concat({ id: nextId, ...action.data, seated: false});
    case "UPDATE":
      return state.map(reservation => reservation.id === action.data.id ? {...reservation, ...action.data} : reservation);
    case "DELETE":
      return state.filter(reservation => reservation.id !== action.id);
    case "FINISH":
      return state.map(reservation => reservation.id === action.id ? {
        ...reservation,
        seated: !reservation.seated
      } : reservation);
    default:
      throw new Error('Unhandled action');
  }
}

export function ReservationContextProvider({children}: { children: React.ReactNode;}){
  const [reservations, dispatch] = useReducer(reservationReducer, [
    {
      id: 1,
      name: 'test1',
      phone: '010-1234-1234', date: 'July', table: '8', time: '20:53', guests: 5, description: '테스트입니다',
      seated: false,
    },
    {
      id: 2,
      name: 'test2',
      phone: '010-1234-1234', date: 'July', table: '8', time: '20:53', guests: 5, description: '테스트입니다',
      seated: false,
    },
    {
      id: 3,
      name: 'test3',
      phone: '010-1234-1234', date: 'July', table: '8', time: '20:53', guests: 5, description: '테스트입니다',
      seated: false,
    },
  ]);
  return(
      <ReservationDispatchContext.Provider value={dispatch}>
        <ReservationContext.Provider value={reservations}>
          {children}
        </ReservationContext.Provider>
      </ReservationDispatchContext.Provider>
  )
}

export function useReservationState(){
  const state = useContext(ReservationContext);
  if(!state) throw new Error('Reservation Provider not found');
  return state;
}
export function useReservationDispatch(){
  const dispatch = useContext(ReservationDispatchContext);
  if(!dispatch) throw new Error('Dispatch Provider not found');
  return dispatch;
}
