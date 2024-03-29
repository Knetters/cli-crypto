<script lang="ts">
        import { signOut } from "@auth/sveltekit/client";
        import { addUser } from '$lib/services/addUser';
        import { page } from "$app/stores";
        import { onMount } from "svelte";

        import Header from "./Header.svelte";
        import Terminal from "./Terminal.svelte";
    import CoinLists from "./CoinLists.svelte";
    
        onMount(async () => {
                addUser(`${$page.data.session?.user?.email}`)
        });
</script>
    
<svelte:head>
        <title>cli-Crypto - Portfolio {$page.data.session?.user?.name}</title>
</svelte:head>
    
<section>
        <div class="inner-dashboard">
                <div class="menu-bar">
                        <fieldset class="status menu-container">
                                <legend>Welcome</legend>
                                <span class="name">{$page.data.session?.user?.name}</span>
                        </fieldset>
                        <fieldset class="menu menu-container">
                                <legend>History</legend>
                        </fieldset>
                        <fieldset class="status menu-container">
                                <legend>Status</legend>
                                <ul>
                                        <li class="bool-list-item"><span>Logged in:</span><span class="red">True</span></li>
                                        <li class="bool-list-item"><span>Price sync:</span><span class="red">True</span></li>
                                </ul>
                                <button on:click={() => signOut()} class="button">Sign out</button>
                        </fieldset>
                </div>
                <fieldset class="content">
                        <Header />
                        <CoinLists />
                        <Terminal />
                </fieldset>
        </div>  
</section>
    
<style>
        section {
                background-color: var(--bg-terminal);
                width: 100vw;
                height: 100vh;
                margin-left: auto;
                margin-right: auto;
                border-radius: 0.2rem;
                /* box-shadow: 0rem 0rem 0rem 1px var(--f-blue); */
                position: relative;
        }

        .inner-dashboard {
                display: flex;
                height: 100%;
                gap: 1rem;
        }

        .menu-bar {
                width: 20rem;
                display: flex;
                flex-direction: column;
                gap: .5rem;
                margin: 0.4rem 0rem 1rem 1rem;
        }

        .status {
                height: fit-content;
        }

        .menu {
                height: 100%;
        }

        .menu-container {
                padding: .2rem .5rem;
        }

        .content {
                width: 100%;
                margin: 1rem 1rem 1rem 0rem;
                padding: .2rem .5rem;
                border-radius: 2rem 2rem 0rem 0rem;
                position: relative;
        }

        fieldset {
                border: 1px solid var(--f-white);
        }

        button {
                font-size: 1rem;
                margin: 1rem 0rem .1rem 0rem;
        }

        .bool-list-item {
                display: flex;
                justify-content: space-between;
        }
</style>
    