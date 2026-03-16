--Create an Audit Table
CREATE TABLE order_audit (
    audit_id SERIAL PRIMARY KEY,
    order_id TEXT,
    action TEXT,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Create the Trigger Function
CREATE OR REPLACE FUNCTION log_order_insert()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO order_audit(order_id, action)
    VALUES (NEW.order_id, 'ORDER INSERTED');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--Create the Trigger
CREATE TRIGGER order_insert_trigger
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION log_order_insert();

--Test the Trigger
INSERT INTO orders (
    order_id,
    customer_id,
    order_status,
    order_purchase_timestamp
)
VALUES (
    'TEST_ORDER_001',
    '00012a2ce6f8dcda20d059ce98491703',
    'delivered',
    NOW()
);
--CHECK the audit table:

SELECT * FROM order_audit;