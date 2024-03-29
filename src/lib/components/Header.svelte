<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { listAssets } from '$lib/utils/assets';
    
    let assets: any = [];
    let totalAmount: any = 0;
    let totalWidth: number = 0;

    const username: any = $page.data.session?.user?.email;

    onMount(async () => {
        assets = await listAssets(username);
        calculateWidths();
    });

    function calculateWidths() {
        totalAmount = 0;
        assets.forEach((asset: { amount: number; rates: { USD: number; }; }) => {
            totalAmount += asset.amount * asset.rates.USD;
        });
        totalWidth = 100 / assets.length;
    }
</script>

<header>
    <span class="total">${totalAmount.toFixed(2)}</span>
    <div class="line">
        {#each assets as asset}
            <div class="{asset.coin} line-element" style="width: {totalWidth}%"></div>
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
</style>
