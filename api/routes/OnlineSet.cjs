const OnlineSet = require("#classes/OnlineSet.cjs");
var express      = require('express');
var router       = express.Router();

/* GET Num Sets */
router.get('/numSets', async function (req, res, next) {
    try {
        onlineSetObject = new OnlineSet();
        if (await onlineSetObject.getTotalNumSets() === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await onlineSetObject.getTotalNumSets()));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    try {
        onlineSetObject = new OnlineSet();
        if (await onlineSetObject.getMultipleSets(req.query.filter, req.query.page) === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await onlineSetObject.getMultipleSets(req.query.filter, req.query.page)));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

module.exports = router;