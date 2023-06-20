import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/signin',
			name: 'SignIn',
			component: () => import('../views/SignIn.vue'),
			meta: {
				requiresNotAuth: true,
			},
		},
		{
			path: '/signup',
			name: 'SignUp',
			component: () => import('../views/SignUp.vue'),
		},
		{
			path: '/tasks',
			name: 'TaskOverview',
			component: () => import('../views/TaskOverview.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/createtask',
			name: 'CreateTask',
			component: () => import('../views/CreateTask.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/task/:taskId',
			name: 'EditTask',
			component: () => import('../views/EditTask.vue'),
			props: true,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/',
			name: 'Home',
			component: () => import('../views/TaskOverview.vue'),
			meta: {
				requiresAuth: true,
			},
		},
	],
});

/* eslint-disable */
const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				resolve(user);
			},
			reject
		);
	});
};

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			next('/signin');
		}
	} else if (to.matched.some((record) => record.meta.requiresNotAuth)) {
		if (await getCurrentUser()) {
			next('/tasks');
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
