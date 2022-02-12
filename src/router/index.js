import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import adminDashboard from "../views/AdminDashboard.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/user/dashboard",
    name: "Dashboard",
    component: Dashboard,
    async beforeEnter(to, from, next) {
      if (store.state.token === "") {
        return next("/user/login");
      }
      return next();
    },
  },
  {
    path: "/user/dashboard/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/admin/dashboard/",
    name: "adminDashboard",
    component: adminDashboard,
  },
  {
    path: "/user/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((from, to) => {
//   console.log(from.path, to.path);
// });

export default router;
