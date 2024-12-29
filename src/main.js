// import { createApp } from 'vue'
// import App from './App.vue'
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faWallet } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// createApp(App).mount('#app')

import { createApp } from 'vue';
import App from './App.vue';

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './route'
import './assets/main.scss'
// Font Awesome library me icons add karein
library.add(faWallet);

const app = createApp(App);
app.use(router)


app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
