import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ReturnRequest() {
  const [returnRequests, setReturnRequests] = useState([]);
  const [newReturnRequest, setNewReturnRequest] = useState({
    // return_request_id: '',
    // return_req_date: '',
    // return_req_reason: '',
    // order_item_id: '',
    product_id: '',
    line_id: '',
  });
  const [editReturnRequest, setEditReturnRequest] = useState({
    product_id:'',
    line_id:'',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchReturnRequests();
  }, []);

  const fetchReturnRequests = () => {
    axios.get('http://localhost:8089/api/product_lines')
      .then(response => {
        console.log('Fetched Product Lines:', response.data);
        setReturnRequests(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReturnRequest(prevReturnRequest => ({
      ...prevReturnRequest,
      [name]: value,
    }));
  };

  const handleAddReturnRequest = () => {
    axios.post('http://localhost:8089/api/product_lines', newReturnRequest)
      .then(response => {
        console.log('Added Product Lines:', response.data);
        fetchReturnRequests();
        setNewReturnRequest({
          product_id:'',
          line_id:'',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteReturnRequest = (returnRequestId) => {
    axios.delete(`http://localhost:8089/api/product_lines/${returnRequestId}`)
      .then(response => {
        console.log('Deleted Product Lines:', response.data);
        fetchReturnRequests();
      })
      .catch(error => console.error(error));
  };

  const handleEditReturnRequest = (returnRequest) => {
    setEditReturnRequest(returnRequest);
    setIsEditModalOpen(true);
  };

  const handleUpdateReturnRequest = () => {
    axios.put(`http://localhost:8089/api/product_lines/${editReturnRequest.product_id}`, editReturnRequest)
      .then(response => {
        console.log('Updated Return Request:', response.data);
        fetchReturnRequests();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Product Line Records</h1>
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
            <th>Product ID</th>
            <th>Line ID</th>
          </tr>
        </thead>
        <tbody>
          {returnRequests && Array.isArray(returnRequests) ? (
            returnRequests.map(returnRequest => (
              <tr key={returnRequest.ProductID}>
                <td>{returnRequest.ProductID}</td>
                <td>{returnRequest.LineID}</td>
                <td>
                  <button onClick={() => handleEditReturnRequest(returnRequest)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteReturnRequest(returnRequest.product_id)}>
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

      <h2>Add New Product Line</h2>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          name="product_id"
          value={newReturnRequest.product_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Line ID:</label>
        <input
          type="text"
          name="line_id"
          value={newReturnRequest.line_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddReturnRequest}>Add Product Line</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Product Line</h2>
          <div>
            <label>Product ID:</label>
            <input
              type="text"
              name="product_id"
              value={editReturnRequest.product_id}
              disabled
            />
          </div>
          <div>
            <label>Line ID:</label>
            <input
              type="text"
              name="line_id"
              value={editReturnRequest.line_id}
              onChange={(e) => setEditReturnRequest({ ...editReturnRequest, line_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateReturnRequest}>Update Product Line</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default ReturnRequest;
