<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
  import { addUser } from "$lib/services/addUser";
  import { getHistory } from "$lib/services/getHistory";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Header from "./Header.svelte";
  import Terminal from "./Terminal.svelte";
  import CoinLists from "./CoinLists.svelte";

  let history: any = [];
  const username: any = $page.data.session?.user?.email;

  onMount(async () => {
    addUser(username);
    await updateHistory();
    setInterval(updateHistory, 5000);
  });

  async function updateHistory() {
    history = await getHistory(username);
  }
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
      <fieldset class="menu menu-container history">
        <legend>History</legend>
        {#if history.length == 0}
          <p class="red">No history</p>
        {:else}
          <ul>
            {#each history as line}
              <li>
                <p class="gray">{line.date}</p>
                <p>{line.message}</p>
              </li>
            {/each}
          </ul>
        {/if}
      </fieldset>
      <fieldset class="status menu-container">
        <legend>Status</legend>
        <ul>
          <li class="bool-list-item">
            <span>Logged in:</span><span class="red">True</span>
          </li>
          <li class="bool-list-item">
            <span>Price sync:</span><span class="red">True</span>
          </li>
        </ul>
        <button on:click={() => signOut()} class="button">Sign out</button>
      </fieldset>
    </div>
    <fieldset class="content">
      <div class="coin-content">
        <Header />
        <CoinLists />
      </div>
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
    position: relative;
    overflow: hidden;
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
    gap: 0.5rem;
    margin: 0.4rem 0rem 1rem 1rem;
  }

  .coin-content {
    height: 100%;
    width: 100%;
    padding-bottom: 25.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .status {
    height: fit-content;
  }

  .menu {
    height: 100%;
  }

  .menu-container {
    padding: 0.2rem 0.5rem;
  }

  .history {
    overflow-y: scroll;
  }

  .history::-webkit-scrollbar {
    display: none;
  }

  .content {
    width: 100%;
    margin: 1rem 1rem 1rem 0rem;
    padding: 0.2rem 0.5rem;
    border-radius: 2rem 2rem 0rem 0rem;
    position: relative;
  }

  fieldset {
    border: 1px solid var(--f-white);
  }

  button {
    font-size: 1rem;
    margin: 1rem 0rem 0.1rem 0rem;
  }

  .bool-list-item {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 600px) {
    .menu-bar {
      width: 50vw;
      height: 100vh;
      margin: 0;
      padding: 0.5rem;
      position: absolute;
      background-color: var(--bg-terminal);
      z-index: 1000;

      display: none;
    }

    .content {
      margin: 0.5rem;
      border-radius: 1rem 1rem 0rem 0rem;
    }
  }
</style>
