<script lang="ts">
  import JSONTree from "svelte-json-tree";
  import { LogStore as Store } from "../lib/store";
  let logData: ReturnType<typeof Store.getStore>;
  logData = Store.getStore("log");
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
    padding: 20px 10px;
  }
  /* :global ul {
    margin: 0 !important;
  } */
</style>
