<script lang="ts">
  // const idMap: Record<string, string> = {
  //   li1: "log",
  //   li2: "network",
  //   li3: "storage",
  // };
  import Log from "./log/log.svelte";
  import Network from "./network/network.svelte";
  let targetLi: string = "li1";
  let clearStatus: boolean = false;
  const onChangeTab = (e: any) => {
    targetLi = e.target.id;
  };
  let switchOpen: boolean = true;
  const clearStore = () => {
    clearStatus = true;
  };
  const changePanel = (status: boolean) => {
    switchOpen = status;
  };
</script>

{#if switchOpen}
  <div class="flat-tag" on:click={() => changePanel(false)}>
    <span class="log-root">
      <span class="log-dot"> LOG </span>
      <span class="switch-track" />
    </span>
  </div>
{:else}
  <div class="log-page">
    <div class="app-continer">
      <div class="tab">
        <ul class="tab-continer" on:click={onChangeTab}>
          <li id="li1" class="item" class:active={targetLi === "li1"}>Log</li>
          <li id="li2" class="item" class:active={targetLi === "li2"}>
            network
          </li>
          <li id="li3" class="item" class:active={targetLi === "li3"}>
            storage
          </li>
        </ul>
      </div>
      <div class="main">
        <!-- 用 $前缀来存储store值 -->
        {#if targetLi === "li1"}
          <div class="log-continer">
            <Log bind:clearStatus />
          </div>
        {:else if targetLi === "li2"}
          <div class="network-continer">
            <Network />
          </div>
        {:else if targetLi === "li3"}
          <div class="network-continer">storage</div>
        {/if}
      </div>
      <div class="btn-container">
        <div class="btn clear-btn" on:click={clearStore}>clear Log</div>
        <div class="btn">Hide page</div>
        <div />
      </div>
    </div>
    <div class="app-mask-layer" on:click={() => changePanel(true)} />
  </div>
{/if}

<style>
  .switch-track {
    background-color: rgb(46, 202, 69);
    opacity: 0.5;
    border: 0px;
    width: 100%;
    height: 100%;
    border-radius: 32px;
  }
  .log-dot {
    display: inline-flex;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    right: 0px;
    z-index: 1;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
  }
  .log-root {
    display: inline-flex;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;
    z-index: 0;
    vertical-align: middle;
    width: 120px;
    height: 56px;
    padding: 0px;
    margin: 16px;
  }
  .flat-tag {
    position: absolute;
    right: 40px;
    top: 20px;
  }
  .btn-container {
    color: white;
    display: flex;
    height: 102px;
    align-items: center;
  }
  .btn {
    width: 50%;
    cursor: pointer;
    text-align: center;
    font-size: 24px;
  }
  .clear-btn {
    flex: 1;
  }
  .main {
    color: #000;
    height: 40vh;
    overflow: auto;
    background: white;
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
    border-top: 1px solid #ccc;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #000;
    z-index: 999;
  }

  .app-mask-layer {
    z-index: 998;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }
</style>
