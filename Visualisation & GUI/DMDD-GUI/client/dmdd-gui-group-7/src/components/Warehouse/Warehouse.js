import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function WareHouse() {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    WarehouseID: '',
    Address: '',
    PhoneNumber: '',
    ManagerID: '',
  });
  const [editStock, setEditStock] = useState({
    WarehouseID: '',
    Address: '',
    PhoneNumber: '',
    ManagerID: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    axios.get('http://localhost:8089/api/warehouses')
      .then(response => {
        console.log('Fetched Warehouse:', response.data);
        setStocks(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock(prevStock => ({
      ...prevStock,
      [name]: value,
    }));
  };

  const handleAddStock = () => {
    axios.post('http://localhost:8089/api/warehouses', newStock)
      .then(response => {
        console.log('Added Warehouses:', response.data);
        fetchStocks();
        setNewStock({
          WarehouseID: '',
          Address: '',
          PhoneNumber: '',
          ManagerID: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteStock = (stockId) => {
    axios.delete(`http://localhost:8089/api/warehouses/${stockId}`)
      .then(response => {
        console.log('Deleted Warehouse:', response.data);
        fetchStocks();
      })
      .catch(error => console.error(error));
  };

  const handleEditStock = (stock) => {
    setEditStock(stock);
    setIsEditModalOpen(true);
  };

  const handleUpdateStock = () => {
    axios.put(`http://localhost:8089/api/warehouses/${editStock.WarehouseID}`, editStock)
      .then(response => {
        console.log('Updated Warehouse:', response.data);
        fetchStocks();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1 style={{color:'black'}}>Warehouse Records</h1>
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/departments">Departments</a>
        {/* <a href="/deptEmployee">Department Employee</a> */}
        <a href="/employee">Employee</a>
        <a href="/invoice">Invoice</a>
        <a href="/product">Product</a>
        <a href="/vendor">Vendor</a>
        <a href="/warehouse">WareHouse</a>
        {/* <a href="/productionEmp">Production Employee</a>
        <a href="/productionLine">Production Line</a>
        <a href="/productLine">Product Line</a>
        <a href="/productMaterial">Product Material</a>
        <a href="/rawMaterial">Raw_Material</a>
        <a href="/supplySchedule">SupplySchedule</a>
        <a href="/warehouseEmp">Warehouse Employee</a> */}
        {/* Add other links as needed */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Warehouse ID</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Manager ID</th>
          </tr>
        </thead>
        <tbody>
          {stocks && Array.isArray(stocks) ? (
            stocks.map(stock => (
              <tr key={stock.WarehouseID}>
                <td>{stock.WarehouseID}</td>
                <td>{stock.Address}</td>
                <td>{stock.PhoneNumber}</td>
                <td>{stock.ManagerID}</td>
                <td>
                  <button onClick={() => handleEditStock(stock)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteStock(stock.WarehouseID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Add New Warehouse</h2>
      <div>
        <label>WareHouse ID:</label>
        <input
          type="text"
          name="WarehouseID"
          value={newStock.WarehouseID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="Address"
          value={newStock.Address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="PhoneNumber"
          value={newStock.PhoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Manager ID:</label>
        <input
          type="text"
          name="ManagerID"
          value={newStock.ManagerID}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddStock}>Add Warehouse</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit WareHouse</h2>
          <div>
            <label>WareHouse ID:</label>
            <input
              type="text"
              name="WarehouseID"
              value={editStock.WarehouseID}
              disabled
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="Address"
              value={editStock.Address}
              onChange={(e) => setEditStock({ ...editStock, Address: e.target.value })}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="PhoneNumber"
              value={editStock.PhoneNumber}
              onChange={(e) => setEditStock({ ...editStock, PhoneNumber: e.target.value })}
            />
          </div>
          <div>
            <label>Manager ID :</label>
            <input
              type="text"
              name="ManagerID"
              value={editStock.ManagerID}
              onChange={(e) => setEditStock({ ...editStock, ManagerID: e.target.value })}
            />
          </div>
          <button className="blue-button" onClick={handleUpdateStock}>Update Warehouse</button>
          <button className="amber-button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default WareHouse;
