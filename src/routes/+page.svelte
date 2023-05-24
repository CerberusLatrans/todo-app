<script lang='ts'>
    import SplitPane from './SplitPane.svelte';
    import List from './list/List.svelte';
    import {
        currListID,
        //folderDirs,
        //taskListsMap, 
        //tasksMap,
    } from './stores';

</script>
<main>
    <SplitPane leftInitialSize="50%">
        <svelte:fragment slot="left">
            <List taskListID={$currListID}/>
        </svelte:fragment>
        <svelte:fragment slot="right">
            <h1 class="dark">
                TBD
            </h1>
        </svelte:fragment>
    </SplitPane>
</main>