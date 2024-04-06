import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function OrderItem() {
  const [orderItems, setOrderItems] = useState([]);
  const [newOrderItem, setNewOrderItem] = useState({
    order_item_id: '',
    order_item_quantity: '',
    order_item_totalprice: '',
    order_id: '',
    stock_id: '',
  });
  const [editOrderItem, setEditOrderItem] = useState({
    order_item_id: '',
    order_item_quantity: '',
    order_item_totalprice: '',
    order_id: '',
    stock_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchOrderItems();
  }, []);

  const fetchOrderItems = () => {
    axios.get('http://localhost:8089/api/order_items')
      .then(response => {
        console.log('Fetched Order Items:', response.data);
        setOrderItems(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrderItem(prevOrderItem => ({
      ...prevOrderItem,
      [name]: value,
    }));
  };

  const handleAddOrderItem = () => {
    axios.post('http://localhost:8089/api/order_items', newOrderItem)
      .then(response => {
        console.log('Added Order Item:', response.data);
        fetchOrderItems();
        setNewOrderItem({
          order_item_id: '',
          order_item_quantity: '',
          order_item_totalprice: '',
          order_id: '',
          stock_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteOrderItem = (orderItemId) => {
    axios.delete(`http://localhost:8089/api/order_items/${orderItemId}`)
      .then(response => {
        console.log('Deleted Order Item:', response.data);
        fetchOrderItems();
      })
      .catch(error => console.error(error));
  };

  const handleEditOrderItem = (orderItem) => {
    setEditOrderItem(orderItem);
    setIsEditModalOpen(true);
  };

  const handleUpdateOrderItem = () => {
    axios.put(`http://localhost:8089/api/order_items/${editOrderItem.order_item_id}`, editOrderItem)
      .then(response => {
        console.log('Updated Order Item:', response.data);
        fetchOrderItems();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Order Item Records</h1>
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
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Order ID</th>
            <th>Stock ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderItems && Array.isArray(orderItems) ? (
            orderItems.map(orderItem => (
              <tr key={orderItem.order_item_id}>
                <td>{orderItem.order_item_id}</td>
                <td>{orderItem.order_item_quantity}</td>
                <td>{orderItem.order_item_totalprice}</td>
                <td>{orderItem.order_id}</td>
                <td>{orderItem.stock_id}</td>
                <td>
                  <button onClick={() => handleEditOrderItem(orderItem)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteOrderItem(orderItem.order_item_id)}>
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

      <h2>Add New Order Item</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="order_item_id"
          value={newOrderItem.order_item_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="text"
          name="order_item_quantity"
          value={newOrderItem.order_item_quantity}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Total Price:</label>
        <input
          type="text"
          name="order_item_totalprice"
          value={newOrderItem.order_item_totalprice}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Order ID:</label>
        <input
          type="text"
          name="order_id"
          value={newOrderItem.order_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Stock ID:</label>
        <input
          type="text"
          name="stock_id"
          value={newOrderItem.stock_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddOrderItem}>Add Order Item</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Order Item</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="order_item_id"
              value={editOrderItem.order_item_id}
              disabled
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="text"
              name="order_item_quantity"
              value={editOrderItem.order_item_quantity}
              onChange={(e) => setEditOrderItem({ ...editOrderItem, order_item_quantity: e.target.value })}
            />
          </div>
          <div>
            <label>Total Price:</label>
            <input
              type="text"
              name="order_item_totalprice"
              value={editOrderItem.order_item_totalprice}
              onChange={(e) => setEditOrderItem({ ...editOrderItem, order_item_totalprice: e.target.value })}
            />
          </div>
          <div>
            <label>Order ID:</label>
            <input
              type="text"
              name="order_id"
              value={editOrderItem.order_id}
              onChange={(e) => setEditOrderItem({ ...editOrderItem, order_id: e.target.value })}
            />
          </div>
          <div>
            <label>Stock ID:</label>
            <input
              type="text"
              name="stock_id"
              value={editOrderItem.stock_id}
              onChange={(e) => setEditOrderItem({ ...editOrderItem, stock_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateOrderItem}>Update Order Item</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default OrderItem;
