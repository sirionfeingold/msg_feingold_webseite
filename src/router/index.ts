import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import MusicSchool from '../views/MusicSchool.vue'
import Instrument from '../views/Instrument.vue'
import Kontakt from '../views/Kontakt.vue'
import Konditionen from '../views/Konditionen.vue'
import Shop from '../views/Shop.vue'

const routes = [
    { path: "/", component: Home},
    { path: "/about", component: About},
    { path: "/musikschule", component: MusicSchool},
    { path: "/instrument/:name", component: Instrument, props: true},
    { path: "/kontakt", component: Kontakt},
    { path: "/konditionen", component: Konditionen},
    { path: "/shop", component: Shop}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router