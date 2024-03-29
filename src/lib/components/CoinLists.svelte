<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { listAssets } from '$lib/utils/assets';
    
    let assets: any = [];

    const username: any = $page.data.session?.user?.email;

    onMount(async () => {
        await updateAssets();
        setInterval(updateAssets, 5000); // Run every 5 seconds
    });

    async function updateAssets() {
        assets = await listAssets(username);
    }
</script>

<section class="list-row">
    <div class="list-row-item">
        <h2>Your assets</h2>

        {#if assets.length > 0}
            <ul>
                {#each assets as asset}
                    <li class="asset-list-item">
                        {asset.coin} ${asset.rates.USD}
                    </li>
                {/each}
            </ul>
        {:else}
            <p>No assets found.</p>
        {/if}
    </div>
    <div class="list-row-item">
        <h2>Market</h2>
    </div>
    <div class="list-row-item">
    </div>
</section>

<style>
    .list-row {
        display: flex;
        justify-content: space-between;
    }

    .list-row-item {
        width: 100%;
    }

    .asset-list-item {
        text-transform: uppercase;
    }
</style>
