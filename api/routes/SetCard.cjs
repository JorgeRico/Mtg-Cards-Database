const SetCard = require("#classes/SetCard.cjs");
var express   = require('express');
var router    = express.Router();

/**
* @swagger
* /setCards/{id}:
*   get:
*     tags: [Set Card]
*     summary: Retrieve a list of cards from a set
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: set ID
*     responses:
*       200:
*         description: Successful response
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   example: 
*                     [{"id":46,"idSet":1,"cardName":"Air Elemental","cardJsonLink":"69c3b2a3-0daa-4d42-832d-fcdfda6555ea","cardUri":"https://api.scryfall.com/cards/69c3b2a3-0daa-4d42-832d-fcdfda6555ea","cardImg":"https://cards.scryfall.io/normal/front/6/9/69c3b2a3-0daa-4d42-832d-fcdfda6555ea.jpg?1559591522","special":0,"own":0,"pendingToArrive":0,"isOnADeck":0,"isBackCard":0,"needUpgrade":0,"isOversized":0},{"id":47,"idSet":1,"cardName":"Ancestral Recall","cardJsonLink":"70e7ddf2-5604-41e7-bb9d-ddd03d3e9d0b","cardUri":"https://api.scryfall.com/cards/70e7ddf2-5604-41e7-bb9d-ddd03d3e9d0b","cardImg":"https://cards.scryfall.io/normal/front/7/0/70e7ddf2-5604-41e7-bb9d-ddd03d3e9d0b.jpg?1559591549","special":0,"own":0,"pendingToArrive":0,"isOnADeck":0,"isBackCard":0,"needUpgrade":0,"isOversized":0}]
*       404:
*         description: Error not found
*       401:
*         description: System error
*/
router.get('/:id', async function (req, res, next) {
    try {
        card        = new SetCard();
        var message = await card.getMultipleSetCards(req.params.id, req.query.filter);
            
        if (message === undefined) {
            res.status(401).send({"message": "Error on updating own"});
            return;
        } else {
            res.status(200).json(message);
            return;
        }
    } catch (err) {
        res.status(500).json({"message": "System error"});
        next(err);
    }
});

/**
* @swagger
* /setCards/{idSet}/cards/{idCard}:
*   put:
*     tags: [Set Card]
*     summary: Update card data
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*                own:
*                  type: integer
*                  default: null
*                isOnADeck:
*                  type: integer
*                  default: null
*                pendingToArrive:
*                  type: integer
*                  default: null
*                needUpgrade:
*                  type: integer
*                  default: null
*                isSpecial:
*                  type: integer
*                  default: null
*     parameters:
*       - in: path
*         name: idSet
*         schema:
*           type: integer
*         required: true
*         description: set ID
*       - in: path
*         name: idCard
*         schema:
*           type: integer
*         required: true
*         description: ID card
*     responses:
*       200:
*         description: Update card data
*       404:
*         description: Error not found
*       401:
*         description: System error
*/
router.put("/:idSet/cards/:idCard", async function (req, res, next) {
    try {
        card = new SetCard();

        if (card.countNotNullParams(req.body) > 1) {
            res.status(401).send({"message": "Only 1 param can be filled with values"});
            return;
        }

        if (card.countNotNullParams(req.body) == 0) {
            res.status(401).send({"message": "We need 1 param filled with data"});
            return;
        }

        if (req.body.own != null) {
            var message = await card.updateCardOwn(req.params.idCard, req.params.idSet, req.body);

            if (message === false) {
                res.status(401).send({"message": "Error on updating own"});
                return;
            } else {
                res.status(200).json(message);
                return;
            }
        }

        if (req.body.isOnADeck != null) {
            var message = await card.updateCardIsOnADeck(req.params.idCard, req.params.idSet, req.body);

            if (message === false) {
                res.status(401).send({"message": "Error on updating is on a deck"});
                return;
            } else {
                res.status(200).json(message);
                return;
            }
        }

        if (req.body.pendingToArrive != null) {
            var message = await card.updateCardPendingToArrive(req.params.idCard, req.params.idSet, req.body);

            if (message === false) {
                res.status(401).send({"message": "Error on updating pending to arrive"});
                return;
            } else {
                res.status(200).json(message);
                return;
            }
        }

        if (req.body.needUpgrade != null) {
            var message = await card.updateCardBetterGrade(req.params.idCard, req.params.idSet, req.body);

            if (message === false) {
                res.status(401).send({"message": "Error on updating need upgrade"});
                return;
            } else {
                res.status(200).json(message);
                return;
            }
        }

        if (req.body.isSpecial != null) {
            var message = await card.updateCardSpecial(req.params.idCard, req.params.idSet, req.body);

            if (message === false) {
                res.status(401).send({"message": "Error on updating is Special"});
                return;
            } else {
                res.status(200).json(message);
                return;
            }
        }
    } catch (err) {
        res.status(500).json({"message": "System error"});
        next(err);
    }
});

/**
* @swagger
* /setCards/{idSet}/cards:
*   put:
*     tags: [Set Card]
*     summary: Update set cards data
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*                own:
*                  type: integer
*                  default: null
*                pendingToArrive:
*                  type: integer
*                  default: null
*     parameters:
*       - in: path
*         name: idSet
*         schema:
*           type: integer
*         required: true
*         description: set ID
*     responses:
*       200:
*         description: Update set cards data
*       404:
*         description: Error not found
*       401:
*         description: System error
*/
router.put("/:idSet/cards", async function (req, res, next) {
    try {
        card = new SetCard();

        if (req.body.own != null && req.body.pendingToArrive != null) {
            res.status(401).send({"message": "Only 1 param can be filled with values"});
            return;
        }

        if (req.body.own == null && req.body.pendingToArrive == null) {
            res.status(401).send({"message": "We need 1 param filled with data"});
            return;
        }

        if (req.body.own != null) {
            var message = await card.updateCardOwn(null, req.params.idSet, req.body);

            if (message === false) {
                res.status(401).send({"message": "Error on update card own"});
                return;
            } else {
                // updated successfully
                res.status(200).json(message);
                return;
            }
        }

        if (req.body.pendingToArrive != null) {
            var message = await card.updateCardPendingToArrive(null, req.params.idSet, req.body);

            if (message === false) {
                res.status(401).send({"message": "Error on updating pending to arrive"});
                return;
            } else {
                res.status(200).json(message);
                return;
            }
        }
    } catch (err) {
        res.status(500).json({"message": "System error"});
        next(err);
    }
});

module.exports = router;
