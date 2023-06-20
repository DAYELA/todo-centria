<template>
	<body class="overview-align">
		<div class="overview-grid">
			<h2 class="title">{{ currentUser.displayName }}'s To-do List</h2>
			<button class="create-task" @click="createTask">CREATE TASK</button>
			<div class="task-list-container">
				<div class="task-list">
					<div v-for="task in tasks" :key="task.id" class="task-item">
						<div class="task-item-content">
							<div class="task-item-info">
								<h3 class="task-title">{{ task.title }}</h3>
								<p class="description">{{ task.description }}</p>
							</div>
							<div class="task-item-actions">
								<input type="checkbox" v-model="task.completed" @change="completeTask(task)" />
								<button @click="editTask(task)">EDIT</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</template>

<script>
/* eslint-disable */
import '../layout/base.css';
import '../helpers/align.css';
import '../helpers/hidden.css';
import '../helpers/icon.css';
import '../modules/anchor.css'
import '../modules/form.css';
import '../modules/tasks.css';

	import { ref } from 'vue';
	import { getAuth } from 'firebase/auth';
	import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
	import { db } from '../main';
	import router from '../router';


	export default {
		name: 'TaskOverview',
		data() {
			return {
				currentUser: null,
				tasks: []
			};
		},
		async created() {
			const auth = getAuth();
			if (auth.currentUser) {
				this.currentUser = auth.currentUser;
				const tasksRef = collection(db, 'tasks');
				const snapshot = await getDocs(tasksRef);
				this.tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			} else {
				router.push('/signin');
			}
		},
		methods: {
			createTask() {
        		router.push({ name: 'CreateTask' });
    		},
			async completeTask(task) {
				if (task.completed) {
					const taskRef = doc(db, 'tasks', task.id);
					await deleteDoc(taskRef);
					this.tasks = this.tasks.filter(item => item.id !== task.id);
				} else {
					const taskRef = doc(db, 'tasks', task.id);
					await updateDoc(taskRef, { completed: task.completed });
				}
			},
			editTask(task) {
				router.push({ name: 'EditTask', params: { taskId: task.id } });
			}
		},
	};
	
/* eslint-enable */
</script>

<style>




</style>
