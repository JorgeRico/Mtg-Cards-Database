const pool = require('../config');

async function query(sql, params) {
    const [results,] = await pool.execute(sql, params);

    return results;
}

module.exports = {
    query
}
