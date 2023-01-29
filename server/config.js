const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "app-db",
        user: "user",
        password: "password",
        database: "app-db",
    },
    listPerPage: 100,
};
module.exports = config;