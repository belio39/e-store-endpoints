USE eCommerce
GO

CREATE OR ALTER PROCEDURE dbo.createusers (
    @id VARCHAR(50),
    @fullName VARCHAR(50),
    @userName VARCHAR(50),
    @email VARCHAR(255),
    @password TEXT
)
AS
INSERT INTO dbo.users(id, fullName, userName, email, password)
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

CREATE OR ALTER PROCEDURE dbo.getUserByEmail
(@email VARCHAR(255))
AS
SELECT *
FROM dbo.users
WHERE email =  @email;
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
