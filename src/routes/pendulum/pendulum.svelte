<script lang='ts'>
    import ListItem from '../list/ListItem.svelte';
    import { Task, TaskList } from '../stores';
    import {
        currListID,
        folderDirs,
        taskListsMap, 
        tasksMap
    } from '../stores'; 

    export let taskListID: number;
    let taskList: TaskList = $taskListsMap.get(taskListID)!;

</script>