import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const firebaseConfig = {
	
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const app = createApp(App);

app.use(router);

app.mount('#app');

export { db };

