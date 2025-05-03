const PendingCard = require("#classes/PendingCard.cjs");
var express       = require('express');
var router        = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res) {
    pendingCard = new PendingCard();
    res.status(200).send(JSON.stringify(await pendingCard.getPendingCards()));
});

module.exports = router;
