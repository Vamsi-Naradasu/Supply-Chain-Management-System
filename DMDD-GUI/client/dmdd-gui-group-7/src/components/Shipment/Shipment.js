import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Shipment() {
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({
    shipment_id: '',
    shipment_date: '',
    shipment_status: '',
    tracking_number: '',
    price_of_shipment: '',
    shipment_address_id: '',
    order_id: '',
  });
  const [editShipment, setEditShipment] = useState({
    shipment_id: '',
    shipment_date: '',
    shipment_status: '',
    tracking_number: '',
    price_of_shipment: '',
    shipment_address_id: '',
    order_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchShipments();
  }, []);

  const fetchShipments = () => {
    axios.get('http://localhost:8089/api/shipments')
      .then(response => {
        console.log('Fetched Shipments:', response.data);
        setShipments(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShipment(prevShipment => ({
      ...prevShipment,
      [name]: value,
    }));
  };

  const handleAddShipment = () => {
    axios.post('http://localhost:8089/api/shipments', newShipment)
      .then(response => {
        console.log('Added Shipment:', response.data);
        fetchShipments();
        setNewShipment({
          shipment_id: '',
          shipment_date: '',
          shipment_status: '',
          tracking_number: '',
          price_of_shipment: '',
          shipment_address_id: '',
          order_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteShipment = (shipmentId) => {
    axios.delete(`http://localhost:8089/api/shipments/${shipmentId}`)
      .then(response => {
        console.log('Deleted Shipment:', response.data);
        fetchShipments();
      })
      .catch(error => console.error(error));
  };

  const handleEditShipment = (shipment) => {
    setEditShipment(shipment);
    setIsEditModalOpen(true);
  };

  const handleUpdateShipment = () => {
    axios.put(`http://localhost:8089/api/shipments/${editShipment.shipment_id}`, editShipment)
      .then(response => {
        console.log('Updated Shipment:', response.data);
        fetchShipments();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Shipment Records</h1>
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
            <th>Status</th>
            <th>Tracking Number</th>
            <th>Price</th>
            <th>Address ID</th>
            <th>Order ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments && Array.isArray(shipments) ? (
            shipments.map(shipment => (
              <tr key={shipment.shipment_id}>
                <td>{shipment.shipment_id}</td>
                <td>{shipment.shipment_date}</td>
                <td>{shipment.shipment_status}</td>
                <td>{shipment.tracking_number}</td>
                <td>{shipment.price_of_shipment}</td>
                <td>{shipment.shipment_address_id}</td>
                <td>{shipment.order_id}</td>
                <td>
                  <button onClick={() => handleEditShipment(shipment)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteShipment(shipment.shipment_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Add New Shipment</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="shipment_id"
          value={newShipment.shipment_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="shipment_date"
          value={newShipment.shipment_date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="shipment_status"
          value={newShipment.shipment_status}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Tracking Number:</label>
        <input
          type="text"
          name="tracking_number"
          value={newShipment.tracking_number}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price_of_shipment"
          value={newShipment.price_of_shipment}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address ID:</label>
        <input
          type="text"
          name="shipment_address_id"
          value={newShipment.shipment_address_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Order ID:</label>
        <input
          type="text"
          name="order_id"
          value={newShipment.order_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddShipment}>Add Shipment</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Shipment</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="shipment_id"
              value={editShipment.shipment_id}
              disabled
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="shipment_date"
              value={editShipment.shipment_date}
              onChange={(e) => setEditShipment({ ...editShipment, shipment_date: e.target.value })}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="shipment_status"
              value={editShipment.shipment_status}
              onChange={(e) => setEditShipment({ ...editShipment, shipment_status: e.target.value })}
            />
          </div>
          <div>
            <label>Tracking Number:</label>
            <input
              type="text"
              name="tracking_number"
              value={editShipment.tracking_number}
              onChange={(e) => setEditShipment({ ...editShipment, tracking_number: e.target.value })}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price_of_shipment"
              value={editShipment.price_of_shipment}
              onChange={(e) => setEditShipment({ ...editShipment, price_of_shipment: e.target.value })}
            />
          </div>
          <div>
            <label>Address ID:</label>
            <input
              type="text"
              name="shipment_address_id"
              value={editShipment.shipment_address_id}
              onChange={(e) => setEditShipment({ ...editShipment, shipment_address_id: e.target.value })}
            />
          </div>
          <div>
            <label>Order ID:</label>
            <input
              type="text"
              name="order_id"
              value={editShipment.order_id}
              onChange={(e) => setEditShipment({ ...editShipment, order_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateShipment}>Update Shipment</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Shipment;
