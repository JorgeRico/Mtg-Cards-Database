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
        const offset = this.db.getOffset(page, this.pagination);
        let orderBy  = "";
        let query    = "";
        let data     = [];

        if (orderById == 'id' || orderById == 'name' || orderById == null) {
            orderBy = this.orderBy(orderById);
            query   = queries.getMultipleSetCards(id, orderBy, this.pagination, offset);
            data    = await this.db.doQuery(query);
        } else {
            orderBy = this.showConditions(orderById);
            query   = queries.getMultipleSetCardsWithCondition(id, orderBy, this.pagination, offset);
            data    = await this.db.doQuery(query);
        }

        const meta  = { page };

        return {
            data,
            meta,
        };
    }

    async updateCardSpecial(id, idSet, value) {
        var message = await this.update(queries.updateSpecialCard(id, idSet, value.isSpecial));

        const totalSpecialCardsData = await this.db.doQuery(queriesSet.getSetTotalSpecialCards(idSet));

        let totalCards = 0;
        if (value.isSpecial == 1) {
            totalCards = totalSpecialCardsData[0].setTotalSpecialCards + 1;
        } else {
            totalCards = totalSpecialCardsData[0].setTotalSpecialCards - 1;
        }

        if (totalCards < 0) totalCards = 0;

        await this.db.doQuery(queriesSet.updateSetMolCards(idSet, totalCards));
        
        return { message };
    }

    async updateOwnSetCard(id, own, idSet) {
        var message = await this.update(queries.updateOwnSetCard(id, own, idSet));

        let totalOwnedCardsData = null;
        totalOwnedCardsData     = await this.db.doQuery(queriesSet.getSetTotalOwnedCards(idSet));
        if (totalOwnedCardsData) {
            let totalCards = 0;
            if (own == 1) {
                totalCards = totalOwnedCardsData[0].setTotalOwnedCards + 1;
            } else {
                totalCards = totalOwnedCardsData[0].setTotalOwnedCards - 1;
            }

            if (totalCards < 0) totalCards = 0;

            await this.db.doQuery(queriesSet.updateSetOwnedCards(idSet, totalCards));
        }
        
        return { message };
    }

    async updateAllOwnSetCard(own, idSet) {
        var message = await this.update(queries.updateAllOwnSetCard(own, idSet));

        let total   = await this.db.doQuery(queries.countTotalOwnedCards(idSet));
        var message = await this.db.doQuery(queriesSet.updateSetOwnedCards(idSet, total[0].totalOwnedCards))

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

        let totalMolCardsData = null;
        totalMolCardsData     = await this.db.doQuery(queriesSet.getSetTotalMolCards(idSet));

        if (totalMolCardsData) {
            let totalCards = 0;
            if (value.isMolCard == 1) {
                totalCards = totalMolCardsData[0].setTotalMolCards + 1;
            } else {
                totalCards = totalMolCardsData[0].setTotalMolCards - 1;
            }

            if (totalCards < 0) totalCards = 0;

            await this.db.doQuery(queriesSet.updateSetMolCards(idSet, totalCards));
        }
        
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

            let total = await this.db.doQuery(queries.countTotalOwnedCards(idSet));
            message   = await this.db.doQuery(queriesSet.updateSetOwnedCards(idSet, total[0].totalOwnedCards))
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

    showConditions(option) {
        let condition = "";

        if (option === 'isMolCard') {
            condition = "isMolCard = 1";
        }

        if (option === 'isSpecial') {
            condition = "special = 1";
        }

        if (option === 'isOnADeck') {
            condition = "isOnADeck = 1";
        }

        if (option === 'needUpgrade') {
            condition = "needUpgrade = 1";
        }

        if (option === 'pendingToArrive') {
            condition = "iendingToArrive = 1";
        }

        if (option === 'own') {
            condition = "own = 0";
        }

        return condition;
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
