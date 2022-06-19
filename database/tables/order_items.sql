USE eCommerce
GO

-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.order_items', 'U') IS NOT NULL
DROP TABLE dbo.order_items
GO
-- Create the table in the specified schema
CREATE TABLE dbo.order_items
(
 id VARCHAR(50) NOT NULL,
 order_id VARCHAR(50) NOT NULL,
 product_id VARCHAR(50) NOT NULL,
 created_at TIMESTAMP NOT NULL,

 PRIMARY KEY (id),
 FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);
GO