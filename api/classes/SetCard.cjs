const queries    = require("#queries/SetCard.cjs");
const queriesSet = require("#queries/Set.cjs");
const Database   = require("#database/connection.cjs");

module.exports = class SetCard {
    constructor() {
        this.db             = new Database();
        this.pagination     = 10000;
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

    async updateCardSpecial(id, idSet, value) {
        var message = await this.update(queries.updateSpecialCard(id, idSet, value.isSpecial));
        
        return { message };
    }

    async updateOwnSetCard(id, own, idSet) {
        var message = await this.update(queries.updateOwnSetCard(id, own, idSet));

        return { message };
    }

    async updateAllOwnSetCard(own, idSet) {
        var message = await this.update(queries.updateAllOwnSetCard(own, idSet));

        return { message };
    }

    async updateCompleteSet(complete, idSet) {
        var message = await this.update(queries.updateCompleteSet(complete, idSet));

        return { message };
    }

    async updatePendingToArriveCard(pendingToArrive, id, idSet) {
        var message = await this.update(queries.updatePendingToArriveCard(pendingToArrive, id, idSet));

        return { message };
    }

    async updateBetterGrade(id, idSet, value) {
        var message = await this.update(queries.updateBetterGrade(id, idSet, value));

        return { message };
    }

    async updatePendingToArriveAllCards(pendingToArrive, idSet) {
        var message = await this.update(queries.updatePendingToArriveAllCards(pendingToArrive, idSet));

        return { message };
    }

    /* UPDATE Card is on a deck - single card */
    async updateCardIsOnADeck(id, idSet, value) {
        var message = await this.update(queries.updateCardIsOnADeck(id, idSet, value));
        
        return { message };
    }

    /* UPDATE Card is mol - single card */
    async updateIsMolCard(id, idSet, value) {
        var message = await this.update(queries.updateIsMolCard(id, idSet, value));

        const totalMolCardsData = await this.db.doQuery(queriesSet.getSetTotalMolCards(idSet));

        console.log(totalMolCardsData)

        let totalCards = 0;
        if (value.isMolCard == 1) {
            totalCards = totalMolCardsData[0].setTotalMolCards + 1;
        } else {
            totalCards = totalMolCardsData[0].setTotalMolCards - 1;
        }

        if (totalCards < 0) totalCards = 0;

        await this.db.doQuery(queriesSet.updateSetOnlineSetMolCards(idSet, totalCards));
        
        return { message };
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
            if ( message === false ) return { message }; 
            message = await this.updateCompleteSet(value.own, idSet);
            if ( message === false ) return { message };
            message = await this.updatePendingToArriveAllCards(idSet, 0);
        }

        return message;
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

        // if (value.pendingToArrive == 1) {
        //     message = this.updateCompleteSet(0, idSet)
        // }

        return message;
    }

    /* UPDATE Card better grading - single card */
    async updateCardBetterGrade(id, idSet, value) {
        var message = await this.updateBetterGrade(id, idSet, value.needUpgrade)
        
        return message;
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
            await this.db.doQuery(query);

            return this.successMessage;            
        } catch (err) {
            return false;
        }
    }

    countNotNullParams(values) {
        var total = 0;

        if (values.own != null) {
            total++;
        }

        if (values.isOnADeck != null) {
            total++;
        }

        if (values.pendingToArrive != null) {
            total++;
        }

        if (values.needUpgrade != null) {
            total++;
        }

        if (values.isSpecial != null) {
            total++;
        }

        if (values.isMolCard != null) {
            total++;
        }

        return total;
    }
};
