const Set   = require("#classes/Set.cjs");
var express = require('express');
var router  = express.Router();

/* GET Num Sets - Pagination info. */
router.get('/numSets', async function (req, res) {
    setObject = new Set();
    res.status(200).send(JSON.stringify(await setObject.getTotalNumSets(req.query.filter)));
});

/* GET Cards Set listing. */
router.get('/', async function (req, res) {
    setObject = new Set();
    res.status(200).send(JSON.stringify(await setObject.getMultipleSets(req.query.filter, req.query.page)));
});

/* GET Single Set */
router.get('/:id', async function (req, res) {
    setObject = new Set();
    res.status(200).send(JSON.stringify(await setObject.getSingleSet(req.params.id)));
});

router.put("/:id", async function (req, res, next) {
    try {
        setObject = new Set();
        if (req.body.onlineSet != null) {
            res.status(201).json(await setObject.updateSetOnlineSet(req.params.id, req.body));
        } else {
            res.status(201).json(await setObject.updateSetComplete(req.params.id, req.body));
        }
    } catch (err) {
        console.error(`Error while updating`, err.message);
        next(err);
    }
});


module.exports = router;
