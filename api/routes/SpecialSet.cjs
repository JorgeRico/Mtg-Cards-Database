const SpecialSet = require("#classes/SpecialSet.cjs");
var express      = require('express');
var router       = express.Router();

/* GET Num Sets */
router.get('/numSets', async function (req, res, next) {
    try {
        specialSetObject = new SpecialSet();
        if (await specialSetObject.getTotalNumSets() === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await specialSetObject.getTotalNumSets()));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    try {
        specialSetObject = new SpecialSet();
        if (await specialSetObject.getMultipleSets(req.query.filter, req.query.page) === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await specialSetObject.getMultipleSets(req.query.filter, req.query.page)));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

module.exports = router;