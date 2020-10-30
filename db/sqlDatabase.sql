create database employee_db;


use employee_db;


create table employee (
id integer(10) auto_increment not null,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id integer(10) not null,
manager_id int(10)null
);


create table role (
id integer(10) auto_increment not null,
title varchar(30) not null,
salary decimal(10, 2) not null,
department_id integer(10) not null
);


create table department (
id integer(10) auto_increment not null,
name varchar(30) not null,
department_id integer(10)
);