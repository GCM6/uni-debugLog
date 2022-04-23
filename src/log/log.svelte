<script lang="ts">
  import JSONTree from "svelte-json-tree";
  import { LogStore as Store } from "../lib/store";
  export let clearStatus: boolean = false;
  let logData: ReturnType<typeof Store.getStore>;
  logData = Store.getStore("log");
  $: {
    if (clearStatus) {
      Store.clearStore("log");
      clearStatus = false;
    }
  }
</script>

{#each $logData.logList as item}
  <div class="log-item">
    <JSONTree value={item.logs} />
  </div>
{/each}

<style>
  .log-item {
    width: 100%;
    border-bottom: 0.5px solid #ccc;
    padding: 20px 0px;
  }
  /* :global ul {
    margin: 0 !important;
  } */
</style>
