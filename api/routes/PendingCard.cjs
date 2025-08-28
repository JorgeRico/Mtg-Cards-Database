const PendingCard = require("#classes/PendingCard.cjs");
var express       = require('express');
var router        = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    try {
        pendingCardObject = new PendingCard();
        if (await pendingCardObject.getPendingCards() === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await pendingCardObject.getPendingCards()));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

module.exports = router;
