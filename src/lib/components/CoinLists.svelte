<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { listAssets } from "$lib/utils/assets";

  import Chart from "./Chart.svelte";

  let assets: any = [];
  let selectedTimeOption = null || "";

  const username: any = $page.data.session?.user?.email;

  onMount(async () => {
    await updateAssets();
    setInterval(updateAssets, 5000);
    // Load selected time option from session cookie
    selectedTimeOption = sessionStorage.getItem("selectedTimeOption") || "30";
  });

  async function updateAssets() {
    const updatedAssets = await listAssets(username);

    updatedAssets.forEach((updatedAsset) => {
      const prevAsset = assets.find(
        (asset: { coin: any }) => asset.coin === updatedAsset.coin
      );
      if (prevAsset && updatedAsset.rates.USD !== prevAsset.rates.USD) {
        // Check if 'trend' property exists on updatedAsset
        if ("trend" in updatedAsset) {
          updatedAsset.trend =
            updatedAsset.rates.USD > prevAsset.rates.USD ? "higher" : "lower";
        }
      }
    });

    assets = updatedAssets;
  }

  function selectTimeOption(event) {
    selectedTimeOption = event.target.value;
    // Store selected time option in session cookie
    sessionStorage.setItem("selectedTimeOption", selectedTimeOption);
  }
</script>

<div class="content">
  <section class="list-row">
    <div class="list-row-item">
      <ul class="option-list">
        <li class="option-item"><button>Currency</button></li>
      </ul>
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
    <div class="graph-option-row">
      <ul class="option-list">
        {#if assets.length > 0}
          {#each assets as asset}
            <li class="uppercase option-item {asset.trend}">
              <button>{asset.coin}</button>
            </li>
          {/each}
        {:else}
          <p>No coins to filter.</p>
        {/if}
      </ul>
      <ul class="option-list right-list">
        <li class="option-item">
          <button value="1" on:click={selectTimeOption}>Day</button>
        </li>
        <li class="option-item">
          <button value="7" on:click={selectTimeOption}>Week</button>
        </li>
        <li class="option-item selected-time">
          <button value="31" on:click={selectTimeOption}>Month</button>
        </li>
        <li class="option-item">
          <button value="365" on:click={selectTimeOption}>Year</button>
        </li>
      </ul>
    </div>
    <Chart {selectedTimeOption} />
  </section>
</div>

<style>
  .graph-option-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .right-list {
    justify-content: right;
  }

  .option-list {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    margin-top: -3rem;
    margin-left: -0.5rem;
    gap: 0.5rem;
  }

  .option-item {
    background-color: var(--bg-global);
    padding: 0.3rem 0.5rem 0.5rem 0.5rem;
    border-radius: 0.5rem;
  }

  .selected-time {
    box-shadow: inset 0 0 0 0.1rem var(--f-blue);
  }

  .content {
    display: flex;
    gap: 0.5rem;
    width: calc(100% - 1rem);
    height: 32vh;
    margin-top: 8rem;
  }

  .list-row {
    display: flex;
    justify-content: space-between;
    background-color: var(--bg-global);
    border-radius: 1rem;
    padding: 0.5rem;
    height: 100%;
  }

  .graph-container {
    background-color: var(--bg-global);
    border-radius: 1rem;
    padding: 0.5rem;
    height: 100%;
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
