<script lang='ts'>
    import type { Task, TaskList } from '../stores'
    import List from './List.svelte'
    import {
        currListID,
        folderDirs,
        taskListsMap, 
        tasksMap
    } from '../stores';
    
    export let taskID: number;
    let task: Task  = $tasksMap.get(taskID)!;
    let focus: boolean = false;
    let descHover: boolean = false;
    
    function getPctTimeLeft() {
        task = task;
        if (task.dueTime != undefined) {
            let pct:number = (task.dueTime.getTime() - Date.now()) /
             (task.dueTime.getTime() - task.creationTime.getTime());
            console.log(pct)
            return pct
        } else {
            return 0.5
        }     
    }
    
    
</script>

<!--<div on:mouseenter={() => active=true} on:mouseleave={() => active=false}>-->
<div class="wrapper"
    on:focusin={() => focus=true}
    on:focusout={() => {if (!descHover) {focus=false}; console.log("BLUR")}}>

    <button style:grid-area="complete" on:click>Complete Task</button>

    <h3 style:grid-area="title" contenteditable="true" bind:textContent={task.name}></h3>

    <input style:grid-area="clock" type="datetime-local" bind:value={task.dueTime}>

    {#if (task.description!="" || focus)}
        <div
            style:grid-area="bar"
            style:width="2px"
            style:background-color="white"
            ></div>
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <p 
            class="vert-bar"
            style:grid-area="description"
            contenteditable="true"
            bind:textContent={task.description}
            on:mouseenter={() => descHover=true}
            on:mouseout={() => descHover=false}></p>
    {/if}

    <div
        style:grid-area="bar"
        style:width="2px"
        style:background-color="white"></div>

    <div 
        style:grid-area="timer"
        style:height="4px"
        style:width="100%"
        style:background-color="white">
        <div style="height:4px; width:{getPctTimeLeft()*100}%; background-color:red;"></div>
    </div>

    {#if (task.subTaskListID!=undefined || focus)}
        <div
            style:grid-area="bar"
            style:width="2px"
            style:background-color="white"></div>
        <div style="grid-area:subtasks">
            <List taskListID={task.getSubTaskListID($taskListsMap)} showHeader={false}/>
        </div>
    {/if}    
</div>

<style>
    .wrapper {
        display:grid;
        grid-template-columns: 1fr 8fr 2fr;
        /*grid-template-rows: 2fr minmax(0,2fr) 1fr min(0);*/

        grid-template-areas:
        "complete title clock"
        "bar description description"
        "bar timer timer"
        "bar subtasks subtasks";
    }
</style>
