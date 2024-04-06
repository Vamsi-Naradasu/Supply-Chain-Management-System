import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Stock() {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    stock_id: '',
    quantity: '',
    price: '',
    product_id: '',
    retailer_id: '',
  });
  const [editStock, setEditStock] = useState({
    stock_id: '',
    quantity: '',
    price: '',
    product_id: '',
    retailer_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    axios.get('http://localhost:8089/api/stocks')
      .then(response => {
        console.log('Fetched Stocks:', response.data);
        setStocks(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock(prevStock => ({
      ...prevStock,
      [name]: value,
    }));
  };

  const handleAddStock = () => {
    axios.post('http://localhost:8089/api/stocks', newStock)
      .then(response => {
        console.log('Added Stock:', response.data);
        fetchStocks();
        setNewStock({
          stock_id: '',
          quantity: '',
          price: '',
          product_id: '',
          retailer_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteStock = (stockId) => {
    axios.delete(`http://localhost:8089/api/stocks/${stockId}`)
      .then(response => {
        console.log('Deleted Stock:', response.data);
        fetchStocks();
      })
      .catch(error => console.error(error));
  };

  const handleEditStock = (stock) => {
    setEditStock(stock);
    setIsEditModalOpen(true);
  };

  const handleUpdateStock = () => {
    axios.put(`http://localhost:8089/api/stocks/${editStock.stock_id}`, editStock)
      .then(response => {
        console.log('Updated Stock:', response.data);
        fetchStocks();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Stock Records</h1>
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
            <th>Price</th>
            <th>Product ID</th>
            <th>Retailer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks && Array.isArray(stocks) ? (
            stocks.map(stock => (
              <tr key={stock.stock_id}>
                <td>{stock.stock_id}</td>
                <td>{stock.quantity}</td>
                <td>{stock.price}</td>
                <td>{stock.product_id}</td>
                <td>{stock.retailer_id}</td>
                <td>
                  <button onClick={() => handleEditStock(stock)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteStock(stock.stock_id)}>
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

      <h2>Add New Stock</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="stock_id"
          value={newStock.stock_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={newStock.quantity}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={newStock.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          name="product_id"
          value={newStock.product_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Retailer ID:</label>
        <input
          type="text"
          name="retailer_id"
          value={newStock.retailer_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddStock}>Add Stock</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Stock</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="stock_id"
              value={editStock.stock_id}
              disabled
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="text"
              name="quantity"
              value={editStock.quantity}
              onChange={(e) => setEditStock({ ...editStock, quantity: e.target.value })}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={editStock.price}
              onChange={(e) => setEditStock({ ...editStock, price: e.target.value })}
            />
          </div>
          <div>
            <label>Product ID:</label>
            <input
              type="text"
              name="product_id"
              value={editStock.product_id}
              onChange={(e) => setEditStock({ ...editStock, product_id: e.target.value })}
            />
          </div>
          <div>
            <label>Retailer ID:</label>
            <input
              type="text"
              name="retailer_id"
              value={editStock.retailer_id}
              onChange={(e) => setEditStock({ ...editStock, retailer_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateStock}>Update Stock</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Stock;
