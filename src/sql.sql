DROP DATABASE IF EXISTS vulnerable;
CREATE DATABASE vulnerable;

USE vulnerable;

CREATE TABLE users (
  userId int,
  firstName varchar(50),
  phone varchar(10)
);

INSERT INTO users (userId, firstName, phone)
VALUES 
(1, 'John', '2066666666'),
(2, 'Jack', '2067777777'),
(3, 'Joe', '2061111111'),
(4, 'Frank', '2062222222'),
(5, 'Fredy', '2063333333'),
(6, 'Nancy', '2064444444'),
(7, 'Nicole', '2065555555'),
(8, 'Liam', '2060000000'),
(9, 'Chris', '2069999999'),
(10, 'Albert', '2068888888');
