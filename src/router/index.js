import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Project",
  //   meta: {layout: 'main', requiresAuth: true},
  //   component: () => import('../views/Project.vue') 
  // },
  {
    path: "/botTest",
    name: "botTest",
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/BotTestView.vue') 
  },
  {
    path: "/login",
    name: "login",
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue') 
  },
  {
    path: "/register",
    name: "register",
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue') 
  },
  {
    path: "/profile",
    name: "profile",
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/Profile.vue') 
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/CalendarView.vue') 
  },
  {
    path: "/construct",
    name: "construct",
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/ConstructView.vue') 
  },
  {
    path: "/simpleConstruct",
    name: "SimpleConstructView",
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/SimpleConstructView.vue') 
  },
  {
    path: "/",
    name: "SimpleConstructModeView",
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/SimpleConstructModeView.vue') 
  },
  {
    path: "/lending",
    name: "LendingView",
    meta: {layout: 'main', requiresAuth: true},
    component: () => import('../views/LendingView.vue') 
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      if(!store.state.profile){
        await store.dispatch('getUser') 
        await store.dispatch('getProject', store.state.auth.user.id)
        next()
        return
      }else{
        next() 
        return
      }   
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router;
