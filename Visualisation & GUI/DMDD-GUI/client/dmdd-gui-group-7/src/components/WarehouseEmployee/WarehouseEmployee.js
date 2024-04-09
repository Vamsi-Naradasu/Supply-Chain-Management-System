import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ReturnRequest() {
  const [returnRequests, setReturnRequests] = useState([]);
  const [newReturnRequest, setNewReturnRequest] = useState({
    EmployeeID: '',
    WarehouseID: '',
  });
  const [editReturnRequest, setEditReturnRequest] = useState({
    EmployeeID:'',
    WarehouseID:'',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchReturnRequests();
  }, []);

  const fetchReturnRequests = () => {
    axios.get('http://localhost:8089/api/warehouse_employees')
      .then(response => {
        console.log('Fetched Warehouse Employee:', response.data);
        setReturnRequests(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReturnRequest(prevReturnRequest => ({
      ...prevReturnRequest,
      [name]: value,
    }));
  };

  const handleAddReturnRequest = () => {
    axios.post('http://localhost:8089/api/warehouse_employees', newReturnRequest)
      .then(response => {
        console.log('Added Warehouse Employee:', response.data);
        fetchReturnRequests();
        setNewReturnRequest({
          EmployeeID:'',
          WarehouseID:'',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteReturnRequest = (returnRequestId) => {
    axios.delete(`http://localhost:8089/api/warehouse_employees/${returnRequestId}`)
      .then(response => {
        console.log('Deleted Warehouse Employee:', response.data);
        fetchReturnRequests();
      })
      .catch(error => console.error(error));
  };

  const handleEditReturnRequest = (returnRequest) => {
    setEditReturnRequest(returnRequest);
    setIsEditModalOpen(true);
  };

  const handleUpdateReturnRequest = () => {
    axios.put(`http://localhost:8089/api/warehouse_employees/${editReturnRequest.EmployeeID}`, editReturnRequest)
      .then(response => {
        console.log('Updated Warehouse Employee:', response.data);
        fetchReturnRequests();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Warehouse Employee Records</h1>
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
            <th>Product ID</th>
            <th>Line ID</th>
          </tr>
        </thead>
        <tbody>
          {returnRequests && Array.isArray(returnRequests) ? (
            returnRequests.map(returnRequest => (
              <tr key={returnRequest.EmployeeID}>
                <td>{returnRequest.EmployeeID}</td>
                <td>{returnRequest.WarehouseID}</td>
                <td>
                  <button onClick={() => handleEditReturnRequest(returnRequest)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteReturnRequest(returnRequest.EmployeeID)}>
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

      <h2>Add New Warehouse Employee</h2>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="EmployeeID"
          value={newReturnRequest.EmployeeID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Warehouse ID:</label>
        <input
          type="text"
          name="WarehouseID"
          value={newReturnRequest.WarehouseID}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddReturnRequest}>Add Warehouse Employee</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Warehouse Employee</h2>
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              name="EmployeeID"
              value={editReturnRequest.EmployeeID}
              disabled
            />
          </div>
          <div>
            <label>Warehouse ID:</label>
            <input
              type="text"
              name="WarehouseID"
              value={editReturnRequest.WarehouseID}
              onChange={(e) => setEditReturnRequest({ ...editReturnRequest, WarehouseID: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateReturnRequest}>Update Warehouse Employee</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default ReturnRequest;

