<script lang='ts'>
    import SplitPane from './SplitPane.svelte';
    import List from './list/List.svelte';
    import { type TaskList, taskLists } from './stores'

    let currListId: number = 0;
    let allLists = $taskLists;
    $: currList = allLists.get(currListId)!;
</script>
<main>
    <SplitPane leftInitialSize="50%">
        <svelte:fragment slot="left">
            <List taskList={currList}/>
        </svelte:fragment>
        <svelte:fragment slot="right">
            <h1 class="dark">
                TBD
            </h1>
        </svelte:fragment>
    </SplitPane>
</main>