const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

var express = require('express');
var router = express.Router();

/**************************************************/
/***********         ENDPOINTS          ***********/
/**************************************************/
/* GET Cards Set listing. */
router.get('/:id', async function (req, res, next) {
    res.send(JSON.stringify(await getMultipleSetCards(req.params.id, req.query.filter)));
});

/* PUT Card */
router.put("/:idSet/cards/:idCard", async function (req, res, next) {
    try {
        if (req.body.own != null) {
            res.json(updateCardOwn(req.params.idCard, req.params.idSet, req.body));
        }
        if (req.body.isOnADeck != null) {
            res.json(await updateCardIsOnADeck(req.params.idCard, req.params.idSet, req.body));
        }
        if (req.body.pendingToArrive != null) {
            res.json(updateCardPendingToArrive(req.params.idCard, req.params.idSet, req.body));
        }
        if (req.body.needUpgrade != null) {
            res.json(updateCardBetterGrade(req.params.idCard, req.params.idSet, req.body));
        }
    } catch (err) {
        console.error(`Error while updating`, err.message);
        next(err);
    }
});

/* PUT all set Cards */
router.put("/:idSet/cards", async function (req, res, next) {
    try {
        if (req.body.own != null) {
            res.json(updateCardOwn(null, req.params.idSet, req.body));
        }
        if (req.body.pendingToArrive != null) {
            res.json(updateCardPendingToArrive(null, req.params.idSet, req.body));
        }
    } catch (err) {
        console.error(`Error while updating`, err.message);
        next(err);
    }
});



/**************************************************/
/***********         FUNCTIONS          ***********/
/**************************************************/
/* GET Cards function */
async function getMultipleSetCards(id, orderedById, page = 1) {
    const pagination = 10000;
    const offset     = helper.getOffset(page, pagination);
    let orderedBy    = "";

    if (orderedById === 'id') {
        orderedBy = "id ASC";
    }

    if (orderedById === 'name') {
        orderedBy = "cardName ASC";
    }

    const rows = await db.query(
        `SELECT 
        id, idSet, cardName, cardJsonLink, cardUri, cardImg, special, own, pendingToArrive, isOnADeck, isBackCard, needUpgrade, isOversized
        FROM mtgCard 
        WHERE idSet = ${id} 
        AND isMolCard = 0
        ORDER BY ${orderedBy}
        LIMIT ${offset},${pagination}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta,
    };
}

async function updateOwnSetCard(own, id, idSet) {
    var message = "Error on updating";

    try {
        const result = await db.query(
            `UPDATE mtgCard 
            SET own = "${own}"
            WHERE id = ${id}
            AND idSet = ${idSet}`
        );

        if (result.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return message;
}

async function updateAllOwnSetCard(own, idSet) {
    var message = "Error on updating";

    try {
        const result = await db.query(
            `UPDATE mtgCard 
            SET own = "${own}"
            WHERE idSet = ${idSet}`
        );

        if (result.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return message;
}

async function updateCompleteSet(complete, idSet) {
    var message = "Error on updating";

    try {
        const resultSet = await db.query(
            `UPDATE mtgSet 
            SET complete = "${complete}"
            WHERE id = ${idSet}`
        );

        if (resultSet.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return message;
}

async function updateAllPending(idSet, pendingToArrive) {
    var message = "Error on updating";

    try {
        const result = await db.query(
            `UPDATE mtgCard 
            SET pendingToArrive = ${pendingToArrive}
            WHERE idSet = ${idSet}`
        );

        if (result.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return message;
}

async function updatePendingToArriveCard(pendingToArrive, own, id, idSet) {
    var message = "Error on updating";

    try {
        const result = await db.query(
            `UPDATE mtgCard 
            SET pendingToArrive = "${pendingToArrive}", own = "${own}"
            WHERE id = ${id}
            AND idSet = ${idSet}`
        );

        if (result.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return message ;
}

async function updateBetterGrade(id, idSet, value) {
    var message = "Error on updating";
    
    try {
        const result = await db.query(
            `UPDATE mtgCard 
            SET needUpgrade = "${value}"
            WHERE id = ${id}
            AND idSet = ${idSet}`
        );

        if (result.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return message ;
}

async function updatePendingToArriveAllCards(pendingToArrive, own, idSet) {
    var message = "Error on updating";

    // all set cards
    try {
        const result = await db.query(
            `UPDATE mtgCard 
            SET pendingToArrive = "${pendingToArrive}", own = "${own}"
            WHERE idSet = ${idSet}`
        );

        if (result.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return message;
}

/* UPDATE Card is on a deck - single card */
async function updateCardIsOnADeck(id, idSet, value) {
    var message = "Error on updating";

    try {
        const result = await db.query(
            `UPDATE mtgCard 
            SET isOnADeck = "${value.isOnADeck}"
            WHERE id = ${id}
            AND idSet = ${idSet}`
        );

        if (result.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return { message };
}

/* UPDATE Card own - single card */
function updateCardOwn(id, idSet, value) {
    if (id != null) {
        // single card
        message = updateOwnSetCard(value.own, id, idSet);

        if (value.own == 0) {
            message = updateCompleteSet(value.own, idSet);
        }

        if (value.own == 1) {
            message = updateAllPending(idSet, 0);
        }
    } else {
        // all set cards
        message = updateAllOwnSetCard(value.own, idSet);
        message = updateCompleteSet(value.own, idSet);
    
        if (value.own == 1) {
            message = updateAllPending(idSet, 0);
        }
    }

    return { message };
}

/* UPDATE Card pending to arrive - single card */
function updateCardPendingToArrive(id, idSet, value) {
    var own = 0;
    if (value.pendingToArrive == 0) {
        own = 1;
    }

    if (id != null) {
        // single card
        message = updatePendingToArriveCard(value.pendingToArrive, own, id, idSet)
    } else {
        // all set cards
        message = updatePendingToArriveAllCards(value.pendingToArrive, own, idSet);
    }

    if (value.pendingToArrive == 1) {
        message = updateCompleteSet(0, idSet)
    }

    return { message };
}

/* UPDATE Card better grading - single card */
function updateCardBetterGrade(id, idSet, value) {
    // single card
    if (id != null) {
        message = updateBetterGrade(id, idSet, value.needUpgrade)
    }
    
    return { message };
}

module.exports = router;
