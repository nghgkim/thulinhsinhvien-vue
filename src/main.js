import { createApp } from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies'
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

library.add(faEyeSlash)
library.add(faEye)

const app = createApp(App);

app.use(router);
app.use(VueCookies, { expires: '7d'})
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');