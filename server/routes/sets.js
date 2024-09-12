const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

// module.exports = router;
var express = require('express');
var router = express.Router();

/**************************************************/
/***********         ENDPOINTS          ***********/
/**************************************************/
/* GET Num Sets - Pagination info. */
router.get('/numSets', async function (req, res, next) {
    res.send(JSON.stringify(await getTotalNumSets(req.query.filter)));
});

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
  res.send(JSON.stringify(await getMultipleSets(req.query.filter, req.query.page)));
});

/* GET Single Set */
router.get('/:id', async function (req, res, next) {
  res.send(JSON.stringify(await getSingleSet(req.params.id)));
});

router.put("/:id", async function (req, res, next) {
    try {
        res.json(await updateSetComplete(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating`, err.message);
        next(err);
    }
});


/**************************************************/
/***********         FUBCTIONS          ***********/
/**************************************************/
function getFilterQueryString(filterParam) {
    var filter = 'WHERE s.onlineSet = 0';    

    if (filterParam != null){
        if (filterParam == '1') {
            filter += ' AND s.complete = 1';
        }
        if (filterParam == '2') {
            filter += ' AND s.imposible = 0';
            filter += ' AND s.complete = 0 AND (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) > 0';
        }
        if (filterParam == '3') {
            filter += ' AND s.imposible = 0';
            filter += ' AND s.complete = 0 AND (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) = 0';
        }
        if (filterParam == '4') {
            filter += ' AND s.imposible = 1';
        }
    }

    return filter;
}

/* GET Pagination info function - num sets + filters */
async function getTotalNumSets(filterParam = null) {
    var filter = getFilterQueryString(filterParam);

    const rows = await db.query(
        `SELECT 
            count(s.id) as numTotal,
            (SELECT count(s.id) FROM mtgSet s ${filter} AND s.complete = 1) as numTotalComplete,
            (SELECT count(c.id) FROM mtgCard c INNER JOIN mtgSet ms ON ms.id = c.idSet WHERE ms.onlineSet = 0) as numTotalCards,
            (SELECT count(c.id) FROM mtgCard c INNER JOIN mtgSet ms ON ms.id = c.idSet WHERE ms.onlineSet = 0 AND c.own = 1) as numTotalCardsOwn,
            (SELECT count(c.id) FROM mtgCard c WHERE c.pendingToArrive = 1) as numTotalPendingCards
        FROM mtgSet s ${filter}`
    );

    const data = helper.emptyOrRows(rows);

    return {
        data
    };
}

/* GET Cards function */
async function getMultipleSets(filterParam = null, page = 1) {
    const pagination = 100;
    const offset = helper.getOffset(page, pagination);

    var filter = getFilterQueryString(filterParam);

    const rows = await db.query(
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
        ${filter}
        ORDER BY s.setReleaseDate DESC
        LIMIT ${offset},${pagination}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta,
    };
}

/* GET Single Card */
async function getSingleSet(id) {
    const rows = await db.query(
        `SELECT 
        s.id,
        s.setName, 
        s.setAbrv, 
        s.setLink, 
        s.setLogo,
        (s.setTotalCards - (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.isMolCard = 1)) as setTotalCards, 
        s.setReleaseDate, 
        s.complete,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.own = 1) as ownedCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.isOnADeck = 1) as numCardsOnADeck,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.pendingToArrive = 1) as numPendingCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.special = 1) as specialCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.isBackCard = 1) as backCards,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.isOversized = 1) as oversizedCards
        FROM mtgSet s
        WHERE s.id = ${id} `
    );

    const data = helper.emptyOrRows(rows);

    return {
        data
    };
}

async function updateSetComplete(id, value) {
    let message = "Error on updating";

    try {
        const result = await db.query(
            `UPDATE mtgSet 
            SET complete = "${value.complete}"
            WHERE id = ${id}`
        );

        if (result.affectedRows) {
            message = "Updated successfully";
        }
    } catch (err) {
        return message;
    }

    return { message };
}

module.exports = router;
