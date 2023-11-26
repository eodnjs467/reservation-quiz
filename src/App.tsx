import React from 'react';
import './App.css';
import Reservation from "./pages/reservation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewReservation from "./pages/new-reservation";
import EditReservation from "./pages/edit-reservation";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Reservation />}/>
          <Route path={"/add-reservation"} element={<NewReservation />}/>
          <Route path={"/edit-reservation"} element={<EditReservation />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
