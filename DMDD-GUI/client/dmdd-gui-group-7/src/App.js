import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Customer from './components/Customer/Customer';
import Inquiry from './components/Inquiry/Inquiry';
import Order from './components/Order/Order';
import Order_Item from './components/Order_Item/Order_Item';
import Product_Catalog from './components/Product_Catalog/Product_Catalog';
import Retailer from './components/Retailer/Retailer';
import Return_Request from './components/Return_Request/Return_Request';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shipment_Address from './components/Shipment_Address/Shipment_Address';
import Stock from './components/Stock/Stock'
// Import other components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order_item" element={<Order_Item />} />
        <Route path="/product_catalog" element={<Product_Catalog />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/return_request" element={<Return_Request />} />
        <Route path="/review" element={<Review />} />
        <Route path="/shipment" element={<Shipment />} />
        <Route path="/shipment_address" element={<Shipment_Address />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </Router>
  );
}

export default App;
