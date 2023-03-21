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


/**************************************************/
/***********         FUNCTIONS          ***********/
/**************************************************/
function getFilterQueryString(filterParam) {
    var filter = 'WHERE s.onlineSet = 0 AND (SELECT count(card.id) FROM mtgCard card WHERE card.idSet = s.id AND card.special = 1) >= 1';

    return filter;
}

/* GET Pagination info function - num sets + filters */
async function getTotalNumSets(filterParam = null) {
    var filter = getFilterQueryString(filterParam);

    const rows = await db.query(
        `SELECT 
            count(s.id) as numTotal,
            (SELECT count(s.id) FROM mtgSet s ${filter} AND s.complete = 1) as numTotalComplete
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

module.exports = router;
