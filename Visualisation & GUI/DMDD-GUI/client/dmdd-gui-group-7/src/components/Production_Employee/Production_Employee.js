import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ProductCatalog() {
  const [productCatalogs, setProductCatalogs] = useState([]);
  const [newProductCatalog, setNewProductCatalog] = useState({
    // product_catalog_id: '',
    // product_type: '',
    emp_id: '',
    line_id: '',
  });
  const [editProductCatalog, setEditProductCatalog] = useState({
    // product_catalog_id: '',
    // product_type: '',
    emp_id: '',
    line_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchProductCatalogs();
  }, []);

  const fetchProductCatalogs = () => {
    axios.get('http://localhost:8089/api/prod_emps')
      .then(response => {
        console.log('Fetched Production Employees:', response.data);
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
    axios.post('http://localhost:8089/api/prod_emps', newProductCatalog)
      .then(response => {
        console.log('Added Production Employee:', response.data);
        fetchProductCatalogs();
        setNewProductCatalog({
          emp_id: '',
    line_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteProductCatalog = (productCatalogId) => {
    axios.delete(`http://localhost:8089/api/product_emps/${productCatalogId}`)
      .then(response => {
        console.log('Deleted Production Employee:', response.data);
        fetchProductCatalogs();
      })
      .catch(error => console.error(error));
  };

  const handleEditProductCatalog = (productCatalog) => {
    setEditProductCatalog(productCatalog);
    setIsEditModalOpen(true);
  };

  const handleUpdateProductCatalog = () => {
    axios.put(`http://localhost:8089/api/product_emps/${editProductCatalog.emp_id}`, editProductCatalog)
      .then(response => {
        console.log('Updated Production Employee:', response.data);
        fetchProductCatalogs();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Production Employee Records</h1>
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
            <th>Employee ID</th>
            <th>Line ID</th>
          </tr>
        </thead>
        <tbody>
          {productCatalogs && Array.isArray(productCatalogs) ? (
            productCatalogs.map(productCatalog => (
              <tr key={productCatalog.EmployeeID}>
                <td>{productCatalog.EmployeeID}</td>
                <td>{productCatalog.LineID}</td>
                <td>
                  <button onClick={() => handleEditProductCatalog(productCatalog)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteProductCatalog(productCatalog.emp_id)}>
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

      <h2>Add New Production Employee</h2>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="emp_id"
          value={newProductCatalog.emp_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Line ID:</label>
        <input
          type="text"
          name="line_id"
          value={newProductCatalog.line_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddProductCatalog}>Add Production Employee</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Production Employee</h2>
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              name="emp_id"
              value={editProductCatalog.emp_id}
              disabled
            />
          </div>
          <div>
            <label>Line ID:</label>
            <input
              type="text"
              name="line_id"
              value={editProductCatalog.line_id}
              onChange={(e) => setEditProductCatalog({ ...editProductCatalog, line_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateProductCatalog}>Update Production Employee</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    </div>
  );
}

export default ProductCatalog;
