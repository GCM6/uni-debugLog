<script lang="ts">
  const titleList: string[] = ["Name", "Status", "Type", "Size", "Time"];
  interface NetworkList {
    name: string;
    status: number;
    type: string;
    size: string;
    time: string;
  }
  const networkList: NetworkList[] = [
    {
      name: "http://www.baidu.com/search?asdasdadadsdasdasas",
      status: 200,
      type: "feath",
      size: "30b",
      time: "200ms",
    },
  ];
</script>

<div>
  <div class="network-container">
    <div class="network-tab-container">
      {#each titleList as tab}
        <div class="network-item">{tab}</div>
      {/each}
    </div>
    <div class="network-item-conainer">
      {#each networkList as network}
        <div class="network-item item-col">{network.name}</div>
        <div class="network-item ">{network.status}</div>
        <div class="network-item ">{network.type}</div>
        <div class="network-item ">{network.size}</div>
        <div class="network-item ">{network.time}</div>
      {/each}
    </div>
  </div>
</div>

<style>
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
