// load .env file
require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'MTG Dashboard API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://127.0.0.1:8080`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', 
                },
            },
            schemas: {
                Set: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer'
                        },
                        setName: {
                            type: 'string'
                        },
                        setAbrv: {
                            type: 'string'
                        },
                        setLink: {
                            type: 'string'
                        },
                        setLogo: {
                            type: 'string'
                        },
                        setTotalCards: {
                            type: 'integer'
                        },
                        setReleaseDate: {
                            type: 'string'
                        },
                        complete: {
                            type: 'boolean'
                        },
                        ownedCards: {
                            type: 'integer'
                        },
                        specialCards: {
                            type: 'integer'
                        }
                    }
                },
                Card: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer'
                        },
                        idSet: {
                            type: 'integer'
                        },
                        cardName: {
                            type: 'string'
                        },
                        cardJsonLink: {
                            type: 'string'
                        },
                        cardUri: {
                            type: 'string'
                        },
                        cardImg: {
                            type: 'string'
                        },
                        special: {
                            type: 'boolean'
                        },
                        own: {
                            type: 'boolean'
                        },
                        pendingToArrive: {
                            type: 'boolean'
                        },
                        isOnADeck: {
                            type: 'boolean'
                        },
                        isBackCard: {
                            type: 'boolean'
                        },
                        isOversized: {
                            type: 'boolean'
                        },
                        needUpgrade: {
                            type: 'boolean'
                        },
                        setName: {
                            type: 'string'
                        },
                        setLogo: {
                            type: 'string'
                        }
                    }
                }
            }
        },
    },
    apis: [
        './routes/DeckCard.cjs',
        './routes/OnlineSet.cjs',
        './routes/PendingCard.cjs',
        './routes/SearchCard.cjs',
        './routes/Set.cjs',
        './routes/SetCard.cjs',
        './routes/SpecialSet.cjs',
        './routes/UpgradeCard.cjs',
    ], // Path to your API docs
};

module.exports = swaggerJSDoc(swaggerOptions);
