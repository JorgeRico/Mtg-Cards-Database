/* GET Pending Cards function */
function getOnADeckCards() {
    var query =
        `SELECT 
        c.id, c.idSet, c.cardName, c.cardImg, c.special, s.setName, s.setLogo
        FROM mtgCard c
        INNER JOIN mtgSet s ON s.id = c.idSet 
        WHERE c.isOnADeck = 1 
        ORDER BY c.id ASC`;
    
        return query;
}

module.exports = {
    getOnADeckCards
};