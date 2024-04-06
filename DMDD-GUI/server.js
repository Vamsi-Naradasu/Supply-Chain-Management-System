const express = require("express");
const sql = require("mssql");

const app = express();
const PORT = 8089;

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json());
if(process.env.NODE_ENV === "production"){
    require("dotenv").config();
}


var config = {
    user: 'bhagya',
  password: 'Poems@123',
  server: 'ecom-p4-group18.database.windows.net',
  database: 'ecommerce',
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: false, // Do not trust self-signed certificates
  },
}

const db = sql.connect(config, function(err){
    if(err) throw err;
    console.log("Database Connected");
});

// GET all customers
app.get('/api/customers', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM customer');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single customer by ID
  app.get('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM customer WHERE customer_id = ${customerId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new customer
  app.post('/api/customers', async (req, res) => {
    const newCustomer = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO customer (customer_id, customer_name, customer_phone, customer_email) 
                     VALUES (${newCustomer.customer_id},${newCustomer.customer_name}, ${newCustomer.customer_phone}, ${newCustomer.customer_email})`;
      res.json({ message: 'Customer added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing customer by ID
  app.put('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    const updatedCustomer = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE customer SET 
                     customer_name = ${updatedCustomer.customer_name}, 
                     customer_phone = ${updatedCustomer.customer_phone}, 
                     customer_email = ${updatedCustomer.customer_email} 
                     WHERE customer_id = ${customerId}`;
      res.json({ message: 'Customer updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a customer by ID
  app.delete('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM customer WHERE customer_id = ${customerId}`;
      res.json({ message: 'Customer deleted successfully' });
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
      const result = await sql.query('SELECT * FROM product');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single product by ID
  app.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM product WHERE product_id = ${productId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new product
  app.post('/api/products', async (req, res) => {
    const newProduct = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO product (product_id, product_name, product_description, product_selling_price, product_catalog_id) 
                     VALUES (${newProduct.product_id}, ${newProduct.product_name}, ${newProduct.product_description}, ${newProduct.product_selling_price}, ${newProduct.product_catalog_id})`;
      res.json({ message: 'Product added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing product by ID
  app.put('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE product SET 
                     product_name = ${updatedProduct.product_name}, 
                     product_description = ${updatedProduct.product_description}, 
                     product_selling_price = ${updatedProduct.product_selling_price}, 
                     product_catalog_id = ${updatedProduct.product_catalog_id} 
                     WHERE product_id = ${productId}`;
      res.json({ message: 'Product updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a product by ID
  app.delete('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM product WHERE product_id = ${productId}`;
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  

// Import required modules and setup express app

// GET all inquiries
app.get('/api/inquiries', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM inquiry');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single inquiry by ID
  app.get('/api/inquiries/:id', async (req, res) => {
    const inquiryId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM inquiry WHERE inquiry_id = ${inquiryId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new inquiry
  app.post('/api/inquiries', async (req, res) => {
    const newInquiry = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO inquiry (inquiry_id, inquiry_reason, inquiry_date, inquiry_status, customer_id) 
                     VALUES (${newInquiry.inquiry_id}, ${newInquiry.inquiry_reason}, ${newInquiry.inquiry_date}, ${newInquiry.inquiry_status}, ${newInquiry.customer_id})`;
      res.json({ message: 'Inquiry added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing inquiry by ID
  app.put('/api/inquiries/:id', async (req, res) => {
    const inquiryId = req.params.id;
    const updatedInquiry = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE inquiry SET 
                     inquiry_reason = ${updatedInquiry.inquiry_reason}, 
                     inquiry_date = ${updatedInquiry.inquiry_date}, 
                     inquiry_status = ${updatedInquiry.inquiry_status}, 
                     customer_id = ${updatedInquiry.customer_id} 
                     WHERE inquiry_id = ${inquiryId}`;
      res.json({ message: 'Inquiry updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE an inquiry by ID
  app.delete('/api/inquiries/:id', async (req, res) => {
    const inquiryId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM inquiry WHERE inquiry_id = ${inquiryId}`;
      res.json({ message: 'Inquiry deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  
// GET all orders
app.get('/api/orders', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM [order]');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single order by ID
  app.get('/api/orders/:id', async (req, res) => {
    const orderId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM [order] WHERE order_id = ${orderId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new order
  app.post('/api/orders', async (req, res) => {
    const newOrder = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO [order] (order_id, order_date, order_total_price, customer_id) 
                     VALUES (${newOrder.order_id}, ${newOrder.order_date}, ${newOrder.order_total_price}, ${newOrder.customer_id})`;
      res.json({ message: 'Order added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing order by ID
  app.put('/api/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    const updatedOrder = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE [order] SET 
                     order_date = ${updatedOrder.order_date}, 
                     order_total_price = ${updatedOrder.order_total_price}, 
                     customer_id = ${updatedOrder.customer_id} 
                     WHERE order_id = ${orderId}`;
      res.json({ message: 'Order updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE an order by ID
  app.delete('/api/orders/:id', async (req, res) => {
    const orderId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM [order] WHERE order_id = ${orderId}`;
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
// GET all order items
app.get('/api/order_items', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM order_item');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single order item by ID
  app.get('/api/order_items/:id', async (req, res) => {
    const orderItemId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM order_item WHERE order_item_id = ${orderItemId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new order item
  app.post('/api/order_items', async (req, res) => {
    const newOrderItem = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO order_item (order_item_id, order_item_quantity, order_item_totalprice, order_id, stock_id) 
                     VALUES (${newOrderItem.order_item_id}, ${newOrderItem.order_item_quantity}, ${newOrderItem.order_item_totalprice}, ${newOrderItem.order_id}, ${newOrderItem.stock_id})`;
      res.json({ message: 'Order item added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing order item by ID
  app.put('/api/order_items/:id', async (req, res) => {
    const orderItemId = req.params.id;
    const updatedOrderItem = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE order_item SET 
                     order_item_quantity = ${updatedOrderItem.order_item_quantity}, 
                     order_item_totalprice = ${updatedOrderItem.order_item_totalprice}, 
                     order_id = ${updatedOrderItem.order_id}, 
                     stock_id = ${updatedOrderItem.stock_id} 
                     WHERE order_item_id = ${orderItemId}`;
      res.json({ message: 'Order item updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE an order item by ID
  app.delete('/api/order_items/:id', async (req, res) => {
    const orderItemId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM order_item WHERE order_item_id = ${orderItemId}`;
      res.json({ message: 'Order item deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
// GET all product catalogs
app.get('/api/product_catalogs', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM product_catalog');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single product catalog by ID
  app.get('/api/product_catalogs/:id', async (req, res) => {
    const productCatalogId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM product_catalog WHERE product_catalog_id = ${productCatalogId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new product catalog
  app.post('/api/product_catalogs', async (req, res) => {
    const newProductCatalog = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO product_catalog (product_catalog_id, product_type) 
                     VALUES (${newProductCatalog.product_catalog_id}, ${newProductCatalog.product_type})`;
      res.json({ message: 'Product catalog added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing product catalog by ID
  app.put('/api/product_catalogs/:id', async (req, res) => {
    const productCatalogId = req.params.id;
    const updatedProductCatalog = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE product_catalog SET 
                     product_type = ${updatedProductCatalog.product_type} 
                     WHERE product_catalog_id = ${productCatalogId}`;
      res.json({ message: 'Product catalog updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a product catalog by ID
  app.delete('/api/product_catalogs/:id', async (req, res) => {
    const productCatalogId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM product_catalog WHERE product_catalog_id = ${productCatalogId}`;
      res.json({ message: 'Product catalog deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
// GET all retailers
app.get('/api/retailers', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM retailer');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single retailer by ID
  app.get('/api/retailers/:id', async (req, res) => {
    const retailerId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM retailer WHERE retailer_id = ${retailerId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new retailer
  app.post('/api/retailers', async (req, res) => {
    const newRetailer = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO retailer (retailer_id, retailer_name, retailer_address, retailer_phone_no) 
                     VALUES (${newRetailer.retailer_id}, ${newRetailer.retailer_name}, ${newRetailer.retailer_address}, ${newRetailer.retailer_phone_no})`;
      res.json({ message: 'Retailer added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing retailer by ID
  app.put('/api/retailers/:id', async (req, res) => {
    const retailerId = req.params.id;
    const updatedRetailer = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE retailer SET 
                     retailer_name = ${updatedRetailer.retailer_name}, 
                     retailer_address = ${updatedRetailer.retailer_address}, 
                     retailer_phone_no = ${updatedRetailer.retailer_phone_no} 
                     WHERE retailer_id = ${retailerId}`;
      res.json({ message: 'Retailer updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a retailer by ID
  app.delete('/api/retailers/:id', async (req, res) => {
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
  
// GET all return requests
app.get('/api/return_requests', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM return_request');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single return request by ID
  app.get('/api/return_requests/:id', async (req, res) => {
    const returnRequestId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM return_request WHERE return_request_id = ${returnRequestId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new return request
  app.post('/api/return_requests', async (req, res) => {
    const newReturnRequest = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO return_request (return_request_id, return_req_date, return_req_reason, order_item_id) 
                     VALUES (${newReturnRequest.return_request_id}, ${newReturnRequest.return_req_date}, ${newReturnRequest.return_req_reason}, ${newReturnRequest.order_item_id})`;
      res.json({ message: 'Return request added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing return request by ID
  app.put('/api/return_requests/:id', async (req, res) => {
    const returnRequestId = req.params.id;
    const updatedReturnRequest = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE return_request SET 
                     return_req_date = ${updatedReturnRequest.return_req_date}, 
                     return_req_reason = ${updatedReturnRequest.return_req_reason}, 
                     order_item_id = ${updatedReturnRequest.order_item_id} 
                     WHERE return_request_id = ${returnRequestId}`;
      res.json({ message: 'Return request updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a return request by ID
  app.delete('/api/return_requests/:id', async (req, res) => {
    const returnRequestId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM return_request WHERE return_request_id = ${returnRequestId}`;
      res.json({ message: 'Return request deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
// GET all reviews
app.get('/api/reviews', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM review');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single review by ID
  app.get('/api/reviews/:id', async (req, res) => {
    const reviewId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM review WHERE review_id = ${reviewId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new review
  app.post('/api/reviews', async (req, res) => {
    const newReview = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO review (review_id, review_description, review_rating, customer_id, product_id) 
                     VALUES (${newReview.review_id}, ${newReview.review_description}, ${newReview.review_rating}, ${newReview.customer_id}, ${newReview.product_id})`;
      res.json({ message: 'Review added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing review by ID
  app.put('/api/reviews/:id', async (req, res) => {
    const reviewId = req.params.id;
    const updatedReview = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE review SET 
                     review_description = ${updatedReview.review_description}, 
                     review_rating = ${updatedReview.review_rating}, 
                     customer_id = ${updatedReview.customer_id}, 
                     product_id = ${updatedReview.product_id} 
                     WHERE review_id = ${reviewId}`;
      res.json({ message: 'Review updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a review by ID
  app.delete('/api/reviews/:id', async (req, res) => {
    const reviewId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM review WHERE review_id = ${reviewId}`;
      res.json({ message: 'Review deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
// GET all shipments
app.get('/api/shipments', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM shipment');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single shipment by ID
  app.get('/api/shipments/:id', async (req, res) => {
    const shipmentId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM shipment WHERE shipment_id = ${shipmentId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new shipment
  app.post('/api/shipments', async (req, res) => {
    const newShipment = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO shipment (shipment_id, shipment_date, shipment_status, tracking_number, price_of_shipment, shipment_address_id, order_id) 
                     VALUES (${newShipment.shipment_id}, ${newShipment.shipment_date}, ${newShipment.shipment_status}, ${newShipment.tracking_number}, ${newShipment.price_of_shipment}, ${newShipment.shipment_address_id}, ${newShipment.order_id})`;
      res.json({ message: 'Shipment added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing shipment by ID
  app.put('/api/shipments/:id', async (req, res) => {
    const shipmentId = req.params.id;
    const updatedShipment = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE shipment SET 
                     shipment_date = ${updatedShipment.shipment_date}, 
                     shipment_status = ${updatedShipment.shipment_status}, 
                     tracking_number = ${updatedShipment.tracking_number}, 
                     price_of_shipment = ${updatedShipment.price_of_shipment}, 
                     shipment_address_id = ${updatedShipment.shipment_address_id}, 
                     order_id = ${updatedShipment.order_id} 
                     WHERE shipment_id = ${shipmentId}`;
      res.json({ message: 'Shipment updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a shipment by ID
  app.delete('/api/shipments/:id', async (req, res) => {
    const shipmentId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM shipment WHERE shipment_id = ${shipmentId}`;
      res.json({ message: 'Shipment deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
// GET all shipment addresses
app.get('/api/shipment_addresses', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM shipment_address');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single shipment address by ID
  app.get('/api/shipment_addresses/:id', async (req, res) => {
    const shipmentAddressId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM shipment_address WHERE shipment_address_id = ${shipmentAddressId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new shipment address
  app.post('/api/shipment_addresses', async (req, res) => {
    const newShipmentAddress = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO shipment_address (shipment_address_id, street, city, state, zip_code, country) 
                     VALUES (${newShipmentAddress.shipment_address_id}, ${newShipmentAddress.street}, ${newShipmentAddress.city}, ${newShipmentAddress.state}, ${newShipmentAddress.zip_code}, ${newShipmentAddress.country})`;
      res.json({ message: 'Shipment address added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing shipment address by ID
  app.put('/api/shipment_addresses/:id', async (req, res) => {
    const shipmentAddressId = req.params.id;
    const updatedShipmentAddress = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE shipment_address SET 
                     street = ${updatedShipmentAddress.street}, 
                     city = ${updatedShipmentAddress.city}, 
                     state = ${updatedShipmentAddress.state}, 
                     zip_code = ${updatedShipmentAddress.zip_code}, 
                     country = ${updatedShipmentAddress.country} 
                     WHERE shipment_address_id = ${shipmentAddressId}`;
      res.json({ message: 'Shipment address updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a shipment address by ID
  app.delete('/api/shipment_addresses/:id', async (req, res) => {
    const shipmentAddressId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM shipment_address WHERE shipment_address_id = ${shipmentAddressId}`;
      res.json({ message: 'Shipment address deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
// GET all stocks
app.get('/api/stocks', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM stock');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // GET a single stock by ID
  app.get('/api/stocks/:id', async (req, res) => {
    const stockId = req.params.id;
  
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM stock WHERE stock_id = ${stockId}`;
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // POST a new stock
  app.post('/api/stocks', async (req, res) => {
    const newStock = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`INSERT INTO stock (stock_id, quantity, price, product_id, retailer_id) 
                     VALUES (${newStock.stock_id}, ${newStock.quantity}, ${newStock.price}, ${newStock.product_id}, ${newStock.retailer_id})`;
      res.json({ message: 'Stock added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // PUT (Update) an existing stock by ID
  app.put('/api/stocks/:id', async (req, res) => {
    const stockId = req.params.id;
    const updatedStock = req.body;
  
    try {
      await sql.connect(config);
      await sql.query`UPDATE stock SET 
                     quantity = ${updatedStock.quantity}, 
                     price = ${updatedStock.price}, 
                     product_id = ${updatedStock.product_id}, 
                     retailer_id = ${updatedStock.retailer_id} 
                     WHERE stock_id = ${stockId}`;
      res.json({ message: 'Stock updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
  // DELETE a stock by ID
  app.delete('/api/stocks/:id', async (req, res) => {
    const stockId = req.params.id;
  
    try {
      await sql.connect(config);
      await sql.query`DELETE FROM stock WHERE stock_id = ${stockId}`;
      res.json({ message: 'Stock deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  });
  
app.listen(PORT, function(){
    console.log("Server is running!")
})