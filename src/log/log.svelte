<script lang="ts">
  import Log from "./index";
  import JSONTree from "svelte-json-tree";
  const log = new Log();
  let logList: any = [];
  log.logId.subscribe((store) => {
    logList = store.logs;
  });
</script>

{#each logList as log}
  <div>
    {log.type}
    {#each log.logs as value}
      <div>
        <JSONTree {value} />
        <!-- {JSON.stringify(item)} -->
      </div>
    {/each}
  </div>
{/each}
