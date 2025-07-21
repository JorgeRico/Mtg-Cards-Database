const SearchCard = require("#classes/SearchCard.cjs");
var express      = require('express');
var router       = express.Router();

/* Search cards */
router.get('/', async function (req, res, next) {
    try {
        cardObject = new SearchCard();
        res.status(200).send(JSON.stringify(await cardObject.searchCard(req.query.cardName)));
    } catch (err) {
        console.error(`Error !!!`, err.message);
        next(err);
    }
});

module.exports = router;
