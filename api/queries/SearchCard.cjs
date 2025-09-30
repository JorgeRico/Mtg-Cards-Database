/* GET Pending Cards function */
function searchCard(cardName) {
    // bypass ' char'
    cardName = cardName.replace("%27", "'")

    var query =
        `SELECT 
        c.id, c.idSet, c.cardName, c.cardJsonLink, c.cardUri, c.cardImg, c.special, c.own, c.pendingToArrive, c.isOnADeck, c.isBackCard, c.needUpgrade, c.isOversized, s.setName, s.setLogo
        FROM mtgCard c
        INNER JOIN mtgSet s ON s.id = c.idSet
        WHERE c.cardName LIKE "%${cardName}%"
        ORDER BY c.id ASC`;
    
        return query;
}

module.exports = {
    searchCard
};