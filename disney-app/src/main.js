import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Characters from './views/Characters.vue'
import CharacterDetail from './views/CharacterDetail.vue'
import Favorites from './views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/characters', component: Characters },
    { path: '/character/:id', component: CharacterDetail },
    { path: '/favorites', component: Favorites }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
