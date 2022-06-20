USE eCommerce
GO

CREATE OR ALTER PROCEDURE dbo.createorderitems (
    @id VARCHAR(50),
    @order_id VARCHAR(50),
    @product_id VARCHAR(50)
)
AS
INSERT INTO dbo.createorderitems(id, order_id, product_id)
VALUES (@id, @order_id, @product_id)
GO


CREATE OR ALTER PROCEDURE dbo.getAllOrderIitems
AS
SELECT *
FROM dbo.order_items
GO

CREATE OR ALTER PROCEDURE dbo.getOrderItemById
(@id VARCHAR (50))
AS
SELECT *
FROM dbo.order_items
WHERE id = @id;
GO

CREATE OR ALTER PROCEDURE dbo.deleteOrderItem
(@id VARCHAR(50))
AS
BEGIN
DELETE FROM dbo.order_items
WHERE id = @id
END
GO
SELECT * from order_items