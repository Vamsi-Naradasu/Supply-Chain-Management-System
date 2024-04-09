import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Shipment() {
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({
    // shipment_id: '',
    // shipment_date: '',
    // shipment_status: '',
    // tracking_number: '',
    // price_of_shipment: '',
    // shipment_address_id: '',
    // order_id: '',
    material_id: '',
    warehouse_id: '',
    rawmaterial_name: '',
  });
  const [editShipment, setEditShipment] = useState({
    material_id: '',
    warehouse_id: '',
    rawmaterial_name: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchShipments();
  }, []);

  const fetchShipments = () => {
    axios.get('http://localhost:8089/api/raw_materials')
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
    axios.post('http://localhost:8089/api/raw_materials', newShipment)
      .then(response => {
        console.log('Added Raw Material:', response.data);
        fetchShipments();
        setNewShipment({
          material_id: '',
    warehouse_id: '',
    rawmaterial_name: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteShipment = (shipmentId) => {
    axios.delete(`http://localhost:8089/api/raw_materials/${shipmentId}`)
      .then(response => {
        console.log('Deleted Raw Material:', response.data);
        fetchShipments();
      })
      .catch(error => console.error(error));
  };

  const handleEditShipment = (shipment) => {
    setEditShipment(shipment);
    setIsEditModalOpen(true);
  };

  const handleUpdateShipment = () => {
    axios.put(`http://localhost:8089/api/raw_materials/${editShipment.material_id}`, editShipment)
      .then(response => {
        console.log('Updated Raw Material:', response.data);
        fetchShipments();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Raw Material Records</h1>
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
            <th>Material ID</th>
            <th>Warehouse ID</th>
            <th>Raw Material Name</th>
          </tr>
        </thead>
        <tbody>
          {shipments && Array.isArray(shipments) ? (
            shipments.map(shipment => (
              <tr key={shipment.MaterialID}>
                <td>{shipment.MaterialID}</td>
                <td>{shipment.WarehouseID}</td>
                <td>{shipment.RawMaterialName}</td>
                <td>
                  <button onClick={() => handleEditShipment(shipment)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteShipment(shipment.material_id)}>
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

      <h2>Add Raw Material</h2>
      <div>
        <label>Material ID:</label>
        <input
          type="text"
          name="material_id"
          value={newShipment.material_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Warehouse ID:</label>
        <input
          type="text"
          name="warehouse_id"
          value={newShipment.warehouse_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Raw Material Name:</label>
        <input
          type="text"
          name="rawmaterial_name"
          value={newShipment.rawmaterial_name}
          onChange={handleInputChange}
        />
      </div>
      
      <button onClick={handleAddShipment}>Add Raw Material</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Raw Material</h2>
          <div>
            <label>Material ID:</label>
            <input
              type="text"
              name="material_id"
              value={editShipment.material_id}
              disabled
            />
          </div>
          <div>
            <label>WareHouse ID:</label>
            <input
              type="date"
              name="warehouse_id"
              value={editShipment.warehouse_id}
              onChange={(e) => setEditShipment({ ...editShipment, warehouse_id: e.target.value })}
            />
          </div>
          <div>
            <label>Raw Material Name:</label>
            <input
              type="text"
              name="rawmaterial_name"
              value={editShipment.rawmaterial_name}
              onChange={(e) => setEditShipment({ ...editShipment, rawmaterial_name: e.target.value })}
            />
          </div>
          
          <button onClick={handleUpdateShipment}>Update Raw Material</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    </div>
  );
}

export default Shipment;
