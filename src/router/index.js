import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Basket from "../components/Basket.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/basket",
    component: Basket,
  },
  // {
  //     path: '/:pathmatch(.*)*',
  //     component: NotFound,
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
