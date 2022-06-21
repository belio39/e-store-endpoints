USE eCommerce
GO

CREATE OR ALTER PROCEDURE dbo.createproducts (
    @id VARCHAR(50),
    @name VARCHAR(50),
    @imageUrl VARCHAR(255),
    @price VARCHAR(10),
    @quantity VARCHAR(10)
)
AS
INSERT INTO dbo.products
VALUES (@id, @name, @imageUrl, @price, @quantity)
GO

CREATE OR ALTER PROCEDURE dbo.getAllProducts(
    @itemsPerPage BIGINT,
    @offset BIGINT)
AS
SELECT *
FROM dbo.products
ORDER BY id
OFFSET @offset ROWS
FETCH NEXT @itemsPerPage ROWS ONLY

SELECT COUNT(*) totalItems
FROM dbo.products
GO

CREATE OR ALTER PROCEDURE dbo.getProductById
(@id VARCHAR (50))
AS
SELECT *
FROM dbo.products
WHERE id = @id;
GO

CREATE OR ALTER PROCEDURE dbo.updateProduct
    @id VARCHAR(50),
    @name VARCHAR(50),
    @imageUrl VARCHAR(255),
    @price VARCHAR(10),
    @quantity VARCHAR(10)
AS
BEGIN
UPDATE dbo.products
SET
    name = @name,
    imageUrl = @imageUrl,
    price = @price,
    quantity = @quantity
WHERE id = @id
END
GO    

CREATE OR ALTER PROCEDURE dbo.deleteProduct
(@id VARCHAR(50))
AS
BEGIN
DELETE FROM dbo.products
WHERE id = @id
END
GO
SELECT * from products