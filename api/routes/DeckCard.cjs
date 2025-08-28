const DeckCard = require("#classes/DeckCard.cjs");
var express    = require('express');
var router     = express.Router();

/* GET Cards Set listing. */
router.get('/', async function (req, res, next) {
    try {
        deckCardObject = new DeckCard();
        if (await deckCardObject.getOnADeckCards() === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await deckCardObject.getOnADeckCards()));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

module.exports = router;
