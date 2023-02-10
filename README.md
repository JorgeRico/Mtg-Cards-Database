# Node + Express + Vue + MySQL + Docker Compose
A project that runs a Express server and Vue-CLI with two separate containers, server and client, using Docker Compose.

# config
# first time need node_modules on /client
```
npm install
```

# first time need node_modules on /server
```
npm install
```

# run docker build
```
docker-compose build
```

# launch docker
```
docker-compose up -d
```

# launch client
```
npm run serve
```

# launch api
```
npm run dev
```

## Front
```
http://localhost:8080
```

## API
```
http://localhost:3000
```

## PhpMyAdmin
```
http://localhost:18081
```

## ENV values
```
VUE_APP_FIREBASE_API_KEY=AIzaSyA4A_Ujgbp_UmHVyofthBmwuhMGg4NSE9c
VUE_APP_FIREBASE_AUTH_DOMAIN=mtgdashboard-91454.firebaseapp.com
VUE_APP_FIREBASE_PROJECT_ID=mtgdashboard-91454
VUE_APP_FIREBASE_STORAGE_BUCKET=mtgdashboard-91454.appspot.com
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=311271406950
VUE_APP_FIREBASE_APP_ID=1:311271406950:web:c570ff5a8e7012a8d4dca7
  
VUE_APP_API_SERVER=http://localhost:3000
VUE_APP_API_SET_CARDS_ON_DECKS_ENDPOINT=/cardsOnADeck
VUE_APP_API_SET_CARDS_ENDPOINT=/setCards
VUE_APP_API_PENDING_CARDS_ENDPOINT=/pendingCards
VUE_APP_API_SET_ENDPOINT=/sets
```