<script lang="ts">
  import Log from "./log/log.svelte";
  import Network from "./network/network.svelte";
  let targetLi = "li1";
  const onChangeTab = (e: any) => {
    targetLi = e.target.id;
  };
</script>

<div class="app-continer">
  <div class="tab">
    <ul class="tab-continer" on:click={onChangeTab}>
      <li id="li1" class="item" class:active={targetLi === "li1"}>Log</li>
      <li id="li2" class="item" class:active={targetLi === "li2"}>network</li>
      <li id="li3" class="item" class:active={targetLi === "li3"}>storage</li>
    </ul>
  </div>
  <div class="main">
    <!-- 用 $前缀来存储store值 -->
    {#if targetLi === "li1"}
      <div class="log-continer">
        <Log />
      </div>
    {:else if targetLi === "li2"}
      <div class="network-continer">
        <Network />
      </div>
    {:else if targetLi === "li3"}
      <div class="network-continer">storage</div>
    {/if}
  </div>
</div>
<div class="app-mask-layer" />

<style>
  .main {
    color: white;
    padding: 10px;
    height: 40vh;
    overflow: auto;
  }
  .active {
    background: rgba(40, 47, 58, 0.8);
  }
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
    height: 50%;
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
