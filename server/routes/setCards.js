const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

var express = require('express');
var router = express.Router();

/* GET Cards Set listing. */
router.get('/:id', async function (req, res, next) {
    res.send(JSON.stringify(await getMultipleSetCards(req.params.id)));
});

/* GET Card */
router.get('/:id/cards/:idCard', async function (req, res, next) {
    try {
        res.send(JSON.stringify(await getSingleCard(req.params.id, req.params.idCard)));
    } catch (err) {
        console.error(`Error while getting set cards `, err.message);
        next(err);
    }
});

/* PUT Card */
router.put("/:idSet/cards/:idCard", async function (req, res, next) {
    try {
        res.json(await updateCardOwn(req.params.idCard, req.params.idSet, req.body));
    } catch (err) {
        console.error(`Error while updating`, err.message);
        next(err);
    }
});

/* PUT Card */
router.put("/:idSet/cards", async function (req, res, next) {
    try {
        res.json(await updateCardSetOwn(req.params.idSet, req.body));
    } catch (err) {
        console.error(`Error while updating`, err.message);
        next(err);
    }
});


/* GET Cards function - no pagination */
async function getMultipleSetCards(id, page = 1) {
    const offset = helper.getOffset(page, config.listPerPageSetCards);
    const rows = await db.query(
        `SELECT 
        id, idSet, cardName, cardJsonLink, cardUri, cardImg, special, own
        FROM mtgCard 
        WHERE idSet = ${id} 
        ORDER BY cardName ASC
        LIMIT ${offset},${config.listPerPageSetCards}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta,
    };
}

/* GET Single Card */
async function getSingleCard(id, idCard) {
    const rows = await db.query(
        `SELECT 
        id, idSet, cardName, cardJsonLink, cardUri, own
        FROM mtgCard 
        WHERE idSet = ${id} 
        AND id = ${idCard}`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    };
}

/* UPDATE Card */
async function updateCardOwn(id, idSet, value) {
    const result = await db.query(
        `UPDATE mtgCard 
        SET own = "${value.own}"
        WHERE id = ${id}
        AND idSet = ${idSet}`
    );

    let message = "Error on updating";

    if (result.affectedRows) {
        message = "Updated successfully";
    }

    return { message };
}

/* UPDATE Card */
async function updateCardSetOwn(idSet, value) {
    const result = await db.query(
        `UPDATE mtgCard 
        SET own = "${value.own}"
        WHERE idSet = ${idSet}`
    );

    const resultSet = await db.query(
        `UPDATE mtgSet 
        SET complete = "${value.own}"
        WHERE id = ${idSet}`
    );

    let message = "Error on updating";

    if (result.affectedRows && resultSet.affectedRows) {
      message = "Updated successfully";
    }

    return { message };
}

module.exports = router;
