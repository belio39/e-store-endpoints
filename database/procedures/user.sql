USE eCommerce
GO

CREATE OR ALTER PROCEDURE dbo.createusers (
    @id VARCHAR(50),
    @fullName VARCHAR(50),
    @userName VARCHAR(50),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
INSERT INTO dbo.users
VALUES (@id, @fullName, @userName, @email, @password)
GO

CREATE OR ALTER PROCEDURE dbo.getAllUsers
AS
SELECT *
FROM dbo.users
GO

CREATE OR ALTER PROCEDURE dbo.getUserById
(@id VARCHAR(50))
AS
SELECT *
FROM dbo.users
WHERE id = @id;
GO

CREATE OR ALTER PROCEDURE dbo.getUserByUserName
(@userName VARCHAR(50))
AS
SELECT *
FROM dbo.users
WHERE userName =  @userName;
GO

CREATE OR ALTER PROCEDURE dbo.resetPassWord
(@id VARCHAR(50), @password VARCHAR(255))
AS
UPDATE dbo.users
SET
password = @password
WHERE id = @id
GO

CREATE OR ALTER PROCEDURE dbo.deleteUser
(@id VARCHAR(50))
AS
BEGIN
DELETE FROM dbo.users
WHERE id = @id
END
GO
SELECT * FROM users
