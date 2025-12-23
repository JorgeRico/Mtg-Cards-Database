const queries  = require("#queries/Set.cjs");
const Database = require("#database/connection.cjs");

module.exports = class Set {
    constructor() {
        this.db             = new Database();
        this.successMessage = "Updated successfully";
    }

    /* GET Pagination info function - num sets + filters */
    async getTotalNumSets(filterParam = null) {
        const data = await this.db.doQuery(queries.getTotalNumSets(filterParam));

        return {
            data
        };
    }

    /* GET Cards function */
    async getMultipleSets(filterParam = null, page = 1) {
        const offset = this.db.getOffset(page, this.db.getPagination());
        const data   = await this.db.doQuery(queries.getMultipleSets(this.db.getPagination(), offset, filterParam));
        const meta   = { page };

        return {
            data,
            meta,
        };
    }

    /* GET Single Card */
    async getSingleSet(id) {
        const data = await this.db.doQuery(queries.getSingleSet(id));

        return {
            data
        };
    }

    async updateSetComplete(id, value) {
        try {
            await this.db.doQuery(queries.updateSetComplete(id, value.complete));

            return this.successMessage;
        } catch (err) {
            return false;
        }
    }

    async updateSetOnlineSet(id, value) {
        try {
            await this.db.doQuery(queries.updateSetOnlineSet(id, value.onlineSet));
            const totalCardsData = await this.db.doQuery(queries.getSetTotalMolCards(id));
            if (totalCardsData[0].setTotalCards > 0) {
                const totalCards = value.onlineSet == 1 ? totalCardsData[0].setTotalCards : 0;
                await this.db.doQuery(queries.updateSetMolCards(id, totalCards));
            }
            await this.db.doQuery(queries.updateSetOnlineSetCards(id, value.onlineSet));

            return this.successMessage;
        } catch (err) {
            return false;
        }
    }
}