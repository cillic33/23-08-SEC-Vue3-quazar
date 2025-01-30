import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import langRu from 'quasar/lang/ru';

import './style.sass'

const app = createApp(App)

app.use(Quasar, {
    plugins: {},
    config: {
        lang: langRu,
    },
})

app.use(router)

app.mount('#app')
