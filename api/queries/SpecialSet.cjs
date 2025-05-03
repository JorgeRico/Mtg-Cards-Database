/* GET Pagination info function - num sets + filters */
function getTotalNumSets() {
    var query =
        `SELECT 
            count(s.id) as numTotal,
            (SELECT count(s.id) FROM mtgSet s ${specialSetFilterQuery()} AND s.complete = 1) as numTotalComplete
        FROM mtgSet s ${specialSetFilterQuery()}`;

    return query;
}

// Get specialsets list
function getMultipleSets(pagination, offset) {
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
        ${specialSetFilterQuery()}
        ORDER BY s.setReleaseDate DESC
        LIMIT ${offset},${pagination}`
    ;
    
    return query;
}

function specialSetFilterQuery() {
    return 'WHERE s.onlineSet = 0 AND (SELECT count(card.id) FROM mtgCard card WHERE card.idSet = s.id AND card.special = 1) >= 1';
}

module.exports = { 
    getTotalNumSets, 
    getMultipleSets
};