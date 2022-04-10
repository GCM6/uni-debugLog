<script lang="ts">
    import Log from "./log/log.svelte";

</script>
<dir class="app-continer">
    App
    <Log></Log>
</dir>
<style>
    :global(body) {
    margin: 0;
    padding: 0;
  }
    .app-continer {
        padding: 10px;
        margin: 0;
        width: 750px;
        height: 200px;
        border-top: 1px solid #ccc;
    } 
</style>
