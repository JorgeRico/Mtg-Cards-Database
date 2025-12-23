/* GET Cards function */
function getMultipleSetCards(id, orderBy, pagination, offset) {
    var query =
        `SELECT 
        c.id, c.idSet, c.cardName, c.cardJsonLink, c.cardUri, c.cardImg, c.special, c.isMolCard, c.own, c.pendingToArrive, c.isOnADeck, c.isBackCard, c.needUpgrade, c.isOversized, s.setName, s.setLogo
        FROM mtgCard c
        INNER JOIN mtgSet s ON s.id = c.idSet 
        WHERE c.idSet = ${id}
        ORDER BY c.${orderBy}
        LIMIT ${offset},${pagination}`;

    return query;
}

function updateSpecialCard(id, idSet, isSpecial) {
    var query =
        `UPDATE mtgCard 
        SET special = "${isSpecial}"
        WHERE id = ${id} AND idSet = ${idSet} `;

    return query;
}

function updateOwnSetCard(id, own, idSet) {
    var query =
        `UPDATE mtgCard 
        SET own = "${own}", pendingToArrive = 0
        WHERE id = ${id}
        AND idSet = ${idSet}`;

    return query;
}

function updateAllOwnSetCard(own, idSet) {
    var query =
        `UPDATE mtgCard 
        SET own = "${own}", pendingToArrive = 0
        WHERE idSet = ${idSet}`;

    return query;
}

function updateCompleteSet(complete, idSet) {
    var query =
        `UPDATE mtgSet 
        SET complete = "${complete}"
        WHERE id = ${idSet}`;

    return query;
}

function updatePendingToArriveCard(pendingToArrive, id, idSet) {
    var own = 0;
    if (pendingToArrive == 0) {
        own = 1;
    }
    var query =
        `UPDATE mtgCard 
        SET pendingToArrive = "${pendingToArrive}", own = "${own}"
        WHERE id = ${id}
        AND idSet = ${idSet}`;

    return query;
}

function updatePendingToArriveAllCards(pendingToArrive, idSet) {
    var query =
            `UPDATE mtgCard 
            SET pendingToArrive = "${pendingToArrive}", own = 0
            WHERE idSet = ${idSet}`;

    return query;
}

function updateBetterGrade(id, idSet, value) {
    var query =
        `UPDATE mtgCard 
        SET needUpgrade = "${value}"
        WHERE id = ${id}
        AND idSet = ${idSet}`;

    return query;
}

/* UPDATE Card is on a deck - single card */
function updateCardIsOnADeck(id, idSet, value) {
    var query =
        `UPDATE mtgCard 
        SET isOnADeck = "${value.isOnADeck}"
        WHERE id = ${id}
        AND idSet = ${idSet}`;

    return query;
}

function updateIsMolCard(id, idSet, value) {
    var query =
        `UPDATE mtgCard 
        SET isMolCard = "${value.isMolCard}"
        WHERE id = ${id} AND idSet = ${idSet} `;

    return query;
}

module.exports = {
    getMultipleSetCards,
    updateOwnSetCard,
    updateAllOwnSetCard,
    updateCompleteSet,
    updatePendingToArriveCard,
    updateBetterGrade,
    updatePendingToArriveAllCards,
    updateCardIsOnADeck,
    updateSpecialCard,
    updateIsMolCard
};