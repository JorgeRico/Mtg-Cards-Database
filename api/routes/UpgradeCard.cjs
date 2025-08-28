const UpgradeCard = require("#classes/UpgradeCard.cjs");
var express       = require('express');
var router        = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    try {
        upgradeCardObject = new UpgradeCard();
        if (await upgradeCardObject.getNeedUpgradeCards() === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await upgradeCardObject.getNeedUpgradeCards()));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

module.exports = router;
