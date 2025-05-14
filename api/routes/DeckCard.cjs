const DeckCard = require("#classes/DeckCard.cjs");
var express    = require('express');
var router     = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res) {
    deckCardObject = new DeckCard();
    res.status(200).send(JSON.stringify(await deckCardObject.getOnADeckCards()));
});

module.exports = router;
