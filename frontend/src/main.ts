import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuth } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const auth = useAuth()
await auth.setCsrfToken()
// await auth.checkSession()

app.mount('#app')
