CREATE MATERIALIZED VIEW sales_by_category AS
SELECT
    p.product_category_name,
    COUNT(oi.order_id) AS total_orders,
    SUM(oi.price) AS total_revenue
FROM order_items oi
JOIN products p
    ON oi.product_id = p.product_id
GROUP BY p.product_category_name;

--Query the View

SELECT * FROM sales_by_category
ORDER BY total_revenue DESC
LIMIT 10;

--Refresh the View
--Materialized views do not update automatically, so we refresh them:

REFRESH MATERIALIZED VIEW sales_by_category;