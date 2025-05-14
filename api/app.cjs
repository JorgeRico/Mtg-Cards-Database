// load .env file
require('dotenv').config();

// load express
const express = require('express');
const cors    = require('cors');

// load routers
const setRouter         = require('#routes/Set.cjs');
const specialSetRouter  = require('#routes/SpecialSet.cjs');
const setCardRouter     = require('#routes/SetCard.cjs');
const pendingCardRouter = require('#routes/PendingCard.cjs');
const deckCardRouter    = require('#routes/DeckCard.cjs');
const upgradeCardRouter = require('#routes/UpgradeCard.cjs');
const onlineSetRouter = require('#routes/OnlineSet.cjs');


// express api
const app = express();
app.use(cors({
  origin: '*'
}));

// running terminal message
app.listen(process.env.API_PORT, () => {
    console.log(`Server running at ${process.env.API_URL}:${process.env.API_PORT}`);
});

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

// use routers
app.use('/sets', setRouter);
app.use('/specialSets', specialSetRouter);
app.use('/setCards', setCardRouter);
app.use('/pendingCards', pendingCardRouter);
app.use('/cardsOnADeck', deckCardRouter);
app.use('/betterGradedCards', upgradeCardRouter);
app.use('/onlineSets', onlineSetRouter);

