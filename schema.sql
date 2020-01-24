DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    id INT AUTO_INCREMENT NOT NULL,
    productName VARCHAR(15) NOT NULL,
    departmentName VARCHAR(15) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity int(!0) NOT NULL,
    PRIMARY key(id)
)

Select * from products;