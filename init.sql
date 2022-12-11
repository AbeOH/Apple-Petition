DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures (
    id SERIAL primary key, 
    firstname VARCHAR(255) NOT NULL, 
    lastname VARCHAR(255) NOT NULL, 
    signature VARCHAR NOT NULL, 
    create_at TIMESTAMP DEFAULT current_timestamp
);

---**********************************************************************************************
-- Creating fake data to check my database 
INSERT INTO signatures(firstname, lastname) VALUES("Tim", "Cook");
INSERT INTO signatures(firstname, lastname) VALUES("Abraham", "Hdru");
INSERT INTO signatures(firstname, lastname) VALUES("Elon", "Musk");








---**********************************************************************************************

-- Selecting signature From the table signatures
SLECECT signature FROM signatures;

