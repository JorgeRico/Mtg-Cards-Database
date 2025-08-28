const Set   = require("#classes/Set.cjs");
var express = require('express');
var router  = express.Router();

/* GET Num Sets - Pagination info. */
router.get('/numSets', async function (req, res, next) {
    try {
        setObject = new Set();
        if (await setObject.getTotalNumSets(req.query.filter) === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await setObject.getTotalNumSets(req.query.filter)));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    try {
        setObject = new Set();
       
        if (await setObject.getMultipleSets(req.query.filter, req.query.page) === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await setObject.getMultipleSets(req.query.filter, req.query.page)));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

/* GET Single Set */
router.get('/:id', async function (req, res, next) {
    try {
        setObject = new Set();
        if (await setObject.getSingleSet(req.params.id) === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await setObject.getSingleSet(req.params.id)));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

router.put("/:id", async function (req, res, next) {
    try {
        setObject = new Set();
        if (req.body.onlineSet != null) {
            if (await setObject.updateSetOnlineSet(req.params.id, req.body) === undefined) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await setObject.updateSetOnlineSet(req.params.id, req.body));
            }
        } else {
            if (await setObject.updateSetComplete(req.params.id, req.body) === undefined) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await setObject.updateSetComplete(req.params.id, req.body));
            }
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});


module.exports = router;
