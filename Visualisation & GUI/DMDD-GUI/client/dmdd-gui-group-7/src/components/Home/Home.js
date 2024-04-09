// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import sms1 from '../../img/sms1.jpg';
// import sms2 from '../../img/sms2.jpg';
import sms3 from '../../img/sms3.jpg';
import sms4 from '../../img/sms4.jpg';
function Home() {
  return (
    <div className="home-container"> 
      <h1>Supply Chain Management System <br></br><br></br></h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/departments" className="nav-link">Departments</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/deptEmployee" className="nav-link">Department Employee</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/employee" className="nav-link">Employee</Link>
          </li>
          <li className="nav-item">
            <Link to="/invoice" className="nav-link">Invoice</Link>
          </li>
          <li className="nav-item">
            <Link to="/product" className="nav-link">Product</Link>
          </li>
          <li className="nav-item">
            <Link to="/vendor" className="nav-link">Vendor</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/productionEmp" className="nav-link">Production Employee</Link>
          </li>
          <li className="nav-item">
            <Link to="/productionLine" className="nav-link">Production Line</Link>
          </li>
          <li className="nav-item">
            <Link to="/productLine" className="nav-link">Product Line</Link>
          </li>
          <li className="nav-item">
            <Link to="/productMaterial" className="nav-link">Product Material</Link>
          </li>
          <li className="nav-item">
            <Link to="/rawMaterial" className="nav-link">Raw Material</Link>
          </li>
          <li className="nav-item">
            <Link to="/supplySchedule" className="nav-link">Supply Schedule</Link>
          </li>
          <li className="nav-item">
            <Link to="/warehouse" className="nav-link">Warehouse</Link>
          </li> 
          <li className="nav-item">
            <Link to="/warehouseEmp" className="nav-link">Warehouse Employee</Link>
          </li> */}
        </ul>
      </nav>
      <br></br>
      {/* <div className="image-gallery">
        <img src={sms1} alt="Office Work" className="gallery-img" />
        <img src={sms3} alt="Production Line" className="gallery-img" />
        <img src={sms4} alt="Stored Boxes" className="gallery-img" />
        <img src={sms1} alt="Office Work" className="gallery-img" />
        <img src={sms3} alt="Production Line" className="gallery-img" />
        <img src={sms4} alt="Stored Boxes" className="gallery-img" />
      </div> */}
    </div>
    
  );
}

export default Home;
