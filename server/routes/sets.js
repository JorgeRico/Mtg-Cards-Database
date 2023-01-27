const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

// module.exports = router;
var express = require('express');
var router = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
  res.send(JSON.stringify(await getMultipleSets(req.query.filter)));
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
async function getMultipleSets(filterParam = null, page = 1) {
   
    const offset = helper.getOffset(page, config.listPerPage);
    var  filter = '';
    if (filterParam != ''){
        if (filterParam == '1') {
            filter = 'WHERE s.complete = 1'
        }
        if (filterParam == '2') {
            filter = 'WHERE s.complete = 0 AND (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) > 0'
        }
        if (filterParam == '3') {
            filter = 'WHERE s.complete = 0 AND (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) = 0'
        }
    }

    const rows = await db.query(
        `SELECT 
        s.id, s.setName, s.setAbrv, s.setLink, s.setTotalCards, s.setReleaseDate, s.complete,
        (SELECT count(*) FROM mtgCard card WHERE card.idSet = s.id AND card.own = 1) as ownedCards
        FROM mtgSet s
        ${filter}
        ORDER BY s.id DESC
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
    s.id, s.setName, s.setAbrv, s.setLink, s.setTotalCards, s.setReleaseDate, s.complete,
    (SELECT count(*) FROM mtgCard card WHERE card.idSet = ${id} AND card.own = 1) as ownedCards
    FROM mtgSet s
    WHERE s.id = ${id} `
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

  let message = "Error on updating";

  if (result.affectedRows) {
    message = "Updated successfully";
  }

  return { message };
}

module.exports = router;
