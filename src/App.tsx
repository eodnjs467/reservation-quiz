import React from 'react';
import './App.css';
import Reservation from "./pages/reservation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewReservation from "./pages/new-reservation";
import EditReservation from "./pages/edit-reservation";
import {ReservationContextProvider} from "./context/reservation-context";

function App() {
  return (
      <ReservationContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Reservation />}/>
            <Route path={"/add-reservation"} element={<NewReservation />}/>
            <Route path={"/edit/:id"} element={<EditReservation />} />
          </Routes>
        </BrowserRouter>
      </ReservationContextProvider>
  );
}

export default App;
