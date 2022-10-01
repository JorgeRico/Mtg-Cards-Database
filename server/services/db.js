const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
    console.log(config.db)
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql, params);
    // console.log(results);

    return results;
}

module.exports = {
    query
}