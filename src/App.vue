<template>
	<nav>
		<router-link to="/tasks" v-if="isLoggedIn"> Tasks </router-link>
		<div v-else>
			<router-link to="/signup"> Register </router-link>
			<router-link to="/signin"> | Login </router-link>
		</div>
		<router-link to="/signin" @click="handleSignOut" v-if="isLoggedIn"> | Logout</router-link>
	</nav>
	<router-view />
</template>

<script setup>
/* eslint-disable */
import { onMounted, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './main';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from './router';

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
	auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			isLoggedIn.value = true;
		} else {
			isLoggedIn.value = false;
		}
	});
});

const handleSignOut = () => {
	signOut(auth).then(() => {
		router.push('/signin');
	});
};
</script>

<style>
</style>
