import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Inquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [newInquiry, setNewInquiry] = useState({
    inquiry_id: '',
    inquiry_reason: '',
    inquiry_date: '',
    inquiry_status: '',
    customer_id: '',
  });
  const [editInquiry, setEditInquiry] = useState({
    inquiry_id: '',
    inquiry_reason: '',
    inquiry_date: '',
    inquiry_status: '',
    customer_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchInquiries();
  }, []);

  const fetchInquiries = () => {
    axios.get('http://localhost:8089/api/inquiries')
      .then(response => {
        console.log('Fetched Inquiries:', response.data);
        setInquiries(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInquiry(prevInquiry => ({
      ...prevInquiry,
      [name]: value,
    }));
  };

  const handleAddInquiry = () => {
    axios.post('http://localhost:8089/api/inquiries', newInquiry)
      .then(response => {
        console.log('Added Inquiry:', response.data);
        fetchInquiries();
        setNewInquiry({
          inquiry_id: '',
          inquiry_reason: '',
          inquiry_date: '',
          inquiry_status: '',
          customer_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteInquiry = (inquiryId) => {
    axios.delete(`http://localhost:8089/api/inquiries/${inquiryId}`)
      .then(response => {
        console.log('Deleted Inquiry:', response.data);
        fetchInquiries();
      })
      .catch(error => console.error(error));
  };

  const handleEditInquiry = (inquiry) => {
    setEditInquiry(inquiry);
    setIsEditModalOpen(true);
  };

  const handleUpdateInquiry = () => {
    axios.put(`http://localhost:8089/api/inquiries/${editInquiry.inquiry_id}`, editInquiry)
      .then(response => {
        console.log('Updated Inquiry:', response.data);
        fetchInquiries();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Inquiry Records</h1>
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
            <th>Reason</th>
            <th>Date</th>
            <th>Status</th>
            <th>Customer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries && Array.isArray(inquiries) ? (
            inquiries.map(inquiry => (
              <tr key={inquiry.inquiry_id}>
                <td>{inquiry.inquiry_id}</td>
                <td>{inquiry.inquiry_reason}</td>
                <td>{inquiry.inquiry_date}</td>
                <td>{inquiry.inquiry_status}</td>
                <td>{inquiry.customer_id}</td>
                <td>
                  <button onClick={() => handleEditInquiry(inquiry)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteInquiry(inquiry.inquiry_id)}>
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

      <h2>Add New Inquiry</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="inquiry_id"
          value={newInquiry.inquiry_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Reason:</label>
        <input
          type="text"
          name="inquiry_reason"
          value={newInquiry.inquiry_reason}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="text"
          name="inquiry_date"
          value={newInquiry.inquiry_date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="inquiry_status"
          value={newInquiry.inquiry_status}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          name="customer_id"
          value={newInquiry.customer_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddInquiry}>Add Inquiry</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Inquiry</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="inquiry_id"
              value={editInquiry.inquiry_id}
              disabled
            />
          </div>
          <div>
            <label>Reason:</label>
            <input
              type="text"
              name="inquiry_reason"
              value={editInquiry.inquiry_reason}
              onChange={(e) => setEditInquiry({ ...editInquiry, inquiry_reason: e.target.value })}
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="text"
              name="inquiry_date"
              value={editInquiry.inquiry_date}
              onChange={(e) => setEditInquiry({ ...editInquiry, inquiry_date: e.target.value })}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="inquiry_status"
              value={editInquiry.inquiry_status}
              onChange={(e) => setEditInquiry({ ...editInquiry, inquiry_status: e.target.value })}
            />
          </div>
          <div>
            <label>Customer ID:</label>
            <input
              type="text"
              name="customer_id"
              value={editInquiry.customer_id}
              onChange={(e) => setEditInquiry({ ...editInquiry, customer_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateInquiry}>Update Inquiry</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}

<br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Inquiry;
