USE eCommerce
GO

CREATE OR ALTER PROCEDURE dbo.createQueue (
    @user_id VARCHAR(50),
    @order_id VARCHAR(50),
    @type VARCHAR(255)

   )
AS
INSERT INTO dbo.queue(user_id, order_id, status, type)
VALUES (@user_id, @order_id, 'PENDING',@type)
GO


CREATE OR ALTER PROCEDURE dbo.deleteQueuedRecord 
AS
delete  from queue 
where  status = 'DONE'
GO



CREATE OR ALTER PROCEDURE dbo.updateStatusRecord (
    @user_id VARCHAR(50),
    @order_id VARCHAR(50),
    @status VARCHAR(255)

   )
AS
update queue set status = @status
where user_id = @user_id 
OR order_id = @order_id 
GO

CREATE OR ALTER PROCEDURE dbo.getPendingQueues
AS
SELECT * from queue q 
LEFT OUTER JOIN orders o 
on o.id = q.order_id
 
LEFT JOIN users u
on u.id = q.user_id

WHERE q.status = 'PENDING'
GO

select * from queue

