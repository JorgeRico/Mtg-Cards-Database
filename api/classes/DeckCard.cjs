const queries  = require("#queries/DeckCard.cjs");
const Database = require("#database/connection.cjs");

module.exports = class DeckCard {
    constructor() {
        this.db = new Database();
    }

    /* GET Pending Cards function */
    async getOnADeckCards() {
        const data = await this.db.doQuery(queries.getOnADeckCards());

        return {
            data
        };
    }
};
