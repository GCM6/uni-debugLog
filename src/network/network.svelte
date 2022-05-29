<script lang="ts">
  import { requestItemList } from "./network.modelFactory";
  const titleList: string[] = ["Name", "Status", "Method", "Time"];
  const onTapPreview = (reqId: string) => {
    $requestItemList[reqId].actived = !$requestItemList[reqId].actived;
  };
</script>

<div>
  <div class="network-container">
    <div class="network-tab-container">
      {#each titleList as tab}
        <div class="network-item">{tab}</div>
      {/each}
    </div>
    {#each Object.entries($requestItemList) as [reqId, req]}
      <div class="network-item-conainer" on:click={() => onTapPreview(reqId)}>
        <div class="network-item item-col">
          {req.url}
        </div>
        <div class="network-item ">{req.statusText}</div>
        <div class="network-item ">{req.method}</div>
        <div class="network-item ">{req.costTime}</div>
      </div>
      <div class="top-preview-container" class:log-actived={req.actived}>
        <div class="preview-title">request Header</div>
        {#each Object.entries(req.header) as [key, val]}
          <div class="list-main">
            <div class="item-key">{key}</div>
            <div class="item-val">{val}</div>
          </div>
        {/each}
        <div class="preview-title">Query String Parameters</div>
        {#each Object.entries(req.getData) as [key, val]}
          <div class="list-main">
            <div class="item-key">{key}</div>
            <div class="item-val">{val}</div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .preview-title {
    font-size: 28px;
    font-weight: bold;
    padding: 10px 0 10px 10px;
    border-left: 0.5px solid rgba(0, 0, 0, 0.1);
    border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  .item-key {
    width: 40%;
    padding: 10px;
  }
  .item-val {
    width: 60%;
    padding: 10px;
    border-left: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  .list-main {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 22px;
    border-top: 0.5px solid rgba(0, 0, 0, 0.1);
    border-left: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  .list-main:last-child {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  .log-actived {
    display: block !important;
  }
  .top-preview-container {
    display: none;
    padding-left: 20px;
  }
  .item-col {
    flex: 4;
  }
  .network-item-conainer {
    display: flex;
    justify-content: center;

    width: 100%;
    border-bottom: 0.5px solid rgb(73, 76, 80);
  }
  .network-container {
    width: 100%;
    height: 100%;
  }
  .network-tab-container {
    width: 100%;
    display: flex;
    justify-content: center;
    background: rgb(41, 42, 56);
    color: #ccc;
    font-size: 28px;
  }
  .network-item:first-child {
    flex: 4;
  }
  .network-item:last-child {
    border: none;
  }

  .network-item {
    flex: 1;
    border-right: 0.5px solid rgb(73, 76, 80);
    padding: 10px;
    font-size: 22px;
    overflow: auto;
    text-align: left;
  }
</style>
