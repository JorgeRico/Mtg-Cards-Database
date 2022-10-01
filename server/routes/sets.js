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

router.put("/:id", async function (req, res, next) {
  try {
    res.json(await updateSetComplete(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});


/* GET Cards function */
async function getMultipleSets(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT 
    id, setName, setAbrv, setLink, setTotalCards, setReleaseDate, complete
    FROM mtgSet
    ORDER BY setReleaseDate ASC
    LIMIT ${offset},${config.listPerPage}`
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
    id, setName, setAbrv, setLink, setTotalCards, setReleaseDate, complete
    FROM mtgSet
    WHERE id = ${id} `
  );

  const data = helper.emptyOrRows(rows);

  return {
    data
  };
}

async function updateSetComplete(id, value) {
  const result = await db.query(
    `UPDATE mtgSet 
    SET complete = "${value.complete}"
    WHERE id = ${id}`
  );

  let message = "Error in updating programming language";

  if (result.affectedRows) {
    message = "Updated successfully";
  }

  return { message };
}

module.exports = router;
