import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/HomeView.vue')
    },
    {
        path: '/dev',
        name: 'Dev',
        component: () => import('./views/Dev.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;