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
    {
        path: '/numbers/matching',
        name: 'Number Matching',
        component: () => import('./views/NumberLevelSelectionView.vue')
    },
    {
        path: '/numbers/matching/:levelId',
        name: 'Number Matching Level',
        component: () => import('./views/NumberLevelView.vue'),
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;