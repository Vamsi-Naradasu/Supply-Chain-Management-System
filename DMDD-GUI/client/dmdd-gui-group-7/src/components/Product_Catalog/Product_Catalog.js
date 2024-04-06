import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ProductCatalog() {
  const [productCatalogs, setProductCatalogs] = useState([]);
  const [newProductCatalog, setNewProductCatalog] = useState({
    product_catalog_id: '',
    product_type: '',
  });
  const [editProductCatalog, setEditProductCatalog] = useState({
    product_catalog_id: '',
    product_type: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchProductCatalogs();
  }, []);

  const fetchProductCatalogs = () => {
    axios.get('http://localhost:8089/api/product_catalogs')
      .then(response => {
        console.log('Fetched Product Catalogs:', response.data);
        setProductCatalogs(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductCatalog(prevProductCatalog => ({
      ...prevProductCatalog,
      [name]: value,
    }));
  };

  const handleAddProductCatalog = () => {
    axios.post('http://localhost:8089/api/product_catalogs', newProductCatalog)
      .then(response => {
        console.log('Added Product Catalog:', response.data);
        fetchProductCatalogs();
        setNewProductCatalog({
          product_catalog_id: '',
          product_type: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteProductCatalog = (productCatalogId) => {
    axios.delete(`http://localhost:8089/api/product_catalogs/${productCatalogId}`)
      .then(response => {
        console.log('Deleted Product Catalog:', response.data);
        fetchProductCatalogs();
      })
      .catch(error => console.error(error));
  };

  const handleEditProductCatalog = (productCatalog) => {
    setEditProductCatalog(productCatalog);
    setIsEditModalOpen(true);
  };

  const handleUpdateProductCatalog = () => {
    axios.put(`http://localhost:8089/api/product_catalogs/${editProductCatalog.product_catalog_id}`, editProductCatalog)
      .then(response => {
        console.log('Updated Product Catalog:', response.data);
        fetchProductCatalogs();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Product Catalog Records</h1>
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
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productCatalogs && Array.isArray(productCatalogs) ? (
            productCatalogs.map(productCatalog => (
              <tr key={productCatalog.product_catalog_id}>
                <td>{productCatalog.product_catalog_id}</td>
                <td>{productCatalog.product_type}</td>
                <td>
                  <button onClick={() => handleEditProductCatalog(productCatalog)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProductCatalog(productCatalog.product_catalog_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Add New Product Catalog</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="product_catalog_id"
          value={newProductCatalog.product_catalog_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Type:</label>
        <input
          type="text"
          name="product_type"
          value={newProductCatalog.product_type}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddProductCatalog}>Add Product Catalog</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Product Catalog</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="product_catalog_id"
              value={editProductCatalog.product_catalog_id}
              disabled
            />
          </div>
          <div>
            <label>Type:</label>
            <input
              type="text"
              name="product_type"
              value={editProductCatalog.product_type}
              onChange={(e) => setEditProductCatalog({ ...editProductCatalog, product_type: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateProductCatalog}>Update Product Catalog</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default ProductCatalog;
