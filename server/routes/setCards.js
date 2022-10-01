const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

// module.exports = router;
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


/* Get Cards function */
async function getMultipleSetCards(id, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT 
    id, idSet, cardName, cardJsonLink, cardLink 
    FROM mtgCard 
    WHERE idSet = ${id} 
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  console.log(data);
  return {
    data,
    meta,
  };
}

/* Get Single Card */
async function getSingleCard(id, idCard) {
  console.log(id)
  const rows = await db.query(
    `SELECT 
    id, idSet, cardName, cardJsonLink, cardLink 
    FROM mtgCard 
    WHERE idSet = ${id} 
    AND id = ${idCard}`
  );
  const data = helper.emptyOrRows(rows);
  console.log(data);
  return {
    data
  };
}

module.exports = router;
