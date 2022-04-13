<script lang="ts">
  import { get } from "svelte/store";
  import Log from "./index";
  const log = new Log();
  let logList: any = [];
  log.logId.subscribe((logs) => {
    logList = logs;
  });
</script>

{#each logList as logText}
  <div>{logText}</div>
{/each}
