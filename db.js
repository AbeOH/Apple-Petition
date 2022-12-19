require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(
    `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/petition`
);
//`postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/petiton`
//----------------------------------------------------------------------------------------------------------------------------------
// Create the following functions;
// ----- getAllSignatures - use db.query to get all signatures from table signatures

module.exports.getAllSignatures = (user_id) => {
    return db.query("SELECT signature FROM signatures");
};

//----------------------------------------------------------------------------------------------------------------------------------

module.exports.registration = (firstname, lastname, email, password) => {
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) returning *",
        [firstname, lastname, email, password]
        // RETURNING id
    );
};

//----------------------------------------------------------------------------------------------------------------------------------

module.exports.getUserByEmail = (email) => {
    return db.query(
        "SELECT users.password, users.id FROM users FULL OUTER JOIN signatures ON users.id = signatures.id WHERE email = $1 ",
        [email]
    );
};

//  return db.query("SELECT users.password, users.id  FROM users WHERE email = $1 ON sog  ", [email]);

// "SELECT * FROM users JOIN signatures ON users.id = signatures.user_id LEFT OUTER JOIN users_profiles ON users.id = users_profiles.user_id"
// Create full outerjoin with signature table the id from user table= signature table

//----------------------------------------------------------------------------------------------------------------------------------

// module.exports.checkSigned = (user_id) => {
//     return db.query("SELECT signature FROM signatures WHERE user_id = $1", [
//         user_id,
//     ]);
// };

//----------------------------------------------------------------------------------------------------------------------------------

module.exports.addInfo = (city, age, linkedIn, user_id) => {
    return db.query(
        "INSERT INTO users_profiles (city, age, linkedIn, user_id) VALUES($1, $2, $3, $4)",
        [city, age, linkedIn, user_id]
    );
};

//----------------------------------------------------------------------------------------------------------------------------------

// ----- addSignature - use db.query to insert a signature to table signatures
module.exports.addSignature = (signature, user_id) => {
    return db.query(
        "INSERT INTO signatures (signature, user_id) VALUES($1, $2) returning *",
        [signature, user_id]
        // RETURNING id
    );
};

//----------------------------------------------------------------------------------------------------------------------------------
module.exports.profileJoin = () => {
    /// Users & Signatures
    return db.query(
        "SELECT * FROM users JOIN signatures ON users.id = signatures.user_id"
    );
};

//----------------------------------------------------------------------------------------------------------------------------------
module.exports.cityQuery = () => {
    return db.query(
        "SELECT * FROM users JOIN signatures ON users.id = signatures.user_id LEFT OUTER JOIN users_profiles ON users.id = users_profiles.user_id"
    );
};

//----------------------------------------------------------------------------------------------------------------------------------

module.exports.deleteSignature = () => {};

//----------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------
