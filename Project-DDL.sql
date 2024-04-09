GO
CREATE DATABASE SMS;
GO
USE SMS;


GO


CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    FirstName NVARCHAR(255) NOT NULL,
    LastName NVARCHAR(255) NOT NULL,
    Position NVARCHAR(255),
    Salary DECIMAL(10, 2) CHECK (Salary > 0)
);


CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY,
    DepartmentName NVARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15) CHECK (PhoneNumber LIKE '[0-9]%'),
    [Location] NVARCHAR(255)
);

CREATE TABLE Warehouse (
    WarehouseID INT PRIMARY KEY,
    [Address] NVARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15) CHECK (PhoneNumber LIKE '[0-9]%'),
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE DepartmentEmployee (
    EmployeeID INT,
    DepartmentID INT,
    PRIMARY KEY (EmployeeID, DepartmentID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE Product (
    ProductID INT PRIMARY KEY,
    EmployeeID INT,
    DepartmentID INT,
    ProductName NVARCHAR(255) NOT NULL,
    Color NVARCHAR(255) NOT NULL,
    [Weight] DECIMAL(10, 2) CHECK (Weight >= 0 AND Weight <= 1000),
    Cost DECIMAL(10, 2) CHECK (Cost > 0),
    Price DECIMAL(10, 2) CHECK (Price > 0),
    FOREIGN KEY (EmployeeID, DepartmentID) REFERENCES DepartmentEmployee(EmployeeID, DepartmentID)
);

CREATE TABLE WarehouseEmployee (
    EmployeeID INT PRIMARY KEY,
    WarehouseID INT NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (WarehouseID) REFERENCES Warehouse(WarehouseID)
);

CREATE TABLE ProductionLine (
    LineID INT PRIMARY KEY,
    LineCapacity INT CHECK (LineCapacity > 0 AND LineCapacity <= 5),
    [Address] NVARCHAR(255) NOT NULL,
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE ProductionEmployee (
    EmployeeID INT PRIMARY KEY,
    LineID INT NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES ProductionEmployee(EmployeeID),
    FOREIGN KEY (LineID) REFERENCES ProductionLine(LineID)
);

CREATE TABLE ProductLine (
    ProductID INT PRIMARY KEY,
    LineID INT NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (LineID) REFERENCES ProductionLine(LineID)
);

Create TABLE RawMaterial (
    MaterialID INT PRIMARY KEY,
    WarehouseID INT NOT NULL,
    RawMaterialName NVARCHAR(255) NOT NULL,
    FOREIGN KEY (WarehouseID) REFERENCES Warehouse(WarehouseID)
);

CREATE TABLE ProductMaterial (
    ProductID INT NOT NULl,
    MaterialID INT NOT NULL,
    PRIMARY KEY (ProductID, MaterialID),
    FOREIGN KEY (MaterialID) REFERENCES RawMaterial(MaterialID),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductID),
);

CREATE TABLE Vendor(
    VendorID INT PRIMARY KEY,
    VendorName NVARCHAR(255) NOT NULL,
    [Address] NVARCHAR(255) NOT NULL,
    PhoneNumber VARBINARY(100),
    Speciality NVARCHAR(255) NOT NULL,
);

CREATE TABLE Invoice (
    InvoiceID INT PRIMARY KEY,
    VendorID INT NOT NULL,
    DepartmentID INT NOT NULL,
    TotalAmount DECIMAL(10, 2) CHECK (TotalAmount > 0),
    VendorPaymentType NVARCHAR(255) NOT NULL,
    FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID),
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE SupplySchedule(
    SupplyID INT PRIMARY KEY,
    MaterialID INT NOT NULL,
    VendorID INT NOT NULL,
    WarehouseID INT NOT NULL,
    Quantity DECIMAL(10) CHECK (Quantity > 0),
    [DateTime] DATETIME DEFAULT GETDATE()
    FOREIGN KEY (MaterialID) REFERENCES RawMaterial(MaterialID),
    FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID),
    FOREIGN KEY (WarehouseID) REFERENCES Warehouse(WarehouseID)
);

-- Creation of Keys
GO

CREATE MASTER KEY ENCRYPTION BY
PASSWORD = '5UPER5TRONGP@SSWORD';

GO

CREATE CERTIFICATE Vendor_Cert
   WITH SUBJECT = 'Vendors contact info';

GO

CREATE SYMMETRIC KEY Contact_Key
    WITH ALGORITHM = AES_256
    ENCRYPTION BY CERTIFICATE Vendor_Cert;

GO
-- Create a stored procedure for encryption
CREATE PROCEDURE dbo.EncryptData
    @data NVARCHAR(15),
    @EncryptedData VARBINARY(8000) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    OPEN SYMMETRIC KEY Contact_Key
    DECRYPTION BY CERTIFICATE Vendor_Cert;
    SET @EncryptedData = ENCRYPTBYKEY(KEY_GUID('Contact_Key'), @data);
    CLOSE SYMMETRIC KEY Contact_Key;
END;


-- Stored procedure for inserting vendor record with encryptedPhoneNumber
GO
CREATE PROCEDURE dbo.InsertVendorWithEncryptedPhoneNumber
    @VendorID INT,
    @VendorName NVARCHAR(255),
    @Address NVARCHAR(255),
    @PhoneNumber NVARCHAR(15),
    @Speciality NVARCHAR(255)
AS
BEGIN
    DECLARE @EncryptedPhoneNumber VARBINARY(8000);

    -- Encrypt the phone number
    EXEC dbo.EncryptData @PhoneNumber, @EncryptedPhoneNumber OUTPUT;

    -- Insert the vendor with the encrypted phone number
    INSERT INTO Vendor (VendorID, VendorName, [Address], PhoneNumber, Speciality)
    VALUES (@VendorID, @VendorName, @Address, @EncryptedPhoneNumber, @Speciality);
END;

GO
-- Retrieve details of an employee based on their ID.
CREATE PROCEDURE GetEmployeeDetails
    @EmployeeID INT,
    @EmployeeDetails NVARCHAR(MAX) OUTPUT
AS
BEGIN
    SELECT @EmployeeDetails = CONCAT(FirstName, ' ', LastName, ', Position: ', Position, ', Salary: ', Salary)
    FROM Employee
    WHERE EmployeeID = @EmployeeID;
END;

DECLARE @Details NVARCHAR(MAX);

EXEC GetEmployeeDetails
    @EmployeeID = 1,
    @EmployeeDetails = @Details OUTPUT;

SELECT @Details AS EmployeeDetails;


GO


--  Update the price of a product.
CREATE PROCEDURE UpdateProductPrice
    @ProductID INT,
    @NewPrice DECIMAL(10,2),
    @Success BIT OUTPUT
AS
BEGIN
    IF EXISTS(SELECT 1 FROM Product WHERE ProductID = @ProductID)
    BEGIN
        UPDATE Product
        SET Price = @NewPrice
        WHERE ProductID = @ProductID;
        SET @Success = 1;
    END
    ELSE
    BEGIN
        SET @Success = 0;
    END
END;

GO

DECLARE @UpdateSuccess BIT;

EXEC UpdateProductPrice
    @ProductID = 1,
    @NewPrice = 78.99,
    @Success = @UpdateSuccess OUTPUT;

SELECT @UpdateSuccess AS IsUpdateSuccessful;

SELECT * FROM Product

GO


-- Assign an employee to a department.
CREATE PROCEDURE AssignEmployeeToDepartment
    @EmployeeID INT,
    @DepartmentID INT,
    @Result NVARCHAR(100) OUTPUT
AS
BEGIN
    IF EXISTS(SELECT 1 FROM Employee WHERE EmployeeID = @EmployeeID)
    AND EXISTS(SELECT 1 FROM Department WHERE DepartmentID = @DepartmentID)
    BEGIN
        INSERT INTO DepartmentEmployee (EmployeeID, DepartmentID)
        VALUES (@EmployeeID, @DepartmentID);
        SET @Result = 'Assignment successful';
    END
    ELSE
    BEGIN
        SET @Result = 'Employee or Department not found';
    END
END;

GO

DECLARE @AssignmentResult NVARCHAR(100);

EXEC AssignEmployeeToDepartment
    @EmployeeID = 5,
    @DepartmentID = 3,
    @Result = @AssignmentResult OUTPUT;

SELECT @AssignmentResult AS AssignmentResult;

SELECT * from DepartmentEmployee;


GO


-- Calculate the total weight of a given number of products.
CREATE PROCEDURE CalculateProductWeight
    @ProductID INT,
    @Quantity INT,
    @TotalWeight DECIMAL(10,2) OUTPUT
AS
BEGIN
    SELECT @TotalWeight = [Weight] * @Quantity
    FROM Product
    WHERE ProductID = @ProductID;
END;


GO


DECLARE @CalculatedWeight DECIMAL(10,2);

EXEC CalculateProductWeight
    @ProductID = 1,
    @Quantity = 10,
    @TotalWeight = @CalculatedWeight OUTPUT;

SELECT @CalculatedWeight AS TotalWeight;


GO


CREATE PROCEDURE UpdateProductCost
    @ProductID INT,
    @NewCost DECIMAL(10,2)
AS
BEGIN
    UPDATE Product
    SET Cost = @NewCost
    WHERE ProductID = @ProductID;
END;


GO


DECLARE @OldCost DECIMAL(10,2);
DECLARE @NewCost DECIMAL(10,2) = 85.00;

-- Get the old cost of the product
SELECT @OldCost = Cost
FROM Product
WHERE ProductID = 1;

-- Update the product cost
EXEC UpdateProductCost
    @ProductID = 1,
    @NewCost = @NewCost;

-- Display the old and new prices
SELECT @OldCost AS OldCost, @NewCost AS NewCost;


GO


-- Views
-- View showing employees and their departments.
CREATE VIEW EmployeeDepartmentView AS
SELECT e.EmployeeID, e.FirstName, e.LastName, d.DepartmentName
FROM Employee e
JOIN DepartmentEmployee de ON e.EmployeeID = de.EmployeeID
JOIN Department d ON de.DepartmentID = d.DepartmentID;


GO


Select * from EmployeeDepartmentView;


GO


CREATE VIEW ProductWarehouseView AS
SELECT DISTINCT
    p.ProductID,
    p.ProductName,
    w.WarehouseID,
    w.[Address] AS WarehouseAddress
FROM Product p
JOIN ProductMaterial pm ON p.ProductID = pm.ProductID
JOIN RawMaterial rm ON pm.MaterialID = rm.MaterialID
JOIN Warehouse w ON rm.WarehouseID = w.WarehouseID;

GO


SELECT * FROM ProductWarehouseView;


GO


CREATE VIEW VendorInvoiceView AS
SELECT v.VendorID, v.VendorName, i.InvoiceID, i.TotalAmount
FROM Vendor v
JOIN Invoice i ON v.VendorID = i.VendorID;


GO


SELECT * from VendorInvoiceView;


GO


-- View showing employees and the products they are responsible for
CREATE VIEW EmployeeProductView AS
SELECT e.EmployeeID, e.FirstName, e.LastName, p.ProductID, p.ProductName
FROM Employee e
JOIN DepartmentEmployee de ON e.EmployeeID = de.EmployeeID
JOIN Product p ON de.EmployeeID = p.EmployeeID;


GO


Select * from EmployeeProductView;


GO


-- View showing products, their costs, and final prices.
CREATE VIEW ProductCostPriceView AS
SELECT ProductID, ProductName, Cost, Price
FROM Product;


GO


Select * from ProductCostPriceView;


GO


-- View shows products, their associated raw materials, the warehouses where those materials are stored, and the vendors who supply those materials
CREATE VIEW ProductSupplyChainView AS
SELECT
    p.ProductID,
    p.ProductName,
    rm.RawMaterialName,
    w.WarehouseID,
    w.[Address] AS WarehouseAddress,
    v.VendorID,
    v.VendorName,
    ss.Quantity AS MaterialQuantity,
    ss.[DateTime] AS SupplyDateTime
FROM Product p
JOIN ProductMaterial pm ON p.ProductID = pm.ProductID
JOIN RawMaterial rm ON pm.MaterialID = rm.MaterialID
JOIN Warehouse w ON rm.WarehouseID = w.WarehouseID
JOIN SupplySchedule ss ON rm.MaterialID = ss.MaterialID AND w.WarehouseID = ss.WarehouseID
JOIN Vendor v ON ss.VendorID = v.VendorID;

GO


Select * from ProductSupplyChainView;


GO


-- DML Triggers
-- Log salary changes to the console.
CREATE TRIGGER AuditEmployeeSalaryChange
ON Employee
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Salary)
    BEGIN
        DECLARE @LogMessage NVARCHAR(MAX)
        SELECT @LogMessage = CONCAT('EmployeeID: ', i.EmployeeID, ', Old Salary: ', d.Salary, ', New Salary: ', i.Salary, ', Change Date: ', CONVERT(NVARCHAR, GETDATE(), 120))
        FROM inserted i
        JOIN deleted d ON i.EmployeeID = d.EmployeeID;

        PRINT @LogMessage;
    END
END;


GO


UPDATE Employee
SET Salary = 75000
WHERE EmployeeID = 1;


GO


-- Log cost changes to the console.
CREATE TRIGGER AuditProductCostChange
ON Product
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Cost)
    BEGIN
        DECLARE @LogMessage NVARCHAR(MAX)
        SELECT @LogMessage = CONCAT('ProductID: ', i.ProductID, ', Old Cost: ', d.Cost, ', New Cost: ', i.Cost, ', Change Date: ', CONVERT(NVARCHAR, GETDATE(), 120))
        FROM inserted i
        JOIN deleted d ON i.ProductID = d.ProductID;

        PRINT @LogMessage;
    END
END;


GO


UPDATE Product
SET Cost = 80.00
WHERE ProductID = 1;


GO

-- A function that calculates the average salary of employees in a specific department.
CREATE FUNCTION dbo.CalculateAverageDepartmentSalary
(
    @DepartmentID INT
)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @AverageSalary DECIMAL(10, 2);

    SELECT @AverageSalary = AVG(Salary)
    FROM Employee e
    INNER JOIN DepartmentEmployee de ON e.EmployeeID = de.EmployeeID
    WHERE de.DepartmentID = @DepartmentID;

    RETURN ISNULL(@AverageSalary, 0);
END;
GO

ALTER TABLE Department
ADD AverageSalary AS dbo.CalculateAverageDepartmentSalary(DepartmentID);


-- A function that calculates the total cost of products assigned to a specific department
CREATE FUNCTION dbo.CalculateTotalDepartmentProductCost
(
    @DepartmentID INT
)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @TotalCost DECIMAL(10, 2);

    SELECT @TotalCost = SUM(Cost)
    FROM Product
    WHERE DepartmentID = @DepartmentID;

    RETURN ISNULL(@TotalCost, 0);
END;
GO
ALTER TABLE Department
ADD TotalProductCost AS dbo.CalculateTotalDepartmentProductCost(DepartmentID);



-- Create the function
CREATE FUNCTION dbo.CalculateFinalPrice
(
    @Cost DECIMAL(10,2),
    @MarkupPercentage DECIMAL(5,2)
)
RETURNS DECIMAL(10,2)
AS
BEGIN
    RETURN @Cost * (1 + @MarkupPercentage / 100)
END;
GO


GO


-- Alter the Product table
ALTER TABLE Product
ADD FinalPrice AS dbo.CalculateFinalPrice(Cost, 20);


GO


-- Select from the Product table
SELECT ProductID, ProductName, Cost, Price, FinalPrice
FROM Product;


GO


-- This function calculates the total amount invoiced to a specific department by summing up the TotalAmount from the Invoice table for that department.
CREATE FUNCTION dbo.CalculateTotalInvoiceAmountForDepartment
(
    @DepartmentID INT
)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @TotalAmount DECIMAL(10, 2);

    SELECT @TotalAmount = SUM(TotalAmount)
    FROM Invoice
    WHERE DepartmentID = @DepartmentID;

    RETURN ISNULL(@TotalAmount, 0);
END;


GO


DECLARE @TotalInvoiceAmount DECIMAL(10, 2);

SELECT @TotalInvoiceAmount = dbo.CalculateTotalInvoiceAmountForDepartment(1);

SELECT @TotalInvoiceAmount AS TotalInvoiceAmountForDepartment1;

-- This function calculates the average cost of products stored in a specific warehouse.
--  It assumes that the ProductMaterial table links products to raw materials, and raw materials are linked to warehouses.

GO


CREATE FUNCTION dbo.CalculateAverageProductCostForWarehouse
(
    @WarehouseID INT
)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @AverageCost DECIMAL(10, 2);

    SELECT @AverageCost = AVG(p.Cost)
    FROM Product p
    JOIN ProductMaterial pm ON p.ProductID = pm.ProductID
    JOIN RawMaterial rm ON pm.MaterialID = rm.MaterialID
    WHERE rm.WarehouseID = @WarehouseID;

    RETURN ISNULL(@AverageCost, 0);
END;


GO


DECLARE @AverageProductCost DECIMAL(10, 2);

SELECT @AverageProductCost = dbo.CalculateAverageProductCostForWarehouse(1);

SELECT @AverageProductCost AS AverageProductCostForWarehouse1;


GO


CREATE NONCLUSTERED INDEX IDX_Employee_LastName ON Employee(LastName);

CREATE NONCLUSTERED INDEX IDX_Department_DepartmentName ON Department(DepartmentName);

CREATE NONCLUSTERED INDEX IDX_Product_ProductName ON Product(ProductName);


GO


SELECT
    i.name AS IndexName,
    OBJECT_NAME(i.object_id) AS TableName,
    i.type_desc AS IndexType
FROM sys.indexes i
WHERE i.type_desc = 'NONCLUSTERED'
  AND i.is_primary_key = 0  -- Excludes primary key constraints
  AND i.is_unique_constraint = 0  -- Excludes unique constraints
  AND OBJECT_SCHEMA_NAME(i.object_id) = 'dbo';
