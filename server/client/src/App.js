import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Detail from './Components/Detail';
import RegisterFaculty from './Components/RegisterFaculty';
import Faculties from './Components/Faculties';
import EditDetails from './Components/EditDetails';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/registerfaculty" element={<RegisterFaculty />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/edit/:id" element={<EditDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;