/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import helper from "@/mixins/helper";
import store from "@/store";

loadFonts()

const app = createApp(App)

app.mixin(helper)
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(store)
app.mount('#app')
