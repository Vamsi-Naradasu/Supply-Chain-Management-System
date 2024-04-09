import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Vendor() {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    VendorID: '',
    VendorName: '',
    Address: '',
    PhoneNumber: '',
    Speciality: '',
  });
  const [editStock, setEditStock] = useState({
    VendorID: '',
    VendorName: '',
    Address: '',
    PhoneNumber: '',
    Speciality: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    axios.get('http://localhost:8089/api/vendors')
      .then(response => {
        console.log('Fetched Vendors:', response.data);
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
    axios.post('http://localhost:8089/api/vendors', newStock)
      .then(response => {
        console.log('Added Vendor:', response.data);
        fetchStocks();
        setNewStock({
          VendorID: '',
          VendorName: '',
          Address: '',
          PhoneNumber: '',
          Speciality: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteStock = (stockId) => {
    axios.delete(`http://localhost:8089/api/vendors/${stockId}`)
      .then(response => {
        console.log('Deleted Vendor:', response.data);
        fetchStocks();
      })
      .catch(error => console.error(error));
  };

  const handleEditStock = (stock) => {
    setEditStock(stock);
    setIsEditModalOpen(true);
  };

  const handleUpdateStock = () => {
    axios.put(`http://localhost:8089/api/vendors/${editStock.VendorID}`, editStock)
      .then(response => {
        console.log('Updated Vendor:', response.data);
        fetchStocks();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1 style={{color:'black'}}>Vendor Records</h1>
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
            <th>Vendor ID</th>
            <th>Vendor Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Speciality</th>
          </tr>
        </thead>
        <tbody>
          {stocks && Array.isArray(stocks) ? (
            stocks.map(stock => (
              <tr key={stock.VendorID}>
                <td>{stock.VendorID}</td>
                <td>{stock.VendorName}</td>
                <td>{stock.Address}</td>
                <td>{stock.PhoneNumber}</td>
                <td>{stock.Speciality}</td>
                <td>
                  <button onClick={() => handleEditStock(stock)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteStock(stock.VendorID)}>
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

      <h2>Add New Vendor</h2>
      <div>
        <label>Vendor ID:</label>
        <input
          type="text"
          name="VendorID"
          value={newStock.VendorID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="VendorName"
          value={newStock.VendorName}
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
        <label>Speciality:</label>
        <input
          type="text"
          name="Speciality"
          value={newStock.Speciality}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddStock}>Add Vendor</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Vendor</h2>
          <div>
            <label>Vendor ID:</label>
            <input
              type="text"
              name="VendorID"
              value={editStock.VendorID}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="VendorName"
              value={editStock.VendorName}
              onChange={(e) => setEditStock({ ...editStock, VendorName: e.target.value })}
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
            <label>Speciality :</label>
            <input
              type="text"
              name="Speciality"
              value={editStock.Speciality}
              onChange={(e) => setEditStock({ ...editStock, Speciality: e.target.value })}
            />
          </div>
          <button className="blue-button" onClick={handleUpdateStock}>Update Vendor</button>
          <button className="amber-button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    </div>
  );
}

export default Vendor;
