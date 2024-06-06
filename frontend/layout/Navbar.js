import React from 'react';
import { Link } from 'react-router-dom';
import logo from './ARA_logo4-01-1.png'; 
import '../App.css';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="ARA Wireless Labs Logo" style={{ height: '50px' }} />
          </Link>
          <div className="navbar-text text-white">Inventory Management</div>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Add any other navbar items here if needed */}
            </ul>
            <div className="d-flex ms-auto">
              <Link className='btn btn-outline-light mx-2' to="/additem">Add Item</Link>
              <Link className='btn btn-outline-light mx-2' to="/scanitem">Scan Item</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
