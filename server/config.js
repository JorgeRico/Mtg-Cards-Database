const mysql = require("mysql2/promise");

let pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: "app-db",
        user: "user",
        password: "password",
        database: "app-db",
    }
);

pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database connection lost.')
        }

        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has too many connections.')
        }

        if(err.code === 'ECONNREFUSED') {
            console.log('Database connection refused.')
        }

        if(err.code === 'POOL_CLOSED') {
            console.log('Pool is closed.')
        }
    }

    if(connection) {
        connection.release()
    }

    return;
});

module.exports = pool;