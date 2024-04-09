import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Products() {
  const [depts, setDepts] = useState([]);
  const [newDept, setNewDepts] = useState({
    DepartmentID: '',
    DepartmentName: '',
    PhoneNumber: '',
    Location: '',
  });
  const [editDept, setEditDept] = useState({
    DepartmentID: '',
    DepartmentName: '',
    PhoneNumber: '',
    Location: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  {/* Overlay for modal */ }
  {
    isEditModalOpen && (
      <div className="overlay" onClick={() => setIsEditModalOpen(false)}></div>
    )
  }


  useEffect(() => {
    // Fetch data from the Node.js server
    fetchDepts();
  }, []);

  const fetchDepts = () => {
    axios.get('http://localhost:8089/api/departments')
      .then(response => {
        console.log('Fetched Departments:', response.data);
        setDepts(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepts(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddDept = () => {
    axios.post('http://localhost:8089/api/departments', newDept)
      .then(response => {
        console.log('Added Product:', response.data);
        fetchDepts();
        setNewDepts({
          DepartmentID: '',
          DepartmentName: '',
          PhoneNumber: '',
          Location: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteDept = (deptId) => {
    axios.delete(`http://localhost:8089/api/departments/${deptId}`)
      .then(response => {
        console.log('Deleted Department:', response.data);
        fetchDepts();
      })
      .catch(error => console.error(error));
  };

  const handleEditDept = (dept) => {
    setEditDept(dept);
    setIsEditModalOpen(true);
  };

  const handleUpdateDept = () => {
    axios.put(`http://localhost:8089/api/departments/${editDept.DepartmentID}`, editDept)
      .then(response => {
        console.log('Updated Department:', response.data);
        fetchDepts();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1 style={{color:'black'}}>Department Records</h1>
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
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {depts && Array.isArray(depts) ? (
            depts.map(dept => (
              <tr key={dept.DepartmentID}>
                <td>{dept.DepartmentID}</td>
                <td>{dept.DepartmentName}</td>
                <td>{dept.PhoneNumber}</td>
                <td>{dept.Location}</td>
                <td>
                  <button onClick={() => handleEditDept(dept)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteDept(dept.DepartmentID)}>
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

      <h2>Add New Department</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="DepartmentID"
          value={newDept.DepartmentID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="DepartmentName"
          value={newDept.DepartmentName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="PhoneNumber"
          value={newDept.PhoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="Location"
          value={newDept.Location}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleAddDept}>Add Department</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Department</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="DepartmentID"
              value={editDept.DepartmentID}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="DepartmentName"
              value={editDept.DepartmentName}
              onChange={(e) => setEditDept({ ...editDept, DepartmentName: e.target.value })}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="PhoneNumber"
              value={editDept.PhoneNumber}
              onChange={(e) => setEditDept({ ...editDept, PhoneNumber: e.target.value })}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="Location"
              value={editDept.Location}
              onChange={(e) => setEditDept({ ...editDept, Location: e.target.value })}
            />
          </div>

          <button className="blue-button" onClick={handleUpdateDept}>Update Department</button>
          <button className="amber-button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default Products;