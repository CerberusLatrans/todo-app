<script lang='ts'>
    import type { Task } from '../stores'
    import {
        currListID,
        folderDirs,
        taskListsMap, 
        tasksMap
    } from '../stores';
    
    export let taskID: number;
    let task: Task  = $tasksMap.get(taskID)!;
</script>

<div>
    <h3 contenteditable="true" bind:textContent={task.name}></h3>
    <p contenteditable="true" bind:textContent={task.description}></p>
    <button on:click>Complete Task</button>
</div>

<style>
    div {
        border: 2px solid white;
        
    }
</style>
