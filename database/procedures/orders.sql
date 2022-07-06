USE eCommerce
GO

CREATE OR ALTER PROCEDURE dbo.createorders (
    @id VARCHAR(50),
    @user_id VARCHAR(50),
    @total INT
)
AS
INSERT INTO dbo.orders(id, user_id, total)
VALUES (@id, @user_id, @total)
GO

CREATE OR ALTER PROCEDURE dbo.getAllOrders
AS
SELECT *
FROM dbo.orders
GO

CREATE OR ALTER PROCEDURE dbo.getOrderById
(@id VARCHAR (50))
AS
SELECT *
FROM dbo.orders
WHERE id = @id;
GO

CREATE OR ALTER PROCEDURE dbo.deleteOrder
(@id VARCHAR(50))
AS
BEGIN
DELETE FROM dbo.orders
WHERE id = @id
END
GO
SELECT * from orders

