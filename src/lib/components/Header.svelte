<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { listAssets } from '$lib/utils/assets';
    
    let assets: any = [];
    let totalAmount: any = 0;
    let totalWidths: { [key: string]: number } = {}; // Object to store width percentages for each coin

    const username: any = $page.data.session?.user?.email;

    onMount(async () => {
        assets = await listAssets(username);
        calculateWidths();
        setInterval(calculateWidths, 5000); // Run every 5 seconds
    });

    function calculateWidths() {
        totalAmount = 0;
        assets.forEach((asset: { amount: number; rates: { USD: number; }; coin: string; }) => {
            totalAmount += asset.amount * asset.rates.USD;
        });
        
        assets.forEach((asset: { amount: number; rates: { USD: number; }; coin: string; }) => {
            const assetValue = asset.amount * asset.rates.USD;
            totalWidths[asset.coin] = (assetValue / totalAmount) * 100; // Calculate percentage width for each coin
        });
    }
</script>

<header>
    {#if !totalAmount}
        <span class="total">Loading...</span>
    {:else}
        <span class="total">${totalAmount.toFixed(2)}</span>
    {/if}
    <div class="line">
        {#each assets as asset}
            <div class="{asset.coin} line-element" style="width: {totalWidths[asset.coin] ?? 0}%"></div>
        {/each}
    </div>
</header>

<style>
    .total {
        font-size: 3rem;
    }

    .line {
        height: .2rem;
        display: flex;
        gap: .2rem;
        background-color: var(--bg-toolbar);
        margin: .5rem 0rem 5rem 0rem;
        border-radius: .2rem;
    }

    .line-element {
        height: .2rem;
        background-color: var(--f-blue);
    }

    .line-element::after {
        font-size: .8rem;
        position: absolute;
        margin-top: .5rem;
    }

    @media screen and (max-width: 600px) {
		.total {
            font-size: 2rem;
        }
    }
</style>
