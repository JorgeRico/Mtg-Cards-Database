const UpgradeCard = require("#classes/UpgradeCard.cjs");
var express       = require('express');
var router        = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res) {
    upgradeCard = new UpgradeCard();
    res.status(200).send(JSON.stringify(await upgradeCard.getNeedUpgradeCards()));
});

module.exports = router;
