GO
USE SMS;
GO
-- Insert into Vendor with encryption
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 1, 'Global Supplies', '123 Main St', '1234567890', 'Electronics';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 2, 'Quality Parts', '456 Elm St', '2345678901', 'Mechanical';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 3, 'Tech Components', '789 Maple St', '3456789012', 'Electrical';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 4, 'Industrial Goods', '101 Oak St', '4567890123', 'Industrial';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 5, 'Material Masters', '202 Pine St', '5678901234', 'Raw Materials';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 6, 'Precision Tools', '303 Cedar St', '6789012345', 'Tools';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 7, 'Construction Co', '404 Birch St', '7890123456', 'Construction';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 8, 'Fabrication Finds', '505 Cherry St', '8901234567', 'Fabrication';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 9, 'Hardware Hub', '606 Walnut St', '9012345678', 'Hardware';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 10, 'Supply Solutions', '707 Willow St', '0123456789', 'General Supplies';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 11, 'Component Corp', '808 Ash St', '1234506789', 'Electronics';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 12, 'Allied Alloys', '909 Poplar St', '2345607891', 'Metals';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 13, 'Tool Time', '1010 Spruce St', '3456708912', 'Tools';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 14, 'Bright Builders', '1111 Redwood St', '4567809123', 'Construction';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 15, 'Parts Plus', '1212 Sequoia St', '5678901234', 'Mechanical';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 16, 'Hardware Heroes', '1313 Fir St', '6789012345', 'Hardware';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 17, 'Industrial Insights', '1414 Hemlock St', '7890123456', 'Industrial';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 18, 'Gadget Gurus', '1515 Sycamore St', '8901234567', 'Electronics';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 19, 'Quality Goods', '1616 Magnolia St', '9012345678', 'General Supplies';
EXEC dbo.InsertVendorWithEncryptedPhoneNumber 20, 'Material Masters', '1717 Dogwood St', '0123456789', 'Raw Materials';

GO
-- Print the encrypted and decrypted values
OPEN SYMMETRIC KEY Contact_Key
DECRYPTION BY CERTIFICATE Vendor_Cert;
SELECT [PhoneNumber] AS [Encrypted], CONVERT(nvarchar, DecryptByKey(PhoneNumber)) AS [Decrypted] FROM Vendor;   
CLOSE SYMMETRIC KEY Contact_Key;
GO

-- Insert records into Employee
INSERT INTO Employee (EmployeeID, FirstName, LastName, Position, Salary) VALUES
(1, 'John', 'Doe', 'Developer', 70000),
(2, 'Jane', 'Smith', 'Designer', 72000),
(3, 'Alice', 'Johnson', 'Developer', 71000),
(4, 'Chris', 'Lee', 'Project Manager', 90000),
(5, 'Dave', 'Brown', 'Analyst', 68000),
(6, 'Emma', 'Davis', 'Developer', 75000),
(7, 'Gary', 'Miller', 'Designer', 65000),
(8, 'Hannah', 'Wilson', 'Analyst', 67000),
(9, 'Ian', 'Moore', 'Sales Manager', 85000),
(10, 'Jessica', 'Taylor', 'Project Manager', 88000),
(11, 'Kyle', 'Anderson', 'Developer', 73000),
(12, 'Linda', 'Thomas', 'Designer', 62000),
(13, 'Michael', 'Jackson', 'Developer', 71000),
(14, 'Nancy', 'White', 'HR Manager', 83000),
(15, 'Oliver', 'Harris', 'Developer', 69000),
(16, 'Patricia', 'Martin', 'QA Tester', 61000),
(17, 'Quinn', 'Thompson', 'Developer', 72000),
(18, 'Rachel', 'Garcia', 'Support', 64000),
(19, 'Steven', 'Martinez', 'Analyst', 66000),
(20, 'Tina', 'Robinson', 'Project Manager', 87000);


-- Insert records into Department
INSERT INTO Department (DepartmentID, DepartmentName, PhoneNumber, Location) VALUES
(1, 'IT', '1234567890', 'Building A'),
(2, 'Human Resources', '1234567891', 'Building B'),
(3, 'Finance', '1234567892', 'Building C'),
(4, 'Sales', '1234567893', 'Building D'),
(5, 'Marketing', '1234567894', 'Building E'),
(6, 'Research and Development', '1234567895', 'Building F'),
(7, 'Customer Service', '1234567896', 'Building G'),
(8, 'Legal', '1234567897', 'Building H'),
(9, 'Operations', '1234567898', 'Building I'),
(10, 'Procurement', '1234567899', 'Building J'),
(11, 'Product', '1234567800', 'Building K'),
(12, 'Quality Assurance', '1234567801', 'Building L'),
(13, 'Administration', '1234567802', 'Building M'),
(14, 'IT Support', '1234567803', 'Building N'),
(15, 'Maintenance', '1234567804', 'Building O'),
(16, 'Security', '1234567805', 'Building P'),
(17, 'Shipping', '1234567806', 'Building Q'),
(18, 'Receiving', '1234567807', 'Building R'),
(19, 'Training', '1234567808', 'Building S'),
(20, 'Strategy', '1234567809', 'Building T');


-- Insert records into Warehouse
INSERT INTO Warehouse (WarehouseID, [Address], PhoneNumber, ManagerID) VALUES
(1, '201 Warehouse Plaza', '8001112222', 1),
(2, '202 Warehouse Plaza', '8001112223', 2),
(3, '203 Warehouse Plaza', '8001112224', 3),
(4, '204 Warehouse Plaza', '8001112225', 4),
(5, '205 Warehouse Plaza', '8001112226', 5),
(6, '206 Warehouse Plaza', '8001112227', 6),
(7, '207 Warehouse Plaza', '8001112228', 7),
(8, '208 Warehouse Plaza', '8001112229', 8),
(9, '209 Warehouse Plaza', '8001112230', 9),
(10, '210 Warehouse Plaza', '8001112231', 10),
(11, '211 Warehouse Plaza', '8001112232', 11),
(12, '212 Warehouse Plaza', '8001112233', 12),
(13, '213 Warehouse Plaza', '8001112234', 13),
(14, '214 Warehouse Plaza', '8001112235', 14),
(15, '215 Warehouse Plaza', '8001112236', 15),
(16, '216 Warehouse Plaza', '8001112237', 16),
(17, '217 Warehouse Plaza', '8001112238', 17),
(18, '218 Warehouse Plaza', '8001112239', 18),
(19, '219 Warehouse Plaza', '8001112240', 19),
(20, '220 Warehouse Plaza', '8001112241', 20);

-- Insert records into DepartmentEmployee
INSERT INTO DepartmentEmployee (EmployeeID, DepartmentID) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), -- 5 employees in Department 1
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2), -- 5 employees in Department 2
(11, 3), (12, 3), (13, 3), (14, 3), (15, 3), -- 5 employees in Department 3
(16, 4), (17, 4), (18, 4), (19, 4), (20, 4); -- 5 employees in Department 4

-- Insert records into Product
INSERT INTO Product (ProductID, EmployeeID, DepartmentID, ProductName, Color, Weight, Cost, Price) VALUES
(1, 1, 1, 'Widget Pro', 'Red', 10.2, 100.00, 120.00),
(2, 2, 1, 'Gizmo', 'Blue', 5.5, 50.00, 65.00),
(3, 3, 1, 'Thingamajig', 'Green', 15.0, 200.00, 240.00),
(4, 4, 1, 'Doodad', 'Purple', 7.7, 70.00, 85.00),
(5, 5, 1, 'Widget Lite', 'Yellow', 12.0, 110.00, 130.00),
(6, 6, 2, 'Gadget', 'White', 9.5, 90.00, 105.00),
(7, 7, 2, 'Contraption', 'Black', 8.8, 80.00, 100.00),
(8, 8, 2, 'Doohickey', 'Pink', 6.6, 60.00, 75.00),
(9, 9, 2, 'Whatchamacallit', 'Orange', 11.1, 120.00, 150.00),
(10, 10, 2, 'Gizmo Advance', 'Gray', 13.3, 130.00, 160.00),
(11, 11, 3, 'Apparatus', 'Red', 14.0, 140.00, 175.00),
(12, 12, 3, 'Mechanism', 'Blue', 4.4, 40.00, 52.00),
(13, 13, 3, 'Gadget Pro', 'Green', 6.2, 62.00, 78.00),
(14, 14, 3, 'Invention', 'Purple', 3.3, 33.00, 44.00),
(15, 15, 3, 'Device', 'Yellow', 5.1, 51.00, 67.00),
(16, 16, 4, 'Gizmo Ultra', 'White', 10.8, 108.00, 135.00),
(17, 17, 4, 'Widget Max', 'Black', 11.9, 119.00, 149.00),
(18, 18, 4, 'Contraption Plus', 'Pink', 13.4, 134.00, 168.00),
(19, 19, 4, 'Thingamabob', 'Orange', 12.5, 125.00, 156.00),
(20, 20, 4, 'Doohickey Deluxe', 'Gray', 14.8, 148.00, 185.00);

-- Insert records into WarehouseEmployee
INSERT INTO WarehouseEmployee (EmployeeID, WarehouseID) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 3),
(12, 3),
(13, 3),
(14, 3),
(15, 3),
(16, 4),
(17, 4),
(18, 4),
(19, 4),
(20, 4);

-- Insert record into the ProductionLine table
INSERT INTO ProductionLine (LineID, LineCapacity, [Address], ManagerID) VALUES
(1, 5, '101 Production Rd', 1),
(2, 4, '102 Production Rd', 2),
(3, 3, '103 Production Rd', 3),
(4, 2, '104 Production Rd', 4),
(5, 5, '105 Production Rd', 5),
(6, 4, '106 Production Rd', 6),
(7, 3, '107 Production Rd', 7),
(8, 2, '108 Production Rd', 8),
(9, 5, '109 Production Rd', 9),
(10, 4, '110 Production Rd', 10),
(11, 3, '111 Production Rd', 11),
(12, 2, '112 Production Rd', 12),
(13, 5, '113 Production Rd', 13),
(14, 4, '114 Production Rd', 14),
(15, 3, '115 Production Rd', 15),
(16, 2, '116 Production Rd', 16),
(17, 5, '117 Production Rd', 17),
(18, 4, '118 Production Rd', 18),
(19, 3, '119 Production Rd', 19),
(20, 2, '120 Production Rd', 20);

-- Insert record into the ProductionEmployee
INSERT INTO ProductionEmployee (EmployeeID, LineID) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(8, 4),
(9, 5),
(10, 5),
(11, 6),
(12, 6),
(13, 7),
(14, 7),
(15, 8),
(16, 8),
(17, 9),
(18, 9),
(19, 10),
(20, 10);

-- Insert record into the ProductLine
INSERT INTO ProductLine (ProductID, LineID) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(8, 4),
(9, 5),
(10, 5),
(11, 6),
(12, 6),
(13, 7),
(14, 7),
(15, 8),
(16, 8),
(17, 9),
(18, 9),
(19, 10),
(20, 10);

-- Note: The WarehouseID should be an existing ID from the Warehouse table
INSERT INTO RawMaterial (MaterialID, WarehouseID, RawMaterialName) VALUES
(1, 1, 'Aluminum'),
(2, 1, 'Steel'),
(3, 2, 'Copper'),
(4, 2, 'Brass'),
(5, 3, 'Plastic'),
(6, 3, 'Rubber'),
(7, 4, 'Glass'),
(8, 4, 'Wood'),
(9, 5, 'Fiber'),
(10, 5, 'Ceramic'),
(11, 6, 'Carbon Fiber'),
(12, 6, 'Silicon'),
(13, 7, 'Lead'),
(14, 7, 'Zinc'),
(15, 8, 'Nickel'),
(16, 8, 'Titanium'),
(17, 9, 'Graphite'),
(18, 9, 'Silver'),
(19, 10, 'Gold'),
(20, 10, 'Platinum');

-- Note: The ProductID should be an existing ID from the Product table
-- The MaterialID should be an existing ID from the RawMaterial table
INSERT INTO ProductMaterial (ProductID, MaterialID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);

-- Note: The VendorID should be an existing ID from the Vendor table
-- The PurchaseOrderNumber and InvoiceNumber should be unique
-- Assuming DepartmentIDs 1-10 already exist in the Department table
INSERT INTO Invoice (InvoiceID, VendorID, DepartmentID, TotalAmount, VendorPaymentType) VALUES
(1, 1, 1, 5000.00, 'Credit'),
(2, 2, 2, 7500.00, 'Credit'),
(3, 3, 3, 3000.00, 'Credit'),
(4, 4, 4, 4500.00, 'Cash'),
(5, 5, 5, 6000.00, 'Credit'),
(6, 6, 6, 3500.00, 'Cash'),
(7, 7, 7, 4000.00, 'Credit'),
(8, 8, 8, 5500.00, 'Cash'),
(9, 9, 9, 2500.00, 'Credit'),
(10, 10, 10, 5000.00, 'Cash'),
(11, 11, 1, 7000.00, 'Credit'),
(12, 12, 2, 6500.00, 'Cash'),
(13, 13, 3, 8000.00, 'Credit'),
(14, 14, 4, 5500.00, 'Cash'),
(15, 15, 5, 6000.00, 'Credit'),
(16, 16, 6, 7500.00, 'Cash'),
(17, 17, 7, 5000.00, 'Credit'),
(18, 18, 8, 8500.00, 'Credit'),
(19, 19, 9, 9000.00, 'Credit'),
(20, 20, 10, 9500.00, 'Cash');

INSERT INTO SupplySchedule (SupplyID, MaterialID, VendorID, WarehouseID, Quantity) VALUES
(1, 1, 1, 1, 100),
(2, 2, 2, 2, 150),
(3, 3, 3, 3, 200),
(4, 4, 4, 4, 250),
(5, 5, 5, 5, 300),
(6, 6, 6, 6, 350),
(7, 7, 7, 7, 400),
(8, 8, 8, 8, 450),
(9, 9, 9, 9, 500),
(10, 10, 10, 10, 550),
(11, 1, 11, 1, 600),
(12, 2, 12, 2, 650),
(13, 3, 13, 3, 700),
(14, 4, 14, 4, 750),
(15, 5, 15, 5, 800),
(16, 6, 16, 6, 850),
(17, 7, 17, 7, 900),
(18, 8, 18, 8, 950),
(19, 9, 19, 9, 1000),
(20, 10, 20, 10, 1050);


