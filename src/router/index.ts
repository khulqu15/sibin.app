import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import LoadingPage from '../views/LoadingPage.vue'
import WelcomePage from '../views/WelcomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import NotificationPage from '../views/NotificationPage.vue'
import StarPage from '../views/StarPage.vue'
import DeveloperPage from '../views/DeveloperPage.vue'

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
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/notification',
    name: 'Notification',
    component: NotificationPage
  }, 
  {
    path: '/history',
    name: 'History',
    component: HistoryPage
  }, 
  {
    path: '/star',
    name: 'Star',
    component: StarPage
  }, 
  {
    path: '/developer',
    name: 'Developer',
    component: DeveloperPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
