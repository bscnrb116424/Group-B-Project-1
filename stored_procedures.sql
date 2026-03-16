-- Calculate Total Sales in a Date Range
CREATE OR REPLACE FUNCTION get_total_sales(start_date TIMESTAMP, end_date TIMESTAMP)
RETURNS NUMERIC AS $$
DECLARE
    total_sales NUMERIC;
BEGIN
    SELECT SUM(oi.price)
    INTO total_sales
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_purchase_timestamp BETWEEN start_date AND end_date;

    RETURN total_sales;
END;
$$ LANGUAGE plpgsql;

-- TEST 

-- Top Selling Products
SELECT get_total_sales('2017-01-01', '2018-01-01');

CREATE OR REPLACE FUNCTION get_top_products(limit_number INT)
RETURNS TABLE(
    product_id TEXT,
    total_sales BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        oi.product_id,
        COUNT(*) as total_sales
    FROM order_items oi
    GROUP BY oi.product_id
    ORDER BY total_sales DESC
    LIMIT limit_number;
END;
$$ LANGUAGE plpgsql;

-- TEST 
SELECT * FROM get_top_products(10);