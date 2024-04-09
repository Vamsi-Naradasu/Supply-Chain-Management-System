import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Inquiry() {
  const [emps, setEmps] = useState([]);
  const [newEmp, setNewEmp] = useState({
    EmployeeID: '',
    FirstName: '',
    LastName: '',
    Position: '',
    Salary: '',
  });
  const [editEmp, setEditEmp] = useState({
    EmployeeID: '',
    FirstName: '',
    LastName: '',
    Position: '',
    Salary: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchEmps();
  }, []);

  const fetchEmps = () => {
    axios.get('http://localhost:8089/api/employees')
      .then(response => {
        console.log('Fetched Employees:', response.data);
        setEmps(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmp(prevEmp => ({
      ...prevEmp,
      [name]: value,
    }));
  };

  const handleAddEmp = () => {
    axios.post('http://localhost:8089/api/employees', newEmp)
      .then(response => {
        console.log('Added Employee:', response.data);
        fetchEmps();
        setNewEmp({
          EmployeeID: '',
          FirstName: '',
          LastName: '',
          Position: '',
          Salary: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteEmp = (empId) => {
    axios.delete(`http://localhost:8089/api/employees/${empId}`)
      .then(response => {
        console.log('Deleted Employee:', response.data);
        fetchEmps();
      })
      .catch(error => console.error(error));
  };

  const handleEditEmp = (emp) => {
    setEditEmp(emp);
    setIsEditModalOpen(true);
  };

  const handleUpdateEmp = () => {
    axios.put(`http://localhost:8089/api/employees/${editEmp.EmployeeID}`, editEmp)
      .then(response => {
        console.log('Updated Employee:', response.data);
        fetchEmps();
        setIsEditModalOpen(false);
      })
      // .catch(error => console.error(error));
      .catch(console.log(editEmp));
  };

  return (
    <div className="container">
      <h1 style={{color:'black'}}>Employee Records</h1>
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
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {emps && Array.isArray(emps) ? (
            emps.map(emp => (
              <tr key={emp.EmployeeID}>
                <td>{emp.EmployeeID}</td>
                <td>{emp.FirstName}</td>
                <td>{emp.LastName}</td>
                <td>{emp.Position}</td>
                <td>{emp.Salary}</td>
                <td>
                  <button onClick={() => handleEditEmp(emp)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteEmp(emp.EmployeeID)}>
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

      <h2>Add New Employee</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="EmployeeID"
          value={newEmp.EmployeeID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="FirstName"
          value={newEmp.FirstName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="LastName"
          value={newEmp.LastName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          name="Position"
          value={newEmp.Position}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Salary:</label>
        <input
          type="text"
          name="Salary"
          value={newEmp.Salary}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddEmp}>Add Employee</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Employee</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="EmployeeID"
              value={editEmp.EmployeeID}
              disabled
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="FirstName"
              value={editEmp.FirstName}
              onChange={(e) => setEditEmp({ ...editEmp, FirstName: e.target.value })}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="LastName"
              value={editEmp.LastName}
              onChange={(e) => setEditEmp({ ...editEmp, LastName: e.target.value })}
            />
          </div>
          <div>
            <label>Position:</label>
            <input
              type="text"
              name="Position"
              value={editEmp.Position}
              onChange={(e) => setEditEmp({ ...editEmp, Position: e.target.value })}
            />
          </div>
          <div>
            <label>Salary:</label>
            <input
              type="text"
              name="Salary"
              value={editEmp.Salary}
              onChange={(e) => setEditEmp({ ...editEmp, Salary: e.target.value })}
            />
          </div>
          <button className="blue-button" onClick={handleUpdateEmp}>Update Employee</button>
          <button className="amber-button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}

      <br></br>
      <br></br>
    </div>
  );
}

export default Inquiry;
