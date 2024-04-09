import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Depts from './components/Departments/Departments';
import DeptEmployee from './components/DeptEmployee/DeptEmployees';
import Employee from './components/Employee/Employee';
import Invoice from './components/Invoice/Invoice';
import Product from './components/Product/Product';
import Production_Emp from './components/Production_Employee/Production_Employee';
import Production_Line from './components/Production_Line/Production_Line';
import Product_Line from './components/Product_Line/Product_Line';
import Product_Material from './components/Product_Material/Product_Material';
import Raw_Material from './components/Raw_Material/Raw_Material';
import Supply_Schedule from './components/Supply_Schedule/Supply_Schedule';
import Vendor from './components/Vendor/Vendor'
import WareHouse from './components/Warehouse/Warehouse';
import WarehouseEmp from './components/WarehouseEmployee/WarehouseEmployee';
// Import other components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/departments" element={<Depts />} />
        <Route path="/deptEmployee" element={<DeptEmployee />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productionEmp" element={<Production_Emp />} />
        <Route path="/productionLine" element={<Production_Line />} />
        <Route path="/productLine" element={<Product_Line />} />
        <Route path="/productMaterial" element={<Product_Material />} />
        <Route path="/rawMaterial" element={<Raw_Material />} />
        <Route path="/supplySchedule" element={<Supply_Schedule />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/warehouse" element={<WareHouse />} />
        <Route path="/warehouseEmp" element={<WarehouseEmp />} />
      </Routes>
    </Router>
  );
}

export default App;
