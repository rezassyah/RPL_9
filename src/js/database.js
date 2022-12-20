require('dotenv').config()
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const databaseName = 'cashier'

const dropDatabaseQuery = `drop database if exists ${databaseName}`
db.query(dropDatabaseQuery, (err) => {
    if (err) throw err

    console.log("previous database dropped")
})

const createDatabaseQuery = `create database if not exists ${databaseName}`
const useDatabaseQuery = `use ${databaseName}`
db.query(createDatabaseQuery, (err) => {
    if (err) throw err

    console.log("database created successfully")

})

db.query(useDatabaseQuery, (err) => {
    if (err) throw err

    console.log(`using database ${databaseName}`)
})

const createUserTableQuery = `CREATE TABLE db_user (
id_user int(25) NOT NULL,
nama varchar(255) NOT NULL,
namaMerchant varchar(55) NOT NULL,
email varchar(50) NOT NULL,
password varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`

db.query(createUserTableQuery, (err) => {
    if (err) throw err

    console.log("user table created")
    const alterUserId = `ALTER TABLE db_user
    ADD PRIMARY KEY (id_user),
    MODIFY id_user int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3`
    
    db.query(alterUserId, (err) => {
        if (err) throw err
    })
    
    const insertUserDummy = `INSERT INTO db_user (id_user, nama, namaMerchant, email, password) VALUES
    (1, 'Naufal Adrian Hidayat', 'Sempurna', 'Naufal111@gmail.com', 'KamuKepo.com'),
    (2, 'Adrian Hidayat', 'Hidayat Shop', 'naufaladr@gmail.com', 'naufal123')`
    db.query(insertUserDummy, (err) => {
        if (err) throw err
    })
})

exports.db = db

