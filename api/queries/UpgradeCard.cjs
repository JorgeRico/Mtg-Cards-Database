/* GET Pending Cards function */
function getNeedUpgradeCards() {
    var query = 
        `SELECT 
        c.id, c.idSet, c.cardName, c.cardImg, c.special, c.needUpgrade, s.setName, s.setLogo
        FROM mtgCard c
        INNER JOIN mtgSet s ON s.id = c.idSet 
        WHERE c.needUpgrade = 1 
        ORDER BY c.id ASC`;

    return query;
}


module.exports = { 
    getNeedUpgradeCards
};