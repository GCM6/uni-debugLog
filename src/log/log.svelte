<script lang="ts">
  // import Log from "./index";
  import JSONTree from "svelte-json-tree";
  import LogStore from "../lib/store";
  const store = new LogStore();
  let log: ReturnType<typeof store.getStore>;
  log = store.getStore("log");
  console.log("test-->", log);
</script>

<div>123</div>
<!-- {#each $log.logList as item} -->
<div>
  <!-- {item.type} -->
  <!-- {#each log.logs as value} -->
  <div>
    <!-- <JSONTree {value} /> -->
    <!-- {JSON.stringify(item)} -->
  </div>
  <!-- {/each} -->
</div>
<!-- {/each} -->
