import { createRouter, createWebHistory } from 'vue-router'
import ComponentView from '@/views/ComponentView.vue'
import Home from '@/components/Generic/Home.vue'
import Login from '@/components/Authentication/Login.vue'
import Main from '@/components/Workspace/Main.vue'
import { useAuth } from '@/stores/auth'
import WorkspaceView from '@/views/WorkspaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: ComponentView, children: [
        { path: '', name: 'home', component: Home },
        { path: 'login', name: 'login', meta: {requiresGuest: true}, component: Login }
      ]
    },
    {
      path: '/workspace', component: WorkspaceView, meta: {requiresAuth: true}, children: [
        { path: '', name: 'workspace', component: Main }
      ]
    }
  ],
})

// beforeEach kısmı aynı kalabilir, mantığı doğru.
router.beforeEach(async (to, from, next) => {
  const authStore = useAuth();

  await authStore.checkSession()

  const isAuthenticated = authStore.user.isAuthenticated;

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth && !isAuthenticated) { next({ name: 'login', query: { redirect: to.fullPath } }); }
  else if (requiresGuest && isAuthenticated) { next({ name: 'workspace' }); }
  else { next(); }
});

export default router
