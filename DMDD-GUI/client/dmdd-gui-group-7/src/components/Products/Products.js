import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Products() {
  const [depts, setDepts] = useState([]);
  const [newDept, setNewDepts] = useState({
    dept_id: '',
    dept_name: '',
    phoneNo: '',
    Location: '',
  });
  const [editDept, setEditDept] = useState({
    dept_id: '',
    dept_name: '',
    phoneNo: '',
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
    axios.get('http://localhost:8089/api/products')
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
    axios.post('http://localhost:8089/api/products', newDept)
      .then(response => {
        console.log('Added Product:', response.data);
        fetchDepts();
        setNewDepts({
          dept_id: '',
          dept_name: '',
          phoneNo: '',
          Location: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteDept = (deptId) => {
    axios.delete(`http://localhost:8089/api/products/${deptId}`)
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
    axios.put(`http://localhost:8089/api/products/${editDept.dept_id}`, editDept)
      .then(response => {
        console.log('Updated Department:', response.data);
        fetchDepts();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Department Records</h1>
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/customers">Customers</a>
        <a href="/inquiry">Inquiries</a>
        <a href="/order">Order</a>
        <a href="/order_Item">Order Item</a>
        <a href="/product_catalog">Product Catalog</a>
        <a href="/retailer">Retailer</a>
        <a href="/return_request">Return Request</a>
        <a href="/review">Review</a>
        <a href="/shipment">Shipment</a>
        <a href="/shipment_address">Shipment Address</a>
        <a href="/stock">Stock</a>
        <a href="/stock">Stock</a>
        <a href="/stock">Stock</a>
        <a href="/inquiry">Inquiries</a>
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
              <tr key={dept.dept_id}>
                <td>{dept.dept_id}</td>
                <td>{dept.dept_name}</td>
                <td>{dept.phoneNo}</td>
                <td>{dept.Location}</td>
                <td>
                  <button onClick={() => handleEditDept(dept)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteDept(dept.dept_id)}>
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
          name="dept_id"
          value={newDept.dept_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="dept_Name"
          value={newDept.dept_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNo"
          value={newDept.phoneNo}
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
              name="dept_id"
              value={editDept.dept_id}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="dept_name"
              value={editDept.dept_name}
              onChange={(e) => setEditDept({ ...editDept, dept_name: e.target.value })}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="phoneNo"
              value={editDept.phoneNo}
              onChange={(e) => setEditDept({ ...editDept, phoneNo: e.target.value })}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="Locatioin"
              value={editDept.Location}
              onChange={(e) => setEditDept({ ...editDept, Location: e.target.value })}
            />
          </div>

          <button onClick={handleUpdateDept}>Update Department</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
      <br></br>
      <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Products;
