const SpecialSet = require("#classes/SpecialSet.cjs");
var express      = require('express');
var router       = express.Router();

/* GET Num Sets */
router.get('/numSets', async function (req, res) {
    specialSet = new SpecialSet();
    res.status(200).send(JSON.stringify(await specialSet.getTotalNumSets()));
});

/* GET Cards Set listing. */
router.get('/', async function (req, res) {
    specialSet = new SpecialSet();
    res.status(200).send(JSON.stringify(await specialSet.getMultipleSets(req.query.filter, req.query.page)));
});

module.exports = router;