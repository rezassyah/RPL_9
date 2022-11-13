require('dotenv').config()
 
const knex = require('knex')({
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    pool: {min: 0, max: 7},
})

knex.raw('SELECT VERSION()').then(() => {
    console.log(`connection to db successful!`)
})

module.exports = knex

