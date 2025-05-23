require('dotenv').config();
var mysql = require('mysql2');

module.exports = class Database {
    constructor() {
        this.host       = process.env.DB_HOST;
        this.port       = process.env.DB_PORT;
        this.user       = process.env.DB_USER;
        this.password   = process.env.DB_PASSWORD;
        this.database   = process.env.DB_NAME;
        this.db         = this.connection();
        this.pagination = 100;
    }

    connection() {
        if (!this.db) {
            return mysql.createPool({
                host     : this.host,
                port     : this.port,
                user     : this.user,
                password : this.password,
                database : this.database,
                keepAliveInitialDelay: 10000, // 0 by default.
                enableKeepAlive: true, // false by default.
            });
        }
    }

    async doQuery(query) {
        let pro = new Promise((resolve, reject) => {
            this.db.query(query, function (err, result) {
                if (err) throw err; // errors
                resolve(result);
            });
        })

        return pro.then((val) => {
            return val;
        })
    }

    getPagination() {
        return this.pagination;
    }

    getOffset(currentPage = 1, listPerPage) {
        return (currentPage - 1) * [listPerPage];
    }

}

