function getPendingCards() {
    var query =
        `SELECT 
        c.id, c.idSet, c.cardName, c.cardImg, c.special, s.setName, s.setLogo, c.own, c.pendingToArrive, c.isOnADeck
        FROM mtgCard c
        INNER JOIN mtgSet s ON s.id = c.idSet 
        WHERE c.pendingToArrive = 1 
        ORDER BY c.id ASC`;
    
    return query;
}

module.exports = {
    getPendingCards
};