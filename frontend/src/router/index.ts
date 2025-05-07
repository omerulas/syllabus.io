import { createRouter, createWebHistory } from 'vue-router'
import ComponentView from '@/views/ComponentView.vue'
import Home from '@/components/Generic/Home.vue'
import Login from '@/components/Authentication/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ComponentView, children: [
      { path:'', name: 'home', component: Home },
      { path:'login', name: 'login', component: Login }
    ]}
  ],
})

export default router
