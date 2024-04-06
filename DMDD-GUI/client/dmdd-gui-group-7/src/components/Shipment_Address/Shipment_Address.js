import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ShipmentAddress() {
  const [shipmentAddresses, setShipmentAddresses] = useState([]);
  const [newShipmentAddress, setNewShipmentAddress] = useState({
    shipment_address_id: '',
    recepient_name: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    customer_id: '',
  });
  const [editShipmentAddress, setEditShipmentAddress] = useState({
    shipment_address_id: '',
    recepient_name: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    customer_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchShipmentAddresses();
  }, []);

  const fetchShipmentAddresses = () => {
    axios.get('http://localhost:8089/api/shipment_addresses')
      .then(response => {
        console.log('Fetched Shipment Addresses:', response.data);
        setShipmentAddresses(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShipmentAddress(prevShipmentAddress => ({
      ...prevShipmentAddress,
      [name]: value,
    }));
  };

  const handleAddShipmentAddress = () => {
    axios.post('http://localhost:8089/api/shipment_addresses', newShipmentAddress)
      .then(response => {
        console.log('Added Shipment Address:', response.data);
        fetchShipmentAddresses();
        setNewShipmentAddress({
          shipment_address_id: '',
          recepient_name: '',
          street: '',
          city: '',
          state: '',
          postal_code: '',
          customer_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteShipmentAddress = (shipmentAddressId) => {
    axios.delete(`http://localhost:8089/api/shipment_addresses/${shipmentAddressId}`)
      .then(response => {
        console.log('Deleted Shipment Address:', response.data);
        fetchShipmentAddresses();
      })
      .catch(error => console.error(error));
  };

  const handleEditShipmentAddress = (shipmentAddress) => {
    setEditShipmentAddress(shipmentAddress);
    setIsEditModalOpen(true);
  };

  const handleUpdateShipmentAddress = () => {
    axios.put(`http://localhost:8089/api/shipment_addresses/${editShipmentAddress.shipment_address_id}`, editShipmentAddress)
      .then(response => {
        console.log('Updated Shipment Address:', response.data);
        fetchShipmentAddresses();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Shipment Address Records</h1>
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
            <th>Recipient Name</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Postal Code</th>
            <th>Customer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipmentAddresses && Array.isArray(shipmentAddresses) ? (
            shipmentAddresses.map(shipmentAddress => (
              <tr key={shipmentAddress.shipment_address_id}>
                <td>{shipmentAddress.shipment_address_id}</td>
                <td>{shipmentAddress.recepient_name}</td>
                <td>{shipmentAddress.street}</td>
                <td>{shipmentAddress.city}</td>
                <td>{shipmentAddress.state}</td>
                <td>{shipmentAddress.postal_code}</td>
                <td>{shipmentAddress.customer_id}</td>
                <td>
                  <button onClick={() => handleEditShipmentAddress(shipmentAddress)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteShipmentAddress(shipmentAddress.shipment_address_id)}>
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

      <h2>Add New Shipment Address</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="shipment_address_id"
          value={newShipmentAddress.shipment_address_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Recipient Name:</label>
        <input
          type="text"
          name="recepient_name"
          value={newShipmentAddress.recepient_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={newShipmentAddress.street}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={newShipmentAddress.city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={newShipmentAddress.state}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postal_code"
          value={newShipmentAddress.postal_code}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          name="customer_id"
          value={newShipmentAddress.customer_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddShipmentAddress}>Add Shipment Address</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Shipment Address</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="shipment_address_id"
              value={editShipmentAddress.shipment_address_id}
              disabled
            />
          </div>
          <div>
            <label>Recipient Name:</label>
            <input
              type="text"
              name="recepient_name"
              value={editShipmentAddress.recepient_name}
              onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, recepient_name: e.target.value })}
            />
          </div>
          <div>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={editShipmentAddress.street}
              onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, street: e.target.value })}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={editShipmentAddress.city}
              onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, city: e.target.value })}
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={editShipmentAddress.state}
              onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, state: e.target.value })}
            />
          </div>
          <div>
            <label>Postal Code:</label>
            <input
              type="text"
              name="postal_code"
              value={editShipmentAddress.postal_code}
              onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, postal_code: e.target.value })}
            />
          </div>
          <div>
            <label>Customer ID:</label>
            <input
              type="text"
              name="customer_id"
              value={editShipmentAddress.customer_id}
              onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, customer_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateShipmentAddress}>Update Shipment Address</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default ShipmentAddress;
