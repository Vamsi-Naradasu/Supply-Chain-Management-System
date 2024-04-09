// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Customer() {
//   const [deptEmp, setDeptEmp] = useState([]);
//   const [newDeptEmp, setNewDeptEmp] = useState({
//     EmployeeID: '',
//     DepartmentID: '',
//   });
//   const [editDeptEmp, setEditDeptEmp] = useState({
//     EmployeeID: '',
//     DepartmentID: '',
//   });
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   useEffect(() => {
//     // Fetch data from the Node.js server
//     fetchDeptEmps();
//   }, []);

//   const fetchDeptEmps = () => {
//     axios.get('http://localhost:8089/api/department-employees')
//       .then(response => {
//         console.log('Fetched Customers:', response.data);
//         // Access the nested array within the data property
//         setDeptEmp(response.data || []);
//       })
//       .catch(error => console.error(error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDeptEmp(prevCustomer => ({
//       ...prevCustomer,
//       [name]: value,
//     }));
//   };

//   const handleAddDeptEmp = () => {
//     axios.post('http://localhost:8089/api/department-employees', newDeptEmp)
//       .then(response => {
//         console.log('Added Department Employee:', response.data);
//         // Fetch updated list of customers
//         fetchDeptEmps();
//         // Clear the input fields
//         setNewDeptEmp({
//           EmployeeID: '',
//           DepartmentID: '',
//         });
//       })
//       .catch(error => console.error(error));
//   };

//   const handleDeleteDeptEmp = (emp_id) => {
//     axios.delete(`http://localhost:8089/api/department-employees/${emp_id}`)
//       .then(response => {
//         console.log('Deleted Department Employee:', response.data);
//         // Fetch updated list of customers
//         fetchDeptEmps();
//       })
//       .catch(error => console.error(error));
//   };

//   const handleEditDeptEmp = (customer) => {
//     setEditDeptEmp(customer);
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateDeptEmp = () => {
//     axios.put(`http://localhost:8089/api/department-employees/${editDeptEmp.EmployeeID}`, editDeptEmp)
//       .then(response => {
//         console.log('Updated Department Employee:', response.data);
//         // Fetch updated list of customers
//         fetchDeptEmps();
//         // Close the edit modal
//         setIsEditModalOpen(false);
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="container">
//       <h1>Department Employee Records</h1>
//       <div className="navbar">
//         <a href="/">Home</a>
//         <a href="/departments">Departments</a>
//         <a href="/depEmployee">Department Employee</a>
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
//         {/* Add other links as needed */}
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Employee ID</th>
//             <th>Department ID</th>
//             {/* <th>Phone</th>
//             <th>Email</th>
//             <th>Actions</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {deptEmp && Array.isArray(deptEmp) ? (
//             deptEmp.map(customer => (
//               // <tr key={`${customer.EmployeeID}-${customer.DepartmentID}`}>
//               <tr key={customer.EmployeeID}>
//                 <td>{customer.EmployeeID}</td>
//                 <td>{customer.DepartmentID}</td>
//                 <td>
//                   <button onClick={() => handleEditDeptEmp(customer)}>
//                     Edit
//                   </button>
//                   <button className="red-button" onClick={() => handleDeleteDeptEmp(customer.EmployeeID, customer.DepartmentID)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">Loading...</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <h2>Add New Department Employee</h2>
//       <div>
//         <label>Employee ID:</label>
//         <input
//           type="ID"
//           name="EmployeeID"
//           value={newDeptEmp.EmployeeID}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Department ID:</label>
//         <input
//           type="text"
//           name="DepartmentID"
//           value={newDeptEmp.DepartmentID}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button onClick={handleAddDeptEmp}>Add Department Employee</button>

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div>
//           <h2>Edit Department Employee</h2>
//           <div>
//             <label>Employee ID:</label>
//             <input
//               type="text"
//               name="EmployeeID"
//               value={editDeptEmp.EmployeeID}
//               disabled
//             />
//           </div>
//           <div>
//             <label>Department ID:</label>
//             <input
//               type="text"
//               name="DepartmentID"
//               value={editDeptEmp.DepartmentID}
//               onChange={(e) => setEditDeptEmp({ ...editDeptEmp, DepartmentID: e.target.value })}
//             />
//           </div>

//           <button onClick={handleUpdateDeptEmp}>Update Department Employee</button>
//           <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
//         </div>
//       )}
//       <br></br>
//       <br></br>
//     </div>
//   );
// }

// export default Customer;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Customer() {
  const [deptEmp, setDeptEmp] = useState([]);
  const [newDeptEmp, setNewDeptEmp] = useState({
    EmployeeID: '',
    DepartmentID: '',
  });
  const [editDeptEmp, setEditDeptEmp] = useState({
    EmployeeID: '',
    DepartmentID: '',
    NewDepartmentID: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Node.js server
    fetchDeptEmps();
  }, []);

  const fetchDeptEmps = () => {
    axios.get('http://localhost:8089/api/department-employees')
      .then(response => {
        console.log('Fetched Customers:', response.data);
        // Access the nested array within the data property
        setDeptEmp(response.data || []);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeptEmp(prevCustomer => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleAddDeptEmp = () => {
    axios.post('http://localhost:8089/api/department-employees', newDeptEmp)
      .then(response => {
        console.log('Added Department Employee:', response.data);
        // Fetch updated list of customers
        fetchDeptEmps();
        // Clear the input fields
        setNewDeptEmp({
          EmployeeID: '',
          DepartmentID: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteDeptEmp = (emp_id) => {
    axios.delete(`http://localhost:8089/api/department-employees/${emp_id}`)
      .then(response => {
        console.log('Deleted Department Employee:', response.data);
        // Fetch updated list of customers
        fetchDeptEmps();
      })
      .catch(error => console.error(error));
  };

  const handleEditDeptEmp = (customer) => {
    setEditDeptEmp(customer);
    setIsEditModalOpen(true);
  };

  // const handleUpdateDeptEmp = () => {
  //   axios.put(`http://localhost:8089/api/department-employees/${editDeptEmp.EmployeeID}`, editDeptEmp)
  //     .then(response => {
  //       console.log('Updated Department Employee:', response.data);
  //       // Fetch updated list of customers
  //       fetchDeptEmps();
  //       // Close the edit modal
  //       setIsEditModalOpen(false);
  //     })
  //     .catch(error => console.error(error));
  // };

  const handleUpdateDeptEmp = () => {
    axios.put(`http://localhost:8089/api/department-employees/${editDeptEmp.EmployeeID}/${editDeptEmp.DepartmentID}`, {
      NewDepartmentID: editDeptEmp.NewDepartmentID // Use NewDepartmentID here
    })
      .then(response => {
        console.log('Updated Department Employee:', response.data);
        fetchDeptEmps();
        setIsEditModalOpen(false);
      })
      .catch(error => console.error(error));
  };



  return (
    <div className="container">
      <h1>Department Employee Records</h1>
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
            <th>Department ID</th>
          </tr>
        </thead>
        <tbody>
          {deptEmp && Array.isArray(deptEmp) ? (
            deptEmp.map(customer => (
              <tr key={`${customer.EmployeeID}-${customer.DepartmentID}`}>
                <td>{customer.EmployeeID}</td>
                <td>{customer.DepartmentID}</td>
                <td>
                  <button onClick={() => handleEditDeptEmp(customer)}>
                    Edit
                  </button>
                  <button className="red-button" onClick={() => handleDeleteDeptEmp(customer.EmployeeID)}>
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

      <h2>Add New Department Employee</h2>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="EmployeeID"
          value={newDeptEmp.EmployeeID}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Department ID:</label>
        <input
          type="text"
          name="DepartmentID"
          value={newDeptEmp.DepartmentID}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddDeptEmp}>Add Department Employee</button>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Department Employee</h2>
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              name="EmployeeID"
              value={editDeptEmp.EmployeeID}
              disabled
            />
          </div>
          <div>
            <label>Department ID:</label>
            <input
              type="text"
              name="DepartmentID"
              value={editDeptEmp.DepartmentID}
              onChange={(e) => setEditDeptEmp({ ...editDeptEmp, DepartmentID: e.target.value })}
            />
          </div>
          <div>
            <label>New Department ID:</label>
            <input
              type="text"
              name="NewDepartmentID"
              value={editDeptEmp.NewDepartmentID}
              onChange={(e) => setEditDeptEmp({ ...editDeptEmp, NewDepartmentID: e.target.value })}
            />
          </div>


          <button onClick={handleUpdateDeptEmp}>Update Department Employee</button>
          <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </div>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default Customer;