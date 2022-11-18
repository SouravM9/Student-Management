import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

function Navbar() {

  const [showAll, setShowAll] = useState(false);
  const [logoutButton, setLogoutButton] = useState(false);

  useEffect(() => {

    if (localStorage.getItem("currentUser") === '') {
      setLogoutButton(false);
    }
    else {
      setLogoutButton(true);
    }
  }, [])



  fetch("/students/" + localStorage.getItem("currentUser"), {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(result => {
      if (result.userType === 'admin') {
        setShowAll(true);
      }
    })
    .catch(err => {
      console.log(err);
    });

  const logout = () => {
    localStorage.setItem("currentUser", '');
    setLogoutButton(false);
    window.location = '/login';
  }

  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
      <div className="navbar-brand">Student Dashboard </div>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {
            showAll ?
              <li className="navbar-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              : <div></div>
          }

          <li className="navbar-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
          {
            logoutButton ?
              <div></div>
              :
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Sign in</Link>
              </li>
          }

        </ul>
        {
          logoutButton ?
            <div className='buttonGroup'><Button onClick={logout}>Logout</Button></div>
            :
            <div></div>
        }

      </div>
    </nav>
  )
}

export default Navbar
