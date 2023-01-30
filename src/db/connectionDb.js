// connectionDb 
const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: "",
    host: "",
    password: "",
    database: "",
    port: 5432,
    allowExitOnIdle: true
});


module.exports = {pool}