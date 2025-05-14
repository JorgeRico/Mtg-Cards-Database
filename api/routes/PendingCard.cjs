const PendingCard = require("#classes/PendingCard.cjs");
var express       = require('express');
var router        = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res) {
    pendingCardObject = new PendingCard();
    res.status(200).send(JSON.stringify(await pendingCardObject.getPendingCards()));
});

module.exports = router;
