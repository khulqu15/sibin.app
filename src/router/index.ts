import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import LoadingPage from '../views/LoadingPage.vue'
import WelcomePage from '../views/WelcomePage.vue'
import LoginPage from '../views/LoginPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Loading',
    component: LoadingPage
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
