const OnlineSet = require("#classes/OnlineSet.cjs");
var express      = require('express');
var router       = express.Router();

/* GET Num Sets */
router.get('/numSets', async function (req, res) {
    onlineSet = new OnlineSet();
    res.status(200).send(JSON.stringify(await onlineSet.getTotalNumSets()));
});

/* GET Cards Set listing. */
router.get('/', async function (req, res) {
    onlineSet = new OnlineSet();
    res.status(200).send(JSON.stringify(await onlineSet.getMultipleSets(req.query.filter, req.query.page)));
});

module.exports = router;