DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS signatures;


CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    first VARCHAR(255) NOT NULL, 
    last VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE signatures (
    id SERIAL primary key, 
    firstname VARCHAR(255) NOT NULL, 
    lastname VARCHAR(255) NOT NULL, 
    signature VARCHAR NOT NULL, 
    user_id INTEGER NOT NULL REFERENCES users(id),
    create_at TIMESTAMP DEFAULT current_timestamp
);



-- Creating fake data to check my database 
-- INSERT INTO signatures(firstname, lastname) VALUES("Tim", "Cook");
-- INSERT INTO signatures(firstname, lastname) VALUES("Abraham", "Hdru");
-- INSERT INTO signatures(firstname, lastname) VALUES("Elon", "Musk");






-- Selecting signature From the table signatures
-- SELECT firstname FROM signatures;

