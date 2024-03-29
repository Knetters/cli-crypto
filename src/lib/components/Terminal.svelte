<script lang="ts">
    import { page } from "$app/stores";
    import { addCoin } from '$lib/services/addCoin';
    import { onMount } from 'svelte';

    const username: any = $page.data.session?.user?.email

    onMount(() => {
        let inputElem: any = document.querySelector("input");

        window.addEventListener('load', function(e) {
            inputElem.focus();
        })

        window.addEventListener('click', function(e) {
            inputElem.focus();
        })

        const terminalInput: any = document.querySelector('.terminal-input');
        const terminalOutput: any = document.getElementById('output');

        terminalInput.addEventListener('keypress', function(event: any) {
            if (event.key === 'Enter') {
                const inputText = terminalInput.value.trim().toLowerCase();
                const inputArr = inputText.split(' ');

                const command = inputArr[0];
                const amount = parseFloat(inputArr[1]);
                const coin = inputArr[2];

                switch (command) {
                    case 'add':
                        if (isNaN(amount) || !coin) {
                            terminalOutput.innerHTML = 'Invalid command syntax. Usage: add <amount> <coin>';
                        } else {
                            addCoin(amount, coin, username);
                            terminalOutput.innerHTML = `Added ${amount} ${coin}`;
                        }
                        break;
                    case 'help':
                        terminalOutput.innerHTML = 'List of commands:\n- add <amount> <coin>';
                        break;
                    default:
                        terminalOutput.innerHTML = `Command not found: ${command}`;
                }

                terminalInput.value = '';
            }
        });
    });
</script>

<section class="terminal">
    <div class="toolbar">
        <span class="toolbar-text">cli-Crypto terminal, v1.0</span>
    </div>
    <div class="terminal-content">
        <p class="intro-text">Type <span class="purple">help</span> for a list of commands</p>
        <div id="output">
            <!-- Output -->
        </div>
        <p><span class="blue" aria-hidden="true">guest</span><span class="white" aria-hidden="true">@</span><span class="red" aria-hidden="true">cli-crypto.com</span> <span class="white" aria-hidden="true">&gt;</span> <input type="text" class="terminal-input" spellcheck="false"></p>
    </div>
</section>


<style>
    .terminal {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20rem;
        background-color: var(--bg-terminal);
        margin-top: 6rem;
    }

    .toolbar {
        background-color: var(--bg-toolbar);
        position: absolute;
        width: 100%;
        border-radius: .2rem .2rem 0rem 0rem;
        padding: .2rem .5rem .3rem .5rem;
        user-select: none;
        z-index: 999;
        border-top: 1px solid var(--f-white);
        border-bottom: 1px solid var(--f-white);
    }

    .toolbar-text {
        font-size: .8rem;
    }

    .terminal-content {
        position: absolute;
        padding: 2.5rem .5rem;
        height: 20rem;
        width: 100%;
        font-size: .9rem;
        user-select: none;
        overflow-y: scroll;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .terminal-content::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .terminal-content {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .intro-text {
        margin-top: 0rem;
        margin-bottom: 1rem;
    }

    .terminal-input {
        background-color: transparent;
        border: none;
        font-size: .9rem;
        color: var(--f-white);
        font-family: 'IBM Plex Mono', monospace;
    }

    .terminal-input:focus {
        outline: none;
    }
</style>
