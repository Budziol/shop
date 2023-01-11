import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Basket from "../components/Basket.vue";

const routes = [
  {
    path: "/",
    component: Home,
    props: { products: Object, activeCategory: String },
  },
  {
    path: "/basket",
    component: Basket,
    props: { basket: Array },
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
