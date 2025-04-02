import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // WRITING SECTION
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/LandingPage.vue')
    },
    {
        path: '/gamemodes',
        name: 'Game Modes',
        component: () => import('./views/GameModeSelectPage.vue')
    },
    {
        path: '/writingmode',
        name: 'Writing Modes',
        component: () => import('./views/WritingModeSelectPage.vue')
    },

    // MISSING VIEWS FOR WRITING CANVAS (NOT CORRECT VIEWS)
    {
        path: '/vowels',
        name: 'Vowels',
        component: () => import('./views/VowelsPage.vue')
    },
    {
        path: '/writing-test',
        name: 'Writing Test',
        component: () => import('./views/WLetterTestPage.vue')
    },

    // Dev
    {
        path: '/dev',
        name: 'Dev',
        component: () => import('./views/Dev.vue')
    },

    // NUMBERS SECTION
    {
        path: '/numbersmode',
        name: 'Number Modes',
        component: () => import('./views/NumbersModeSelectPage.vue')
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