import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/Login/login.vue";
import layout from "@/views/Layout";
import Video from "@/views/Video";
import Question from "@/views/Question";
import Home from "@/views/Home";
import My from "@/views/My";
import Not from "@/views/Not";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "",
    name: "layout",
    component: layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/video",
        name: "video",
        component: Video,
      },
      {
        path: "/question",
        name: "question",
        component: Question,
      },
      {
        path: "/my",
        name: "my",
        component: My,
      },
    ],
  },
  {
    path: "*",
    component: Not,
  },
];
const router = new VueRouter({
  routes,
});
export default router;
