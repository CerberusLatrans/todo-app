<script lang='ts'>
    import type { Task } from '../stores';

    export let task: Task;
</script>

<h3 contenteditable="true" bind:textContent={task.name}></h3>
<p contenteditable="true" bind:textContent={task.description}></p>
<button on:click>Complete Task</button>