import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Retailer() {
  const [retailers, setRetailers] = useState([]);
  const [newRetailer, setNewRetailer] = useState({
    retailer_id: '',
    retailer_name: '',
    retailer_address: '',
    retailer_phone_no: '',
  });
  const [editRetailer, setEditRetailer] = useState({
    retailer_id: '',
    retailer_name: '',
    retailer_address: '',
    retailer_phone_no: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchRetailers();
  }, []);

  const fetchRetailers = () => {
    axios.get('http://localhost:8089/api/retailers')
      .then(response => {
        console.log('Fetched Retailers:', response.data);
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
    axios.post('http://localhost:8089/api/retailers', newRetailer)
      .then(response => {
        console.log('Added Retailer:', response.data);
        fetchRetailers();
        setNewRetailer({
          retailer_id: '',
          retailer_name: '',
          retailer_address: '',
          retailer_phone_no: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteRetailer = (retailerId) => {
    axios.delete(`http://localhost:8089/api/retailers/${retailerId}`)
      .then(response => {
        console.log('Deleted Retailer:', response.data);
        fetchRetailers();
      })
      .catch(error => console.error(error));
  };

  const handleEditRetailer = (retailer) => {
    setEditRetailer(retailer);
    setIsEditModalOpen(true);
  };

  const handleUpdateRetailer = () => {
    axios.put(`http://localhost:8089/api/retailers/${editRetailer.retailer_id}`, editRetailer)
      .then(response => {
        console.log('Updated Retailer:', response.data);
        fetchRetailers();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Retailer Records</h1>
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
            <th>Address</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {retailers && Array.isArray(retailers) ? (
            retailers.map(retailer => (
              <tr key={retailer.retailer_id}>
                <td>{retailer.retailer_id}</td>
                <td>{retailer.retailer_name}</td>
                <td>{retailer.retailer_address}</td>
                <td>{retailer.retailer_phone_no}</td>
                <td>
                  <button onClick={() => handleEditRetailer(retailer)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteRetailer(retailer.retailer_id)}>
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

      <h2>Add New Retailer</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="retailer_id"
          value={newRetailer.retailer_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="retailer_name"
          value={newRetailer.retailer_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="retailer_address"
          value={newRetailer.retailer_address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone No:</label>
        <input
          type="text"
          name="retailer_phone_no"
          value={newRetailer.retailer_phone_no}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddRetailer}>Add Retailer</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Retailer</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="retailer_id"
              value={editRetailer.retailer_id}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="retailer_name"
              value={editRetailer.retailer_name}
              onChange={(e) => setEditRetailer({ ...editRetailer, retailer_name: e.target.value })}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="retailer_address"
              value={editRetailer.retailer_address}
              onChange={(e) => setEditRetailer({ ...editRetailer, retailer_address: e.target.value })}
            />
          </div>
          <div>
            <label>Phone No:</label>
            <input
              type="text"
              name="retailer_phone_no"
              value={editRetailer.retailer_phone_no}
              onChange={(e) => setEditRetailer({ ...editRetailer, retailer_phone_no: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateRetailer}>Update Retailer</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Retailer;
