const queries  = require("#queries/UpgradeCard.cjs");
const Database = require("#database/connection.cjs");

module.exports = class UpgradeCard {
    constructor() {
        this.db = new Database();
    }

    /* GET Pending Cards function */
    async getNeedUpgradeCards() {
        const data   = await this.db.doQuery(queries.getNeedUpgradeCards());

        return {
            data
        };
    }
};
