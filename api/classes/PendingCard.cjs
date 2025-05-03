const queries  = require("#queries/PendingCard.cjs");
const Database = require("#database/connection.cjs");

module.exports = class PendingCard {
    constructor() {
        this.db = new Database();
    }

    /* GET Pending Cards function */
    async getPendingCards() {
        const data = await this.db.doQuery(queries.getPendingCards());

        return {
            data
        };
    }
};
