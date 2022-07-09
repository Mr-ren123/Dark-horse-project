import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/Login/login.vue"

Vue.use(VueRouter)

const routes = [{
        path: "/login",
        name: "login",
        component: login
    }

]
const router = new VueRouter({
    routes
})
export default router