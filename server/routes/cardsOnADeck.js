const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

var express = require('express');
var router = express.Router();

/**************************************************/
/***********         ENDPOINTS          ***********/
/**************************************************/
/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    res.send(JSON.stringify(await getOnADeckCards()));
});


/**************************************************/
/***********         FUNCTIONS          ***********/
/**************************************************/
/* GET Pending Cards function */
async function getOnADeckCards() {
    const rows = await db.query(
        `SELECT 
        c.id, c.idSet, c.cardName, c.cardImg, c.special, s.setName, s.setLogo
        FROM mtgCard c
        INNER JOIN mtgSet s ON s.id = c.idSet 
        WHERE c.isOnADeck = 1 
        ORDER BY c.id ASC`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    };
}

module.exports = router;
