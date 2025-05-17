const queries  = require("#queries/SetCard.cjs");
const Database = require("#database/connection.cjs");

module.exports = class SetCard {
    constructor() {
        this.db             = new Database();
        this.pagination     = 10000;
        this.errorMessage   = "Error on updating";
        this.successMessage = "Updated successfully";
    }

    /* GET Cards function */
    async getMultipleSetCards(id, orderById, page = 1) {
        let orderBy  = this.orderBy(orderById);
        const offset = this.db.getOffset(page, this.pagination);
        const query  = queries.getMultipleSetCards(id, orderBy, this.pagination, offset);
        
        const data   = await this.db.doQuery(query);
        const meta   = { page };

        return {
            data,
            meta,
        };
    }

    updateCardSpecial(id, idSet, value) {
        return this.update(queries.updateSpecialCard(id, idSet, value.isSpecial));
    }

    updateOwnSetCard(id, own, idSet) {
        return this.update(queries.updateOwnSetCard(id, own, idSet));
    }

    updateAllOwnSetCard(own, idSet) {
        return this.update(queries.updateAllOwnSetCard(own, idSet));
    }

    updateCompleteSet(complete, idSet) {
        return this.update(queries.updateCompleteSet(complete, idSet));
    }

    updatePendingToArriveCard(pendingToArrive, id, idSet) {
        return this.update(queries.updatePendingToArriveCard(pendingToArrive, id, idSet));
    }

    updateBetterGrade(id, idSet, value) {
        return this.update(queries.updateBetterGrade(id, idSet, value));
    }

    updatePendingToArriveAllCards(pendingToArrive, idSet) {
        return this.update(queries.updatePendingToArriveAllCards(pendingToArrive, idSet));
    }

    /* UPDATE Card is on a deck - single card */
    updateCardIsOnADeck(id, idSet, value) {
        return this.update(queries.updateCardIsOnADeck(id, idSet, value));
    }

    /* UPDATE Card own - single card */
    async updateCardOwn(id, idSet, value) {
        let message = "";

        if (id != null) {
            // single card
            message = await this.updateOwnSetCard(id, value.own, idSet);
        } else {
            // all set cards
            message = await this.updateAllOwnSetCard(value.own, idSet);
            message = await this.updateCompleteSet(value.own, idSet);
            message = await this.updatePendingToArriveAllCards(idSet, 0);
        }

        return { message };
    }

    /* UPDATE Card pending to arrive - single card */
    async updateCardPendingToArrive(id, idSet, value) {
        let message = "";

        if (id != null) {
            // single card
            message = await this.updatePendingToArriveCard(value.pendingToArrive, id, idSet)
        } else {
            // all set cards
            message = await this.updatePendingToArriveAllCards(value.pendingToArrive, idSet);
        }

        if (value.pendingToArrive == 1) {
            message = this.updateCompleteSet(0, idSet)
        }

        return { message };
    }

    /* UPDATE Card better grading - single card */
    async updateCardBetterGrade(id, idSet, value) {
        var message = await this.updateBetterGrade(id, idSet, value.needUpgrade)
        
        return { message };
    }

    orderBy(orderById) {
        let orderBy = "cardName ASC";

        if (orderById === 'id') {
            orderBy = "id ASC";
        }

        if (orderById === 'name') {
            orderBy = "cardName ASC";
        }

        return orderBy;
    }
    
    async update(query){
        try {
            const result = await this.db.doQuery(query);

            if (result.affectedRows) {
                return this.successMessage;
            }
        } catch (err) {
            return this.errorMessage;
        }
    }
};
