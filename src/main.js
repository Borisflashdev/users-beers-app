import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import BaseCard from './components/ui/BaseCard.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseTable from './components/ui/BaseTable.vue';
import RandomUsers from './components/pages/RandomUsers.vue';
import RandomBeers from './components/pages/RandomBeers.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/users', props: true },
        { path: '/users', component: RandomUsers, props: true },
        { path: '/beers', component: RandomBeers, props: true }
    ]   
});

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-button', BaseButton);
app.component('base-table', BaseTable);
app.use(router);
app.mount('#app');