import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Retailer() {
  const [retailers, setRetailers] = useState([]);
  const [newRetailer, setNewRetailer] = useState({
    // retailer_id: '',
    // retailer_name: '',
    // retailer_address: '',
    // retailer_phone_no: '',
    line_id: '',
    capacity: '',
    address: '',
    manager_id: '',
  });
  const [editRetailer, setEditRetailer] = useState({
    line_id: '',
    capacity: '',
    address: '',
    manager_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchRetailers();
  }, []);

  const fetchRetailers = () => {
    axios.get('http://localhost:8089/api/production_lines')
      .then(response => {
        console.log('Fetched Production Line:', response.data);
        setRetailers(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRetailer(prevRetailer => ({
      ...prevRetailer,
      [name]: value,
    }));
  };

  const handleAddRetailer = () => {
    axios.post('http://localhost:8089/api/production_lines', newRetailer)
      .then(response => {
        console.log('Added Production Line:', response.data);
        fetchRetailers();
        setNewRetailer({
          line_id: '',
    capacity: '',
    address: '',
    manager_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteRetailer = (retailerId) => {
    axios.delete(`http://localhost:8089/api/production_line/${retailerId}`)
      .then(response => {
        console.log('Deleted Production Line:', response.data);
        fetchRetailers();
      })
      .catch(error => console.error(error));
  };

  const handleEditRetailer = (retailer) => {
    setEditRetailer(retailer);
    setIsEditModalOpen(true);
  };

  const handleUpdateRetailer = () => {
    axios.put(`http://localhost:8089/api/production_line/${editRetailer.line_id}`, editRetailer)
      .then(response => {
        console.log('Updated Production Line:', response.data);
        fetchRetailers();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Production Line Records</h1>
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/departments">Departments</a>
        <a href="/deptEmployee">Department Employee</a>
        <a href="/employee">Employee</a>
        <a href="/invoice">Invoice</a>
        <a href="/product">Product</a>
        <a href="/productionEmp">Production Employee</a>
        <a href="/productionLine">Production Line</a>
        <a href="/productLine">Product Line</a>
        <a href="/productMaterial">Product Material</a>
        <a href="/rawMaterial">Raw_Material</a>
        <a href="/supplySchedule">SupplySchedule</a>
        <a href="/vendor">Vendor</a>
        <a href="/warehouse">WareHouse</a>
        <a href="/warehouseEmp">Warehouse Employee</a>
        {/* Add other links as needed */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Line ID</th>
            <th>Capacity</th>
            <th>Address</th>
            <th>Manager ID</th>
          </tr>
        </thead>
        <tbody>
          {retailers && Array.isArray(retailers) ? (
            retailers.map(retailer => (
              <tr key={retailer.LineID}>
                <td>{retailer.LineID}</td>
                <td>{retailer.LineCapacity}</td>
                <td>{retailer.Address}</td>
                <td>{retailer.ManagerID}</td>
                <td>
                  <button onClick={() => handleEditRetailer(retailer)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteRetailer(retailer.line_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Add New Production Line</h2>
      <div>
        <label>Line ID:</label>
        <input
          type="text"
          name="line_id"
          value={newRetailer.line_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Capacity:</label>
        <input
          type="text"
          name="capacity"
          value={newRetailer.capacity}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={newRetailer.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Manager ID:</label>
        <input
          type="text"
          name="manager_id"
          value={newRetailer.manager_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddRetailer}>Add Production Line</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Production Line</h2>
          <div>
            <label>Line ID:</label>
            <input
              type="text"
              name="line_id"
              value={editRetailer.line_id}
              disabled
            />
          </div>
          <div>
            <label>Capacity:</label>
            <input
              type="text"
              name="capacity"
              value={editRetailer.capacity}
              onChange={(e) => setEditRetailer({ ...editRetailer, capacity: e.target.value })}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={editRetailer.address}
              onChange={(e) => setEditRetailer({ ...editRetailer, address: e.target.value })}
            />
          </div>
          <div>
            <label>Manager ID:</label>
            <input
              type="text"
              name="manager_id"
              value={editRetailer.manager_id}
              onChange={(e) => setEditRetailer({ ...editRetailer, manager_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateRetailer}>Update Production Line</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    </div>
  );
}

export default Retailer;
