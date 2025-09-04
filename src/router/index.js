import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../views/Feed.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import MyProfile from '../views/MyProfile.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Feed', component: Feed, meta: { requiresAuth: true } },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/me',
      name: 'MyProfile',
      component: MyProfile,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/movie',
      name: 'movie',
      component: 'MovieView',
      meta: { requiresAuth: true },
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not-found',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.user) next('/login')
  else next()
})

export default router
