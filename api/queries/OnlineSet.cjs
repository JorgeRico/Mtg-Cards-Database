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
        s.setTotalOwnedCards as ownedCards,
        s.setTotalSpecialCards as specialCards,
        s.setTotalMolCards
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