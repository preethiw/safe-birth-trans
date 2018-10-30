import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Map from '@/components/Map'

import Haiti from '@/components/Haiti'
import Liberia from '@/components/Liberia'
import Kenya from '@/components/Kenya'

import Closing from '@/components/Closing'
import Action from '@/components/Action'

import { defaultLocale } from '../config/i18n'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: `/${defaultLocale}`,
        },
        {
            path: '/:locale',
            component: {
                template: '<router-view />',
            },
            children: [{
                    path: '/',
                    name: 'Home',
                    component: Home
                },
                {
                    path: 'map',
                    name: 'Map',
                    component: Map
                },
                {
                    path: 'haiti',
                    name: 'Haiti',
                    component: Haiti
                },
                {
                    path: 'kenya',
                    name: 'Kenya',
                    component: Kenya
                },
                {
                    path: 'liberia',
                    name: 'Liberia',
                    component: Liberia
                },
                {
                    path: 'closing',
                    name: 'Closing',
                    component: Closing
                },
                {
                    path: 'action',
                    name: 'Action',
                    component: Action
                }
            ],
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        let position = {
            x: 0,
            y: 0
        }
        // return position
        // Keep scroll position when using browser buttons
        // if (savedPosition) {
        //   position = savedPosition
        // }

        // Workaround for transitions scrolling to the top of the page
        // However, there are still some problems being fixed by the vue team
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(position)
            }, 500)
        })
    }
})