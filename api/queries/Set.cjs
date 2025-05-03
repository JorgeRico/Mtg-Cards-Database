function getFilterQueryString(filterParam) {
    var filter = 'WHERE s.onlineSet = 0';    

    if (filterParam != null){
        if (filterParam == '1') {
            filter += ' AND s.complete = 1';
        }
        if (filterParam == '2') {
            filter += ' AND s.imposible = 0';
            filter += ' AND s.complete = 0 AND (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) > 0';
        }
        if (filterParam == '3') {
            filter += ' AND s.imposible = 0';
            filter += ' AND s.complete = 0 AND (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) = 0';
        }
        if (filterParam == '4') {
            filter += ' AND s.imposible = 1';
        }
    }

    return filter;
}

/* GET Pagination info function - num sets + filters */
function getTotalNumSets(filterParam = null) {
    var filter = getFilterQueryString(filterParam);

    var query =
        `SELECT 
            count(s.id) as numTotal,
            (SELECT count(s.id) FROM mtgSet s ${filter} AND s.complete = 1) as numTotalComplete,
            (SELECT count(c.id) FROM mtgCard c INNER JOIN mtgSet ms ON ms.id = c.idSet WHERE ms.onlineSet = 0) as numTotalCards,
            (SELECT count(c.id) FROM mtgCard c INNER JOIN mtgSet ms ON ms.id = c.idSet WHERE ms.onlineSet = 0 AND c.own = 1) as numTotalCardsOwn,
            (SELECT count(c.id) FROM mtgCard c WHERE c.pendingToArrive = 1) as numTotalPendingCards
        FROM mtgSet s ${filter}`;

    return query;
}

/* GET Cards function */
function getMultipleSets(pagination, offset, filterParam = null) {
    var filter = getFilterQueryString(filterParam);

    var query =
        `SELECT 
        s.id, 
        s.setName, 
        s.setAbrv, 
        s.setLink, 
        s.setLogo, 
        (s.setTotalCards - (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.isMolCard = 1)) as setTotalCards, 
        s.setReleaseDate, 
        s.complete,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) as ownedCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.special = 1) as specialCards
        FROM mtgSet s
        ${filter}
        ORDER BY s.setReleaseDate DESC
        LIMIT ${offset},${pagination}`;
    
    return query;
}

/* GET Single Card */
function getSingleSet(id) {
    var query =
        `SELECT 
        s.id,
        s.setName, 
        s.setAbrv, 
        s.setLink, 
        s.setLogo,
        (s.setTotalCards - (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.isMolCard = 1)) as setTotalCards, 
        s.setReleaseDate, 
        s.complete,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.own = 1) as ownedCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.isOnADeck = 1) as numCardsOnADeck,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.pendingToArrive = 1) as numPendingCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.special = 1) as specialCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.isBackCard = 1) as backCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.isOversized = 1) as oversizedCards
        FROM mtgSet s
        WHERE s.id = ${id} `;

    return query;
}

function updateSetComplete(id, value) {
    var query =
        `UPDATE mtgSet 
        SET complete = "${value}"
        WHERE id = ${id}`;

    return query;
}

module.exports = {
    updateSetComplete,
    getSingleSet,
    getMultipleSets,
    getTotalNumSets
};
