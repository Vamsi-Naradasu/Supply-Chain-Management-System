import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ReturnRequest() {
  const [returnRequests, setReturnRequests] = useState([]);
  const [newReturnRequest, setNewReturnRequest] = useState({
    return_request_id: '',
    return_req_date: '',
    return_req_reason: '',
    order_item_id: '',
  });
  const [editReturnRequest, setEditReturnRequest] = useState({
    return_request_id: '',
    return_req_date: '',
    return_req_reason: '',
    order_item_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchReturnRequests();
  }, []);

  const fetchReturnRequests = () => {
    axios.get('http://localhost:8089/api/return_requests')
      .then(response => {
        console.log('Fetched Return Requests:', response.data);
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
    axios.post('http://localhost:8089/api/return_requests', newReturnRequest)
      .then(response => {
        console.log('Added Return Request:', response.data);
        fetchReturnRequests();
        setNewReturnRequest({
          return_request_id: '',
          return_req_date: '',
          return_req_reason: '',
          order_item_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteReturnRequest = (returnRequestId) => {
    axios.delete(`http://localhost:8089/api/return_requests/${returnRequestId}`)
      .then(response => {
        console.log('Deleted Return Request:', response.data);
        fetchReturnRequests();
      })
      .catch(error => console.error(error));
  };

  const handleEditReturnRequest = (returnRequest) => {
    setEditReturnRequest(returnRequest);
    setIsEditModalOpen(true);
  };

  const handleUpdateReturnRequest = () => {
    axios.put(`http://localhost:8089/api/return_requests/${editReturnRequest.return_request_id}`, editReturnRequest)
      .then(response => {
        console.log('Updated Return Request:', response.data);
        fetchReturnRequests();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Return Request Records</h1>
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
            <th>Date</th>
            <th>Reason</th>
            <th>Order Item ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {returnRequests && Array.isArray(returnRequests) ? (
            returnRequests.map(returnRequest => (
              <tr key={returnRequest.return_request_id}>
                <td>{returnRequest.return_request_id}</td>
                <td>{returnRequest.return_req_date}</td>
                <td>{returnRequest.return_req_reason}</td>
                <td>{returnRequest.order_item_id}</td>
                <td>
                  <button onClick={() => handleEditReturnRequest(returnRequest)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteReturnRequest(returnRequest.return_request_id)}>
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

      <h2>Add New Return Request</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="return_request_id"
          value={newReturnRequest.return_request_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="return_req_date"
          value={newReturnRequest.return_req_date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Reason:</label>
        <input
          type="text"
          name="return_req_reason"
          value={newReturnRequest.return_req_reason}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Order Item ID:</label>
        <input
          type="text"
          name="order_item_id"
          value={newReturnRequest.order_item_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddReturnRequest}>Add Return Request</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Return Request</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="return_request_id"
              value={editReturnRequest.return_request_id}
              disabled
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="return_req_date"
              value={editReturnRequest.return_req_date}
              onChange={(e) => setEditReturnRequest({ ...editReturnRequest, return_req_date: e.target.value })}
            />
          </div>
          <div>
            <label>Reason:</label>
            <input
              type="text"
              name="return_req_reason"
              value={editReturnRequest.return_req_reason}
              onChange={(e) => setEditReturnRequest({ ...editReturnRequest, return_req_reason: e.target.value })}
            />
          </div>
          <div>
            <label>Order Item ID:</label>
            <input
              type="text"
              name="order_item_id"
              value={editReturnRequest.order_item_id}
              onChange={(e) => setEditReturnRequest({ ...editReturnRequest, order_item_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateReturnRequest}>Update Return Request</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default ReturnRequest;
