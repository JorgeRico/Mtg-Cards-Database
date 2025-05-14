/* GET Pagination info function - num sets + filters */
function getTotalNumSets() {
    var query =
        `SELECT 
            count(s.id) as numTotal,
            (SELECT count(s.id) FROM mtgSet s WHERE s.onlineSet = 1 AND s.complete = 1) as numTotalComplete
        FROM mtgSet s WHERE s.onlineSet = 1`;

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
        s.setTotalCards, 
        s.setReleaseDate, 
        s.complete,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) as ownedCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.special = 1) as specialCards
        FROM mtgSet s
        WHERE s.onlineSet = 1
        ORDER BY s.setReleaseDate DESC
        LIMIT ${offset},${pagination}`
    ;
    
    return query;
}

module.exports = { 
    getTotalNumSets, 
    getMultipleSets
};