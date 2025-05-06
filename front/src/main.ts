import { createApp } from 'vue'
import App from './App.vue'
// common styles
import './style.css'
// router
import router from './router.ts'
// fontawesome
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
dom.watch();

const app = createApp(App)
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
