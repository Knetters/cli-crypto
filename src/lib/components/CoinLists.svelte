<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { listAssets } from "$lib/utils/assets";

  import Chart from "./Chart.svelte";

  let assets: any = [];

  const username: any = $page.data.session?.user?.email;

  onMount(async () => {
    await updateAssets();
    setInterval(updateAssets, 5000);
  });

  async function updateAssets() {
    const updatedAssets = await listAssets(username);

    updatedAssets.forEach((updatedAsset) => {
      const prevAsset = assets.find(
        (asset: { coin: any }) => asset.coin === updatedAsset.coin
      );
      if (prevAsset && updatedAsset.rates.USD !== prevAsset.rates.USD) {
        updatedAsset.trend =
          updatedAsset.rates.USD > prevAsset.rates.USD ? "higher" : "lower";
      }
    });

    assets = updatedAssets;
  }
</script>

<div class="content">
  <section class="list-row">
    <div class="list-row-item">
      <h2>Your assets</h2>
      <p class="asset-row yellow">
        <span>Name</span><span>Rate</span><span>Amount</span><span>Value</span>
      </p>

      {#if assets.length > 0}
        <ul class="your-assets">
          {#each assets as asset}
            <li class="asset-list-item {asset.trend}">
              <p class="asset-row">
                <span>{asset.coin}</span>
                <span>${Number(asset.rates.USD).toFixed(2)}</span>
                <span>{asset.amount}</span>
                ${(asset.amount * asset.rates.USD).toFixed(2)}
              </p>
            </li>
          {/each}
        </ul>
      {:else}
        <p>No assets found.</p>
      {/if}
    </div>
    <div class="list-row-item">
      <!-- <h2>Market</h2> -->
    </div>
  </section>
  <section class="graph-container">
    <Chart />
  </section>
</div>

<style>
  .content {
    display: flex;
    gap: 0.5rem;
    position: absolute;
    bottom: 0;
    margin-bottom: 20.5rem;
    width: calc(100% - 1rem);
  }

  .list-row {
    display: flex;
    justify-content: space-between;
    background-color: var(--bg-global);
    border-radius: 1rem;
    padding: 0.5rem;
    height: 30vh;
  }

  .graph-container {
    background-color: var(--bg-global);
    border-radius: 1rem;
    padding: 0.5rem;
    height: 30vh;
    width: 100%;
  }

  .your-assets {
    overflow-y: scroll;
    height: 100%;
  }

  .your-assets::-webkit-scrollbar {
    display: none;
  }

  .list-row-item {
    width: 100%;
  }

  .asset-list-item {
    text-transform: uppercase;
  }

  .asset-row {
    display: flex;
    text-align: left;
  }

  .asset-row span {
    width: 8rem;
  }

  .higher {
    animation: higher 0.5s;
  }

  @keyframes higher {
    0% {
      color: var(--f-white);
    }
    50% {
      color: var(--f-green);
    }
    100% {
      color: var(--f-white);
    }
  }

  .lower {
    animation: lower 0.5s;
  }

  @keyframes lower {
    0% {
      color: var(--f-white);
    }
    50% {
      color: var(--f-red);
    }
    100% {
      color: var(--f-white);
    }
  }

  @media screen and (max-width: 600px) {
    .list-row {
      height: fit-content;
      flex-direction: column;
    }

    .list-row-item {
      margin-bottom: 2rem;
    }
  }
</style>
