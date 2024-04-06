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
    <div>
      <h1>Supply Chain Management System <br></br><br></br></h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/customers" className="nav-link">Customer</Link>
          </li>
          <li className="nav-item">
            <Link to="/inquiry" className="nav-link">Inquiry</Link>
          </li>
          <li className="nav-item">
            <Link to="/order" className="nav-link">Order</Link>
          </li>
          <li className="nav-item">
            <Link to="/order_Item" className="nav-link">Order Item</Link>
          </li>
          <li className="nav-item">
            <Link to="/product_catalog" className="nav-link">Product Catalog</Link>
          </li>
          <li className="nav-item">
            <Link to="/retailer" className="nav-link">Retailer</Link>
          </li>
          <li className="nav-item">
            <Link to="/return_request" className="nav-link">Return Request</Link>
          </li>
          <li className="nav-item">
            <Link to="/review" className="nav-link">Review</Link>
          </li>
          <li className="nav-item">
            <Link to="/shipment" className="nav-link">Shipment</Link>
          </li>
          <li className="nav-item">
            <Link to="/shipment_address" className="nav-link">Shipment Address</Link>
          </li>
          <li className="nav-item">
            <Link to="/stock" className="nav-link">Stock</Link>
          </li>
          <li className="nav-item">
            <Link to="/stock" className="nav-link">Stock</Link>
          </li> <li className="nav-item">
            <Link to="/stock" className="nav-link">Stock</Link>
          </li>
        </ul>
      </nav>
      <br></br>
      <div className="image-gallery">
        <img src={sms1} alt="Office Work" className="gallery-img" />
        <img src={sms3} alt="Production Line" className="gallery-img" />
        <img src={sms4} alt="Stored Boxes" className="gallery-img" />
        <img src={sms1} alt="Office Work" className="gallery-img" />
        <img src={sms3} alt="Production Line" className="gallery-img" />
        <img src={sms4} alt="Stored Boxes" className="gallery-img" />
      </div>
    </div>
    
  );
}

export default Home;
