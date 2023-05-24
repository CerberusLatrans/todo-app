<script lang="ts">
    import ListItem from './ListItem.svelte';
    import { Task, TaskList } from '../stores';
    import {
        currListID,
        folderDirs,
        taskListsMap, 
        tasksMap
    } from '../stores';
    

    export let taskListID: number;
    let taskList: TaskList = $taskListsMap.get(taskListID)!;

    function addTask(t: Task, idx: number): void {
        // not using update method fo taskList
        taskList.insertIDs(idx, [t.id]);
        tasksMap.setTask(t.id, t);
        console.log("ADD TASK")
        console.log(taskList);
        console.log($tasksMap)
    }

    function killTask(id: number, idx: number) {
        taskList.killTaskID(idx);
        let task: Task = $tasksMap.get(id)!;
        task.completionTime = new Date();
        console.log("KILL TASK " + task.name)
        console.log(taskList);
        console.log($tasksMap)
    }

</script>

<div class="dark">
    {#if taskList != undefined}
        <h2 contenteditable="true" bind:textContent={taskList.name}></h2>
        <p contenteditable="true" bind:textContent={taskList.description}></p>
        <button on:click={() => addTask(new Task(""), taskList.taskIDs.length)}>Add Task</button>
        <div>
            {#each taskList.taskIDs as id, idx (id) }
                <ListItem taskID={id} on:click={() => killTask(id, idx)}/>
            {/each}
        </div>
    {/if}
</div>

<style>
	.dark {
        background-color: rgb(25, 30, 30);
		color: white;
		text-align: center;
        height: 100vh;
	}
</style>