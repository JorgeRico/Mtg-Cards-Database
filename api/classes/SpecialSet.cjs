const queries  = require("#queries/SpecialSet.cjs");
const Database = require("#database/connection.cjs");

module.exports = class SpecialSet {
    constructor() {
        this.db = new Database();
    }

    // Total sets
    async getTotalNumSets() {
        const data = await this.db.doQuery(queries.getTotalNumSets());

        return { data };
    }

    // list of sets
    async getMultipleSets(page = 1) {
        const offset = this.db.getOffset(page, this.db.getPagination());
        const data   = await this.db.doQuery(queries.getMultipleSets(this.db.getPagination(), offset));
        const meta   = { page };

        return {
            data,
            meta,
        };
    }
};