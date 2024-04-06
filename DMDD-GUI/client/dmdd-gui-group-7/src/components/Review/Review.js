import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Review() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    review_id: '',
    review_description: '',
    review_rating: '',
    customer_id: '',
    product_id: '',
  });
  const [editReview, setEditReview] = useState({
    review_id: '',
    review_description: '',
    review_rating: '',
    customer_id: '',
    product_id: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get('http://localhost:8089/api/reviews')
      .then(response => {
        console.log('Fetched Reviews:', response.data);
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
    axios.post('http://localhost:8089/api/reviews', newReview)
      .then(response => {
        console.log('Added Review:', response.data);
        fetchReviews();
        setNewReview({
          review_id: '',
          review_description: '',
          review_rating: '',
          customer_id: '',
          product_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteReview = (reviewId) => {
    axios.delete(`http://localhost:8089/api/reviews/${reviewId}`)
      .then(response => {
        console.log('Deleted Review:', response.data);
        fetchReviews();
      })
      .catch(error => console.error(error));
  };

  const handleEditReview = (review) => {
    setEditReview(review);
    setIsEditModalOpen(true);
  };

  const handleUpdateReview = () => {
    axios.put(`http://localhost:8089/api/reviews/${editReview.review_id}`, editReview)
      .then(response => {
        console.log('Updated Review:', response.data);
        fetchReviews();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>Review Records</h1>
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
            <th>Description</th>
            <th>Rating</th>
            <th>Customer ID</th>
            <th>Product ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews && Array.isArray(reviews) ? (
            reviews.map(review => (
              <tr key={review.review_id}>
                <td>{review.review_id}</td>
                <td>{review.review_description}</td>
                <td>{review.review_rating}</td>
                <td>{review.customer_id}</td>
                <td>{review.product_id}</td>
                <td>
                  <button onClick={() => handleEditReview(review)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteReview(review.review_id)}>
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

      <h2>Add New Review</h2>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="review_id"
          value={newReview.review_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="review_description"
          value={newReview.review_description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="text"
          name="review_rating"
          value={newReview.review_rating}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          name="customer_id"
          value={newReview.customer_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          name="product_id"
          value={newReview.product_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddReview}>Add Review</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Review</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="review_id"
              value={editReview.review_id}
              disabled
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="review_description"
              value={editReview.review_description}
              onChange={(e) => setEditReview({ ...editReview, review_description: e.target.value })}
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="text"
              name="review_rating"
              value={editReview.review_rating}
              onChange={(e) => setEditReview({ ...editReview, review_rating: e.target.value })}
            />
          </div>
          <div>
            <label>Customer ID:</label>
            <input
              type="text"
              name="customer_id"
              value={editReview.customer_id}
              onChange={(e) => setEditReview({ ...editReview, customer_id: e.target.value })}
            />
          </div>
          <div>
            <label>Product ID:</label>
            <input
              type="text"
              name="product_id"
              value={editReview.product_id}
              onChange={(e) => setEditReview({ ...editReview, product_id: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateReview}>Update Review</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
    <br></br>
    <Link to="/" className="nav-link">Home</Link>
    </div>
  );
}

export default Review;
