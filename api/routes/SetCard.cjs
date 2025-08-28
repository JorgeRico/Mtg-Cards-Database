const SetCard = require("#classes/SetCard.cjs");
var express   = require('express');
var router    = express.Router();

/* GET Cards Set listing. */
router.get('/:id', async function (req, res, next) {
    try {
        card = new SetCard();
        if (await card.getMultipleSetCards(req.params.id, req.query.filter) === undefined) {
            res.status(404).send("error");
        } else {
            res.status(200).send(JSON.stringify(await card.getMultipleSetCards(req.params.id, req.query.filter)));
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

/* PUT Card */
router.put("/:idSet/cards/:idCard", async function (req, res, next) {
    try {
        card = new SetCard();

        if (req.body.own != null) {
            if (await card.updateCardOwn(req.params.idCard, req.params.idSet, req.body) === false) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await card.updateCardOwn(req.params.idCard, req.params.idSet, req.body));
            }
        }

        if (req.body.isOnADeck != null) {
            if (await card.updateCardIsOnADeck(req.params.idCard, req.params.idSet, req.body) === false) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await card.updateCardIsOnADeck(req.params.idCard, req.params.idSet, req.body));
            }
        }

        if (req.body.pendingToArrive != null) {
            if (await card.updateCardPendingToArrive(req.params.idCard, req.params.idSet, req.body) === false) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await card.updateCardPendingToArrive(req.params.idCard, req.params.idSet, req.body));
            }
        }

        if (req.body.needUpgrade != null) {
            if (await card.updateCardBetterGrade(req.params.idCard, req.params.idSet, req.body) === false) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await card.updateCardBetterGrade(req.params.idCard, req.params.idSet, req.body));
            }
        }

        if (req.body.isSpecial != null) {
            if (await card.updateCardSpecial(req.params.idCard, req.params.idSet, req.body) === false) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await card.updateCardSpecial(req.params.idCard, req.params.idSet, req.body));    
            }
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

/* PUT all set Cards */
router.put("/:idSet/cards", async function (req, res, next) {
    try {
        card = new SetCard();

        if (req.body.own != null) {
            if (await card.updateCardOwn(null, req.params.idSet, req.body) === false) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await card.updateCardOwn(null, req.params.idSet, req.body)); 
            }
        }

        if (req.body.pendingToArrive != null) {
            if (await card.updateCardPendingToArrive(null, req.params.idSet, req.body) === false) {
                res.status(404).send("error");
            } else {
                res.status(201).json(await card.updateCardPendingToArrive(null, req.params.idSet, req.body));
            }
        }
    } catch (err) {
        res.status(404).send("error");
        next(err);
    }
});

module.exports = router;
