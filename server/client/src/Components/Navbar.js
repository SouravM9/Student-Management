import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <Link to="/" className="navbar-brand">Student Dashboard</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link">Sign in</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}