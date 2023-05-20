<script lang="ts">
    import { TaskList, Task } from '../stores';
    import ListItem from './ListItem.svelte';

    export let taskList: TaskList;

</script>

<div class="dark">
    <h2 contenteditable="true" bind:textContent={taskList.name}></h2>
    <p contenteditable="true" bind:textContent={taskList.description}></p>
    <!--<input type=text bind:value={taskList.name}>
    <input type=text bind:value={taskList.description}>-->
    <button on:click={() => {taskList.tasks.push(new Task("")); console.log(taskList.tasks);}}>Add Task</button>
    <div>
        {#each taskList.tasks as task, idx (task.id) }
            <ListItem task={task} on:click={() => taskList.killTask(idx)}/>
        {/each}
    </div>
</div>

<style>
	.dark {
        background-color: rgb(25, 30, 30);
		color: white;
		text-align: center;
        height: 100vh;
	}

</style>