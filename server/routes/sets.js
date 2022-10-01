const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

// module.exports = router;
var express = require('express');
var router = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
  res.send(JSON.stringify(await getMultipleSets()));
});

/* GET Single Set */
router.get('/:id', async function (req, res, next) {
  res.send(JSON.stringify(await getSingleSet(req.params.id)));
});


/* Get Cards function */
async function getMultipleSets(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT 
    id, setName, setAbrv, setLink, setTotalCards, setReleaseDate
    FROM mtgSet
    ORDER BY setReleaseDate ASC
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
async function getSingleSet(id) {
  console.log(id)
  const rows = await db.query(
    `SELECT 
    id, setName, setAbrv, setLink, setTotalCards, setReleaseDate
    FROM mtgSet
    WHERE id = ${id} `
  );

  const data = helper.emptyOrRows(rows);
  console.log(data);
  return {
    data
  };
}

module.exports = router;
