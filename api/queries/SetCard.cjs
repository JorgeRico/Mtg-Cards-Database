/* GET Cards function */
function getMultipleSetCards(id, orderBy, pagination, offset) {
    var query =
        `SELECT 
        id, idSet, cardName, cardJsonLink, cardUri, cardImg, special, own, pendingToArrive, isOnADeck, isBackCard, needUpgrade, isOversized
        FROM mtgCard 
        WHERE idSet = ${id} 
        AND isMolCard = 0
        ORDER BY ${orderBy}
        LIMIT ${offset},${pagination}`;
    
    return query;
}

function updateSpecialCard(id, isSpecial) {
    var query =
        `UPDATE mtgCard 
        SET special = "${isSpecial}"
        WHERE id = ${id}`;

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

module.exports = {
    getMultipleSetCards,
    updateOwnSetCard,
    updateAllOwnSetCard,
    updateCompleteSet,
    updatePendingToArriveCard,
    updateBetterGrade,
    updatePendingToArriveAllCards,
    updateCardIsOnADeck,
    updateSpecialCard
};