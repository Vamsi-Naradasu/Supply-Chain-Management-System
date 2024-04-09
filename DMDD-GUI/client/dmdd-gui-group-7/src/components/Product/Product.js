import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function OrderItem() {
  const [orderItems, setOrderItems] = useState([]);
  const [newOrderItem, setNewOrderItem] = useState({
    ProductID: '',
    EmployeeID: '',
    DepartmentID: '',
    ProductName: '',
    Color: '',
    Weight: '',
    Cost: '',
    Price: '',

  });
  const [editOrderItem, setEditOrderItem] = useState({
    ProductID: '',
    EmployeeID: '',
    DepartmentID: '',
    ProductName: '',
    Color: '',
    Weight: '',
    Cost: '',
    Price: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchOrderItems();
  }, []);

  const fetchOrderItems = () => {
    axios.get('http://localhost:8089/api/products')
      .then(response => {
        console.log('Fetched Products:', response.data);
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
    axios.post('http://localhost:8089/api/products', newOrderItem)
      .then(response => {
        console.log('Added Product:', response.data);
        fetchOrderItems();
        setNewOrderItem({
          ProductID: '',
          EmployeeID: '',
          DepartmentID: '',
          ProductName: '',
          Color: '',
          Weight: '',
          Cost: '',
          Price: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteOrderItem = (productID) => {
    axios.delete(`http://localhost:8089/api/products/${productID}`)
      .then(response => {
        console.log('Deleted Product:', response.data);
        fetchOrderItems();
      })
      .catch(error => console.error(error));
  };

  const handleEditOrderItem = (orderItem) => {
    setEditOrderItem(orderItem);
    setIsEditModalOpen(true);
  };

  const handleUpdateOrderItem = () => {
    axios.put(`http://localhost:8089/api/products/${editOrderItem.ProductID}`, editOrderItem)
      .then(response => {
        console.log('Updated Product:', response.data);
        fetchOrderItems();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1 style={{color:'black'}}>Product Records</h1>
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
            <th>Product ID</th>
            <th>Emp ID</th>
            <th>Dept ID</th>
            <th>Name</th>
            <th>Color</th>
            <th>Weight</th>
            <th>Cost</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems && Array.isArray(orderItems) ? (
            orderItems.map(orderItem => (
              <tr key={orderItem.ProductID}>
                <td>{orderItem.ProductID}</td>
                <td>{orderItem.EmployeeID}</td>
                <td>{orderItem.DepartmentID}</td>
                <td>{orderItem.ProductName}</td>
                <td>{orderItem.Color}</td>
                <td>{orderItem.Weight}</td>
                <td>{orderItem.Cost}</td>
                <td>{orderItem.Price}</td>
                <td>
                  <button onClick={() => handleEditOrderItem(orderItem)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteOrderItem(orderItem.ProductID)}>
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

      <h2>Add New Products</h2>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          name="ProductID"
          value={newOrderItem.ProductID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="EmployeeID"
          value={newOrderItem.EmployeeID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Department ID:</label>
        <input
          type="text"
          name="DepartmentID"
          value={newOrderItem.DepartmentID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="ProductName"
          value={newOrderItem.ProductName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Color:</label>
        <input
          type="text"
          name="Color"
          value={newOrderItem.Color}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Weight:</label>
        <input
          type="text"
          name="Weight"
          value={newOrderItem.Weight}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Cost:</label>
        <input
          type="text"
          name="Cost"
          value={newOrderItem.Cost}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="Price"
          value={newOrderItem.Price}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddOrderItem}>Add Product</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Product</h2>
          <div>
            <label>Product ID:</label>
            <input
              type="text"
              name="ProductID"
              value={editOrderItem.ProductID}
              disabled
            />
          </div>
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              name="EmployeeID"
              value={editOrderItem.EmployeeID}
              disabled
            />
          </div>
          <div>
            <label>Department ID:</label>
            <input
              type="text"
              name="DepartmentID"
              value={editOrderItem.DepartmentID}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="ProductName"
              value={editOrderItem.ProductName}
              onChange={(e) => setEditOrderItem({ ...editOrderItem, ProductName: e.target.value })}
            />
          </div>
          <div>
            <label>Color:</label>
            <input
              type="text"
              name="Color"
              value={editOrderItem.Color}
              onChange={(e) => setEditOrderItem({ ...editOrderItem, Color: e.target.value })}
            />
          </div>
          <div>
            <label>Weight:</label>
            <input
              type="text"
              name="Weight"
              value={editOrderItem.Weight}
              onChange={(e) => setEditOrderItem({ ...editOrderItem, Weight: e.target.value })}
            />
          </div>
          <div>
            <label>Cost:</label>
            <input
              type="text"
              name="cost"
              value={editOrderItem.Cost}
              onChange={(e) => setEditOrderItem({ ...editOrderItem, Cost: e.target.value })}
            />
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="Price"
                value={editOrderItem.Price}
                onChange={(e) => setEditOrderItem({ ...editOrderItem, Price: e.target.value })}
              />
            </div>
          </div>
          <button className="blue-button" onClick={handleUpdateOrderItem}>Update Product</button>
          <button className="amber-button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default OrderItem;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function OrderItem() {
//   const [orderItems, setOrderItems] = useState([]);
//   const [newOrderItem, setNewOrderItem] = useState({
//     ProductID: '',
//     EmployeeID: '',
//     DepartmentID: '',
//     ProductName: '',
//     Color: '',
//     Weight: '',
//     Cost: '',
//     Price: '',
//   });
//   const [editOrderItem, setEditOrderItem] = useState({
//     ProductID: '',
//     EmployeeID: '',
//     DepartmentID: '',
//     ProductName: '',
//     Color: '',
//     Weight: '',
//     Cost: '',
//     Price: '',
//   });
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   useEffect(() => {
//     fetchOrderItems();
//   }, []);

//   const fetchOrderItems = () => {
//     axios.get('http://localhost:8089/api/products')
//       .then(response => {
//         console.log('Fetched Products:', response.data);
//         setOrderItems(response.data || []);
//       })
//       .catch(error => console.error(error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewOrderItem(prevOrderItem => ({
//       ...prevOrderItem,
//       [name]: value,
//     }));
//   };

//   const handleAddOrderItem = () => {
//     axios.post('http://localhost:8089/api/products', newOrderItem)
//       .then(response => {
//         console.log('Added Product:', response.data);
//         fetchOrderItems();
//         setNewOrderItem({
//           ProductID: '',
//           EmployeeID: '',
//           DepartmentID: '',
//           ProductName: '',
//           Color: '',
//           Weight: '',
//           Cost: '',
//           Price: '',
//         });
//       })
//       .catch(error => console.error(error));
//   };

//   const handleDeleteOrderItem = (productID) => {
//     axios.delete(`http://localhost:8089/api/products/${productID}`)
//       .then(response => {
//         console.log('Deleted Product:', response.data);
//         fetchOrderItems();
//       })
//       .catch(error => console.error(error));
//   };

//   const handleEditOrderItem = (orderItem) => {
//     setEditOrderItem(orderItem);
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateOrderItem = () => {
//     axios.put(`http://localhost:8089/api/products/${editOrderItem.ProductID}`, editOrderItem)
//       .then(response => {
//         console.log('Updated Product:', response.data);
//         fetchOrderItems();
//         setIsEditModalOpen(false);
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="container">
//       <h1>Product Records</h1>
//       <div className="navbar">
//         <a href="/">Home</a>
//         <a href="/departments">Departments</a>
//         <a href="/deptEmployee">Department Employee</a>
//         <a href="/employee">Employee</a>
//         <a href="/invoice">Invoice</a>
//         <a href="/product">Product</a>
//         <a href="/productionEmp">Production Employee</a>
//         <a href="/productionLine">Production Line</a>
//         <a href="/productLine">Product Line</a>
//         <a href="/productMaterial">Product Material</a>
//         <a href="/rawMaterial">Raw_Material</a>
//         <a href="/supplySchedule">SupplySchedule</a>
//         <a href="/vendor">Vendor</a>
//         <a href="/warehouse">WareHouse</a>
//         <a href="/warehouseEmp">Warehouse Employee</a>
//       </div>
//       <table>
//       <thead>
//            <tr>
//              <th>Product ID</th>
//              <th>Emp ID</th>
//              <th>Dept ID</th>
//              <th>Name</th>
//              <th>Color</th>
//              <th>Weight</th>
//              <th>Cost</th>
//              <th>Price</th>
//            </tr>
//          </thead>
//          <tbody>
//            {orderItems && Array.isArray(orderItems) ? (
//             orderItems.map(orderItem => (
//               <tr key={orderItem.ProductID}>
//                 <td>{orderItem.ProductID}</td>
//                 <td>{orderItem.EmployeeID}</td>
//                 <td>{orderItem.DepartmentID}</td>
//                 <td>{orderItem.ProductName}</td>
//                 <td>{orderItem.Color}</td>
//                 <td>{orderItem.Weight}</td>
//                 <td>{orderItem.Cost}</td>
//                 <td>{orderItem.Price}</td>
//                 <td>
//                   <button onClick={() => handleEditOrderItem(orderItem)}>
//                     Edit
//                   </button>
//                   <button className="red-button" onClick={() => handleDeleteOrderItem(orderItem.ProductID)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">Loading...</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <h2>Add New Products</h2>
//       <div>
//         <label>Product ID:</label>
//         <input
//           type="text"
//           name="ProductID"
//           value={newOrderItem.ProductID}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Employee ID:</label>
//         <input
//           type="text"
//           name="EmployeeID"
//           value={newOrderItem.EmployeeID}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Department ID:</label>
//         <input
//           type="text"
//           name="DepartmentID"
//           value={newOrderItem.DepartmentID}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="ProductName"
//           value={newOrderItem.ProductName}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Color:</label>
//         <input
//           type="text"
//           name="Color"
//           value={newOrderItem.Color}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Weight:</label>
//         <input
//           type="text"
//           name="Weight"
//           value={newOrderItem.Weight}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Cost:</label>
//         <input
//           type="text"
//           name="Cost"
//           value={newOrderItem.Cost}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Price:</label>
//         <input
//           type="text"
//           name="Price"
//           value={newOrderItem.Price}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button onClick={handleAddOrderItem}>Add Product</button>

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div>
//           <h2>Edit Product</h2>
//           <div>
//             <label>Product ID:</label>
//             <input
//               type="text"
//               name="ProductID"
//               value={editOrderItem.ProductID}
//               disabled
//             />
//           </div>
//           <div>
//             <label>Employee ID:</label>
//             <input
//               type="text"
//               name="EmployeeID"
//               value={editOrderItem.EmployeeID}
//               disabled
//             />
//           </div>
//           <div>
//             <label>Department ID:</label>
//             <input
//               type="text"
//               name="DepartmentID"
//               value={editOrderItem.DepartmentID}
//               disabled
//             />
//           </div>
//           <div>
//             <label>Name:</label>
//             <input
//               type="text"
//               name="ProductName"
//               value={editOrderItem.ProductName}
//               onChange={(e) => setEditOrderItem({ ...editOrderItem, ProductName: e.target.value })}
//             />
//           </div>
//           <div>
//             <label>Color:</label>
//             <input
//               type="text"
//               name="Color"
//               value={editOrderItem.Color}
//               onChange={(e) => setEditOrderItem({ ...editOrderItem, Color: e.target.value })}
//             />
//           </div>
//           <div>
//             <label>Weight:</label>
//             <input
//               type="text"
//               name="Weight"
//               value={editOrderItem.Weight}
//               onChange={(e) => setEditOrderItem({ ...editOrderItem, Weight: e.target.value })}
//             />
//           </div>
//           <div>
//             <label>Cost:</label>
//             <input
//               type="text"
//               name="cost"
//               value={editOrderItem.Cost}
//               onChange={(e) => setEditOrderItem({ ...editOrderItem, Cost: e.target.value })}
//             />
//             <div>
//               <label>Price:</label>
//               <input
//                 type="text"
//                 name="Price"
//                 value={editOrderItem.price}
//                 onChange={(e) => setEditOrderItem({ ...editOrderItem, Price: e.target.value })}
//               />
//             </div>
//           </div>
//           <button onClick={handleUpdateOrderItem}>Update Product</button>
//           <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
//         </div>
//       )}
//       <br></br>
//       <br></br>
//     </div>
//   );
// }

// export default OrderItem;
