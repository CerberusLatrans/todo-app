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
        taskList.insertIDs(idx, [t.id]);
        $tasksMap.set(t.id, t);
        //tasksMap.setTask(t.id, t);
        console.log("ADD TASK")
        console.log(taskList);
        console.log($tasksMap)
        taskList = taskList;
    }

    function killTask(id: number, idx: number) {
        taskList.killTaskID(idx);
        $tasksMap.get(id)!.completionTime = new Date();
        console.log("KILL TASK " + $tasksMap.get(id)!.name)
        console.log(taskList);
        console.log($tasksMap)
        taskList = taskList;
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
        /*display:flex;
        flex-direction: column;*/
        background-color: rgb(25, 30, 30);
		color: white;
		text-align: center;
        height: 100%;
	}
</style>