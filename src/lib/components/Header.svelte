<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { listAssets } from '$lib/utils/listAssets';
    
    let totalAmount: any = 0; // Initialize totalAmount

    const username: any = $page.data.session?.user?.email;

    // Call listAssets function to fetch and calculate total value
    onMount(async () => {
        totalAmount = await listAssets(username);
    });
</script>

<header>
    <span class="total">${totalAmount}</span>
    <div class="line">
        <div class="BTC line-element"></div>
        <div class="ETH line-element"></div>
        <div class="SOL line-element"></div>
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
    }

    /* This will by dynamic */
    .BTC {
        background-color: var(--f-yellow);
        width: 10%;
    }

    .BTC::after {
        content: "Bitcoin";
        font-size: .8rem;
        position: absolute;
        margin-top: .5rem;
    }

    .ETH {
        background-color: var(--f-blue);
        width: 20%;
    }

    .ETH::after {
        content: "Etherium";
        font-size: .8rem;
        position: absolute;
        margin-top: .5rem;
    }

    .SOL {
        background-color: var(--f-red);
        width: 70%;
    }

    .SOL::after {
        content: "Solana";
        font-size: .8rem;
        position: absolute;
        margin-top: .5rem;
    }
</style>
