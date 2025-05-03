const Set   = require("#classes/Set.cjs");
var express = require('express');
var router  = express.Router();

/* GET Num Sets - Pagination info. */
router.get('/numSets', async function (req, res) {
    set = new Set();
    res.status(200).send(JSON.stringify(await set.getTotalNumSets(req.query.filter)));
});

/* GET Cards Set listing. */
router.get('/', async function (req, res) {
    set = new Set();
    res.status(200).send(JSON.stringify(await set.getMultipleSets(req.query.filter, req.query.page)));
});

/* GET Single Set */
router.get('/:id', async function (req, res) {
    set = new Set();
    res.status(200).send(JSON.stringify(await set.getSingleSet(req.params.id)));
});

router.put("/:id", async function (req, res, next) {
    try {
        set = new Set();
        res.status(201).json(await set.updateSetComplete(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating`, err.message);
        next(err);
    }
});

module.exports = router;
