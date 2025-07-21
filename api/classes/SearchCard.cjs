const queries  = require("#queries/SearchCard.cjs");
const Database = require("#database/connection.cjs");

module.exports = class SearchCard {
    constructor() {
        this.db = new Database();
    }

    /* GET Pending Cards function */
    async searchCard(filterParam) {
        const data = await this.db.doQuery(queries.searchCard(filterParam));

        return {
            data
        };
    }
};
