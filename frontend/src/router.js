import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import Page from './Page.vue';
import OAuthCallback from './OAuthCallback.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/oauth-callback',
            name: 'oauth-callback',
            component: OAuthCallback
        }, {
            path: '/page',
            name: 'page',
            component: Page
        },
    ]
});

export default router;
