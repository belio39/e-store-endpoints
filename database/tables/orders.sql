USE eCommerce
GO

-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.orders', 'U') IS NOT NULL
DROP TABLE dbo.orders
GO
-- Create the table in the specified schema
CREATE TABLE dbo.orders
(
 id VARCHAR(50) NOT NULL,
 user_id VARCHAR(50) NOT NULL,
 total FLOAT NOT NULL,
 created_at TIMESTAMP NOT NULL,

PRIMARY KEY(id),
FOREIGN KEY (user_id) REFERENCES  users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
GO