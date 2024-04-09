const express = require("express");
const sql = require("mssql");

const app = express();
const PORT = 8089;

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
}


var config = {
  user: 'SA',
  password: 'Password123',
  server: 'localhost',
  database: 'SMS',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for Azure SQL, set to true
    trustServerCertificate: true // trust self-signed certificates
  },
}

console.log(config)

const db = sql.connect(config, function (err) {
  if (err) throw err;
  console.log("Database Connected");
});

console.log(db)

// GET all departments
app.get('/api/departments', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Department');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single department by ID
app.get('/api/departments/:id', async (req, res) => {
  const departmentId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Department WHERE DepartmentID = ${departmentId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new department
app.post('/api/departments', async (req, res) => {
  const newDepartment = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Department (DepartmentID, DepartmentName, PhoneNumber, Location) 
                     VALUES (${newDepartment.DepartmentID},${newDepartment.DepartmentName}, ${newDepartment.PhoneNumber}, ${newDepartment.Location})`;
    res.json({ message: 'Department added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing department by ID
app.put('/api/departments/:id', async (req, res) => {
  const dept_id = req.params.id;
  const updatedCustomer = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE Department SET 
                     DepartmentName = ${updatedCustomer.DepartmentName}, 
                     PhoneNumber = ${updatedCustomer.PhoneNumber}, 
                     Location = ${updatedCustomer.Location} 
                     WHERE DepartmentID = ${dept_id}`;
    res.json({ message: 'Department updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a department by ID
app.delete('/api/departments/:id', async (req, res) => {
  const deptId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Department WHERE DepartmentID = ${deptId}`;
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all department employees
app.get('/api/department-employees', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM DepartmentEmployee');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all department employees
app.get('/api/department-employees', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM DepartmentEmployee');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single dept emp by ID
app.get('/api/department-employees/:id', async (req, res) => {
  const empId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM DepartmentEmployee WHERE EmployeeID = ${empId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new dept emp
app.post('/api/department-employees', async (req, res) => {
  const newDeptEmp = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO DepartmentEmployee (EmployeeID, DepartmentID) 
                   VALUES (${newDeptEmp.EmployeeID}, ${newDeptEmp.DepartmentID})`;
    res.json({ message: 'DepartmentEmployee added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

//Update department-employees
app.put('/api/department-employees/:employeeId/:departmentId', async (req, res) => {
  const { employeeId, departmentId } = req.params;
  const updatedDeptEmp = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE DepartmentEmployee SET 
                   DepartmentID = ${updatedDeptEmp.NewDepartmentID} 
                   WHERE EmployeeID = ${updatedDeptEmp.EmployeeID} AND DepartmentID = ${updatedDeptEmp.DepartmentID}`;
    res.json({ message: 'DepartmentEmployee updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a dept emp by ID
app.delete('/api/department-employees/:id', async (req, res) => {
  const emp_id = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM DepartmentEmployee WHERE EmployeeID = ${emp_id}`;
    res.json({ message: 'DepartmentEmployee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Employee');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single employee by ID
app.get('/api/employees/:id', async (req, res) => {
  const inquiryId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Employee WHERE EmployeeID = ${inquiryId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new employee
app.post('/api/employees', async (req, res) => {
  const newInquiry = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Employee (EmployeeID, FirstName, LastName, Position, Salary) 
                VALUES (${newInquiry.EmployeeID}, ${newInquiry.FirstName}, ${newInquiry.LastName}, ${newInquiry.Position}, ${newInquiry.Salary})`;
    res.json({ message: 'Employee added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing employee by ID
app.put('/api/employees/:id', async (req, res) => {
  const empId = req.params.id;
  const updatedInquiry = req.body;
  try {
    await sql.connect(config);
    await sql.query`UPDATE Employee SET 
                     FirstName = ${updatedInquiry.FirstName}, 
                     LastName = ${updatedInquiry.LastName}, 
                     Position = ${updatedInquiry.Position}, 
                     Salary = ${updatedInquiry.Salary} 
                     WHERE EmployeeID = ${empId}`;
    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE an employee by ID
app.delete('/api/employees/:id', async (req, res) => {
  const inquiryId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Employee WHERE EmployeeID = ${inquiryId}`;
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});


// GET all invoices
app.get('/api/invoices', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Invoice');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single invoice by ID
app.get('/api/invoices/:id', async (req, res) => {
  const invoiceId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Invoice WHERE InvoiceID = ${invoiceId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new invoice
app.post('/api/invoices', async (req, res) => {
  const newInvoice = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Invoice (InvoiceID, VendorID, DepartmentID, TotalAmount, VendorPaymentType) 
                     VALUES (${newInvoice.InvoiceID}, ${newInvoice.VendorID}, ${newInvoice.DepartmentID}, ${newInvoice.TotalAmount}, ${newInvoice.VendorPaymentType})`;
    res.json({ message: 'Invoice added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing invoice by ID
app.put('/api/invoices/:id', async (req, res) => {
  const invoiceId = req.params.id;
  const updatedOrder = req.body;

  try {
    await sql.connect(config);
    // await sql.query`UPDATE Invoice SET 
    //               VendorID = ${updatedOrder.VendorID}, 
    //               DepartmentID = ${updatedOrder.DepartmentID}, 
    //               TotalAmount = ${updatedOrder.TotalAmount}, 
    //               VendorPaymentType = '${updatedOrder.VendorPaymentType}'
    //               WHERE InvoiceID = ${invoiceId}`;
    const query = `UPDATE Invoice SET 
              VendorID = ${updatedOrder.VendorID}, 
              DepartmentID = ${updatedOrder.DepartmentID}, 
              TotalAmount = ${updatedOrder.TotalAmount}, 
              VendorPaymentType = '${updatedOrder.VendorPaymentType}'
              WHERE InvoiceID = ${invoiceId}`;
console.log(query);
await sql.query(query);

    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});


// DELETE an invoice by ID
app.delete('/api/invoices/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Invoice WHERE InvoiceID = ${orderId}`;
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Product');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single products by ID
app.get('/api/products/:id', async (req, res) => {
  const prodID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Product WHERE ProductID = ${prodID}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new products
app.post('/api/products', async (req, res) => {
  const prod = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Product (ProductID, EmployeeID, DepartmentID, ProductName, Color, Weight, Cost, Price) 
                   VALUES (${prod.ProductID}, ${prod.EmployeeID}, ${prod.DepartmentID}, ${prod.ProductName}, ${prod.Color}, ${prod.Weight}, ${prod.Cost}, ${prod.Price})`;
    res.json({ message: 'Order item added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing products by ID
app.put('/api/products/:id', async (req, res) => {
  const prodID = req.params.id;
  const updatedOrderItem = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE Product SET 
                   ProductName = ${updatedOrderItem.ProductName}, 
                   Color = ${updatedOrderItem.Color}, 
                   Weight = ${updatedOrderItem.Eeight}, 
                   Cost = ${updatedOrderItem.Cost},
                   Price = ${updatedOrderItem.Price}
                   WHERE ProductID = ${prodID}`;
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE an products by ID
app.delete('/api/products/:id', async (req, res) => {
  const prodID = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Product WHERE ProductID = ${prodID}`;
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all product line
app.get('/api/product_lines', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ProductLine');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single product line by ID
app.get('/api/product_lines/:id', async (req, res) => {
  const productCatalogId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM ProductLine WHERE ProductID = ${productCatalogId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new product line
app.post('/api/product_lines', async (req, res) => {
  const newProductCatalog = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO ProductLine (ProductID, LineID) 
                     VALUES (${newProductCatalog.product_id}, ${newProductCatalog.line_id})`;
    res.json({ message: 'ProductLine added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing product line by ID
app.put('/api/product_lines/:id', async (req, res) => {
  const productCatalogId = req.params.id;
  const updatedProductCatalog = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE ProductLine SET 
                     LineID = ${updatedProductCatalog.line_id} 
                     WHERE ProductID = ${productCatalogId}`;
    res.json({ message: 'Product Line updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a product line by ID
app.delete('/api/product_lines/:id', async (req, res) => {
  const productCatalogId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM ProductLine WHERE ProductID = ${productCatalogId}`;
    res.json({ message: 'Product Line deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all product materials
app.get('/api/product_materials', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ProductMaterial');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single product material by ID
app.get('/api/product_materials/:id', async (req, res) => {
  const retailerId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM ProductMaterial WHERE ProductID = ${retailerId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new product material
app.post('/api/product_materials', async (req, res) => {
  const newRetailer = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO ProductMaterial (ProductID, MaterialID) 
                     VALUES (${newRetailer.product_id}, ${newRetailer.material_id})`;
    res.json({ message: 'Retailer added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing retailer by ID
// app.put('/api/product_materials/:id', async (req, res) => {
//   const retailerId = req.params.id;
//   const updatedRetailer = req.body;

//   try {
//     await sql.connect(config);
//     await sql.query`UPDATE ProductMaterial SET 
//                    MaterialID = ${updatedRetailer.material_id}, 
//                    WHERE ProductID = ${retailerId}` AND MaterialID = ${};
//     res.json({ message: 'Retailer updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     sql.close();
//   }
// });

// PUT (Update) an existing product material by ProductID and MaterialID
app.put('/api/product_materials/:productId/:materialId', async (req, res) => {
  const productId = req.params.productId;
  const materialId = req.params.materialId;
  const updatedMaterial = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE ProductMaterial SET 
                   MaterialID = ${updatedMaterial.newMaterialId}
                   WHERE ProductID = ${productId} AND MaterialID = ${materialId}`;
    res.json({ message: 'Product material updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a product material by ID
app.delete('/api/product_materials/:id', async (req, res) => {
  const retailerId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM retailer WHERE retailer_id = ${retailerId}`;
    res.json({ message: 'Retailer deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all Production Employees
app.get('/api/prod_emps', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ProductionEmployee');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single Production Employee by ID
app.get('/api/prod_emps/:id', async (req, res) => {
  const returnRequestId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM ProductionEmployee WHERE EmployeeID = ${returnRequestId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new Production Employees
app.post('/api/prod_emps', async (req, res) => {
  const newReturnRequest = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO ProductionEmployee (EmployeeID, LineID) 
                     VALUES (${newReturnRequest.emp_id}, ${newReturnRequest.line_id})`;
    res.json({ message: 'Return request added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing Production Employee by ID
app.put('/api/prod_emps/:id', async (req, res) => {
  const returnRequestId = req.params.id;
  const updatedReturnRequest = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE ProductionEmployee SET 
                     LineID = ${updatedReturnRequest.line_id}, 
                     WHERE EmployeeID = ${returnRequestId}`;
    res.json({ message: 'Return request updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a Production Employee by ID
app.delete('/api/prod_emps/:id', async (req, res) => {
  const returnRequestId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM ProductionEmployee WHERE EmployeeID = ${returnRequestId}`;
    res.json({ message: 'Return request deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all production lines
app.get('/api/production_lines', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ProductionLine');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single production line by ID
app.get('/api/production_lines/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM ProductionLine WHERE LineID = ${reviewId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new production line
app.post('/api/production_lines', async (req, res) => {
  const newReview = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO ProductionLine (LineID, LineCapacity, [Address], ManagerID) VALUES 
                     VALUES (${newReview.line_id}, ${newReview.capacity}, ${newReview.address}, ${newReview.manager_id})`;
    res.json({ message: 'Review added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing production line by ID
app.put('/api/production_lines/:id', async (req, res) => {
  const reviewId = req.params.id;
  const updatedReview = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE ProductionLine SET 
                     LineCapacity = ${updatedReview.review_description}, 
                     [Address] = ${updatedReview.review_rating}, 
                     ManagerID = ${updatedReview.customer_id}, 
                     WHERE LineID = ${reviewId}`;
    res.json({ message: 'Review updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a production line by ID
app.delete('/api/production_lines/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM ProductionLine WHERE LineID = ${reviewId}`;
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all raw material
app.get('/api/raw_materials', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM RawMaterial');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single raw material by ID
app.get('/api/raw_materials/:id', async (req, res) => {
  const shipmentId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM RawMaterial WHERE MaterialID = ${shipmentId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new raw material
app.post('/api/raw_materials', async (req, res) => {
  const newShipment = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO RawMaterial (MaterialID, WarehouseID, RawMaterialName) VALUES 
                     VALUES (${newShipment.material_id}, ${newShipment.warehouse_id}, ${newShipment.rawmaterial_name})`;
    res.json({ message: 'Raw material added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing raw material by ID
app.put('/api/raw_materials/:id', async (req, res) => {
  const shipmentId = req.params.id;
  const updatedShipment = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE RawMaterial SET 
                     WarehouseID = ${updatedShipment.shipment_date}, 
                     RawMaterialName = ${updatedShipment.shipment_status}, 
                     WHERE MaterialID = ${shipmentId}`;
    res.json({ message: 'Raw material updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a Raw Material by ID
app.delete('/api/raw_materials/:id', async (req, res) => {
  const shipmentId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM RawMaterial WHERE MaterialID = ${shipmentId}`;
    res.json({ message: 'Raw material deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all shipment addresses
app.get('/api/supply_schedules', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM SupplySchedule');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a single Supply Schedule by ID
app.get('/api/supply_schedules/:id', async (req, res) => {
  const shipmentAddressId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM SupplySchedule WHERE SupplyID = ${shipmentAddressId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a new Supply Schedule
app.post('/api/supply_schedules', async (req, res) => {
  const newShipmentAddress = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO SupplySchedule (SupplyID, MaterialID, VendorID, WarehouseID, Quantity) 
                     VALUES (${newShipmentAddress.supply_id}, ${newShipmentAddress.material_id}, ${newShipmentAddress.vendor_id}, ${newShipmentAddress.warehouse_id}, ${newShipmentAddress.quantity})`;
    res.json({ message: 'Supply Schedule added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing Supply Schedule by ID
app.put('/api/supply_schedules/:id', async (req, res) => {
  const shipmentAddressId = req.params.id;
  const updatedShipmentAddress = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE SupplySchedule SET 
                     MaterialID = ${updatedShipmentAddress.street}, 
                     VendorID = ${updatedShipmentAddress.city}, 
                     WarehouseID = ${updatedShipmentAddress.state}, 
                     Quantity = ${updatedShipmentAddress.zip_code}, 
                     WHERE SupplyID = ${shipmentAddressId}`;
    res.json({ message: 'Supply Schedule updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a Supply Schedule by ID
app.delete('/api/supply_schedules/:id', async (req, res) => {
  const shipmentAddressId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM SupplySchedule WHERE SupplyID = ${shipmentAddressId}`;
    res.json({ message: 'Supply Schedule deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all Vendors
app.get('/api/vendors', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Vendor');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a Vendor by ID
app.get('/api/vendors/:id', async (req, res) => {
  const stockId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Vendor WHERE VendorID = ${stockId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a Vendor
app.post('/api/vendors', async (req, res) => {
  const newStock = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Vendor (VendorID, VendorName, [Address], PhoneNumber, Speciality) 
                     VALUES (${newStock.VendorID}, ${newStock.VendorName}, ${newStock.Address}, ${newStock.PhoneNumber}, ${newStock.Speciality})`;
    res.json({ message: 'Vendor added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing Vendor by ID
app.put('/api/vendors/:id', async (req, res) => {
  const stockId = req.params.id;
  const updatedStock = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE Vendor SET 
                     VendorName = ${updatedStock.VendorName}, 
                     [Address] = ${updatedStock.Address}, 
                     PhoneNumber = ${updatedStock.PhoneNumber},
                     Speciality = ${updatedStock.Speciality},
                     WHERE VendorID = ${stockId}`;
    res.json({ message: 'Vendor updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a Vendor by ID
app.delete('/api/vendors/:id', async (req, res) => {
  const stockId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Vendor WHERE VendorID = ${stockId}`;
    res.json({ message: 'Vendor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all Warehouses
app.get('/api/warehouses', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Warehouse');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a Warehouses by ID
app.get('/api/warehouses/:id', async (req, res) => {
  const stockId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Warehouse WHERE WarehouseID = ${stockId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a Warehouses
app.post('/api/warehouses', async (req, res) => {
  const newStock = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Warehouse (WarehouseID, [Address], PhoneNumber, ManagerID) 
                   VALUES (${newStock.WarehouseID}, ${newStock.Address}, ${newStock.PhoneNumber}, ${newStock.ManagerID})`;
    res.json({ message: 'Warehouse added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing Warehouses by ID
app.put('/api/warehouses/:id', async (req, res) => {
  const stockId = req.params.id;
  const updatedStock = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE Warehouse SET 
                   [Address] = ${updatedStock.Address}, 
                   PhoneNumber = ${updatedStock.PhoneNumber},
                   ManagerID = ${updatedStock.ManagerID},
                   WHERE WarehouseID = ${stockId}`;
    res.json({ message: 'Warehouse updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a Warehouses by ID
app.delete('/api/warehouses/:id', async (req, res) => {
  const stockId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Warehouse WHERE WarehouseID = ${stockId}`;
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET all Warehouse Employee
app.get('/api/warehouse_employees', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM WarehouseEmployee');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// GET a Warehouse Employee by ID
app.get('/api/warehouse_employees/:id', async (req, res) => {
  const stockId = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM WarehouseEmployee WHERE EmployeeID = ${stockId}`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// POST a Warehouse Employee
app.post('/api/warehouse_employees', async (req, res) => {
  const newStock = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO WarehouseEmployee (EmployeeID, WarehouseID) 
                   VALUES (${newStock.EmployeeID}, ${newStock.WarehouseID})`;
    res.json({ message: 'Warehouse Employee added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// PUT (Update) an existing Warehouse Employee by ID
app.put('/api/warehouse_employees/:id', async (req, res) => {
  const stockId = req.params.id;
  const updatedStock = req.body;

  try {
    await sql.connect(config);
    await sql.query`UPDATE WarehouseEmployee SET 
                   WarehouseID = ${updatedStock.WarehouseID}, 
                   WHERE EmployeeID = ${stockId}`;
    res.json({ message: 'Warehouse Employee updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// DELETE a Warehouse Employee by ID
app.delete('/api/warehouse_employees/:id', async (req, res) => {
  const stockId = req.params.id;

  try {
    await sql.connect(config);
    await sql.query`DELETE FROM WarehouseEmployee WHERE EmployeeID = ${stockId}`;
    res.json({ message: 'Warehouse Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

app.listen(PORT, function () {
  console.log("Server is running!")
})