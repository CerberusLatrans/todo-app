<script lang='ts'>
    import { createEventDispatcher } from 'svelte';

    import { slide, fly } from 'svelte/transition';
    import { backIn } from 'svelte/easing';

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

    let m = { x: 0, y: 0 };

    let completed = false;
    let focus = false;
    let hover = false;
    let barHover = false;

    const dispatch = createEventDispatcher();
    
    async function toggleComplete() {
        completed = !completed;
        await new Promise(r => setTimeout(r, 500));
        if (completed) {
            dispatch('completed');
        }
    }

    function getPctTimeLeft() {
        task = task;
        if (task.dueTime != undefined) {
            let pct:number = (task.dueTime.getTime() - Date.now()) /
             (task.dueTime.getTime() - task.creationTime.getTime());
            console.log(pct)
            return pct
        } else {
            return 1
        }     
    }
    
    function taskListNonEmpty(taskListID: number): boolean {
        let taskList: TaskList = $taskListsMap.get(taskListID)!;
        return taskList.taskIDs.length > 0;
    }
    
</script>

<!--<div on:mouseenter={() => active=true} on:mouseleave={() => active=false}>-->
<div class="wrapper"
    on:focusout={() => {if (!hover) {focus=false}}}
    on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}"
    in:fly="{{ y: -10, duration: 200, opacity: 1}}"
    out:fly="{{ x: -200, duration: 200, easing: backIn }}">

    <div
        class="button"
        style:background-color={completed ? "white" : ""}
        on:click={toggleComplete}></div>

    <h3 style:grid-area="title"
        contenteditable="true"
        bind:textContent={task.name}
        on:focusin={() => focus=true}></h3>

    <!--<div class="clock">
        <div style:height="90%" style:width="10%"> </div>
        <div style:height="10%" style:width="45%"> </div>
    </div>-->
    <input
        class="calendar"
        type="datetime-local"
        bind:value={task.dueTime}>
    

    {#if (task.description!="" || focus)}
        <p 
            style:grid-area="description"
            contenteditable="true"
            bind:textContent={task.description}
            on:focusin={() => focus=true}
            on:blur={() => focus = false}
            on:mouseenter={() => hover=true}
            on:mouseout={() => hover=false}></p>
    {/if}

    <div class="bar" 
        on:click={() => dispatch('addTask')}
        on:mouseenter={() => barHover=true}
        on:mouseout={() => barHover=false}>
        {#if barHover}
            <div
            style:background-color="white"
            style:border-radius="50%"
            style:position="fixed"
            style:top={m.y}
            style:left={m.x}
            style:height="1vw"
            on:click={toggleComplete}></div>
        {/if}
    </div>

    <div 
        style:grid-area="timer"
        style:height="0.5vw"
        style:width="100%"
        style:background-color="red"
        style:margin-bottom="1vw">
        <div style="height:0.5vw; width:{getPctTimeLeft()*100}%; background-color:white;"></div>
    </div>

    {#if focus || (task.subTaskListID!=undefined && taskListNonEmpty(task.subTaskListID))}
        <div style="grid-area:subtasks"
            on:mouseenter={() => hover=true}
            on:mouseout={() => hover=false}
            on:blur={() => hover=false}>
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
    .bar {
        grid-area: bar;
        height: 95%;
        width: 0.2vw;
        background-color: white;
        justify-self: center;
        align-self: center;
    }
    .button {
        grid-area: complete;
        justify-self:center;
        align-self:center;

        border-radius: 50%;
        border: white solid;
        border-width: 0.1vw;
        padding: 0.1vw;
        background-clip: content-box;

        width: 1vw;
        height: 1vw;
    }
    .clock {
        grid-area:clock;
        
        border-radius: 50%;
        border: red solid;
        padding: 0.1vw;
        width: 1vw;
        height: 1vw; 
        border-width: 0.1vw;

        justify-self:center;
        align-self:center;
    }
    .calendar {
        background-color: red;
        border-radius: 50%;
        border: red solid;
        grid-area:clock;
        justify-self:center;
        align-self:center;
        width: 1vw;
        height: 1vw; 
    }
    h3 {
        margin: 1vw;
        margin-bottom: 0vw;
        margin-top: 0vw;
    }
    p {
        margin: 1vw;
    }
</style>
