import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ShipmentAddress() {
  const [shipmentAddresses, setShipmentAddresses] = useState([]);
  const [newShipmentAddress, setNewShipmentAddress] = useState({
    // shipment_address_id: '',
    // recepient_name: '',
    // street: '',
    // city: '',
    // state: '',
    // postal_code: '',
    // customer_id: '',
    supply_id: '',
    material_id: '',
    vendor_id: '',
    warehouse_id: '',
    quantity: '',
    date: '',
  });
  const [editShipmentAddress, setEditShipmentAddress] = useState({
    supply_id: '',
    material_id: '',
    vendor_id: '',
    warehouse_id: '',
    quantity: '',
    date: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchShipmentAddresses();
  }, []);

  const fetchShipmentAddresses = () => {
    axios.get('http://localhost:8089/api/supply_schedules')
      .then(response => {
        console.log('Fetched Supply Schedule:', response.data);
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
    axios.post('http://localhost:8089/api/supply_schedules', newShipmentAddress)
      .then(response => {
        console.log('Added Supply Schedule:', response.data);
        fetchShipmentAddresses();
        setNewShipmentAddress({
          supply_id: '',
    material_id: '',
    vendor_id: '',
    warehouse_id: '',
    quantity: '',
    date: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteShipmentAddress = (shipmentAddressId) => {
    axios.delete(`http://localhost:8089/api/supply_schedules/${shipmentAddressId}`)
      .then(response => {
        console.log('Deleted Supply Schedule:', response.data);
        fetchShipmentAddresses();
      })
      .catch(error => console.error(error));
  };

  const handleEditShipmentAddress = (shipmentAddress) => {
    setEditShipmentAddress(shipmentAddress);
    setIsEditModalOpen(true);
  };

  const handleUpdateShipmentAddress = () => {
    axios.put(`http://localhost:8089/api/supply_schedules/${editShipmentAddress.supply_id}`, editShipmentAddress)
      .then(response => {
        console.log('Updated Supply Schedule:', response.data);
        fetchShipmentAddresses();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Supply Schedule Records</h1>
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
            <th>Supply ID</th>
            <th>Material ID</th>
            <th>WareHouse ID</th>
            <th>Vendor ID</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {shipmentAddresses && Array.isArray(shipmentAddresses) ? (
            shipmentAddresses.map(shipmentAddress => (
              <tr key={shipmentAddress.SupplyID}>
                <td>{shipmentAddress.SupplyID}</td>
                <td>{shipmentAddress.MaterialID}</td>
                <td>{shipmentAddress.VendorID}</td>
                <td>{shipmentAddress.WarehouseID}</td>
                <td>{shipmentAddress.Quantity}</td>
                <td>{shipmentAddress.DateTime}</td>
                <td>
                  <button onClick={() => handleEditShipmentAddress(shipmentAddress)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteShipmentAddress(shipmentAddress.supply_id)}>
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

      <h2>Add New Supply Schedule</h2>
      <div>
        <label>Supply ID:</label>
        <input
          type="text"
          name="supply_id"
          value={newShipmentAddress.supply_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Material ID:</label>
        <input
          type="text"
          name="material_id"
          value={newShipmentAddress.material_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Vendor ID:</label>
        <input
          type="text"
          name="vendor_id"
          value={newShipmentAddress.vendor_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>WareHouse ID:</label>
        <input
          type="text"
          name="warehouse_id"
          value={newShipmentAddress.warehouse_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={newShipmentAddress.quantity}
          onChange={handleInputChange}
        />
      </div>
       
      <button onClick={handleAddShipmentAddress}>Add Supply Schedule</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Supply Schedule</h2>
          <div>
            <label>Supply ID:</label>
            <input
              type="text"
              name="supply_id"
              value={editShipmentAddress.supply_id}
              disabled
            />
          </div>
          <div>
            <label>Material ID:</label>
            <input
              type="text"
              name="material_id"
              value={editShipmentAddress.material_id}
              // onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, recepient_name: e.target.value })}
              disabled
            />
          </div>
          <div>
            <label>Vendor ID:</label>
            <input
              type="text"
              name="vendor_id"
              value={editShipmentAddress.vendor_id}
              // onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, recepient_name: e.target.value })}
              disabled
            />
          </div>
          <div>
            <label>Material ID:</label>
            <input
              type="text"
              name="warehouse_id"
              value={editShipmentAddress.warehouse_id}
              // onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, recepient_name: e.target.value })}
              disabled
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="text"
              name="quantity"
              value={editShipmentAddress.quantity}
              onChange={(e) => setEditShipmentAddress({ ...editShipmentAddress, quantity: e.target.value })}
            />
          </div>
          
          <button onClick={handleUpdateShipmentAddress}>Update Supply Schedule</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    </div>
  );
}

export default ShipmentAddress;
