import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Review() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    // review_id: '',
    // review_description: '',
    // review_rating: '',
    // customer_id: '',
    product_id: '',
    material_id: '',

  });
  const [editReview, setEditReview] = useState({
    product_id: '',
    material_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get('http://localhost:8089/api/product_materials')
      .then(response => {
        console.log('Fetched Product Materials:', response.data);
        setReviews(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prevReview => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleAddReview = () => {
    axios.post('http://localhost:8089/api/product_materials', newReview)
      .then(response => {
        console.log('Added Product Material:', response.data);
        fetchReviews();
        setNewReview({
          product_id: '',
    material_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteReview = (reviewId) => {
    axios.delete(`http://localhost:8089/api/product_materials/${reviewId}`)
      .then(response => {
        console.log('Deleted Product Material:', response.data);
        fetchReviews();
      })
      .catch(error => console.error(error));
  };

  const handleEditReview = (review) => {
    setEditReview(review);
    setIsEditModalOpen(true);
  };

  const handleUpdateReview = () => {
    axios.put(`http://localhost:8089/api/reviews/${editReview.product_id}/${editReview.material_id}`, editReview)
      .then(response => {
        console.log('Updated Product Material:', response.data);
        fetchReviews();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Product Material Records</h1>
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
            <th>Material ID</th>
          </tr>
        </thead>
        <tbody>
          {reviews && Array.isArray(reviews) ? (
            reviews.map(review => (
              <tr key={review.ProductID}>
                <td>{review.ProductID}</td>
                <td>{review.MaterialID}</td>
                <td>
                  <button onClick={() => handleEditReview(review)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteReview(review.product_id)}>
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

      <h2>Add New Product Material</h2>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          name="product_id"
          value={newReview.product_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Material ID:</label>
        <input
          type="text"
          name="material_id"
          value={newReview.material_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddReview}>Add Product Material</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Product Material</h2>
          <div>
            <label>Product ID:</label>
            <input
              type="text"
              name="product_id"
              value={editReview.product_id}
              onChange={(e) => setEditReview({ ...editReview, product_id: e.target.value })}
            />
          </div>
          <div>
            <label>Material ID:</label>
            <input
              type="text"
              name="material_id"
              value={editReview.material_id}
              onChange={(e) => setEditReview({ ...editReview, material_id: e.target.value })}
            />
          </div>
          
          <button onClick={handleUpdateReview}>Update Product Material</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    </div>
  );
}

export default Review;
