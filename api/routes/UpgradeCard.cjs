const UpgradeCard = require("#classes/UpgradeCard.cjs");
var express       = require('express');
var router        = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    try {
        upgradeCardObject = new UpgradeCard();
        res.status(200).send(JSON.stringify(await upgradeCardObject.getNeedUpgradeCards()));
    } catch (err) {
        console.error(`Error !!!`, err.message);
        next(err);
    }
});

module.exports = router;
