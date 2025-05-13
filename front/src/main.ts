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
// Toast messages
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// bootstrap
// import * as bootstrap from 'bootstrap';
// dinamics forms
import { createDynamicForms } from '@asigloo/vue-dynamic-forms';
const VueDynamicForms = createDynamicForms({
  // Global Options go here
});

// APP
const app = createApp(App)
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    shareAppContext: true
});
app.use(VueDynamicForms)
// app.component('bootstrap', bootstrap)
app.mount('#app')
