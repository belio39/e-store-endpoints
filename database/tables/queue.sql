USE eCommerce
GO

IF OBJECT_ID('dbo.queue', 'U') IS NOT NULL
DROP TABLE dbo.queue
GO
CREATE TABLE dbo.queue
(
    user_id VARCHAR(50)  NULL,
    order_id VARCHAR(50)  NOT NULL,
    status VARCHAR(255)  NOT NULL,
    type VARCHAR(255) NOT NULL,
)
GO
