const SpecialSet = require("#classes/SpecialSet.cjs");
var express      = require('express');
var router       = express.Router();

/* GET Num Sets */
router.get('/numSets', async function (req, res, next) {
    try {
        specialSetObject = new SpecialSet();
        res.status(200).send(JSON.stringify(await specialSetObject.getTotalNumSets()));
    } catch (err) {
        console.error(`Error !!!`, err.message);
        next(err);
    }
});

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    try {
        specialSetObject = new SpecialSet();
        res.status(200).send(JSON.stringify(await specialSetObject.getMultipleSets(req.query.filter, req.query.page)));
    } catch (err) {
        console.error(`Error !!!`, err.message);
        next(err);
    }
});

module.exports = router;