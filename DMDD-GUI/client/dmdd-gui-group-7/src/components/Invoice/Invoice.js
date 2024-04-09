import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Order() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    InvoiceID: '',
    VendorID: '',
    DepartmentID: '',
    TotalAmount: '',
    VendorPaymentType: '',
  });
  const [editOrder, setEditOrder] = useState({
    InvoiceID: '',
    VendorID: '',
    DepartmentID: '',
    TotalAmount: '',
    VendorPaymentType: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:8089/api/invoices')
      .then(response => {
        console.log('Fetched Invoices:', response.data);
        setOrders(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevOrder => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleAddOrder = () => {
    axios.post('http://localhost:8089/api/invoices', newOrder)
      .then(response => {
        console.log('Added Invoice:', response.data);
        fetchOrders();
        setNewOrder({
          InvoiceID: '',
          VendorID: '',
          DepartmentID: '',
          TotalAmount: '',
          VendorPaymentType: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteOrder = (invoiceId) => {
    axios.delete(`http://localhost:8089/api/invoices/${invoiceId}`)
      .then(response => {
        console.log('Deleted Order:', response.data);
        fetchOrders();
      })
      .catch(error => console.error(error));
  };

  const handleEditOrder = (order) => {
    setEditOrder(order);
    setIsEditModalOpen(true);
  };

  const handleUpdateOrder = () => {
    axios.put(`http://localhost:8089/api/invoices/${editOrder.InvoiceID}`, editOrder)
      .then(response => {
        console.log('Updated Invoice:', response.data);
        fetchOrders();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1 style={{color:'black'}}>Invoice Records</h1>
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
            <th>Invoice ID</th>
            <th>Vendor ID</th>
            <th>Department ID</th>
            <th>Total Amount</th>
            <th>VendorPaymentType</th>
          </tr>
        </thead>
        <tbody>
          {orders && Array.isArray(orders) ? (
            orders.map(order => (
              <tr key={order.InvoiceID}>
                <td>{order.InvoiceID}</td>
                <td>{order.VendorID}</td>
                <td>{order.DepartmentID}</td>
                <td>{order.TotalAmount}</td>
                <td>{order.VendorPaymentType}</td>
                <td>
                  <button onClick={() => handleEditOrder(order)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteOrder(order.InvoiceID)}>
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

      <h2>Add New Invoice</h2>
      <div>
        <label>Invoice ID:</label>
        <input
          type="text"
          name="InvoiceID"
          value={newOrder.InvoiceID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Vendor ID:</label>
        <input
          type="text"
          name="VendorID"
          value={newOrder.VendorID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Department ID:</label>
        <input
          type="text"
          name="DepartmentID"
          value={newOrder.DepartmentID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Total Amount:</label>
        <input
          type="text"
          name="TotalAmount"
          value={newOrder.TotalAmount}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>VendorPayment Type:</label>
        <input
          type="text"
          name="VendorPaymentType"
          value={newOrder.VendorPaymentType}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddOrder}>Add Invoice</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Invoice</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="InvoiceID"
              value={editOrder.InvoiceID}
              disabled
            />
          </div>
          <div>
            <label>Vendor ID:</label>
            <input
              type="text"
              name="VendorID"
              value={editOrder.VendorID}
              onChange={(e) => setEditOrder({ ...editOrder, VendorID: e.target.value })}
            />
          </div>
          <div>
            <label>Department ID:</label>
            <input
              type="text"
              name="DepartmentID"
              value={editOrder.DepartmentID}
              onChange={(e) => setEditOrder({ ...editOrder, DepartmentID: e.target.value })}
            />
          </div>
          <div>
            <label>Total Amount:</label>
            <input
              type="text"
              name="TotalAmount"
              value={editOrder.TotalAmount}
              onChange={(e) => setEditOrder({ ...editOrder, TotalAmount: e.target.value })}
            />
          </div>
          <div>
            <label>VendorPayment Type:</label>
            <input
              type="text"
              name="VendorPaymentType"
              value={editOrder.VendorPaymentType}
              onChange={(e) => setEditOrder({ ...editOrder, VendorPaymentType: e.target.value })}
            />
          </div>
          <button className="blue-button" onClick={handleUpdateOrder}>Update Invoice</button>
          <button className="amber-button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default Order;
