<script lang="ts">
  import Log from "./log/log.svelte";
  let targetLi = "";
  const onChangeTab = (e: any) => {
    targetLi = e.target.id;
  };
</script>

<dir class="app-continer">
  <div class="tab">
    <ul class="tab-continer" on:click={onChangeTab}>
      <li
        id="li1"
        class="item"
        style="background: {targetLi === 'li1' ? 'rgba(40, 47, 58, 0.8)' : ''}"
      >
        Log
      </li>
      <li
        id="li2"
        class="item"
        style="background: {targetLi === 'li2' ? 'rgba(40, 47, 58, 0.8)' : ''}"
      >
        network
      </li>
      <li
        id="li3"
        class="item"
        style="background: {targetLi === 'li3' ? 'rgba(40, 47, 58, 0.8)' : ''}"
      >
        storage
      </li>
    </ul>
  </div>
  <div class="main">
    <Log />
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
    border-right: 0.5px solid #ccc;
  }
  .item:last-child {
    border: none;
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
    padding: 0;
    border-bottom: 0.5px solid #ccc;
    /* background: rgba(48, 48, 58, 0.5); */
    font-size: 28px;
    color: white;
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
    background: #000;
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
