<script lang="ts">
  import Log from "./index";
  const log = new Log();
  let logList: any = [];
  log.logId.subscribe((store) => {
    logList = store.logs;
  });
</script>

{#each logList as log}
  <div>
    {log.type}
    {#each log.logs as item}
      <div>
        {item}
      </div>
    {/each}
  </div>
{/each}
