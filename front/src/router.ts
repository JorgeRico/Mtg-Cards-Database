import { createWebHashHistory, createRouter } from 'vue-router';
// auth views
import LoginView from './components/Auth/Login/Login.vue';

import RegisterView from './components/Auth/Register/Register.vue';

import ForgotView from './components/Auth/Forgot/Forgot.vue';

// not found view
import NotFoundView from './components/NotFound/NotFound.vue';

// backoffice views
import SetView from './components/Backoffice/Set/Set.vue';

import SpecialSetView from './components/Backoffice/Set/SpecialSet.vue';
import CardSetView from './components/Backoffice/Card/CardSet.vue';
import CardOnDeckView from './components/Backoffice/Card/CardOnDeck.vue';
import CardPendingView from './components/Backoffice/Card/CardPending.vue';
import CardUpgradeView from './components/Backoffice/Card/CardUpgrade.vue';
import InsideLogosView from './components/Backoffice/Logos/InsideLogos.vue';
import OutsideLogosView from './components/Backoffice/Logos/OutsideLogos.vue';
import OnlineSetView from './components/Backoffice/Set/OnlineSet.vue';


const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: LoginView
    },
    {  
        path: '/register', 
        name: 'register', 
        component: RegisterView
    },
    { 
        path: '/forgot', 
        name: 'forgot', 
        component: ForgotView
    },
    { 
        path: '/backoffice/sets', 
        name: 'sets',  
        component: SetView
    },
    { 
        path: '/backoffice/special/sets', 
        name: 'specialSets',  
        component: SpecialSetView
    },
    { 
        path: '/backoffice/sets/:id/cards', 
        name: 'setCards',  
        component: CardSetView
    },
    { 
        path: '/backoffice/pending/cards', 
        name: 'pendingCards',  
        component: CardPendingView
    },
    { 
        path: '/backoffice/playing/cards', 
        name: 'playingCards',  
        component: CardOnDeckView
    },
    {
        path: '/backoffice/upgrade/cards',
        name: 'upgradeCards',
        component: CardUpgradeView
    },
    {
        path: '/backoffice/sets/online',
        name: 'onlineSets',
        component: OnlineSetView
    },
    { 
        path: '/backoffice/inside/logos', 
        name: 'insideLogos',  
        component: InsideLogosView
    },
    { 
        path: '/backoffice/outside/logos', 
        name: 'outsideLogos',  
        component: OutsideLogosView
    },
    { 
        path: '/:catchAll(.*)', 
        name: 'NotFound',
        component: NotFoundView,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router