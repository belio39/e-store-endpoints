USE eCommerce
GO

-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.products', 'U') IS NOT NULL
DROP TABLE dbo.products
GO
-- Create the table in the specified schema
CREATE TABLE dbo.products
(
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    price VARCHAR(10) NOT NULL,
    quantity VARCHAR(10)NOT NULL,
);
GO