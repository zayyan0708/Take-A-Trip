const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "8800",
    database: "take_a_trip_3"
})

module.exports = client