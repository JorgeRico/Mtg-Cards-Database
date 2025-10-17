const SpecialSet = require("#classes/SpecialSet.cjs");
var express      = require('express');
var router       = express.Router();

/**
* @swagger
* /specialSets/numSets:
*   get:
*     tags: [Special Set]
*     summary: Retrieve num of special sets
*     responses:
*       200:
*         description: A num of special sets
*         content:
*            application/json:
*              schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   example: 
*                       [{"numTotal":35,"numTotalComplete":31}]
*       404:
*         description: Error not found
*       401:
*         description: System error
*/
router.get('/numSets', async function (req, res, next) {
    try {
        specialSetObject = new SpecialSet();
        var message       = await specialSetObject.getTotalNumSets();

        if (message === undefined) {
            res.status(404).send("Error not found");
        } else {
            res.status(200).send(message);
        }
    } catch (err) {
        res.status(401).send({"message": "System error"});
        next(err);
    }
});

/**
* @swagger
* /specialSets:
*   get:
*     tags: [Special Set]
*     summary: Retrieve a list of special sets
*     responses:
*       200:
*         description: A list of special sets
*         content:
*            application/json:
*              schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   example: 
*                    [{"id":856,"setName":"Doctor Who (WHO)","setAbrv":"who","setLink":"https://scryfall.com/sets/who","setLogo":"<svg aria-hidden=\"true\" focusable=\"false\" viewbox=\"0 0 149 169.778\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m74.434 0-9.863 7.233v7.036l9.863-3.354 10.06 3.354V7.233L74.435 0Zm63.98 147.356-.987 8.548-62.993 13.874-62.861-13.874-.987-8.548 63.848 14.006 63.98-14.006ZM71.475 37.217v117.175l-55.102-12.099L7.299 56.68l64.176-19.463Zm6.181 0 63.98 19.595-8.812 85.481-55.168 12.099V37.217ZM88.9 85.35v20.186l14.466-.657.592-18.346L88.9 85.35Zm25.908-28.406-1.184 25.71 18.74 2.959 2.367-23.08-19.923-5.59Zm-81.207.92-18.412 5.129 2.236 21.83 17.36-2.695L33.6 57.864Zm51.222-9.14v29.984l23.672 3.288 1.184-26.433-24.856-6.839Zm-21.304.92L40.308 56.22l1.117 24.921 22.094-2.959V49.645ZM74.566 17.36 149 41.491l-1.052 10.718-73.382-22.356L1.052 52.209 0 41.491 74.566 17.36Z\" fill=\"#000\" fill-rule=\"evenodd\"></path></svg>","setTotalCards":1178,"setReleaseDate":"2023-10-13","complete":0,"ownedCards":928,"specialCards":13},{"id":797,"setName":"The Brothers' War Retro Artifacts (BRR)","setAbrv":"brr","setLink":"https://scryfall.com/sets/brr","setLogo":"<svg aria-hidden=\"true\" focusable=\"false\" viewbox=\"0 0 900 905\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m525.696 0 11.797 128.654c32.441 8.84 56.117 18.988 71.027 30.445L714.2 75.867l116.74 115.396-94.375 107.294c17.203 21.77 28.673 43.048 34.407 63.836L900 376.879v155.416l-129.028 10.803c-8.028 30.281-19.497 54.26-34.407 71.939l84.298 104.838-108.138 106.312-103.96-85.442c-25.231 18.332-48.989 30.608-71.272 36.828L523.484 905H376.516l-14.01-127.427c-22.282-6.22-46.04-18.496-71.272-36.828l-103.96 85.442L79.138 719.875l84.298-104.838c-14.91-17.678-26.379-41.658-34.407-71.939L0 532.295V376.88l129.028-14.486c5.734-20.788 17.204-42.067 34.407-63.836L69.061 191.263 185.8 75.867l105.68 83.232c14.909-11.457 38.585-21.606 71.026-30.445L374.304 0h151.392ZM450 141.667c-3.177 37.124-9.398 70.927-18.663 101.41-102.18 8.962-183.404 90.877-191.182 193.293l.012.006c-28.18 8.224-59.163 13.387-92.952 15.49 33.868 3.578 64.91 9.888 93.125 18.93l-.01.005c8.755 101.424 89.589 182.26 191.076 191.136l.006-.011c9.218 29.516 15.27 62.09 18.159 97.725l.429 5.646c2.69-37.844 8.885-72.3 18.586-103.366 101.494-8.867 182.33-89.707 191.083-191.134 28.208-9.044 59.249-15.353 93.116-18.93-33.789-2.104-64.773-7.267-92.952-15.49l.012-.007c-7.778-102.416-89.003-184.33-191.18-193.301-9.267-30.475-15.488-64.278-18.665-101.402Zm0 56.47c20.878 152.594 103.528 237.268 247.95 254.022C549.536 478.96 466.886 564.515 450 708.827l-.545-4.385C430.84 560.356 348.372 476.262 202.05 452.159 346.933 433.104 429.583 348.43 450 198.138Z\" fill=\"#000\" fill-rule=\"evenodd\"></path></svg>","setTotalCards":189,"setReleaseDate":"2022-11-18","complete":0,"ownedCards":113,"specialCards":63}]
*       404:
*         description: Error not found
*       401:
*         description: System error
*/
router.get('/', async function (req, res, next) {
    try {
        specialSetObject = new SpecialSet();
        var message       = await specialSetObject.getMultipleSets(req.query.filter, req.query.page);

        if (message === undefined) {
            res.status(404).send("Error not found");
        } else {
            res.status(200).send(message);
        }
    } catch (err) {
        res.status(401).send({"message": "System error"});
        next(err);
    }
});

module.exports = router;