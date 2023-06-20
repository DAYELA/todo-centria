<template>
    <body class="create-align">
		<div class="create-grid">
            <form class="form create" @submit.prevent="addTask">
                <h2 class="title">Create New Task</h2>
                <div class="form__field">
                    <input
                        id="task-title"
                        v-model="title"
                        type="text"
                        class="form__input"
                        placeholder="Task Title"
                        required
                    />
                </div>
                <div class="form__field">	
                    <textarea
                        id="task-description"
                        v-model="description"
                        type="description"
                        class="form__input"
                        placeholder="Task Description"
                        cols="40" 
                        rows="5"
                        maxlength="3000">
                    </textarea>
                </div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <div class="form-field">
                    <input type="submit" id="addtask" value="Add Task" />
                </div>
            </form>
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

import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../main';
import router from '../router';
import { getAuth } from 'firebase/auth';

export default {
    data() {
        return {
            title: '',
            description: ''
        };
    },
    methods: {
        async addTask() {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                // L'utilisateur n'est pas connecté, gérer cette situation en conséquence
                return;
            }

            const tasksRef = collection(db, 'tasks');
            const task = { 
                userId: user.uid,
                title: this.title, 
                description: this.description,
                completed: false
            };
            await addDoc(tasksRef, task);
            router.push('/tasks');
        }
    }
};
</script>

<style>
:root {
	--createBorderRadus: 0.25rem;
	--createColor: #eee;

	--createBackgroundColor: #3b4148;
	--createHoverBackgroundColor: #434a52;

	--createSubmitBackgroundColor: #ea4c88;
	--createSubmitColor: #eee;
	--createSubmitHoverBackgroundColor: #d44179;
}

.create {
	color: #d44179;
	color: var(--createColor);
}

.create label,
.create input[type='text'],
.create textarea[type='description'],
.create input[type='submit'] {
    border-radius: var(--createBorderRadus);
	padding: 1rem;
}



.create textarea[type='description'],
.create input[type='text'] {
	background-color: #3b4148;
	background-color: var(--createBackgroundColor);
	border-bottom-left-radius: var(--createBorderRadus);
	border-top-left-radius: var(--createBorderRadus);
}

.create textarea[type='description'] {
    height: 10rem;
    text-align: left;
    border: none;
    outline: none;
    color: #eee;

}


.create textarea[type='description']:focus,
.create textarea[type='description']:hover,
.create input[type='text']:focus,
.create input[type='text']:hover {
	background-color: #434a52;
	background-color: var(--createHoverBackgroundColor);
}

.create input[type='submit'] {
	background-color: #ea4c88;
	background-color: var(--createSubmitBackgroundColor);
	color: #eee;
	color: var(--createSubmitColor);
	font-weight: 700;
	text-transform: uppercase;
}

.create input[type='submit']:focus,
.create input[type='submit']:hover {
	background-color: #d44179;
	background-color: var(--createSubmitHoverBackgroundColor);
}

p {
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
}

.text--center {
	text-align: center;
}
</style>