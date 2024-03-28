<script>
    import { page } from "$app/stores";
    import Dashboard from "$lib/components/Dashboard.svelte";
    import Login from "$lib/components/Login.svelte";
</script>

<main>
    {#if Object.keys($page.data.session || {}).length}
        <Dashboard />
    {:else}
        <Login />
    {/if}
</main>