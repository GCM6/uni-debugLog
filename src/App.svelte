<script lang="ts">
  import Log from "./log/log.svelte";
</script>

<dir class="app-continer">
  <div class="tab">
    <ul class="tab-continer">
      <li class="item">
        <Log />
      </li>
      <li class="item">
        <Log />
      </li>
      <li class="item">
        <Log />
      </li>
    </ul>
  </div>
</dir>
<div class="app-mask-layer" />

<style>
  .item {
    padding: 10px;
    flex: 1;
    display: flex;
    text-align: center;
    justify-content: center;
    cursor: pointer;
  }
  li {
    list-style: none;
  }
  ul {
    margin: 0;
  }
  .tab {
  }
  .tab-continer {
    display: flex;
    padding: 10px;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }
  .app-continer {
    padding: 0;
    margin: 0;
    width: 750px;
    height: 50vh;
    border-top: 1px solid #ccc;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .app-mask-layer {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 50vh;
    opacity: 0.5;
    background: #000;
  }
</style>
