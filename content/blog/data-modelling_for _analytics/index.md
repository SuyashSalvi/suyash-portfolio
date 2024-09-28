---
title: "Data Modeling for Analytics: How to Create a High-Performing Star Schema"
date: "2024-05-20T01:16:18+02:00"
draft: false
comments: false
socialShare: true
toc: true
cover:
  src: ./image.png
  alt: Data Modeling for Analytics
---

As data volumes continue to grow exponentially, designing efficient and scalable data models for analytics has become crucial for organizations aiming to derive timely insights from their data. The star schema remains one of the most effective data modeling techniques for analytics, offering a balance between simplicity and performance. This blog post explores the key principles and best practices for creating a high-performing star schema, drawing from years of industry experience in data engineering.

## Understanding the Star Schema

The star schema is a dimensional modeling technique that organizes data into fact tables and dimension tables. This structure resembles a star, with a central fact table connected to multiple dimension tables.

### Fact Tables

Fact tables contain quantitative data about business processes, such as sales transactions or website visits. They typically include:

- Foreign keys to dimension tables
- Numerical measures (e.g., quantity sold, revenue)

### Dimension Tables

Dimension tables provide descriptive attributes about the data in fact tables. They usually contain:

- A primary key
- Descriptive attributes (e.g., product name, customer details)

## Key Principles for Designing a High-Performing Star Schema

1. **Define the Grain**

The grain of a fact table determines the level of detail at which data is stored. Choosing the right grain is crucial for performance and usability.

- Start with the finest grain that makes sense for your business requirements
- Ensure consistency across all measures in the fact table

Example:
```sql
-- Fact table with daily sales grain
CREATE TABLE fact_sales (
    date_key INT,
    product_key INT,
    store_key INT,
    customer_key INT,
    sales_amount DECIMAL(10,2),
    quantity_sold INT,
    FOREIGN KEY (date_key) REFERENCES dim_date(date_key),
    FOREIGN KEY (product_key) REFERENCES dim_product(product_key),
    FOREIGN KEY (store_key) REFERENCES dim_store(store_key),
    FOREIGN KEY (customer_key) REFERENCES dim_customer(customer_key)
);
```

2. **Denormalize Dimension Tables**

Denormalization improves query performance by reducing the need for joins.

- Flatten hierarchies within dimension tables
- Include relevant attributes from related dimensions

Example:
```sql
CREATE TABLE dim_product (
    product_key INT PRIMARY KEY,
    product_id VARCHAR(50),
    product_name VARCHAR(100),
    category_name VARCHAR(50),
    subcategory_name VARCHAR(50),
    brand_name VARCHAR(50),
    -- Include other relevant attributes
);
```

3. **Use Surrogate Keys**

Implement surrogate keys for dimension tables to:

- Improve join performance
- Handle changes in source data (e.g., slowly changing dimensions)
- Ensure data integrity

Example:
```sql
CREATE TABLE dim_customer (
    customer_key INT PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(50),
    customer_name VARCHAR(100),
    -- Other customer attributes
);
```

4. **Implement Slowly Changing Dimensions (SCDs)**

Handle changes in dimension attributes over time to maintain historical accuracy.

- Use Type 1 SCDs for attributes where only the current value is needed
- Implement Type 2 SCDs for attributes requiring historical tracking

Example of a Type 2 SCD:
```sql
CREATE TABLE dim_customer (
    customer_key INT PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(50),
    customer_name VARCHAR(100),
    effective_date DATE,
    expiration_date DATE,
    is_current BOOLEAN,
    -- Other customer attributes
);
```

5. **Optimize for Common Query Patterns**

Analyze common query patterns and optimize the schema accordingly:

- Create pre-aggregated fact tables for frequently used aggregations
- Add derived columns to fact tables for commonly calculated metrics

Example of a pre-aggregated fact table:
```sql
CREATE TABLE fact_monthly_sales (
    date_key INT,
    product_key INT,
    store_key INT,
    monthly_sales_amount DECIMAL(12,2),
    monthly_quantity_sold INT,
    FOREIGN KEY (date_key) REFERENCES dim_date(date_key),
    FOREIGN KEY (product_key) REFERENCES dim_product(product_key),
    FOREIGN KEY (store_key) REFERENCES dim_store(store_key)
);
```

6. **Use Appropriate Data Types**

Choose data types that balance storage efficiency and query performance:

- Use smaller data types when possible (e.g., SMALLINT instead of INT for small ranges)
- Consider using fixed-length character fields for faster string comparisons

7. **Implement Partitioning and Indexing**

Leverage partitioning and indexing strategies to improve query performance:

- Partition large fact tables based on date or other high-cardinality columns
- Create appropriate indexes on foreign keys and frequently queried columns

Example:
```sql
-- Partitioning a fact table by date
CREATE TABLE fact_sales (
    -- ... other columns ...
)
PARTITION BY RANGE (YEAR(transaction_date)) (
    PARTITION p2021 VALUES LESS THAN (2022),
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN MAXVALUE
);

-- Creating an index on a frequently queried column
CREATE INDEX idx_product_key ON fact_sales (product_key);
```

## Conclusion

Creating a high-performing star schema requires careful consideration of business requirements, query patterns, and data characteristics. By following these principles and best practices, data engineers can design star schemas that provide both excellent query performance and flexibility for analytics workloads.

Remember that data modeling is an iterative process. Continuously monitor query performance, gather feedback from business users, and be prepared to refine your star schema as business needs evolve. With a well-designed star schema, organizations can unlock the full potential of their data, enabling faster and more insightful analytics to drive business decisions.

Citations:
[1] https://www.simplilearn.com/what-is-data-modeling-article
[2] https://www.thoughtspot.com/data-trends/data-modeling/data-modeling-best-practices-for-analytics-and-data-engineers
[3] https://powerbi.microsoft.com/en-us/what-is-data-modeling/
[4] https://panoply.io/analytics-stack-guide/data-modeling-examples-for-analytics/
[5] https://www.xenonstack.com/insights/data-modelling
[6] https://www.holistics.io/books/setup-analytics/data-modeling-layer-and-concepts/
[7] https://databeats.community/p/analytical-data-models
[8] https://www.ibm.com/topics/data-modeling