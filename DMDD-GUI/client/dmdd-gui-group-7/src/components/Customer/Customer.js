import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    customer_id: '',
    customer_name: '',
    customer_phone: '',
    customer_email: '',
  });
  const [editCustomer, setEditCustomer] = useState({
    customer_id: '',
    customer_name: '',
    customer_phone: '',
    customer_email: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get('http://localhost:8089/api/customers')
      .then(response => {
        console.log('Fetched Customers:', response.data);
        // Access the nested array within the data property
        setCustomers(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleAddCustomer = () => {
    axios.post('http://localhost:8089/api/customers', newCustomer)
      .then(response => {
        console.log('Added Customer:', response.data);
        // Fetch updated list of customers
        fetchCustomers();
        // Clear the input fields
        setNewCustomer({
          customer_id: '',
          customer_name: '',
          customer_phone: '',
          customer_email: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteCustomer = (customerId) => {
    axios.delete(`http://localhost:8089/api/customers/${customerId}`)
      .then(response => {
        console.log('Deleted Customer:', response.data);
        // Fetch updated list of customers
        fetchCustomers();
      })
      .catch(error => console.error(error));
  };

  const handleEditCustomer = (customer) => {
    setEditCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleUpdateCustomer = () => {
    axios.put(`http://localhost:8089/api/customers/${editCustomer.customer_id}`, editCustomer)
      .then(response => {
        console.log('Updated Customer:', response.data);
        // Fetch updated list of customers
        fetchCustomers();
        // Close the edit modal
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Customer Records</h1>
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
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers && Array.isArray(customers) ? (
            customers.map(customer => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.customer_phone}</td>
                <td>{customer.customer_email}</td>
                <td>
                  <button onClick={() => handleEditCustomer(customer)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCustomer(customer.customer_id)}>
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

      <h2>Add New Customer</h2>
      <div>
        <label>ID:</label>
        <input
          type="ID"
          name="customer_id"
          value={newCustomer.customer_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="customer_name"
          value={newCustomer.customer_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="customer_phone"
          value={newCustomer.customer_phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="customer_email"
          value={newCustomer.customer_email}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddCustomer}>Add Customer</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Customer</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="customer_id"
              value={editCustomer.customer_id}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="customer_name"
              value={editCustomer.customer_name}
              onChange={(e) => setEditCustomer({ ...editCustomer, customer_name: e.target.value })}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="customer_phone"
              value={editCustomer.customer_phone}
              onChange={(e) => setEditCustomer({ ...editCustomer, customer_phone: e.target.value })}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="customer_email"
              value={editCustomer.customer_email}
              onChange={(e) => setEditCustomer({ ...editCustomer, customer_email: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateCustomer}>Update Customer</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
    <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Customer;
