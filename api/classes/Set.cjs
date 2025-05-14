const queries  = require("#queries/Set.cjs");
const Database = require("#database/connection.cjs");

module.exports = class Set {
    constructor() {
        this.db             = new Database();
        this.errorMessage   = "Error on updating";
        this.successMessage = "Updated successfully";;
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
            const result = await this.db.doQuery(queries.updateSetComplete(id, value.complete));

            if (result.affectedRows) {
                return this.successMessage;
            }
        } catch (err) {
            return this.errorMessage;
            // return { message };
        }
    }

    async updateSetOnlineSet(id, value) {
        try {
            const resultSet  = await this.db.doQuery(queries.updateSetOnlineSet(id, value.onlineSet));
            const resultCard = await this.db.doQuery(queries.updateSetOnlineSetCards(id, value.onlineSet));

            if (resultSet.affectedRows && resultCard.affectedRows) {
                return this.successMessage;
            }
        } catch (err) {
            return this.errorMessage;
            // return { message };
        }
    }
}