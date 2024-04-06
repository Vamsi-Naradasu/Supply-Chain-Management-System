import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Order() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    order_id: '',
    order_date: '',
    order_total_price: '',
    customer_id: '',
  });
  const [editOrder, setEditOrder] = useState({
    order_id: '',
    order_date: '',
    order_total_price: '',
    customer_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:8089/api/orders')
      .then(response => {
        console.log('Fetched Orders:', response.data);
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
    axios.post('http://localhost:8089/api/orders', newOrder)
      .then(response => {
        console.log('Added Order:', response.data);
        fetchOrders();
        setNewOrder({
          order_id: '',
          order_date: '',
          order_total_price: '',
          customer_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteOrder = (orderId) => {
    axios.delete(`http://localhost:8089/api/orders/${orderId}`)
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
    axios.put(`http://localhost:8089/api/orders/${editOrder.order_id}`, editOrder)
      .then(response => {
        console.log('Updated Order:', response.data);
        fetchOrders();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Order Records</h1>
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
            <th>Total Price</th>
            <th>Customer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders && Array.isArray(orders) ? (
            orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.order_date}</td>
                <td>{order.order_total_price}</td>
                <td>{order.customer_id}</td>
                <td>
                  <button onClick={() => handleEditOrder(order)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteOrder(order.order_id)}>
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

      <h2>Add New Order</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="order_id"
          value={newOrder.order_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="text"
          name="order_date"
          value={newOrder.order_date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Total Price:</label>
        <input
          type="text"
          name="order_total_price"
          value={newOrder.order_total_price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          name="customer_id"
          value={newOrder.customer_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddOrder}>Add Order</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Order</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="order_id"
              value={editOrder.order_id}
              disabled
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="text"
              name="order_date"
              value={editOrder.order_date}
              onChange={(e) => setEditOrder({ ...editOrder, order_date: e.target.value })}
            />
          </div>
          <div>
            <label>Total Price:</label>
            <input
              type="text"
              name="order_total_price"
              value={editOrder.order_total_price}
              onChange={(e) => setEditOrder({ ...editOrder, order_total_price: e.target.value })}
            />
          </div>
          <div>
            <label>Customer ID:</label>
            <input
              type="text"
              name="customer_id"
              value={editOrder.customer_id}
              onChange={(e) => setEditOrder({ ...editOrder, customer_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateOrder}>Update Order</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Order;
