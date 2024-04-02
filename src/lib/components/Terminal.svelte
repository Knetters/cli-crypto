<script lang="ts">
    import { page } from "$app/stores";
    import { addCoin } from '$lib/services/addCoin';
    import { addHistory } from '$lib/services/addHistory';
    import { clearHistory } from "$lib/services/clearHistory";
    import { reset } from "$lib/services/reset";
    import { removeCoin } from '$lib/services/removeCoin';
    import { onMount } from 'svelte';

    const textArt: string = `
  ___  __    ____       ___  ____  _  _  ____  ____  _____ 
 / __)(  )  (_  _)___  / __)(  _ \\( \\/ )(  _ \\(_  _)(  _  )
( (__  )(__  _)(_(___)( (__  )   / \\  /  )___/  )(   )(_)( 
 \\___)(____)(____)     \\___)(_)\\_) (__) (__)   (__) (_____)
`;


    const username: any = $page.data.session?.user?.email

    onMount(() => {
        const textartElem: any = document.getElementById('textart');
        textartElem.innerHTML = textArt;

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
                // const confirm = inputArrConform[0]

                switch (command) {
                    case 'add':
                        if (isNaN(amount) || !coin) {
                            terminalOutput.innerHTML = 'Invalid command syntax. Usage: add <amount> <coin>';
                        } else {
                            addCoin(amount, coin, username);
                            addHistory(`Added ${amount} of ${coin}.`, username)
                            terminalOutput.innerHTML = `Added ${amount} ${coin}`;
                        }
                        break;
                    case 'remove':
                        if (!coin) {
                            terminalOutput.innerHTML = 'Invalid command syntax. Usage: remove <coin>';
                        } else {
                            removeCoin(amount, coin, username)
                                .then(() => {
                                    addHistory(`Removed ${amount} of ${coin}.`, username)
                                    terminalOutput.innerHTML = `Removed ${amount} ${coin}`;
                                })
                                .catch((error) => {
                                    terminalOutput.innerHTML = `Error: ${error.message}`;
                                });
                        }
                        break;
                    case 'clear':
                        clearHistory(username)
                        .then(() => {
                            terminalOutput.innerHTML = `History cleared`;
                            })
                        .catch((error) => {
                            terminalOutput.innerHTML = `Error: ${error.message}`;
                        });
                        break;
                    case 'reset':
                        terminalOutput.innerHTML = `Are you sure you want to remove all assets and history? y/n`;
                        terminalInput.addEventListener('keypress', function(event: any) {
                            if (event.key.toLowerCase() === 'y') {
                                reset(username)
                                    .then(() => {
                                        terminalOutput.innerHTML = `Portfolio cleared`;
                                    })
                                    .catch((error) => {
                                        terminalOutput.innerHTML = `Error: ${error.message}`;
                                    });
                            } else if (event.key.toLowerCase() === 'n') {
                                terminalOutput.innerHTML = `Reset cancelled`;
                            }
                            terminalInput.removeEventListener('keypress', arguments.callee);
                        });
                        break;
                    case 'help':
                        terminalOutput.innerHTML = 'List of commands: - add [amount] [coin] - remove [coin] - clear - reset';
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
        <span class="textart" id="textart"><span class="loading-span">Loading...</span></span>
        <p class="intro-text">Type <span class="purple">help</span> for a list of commands</p>
        <div id="output">
            <!-- Output -->
        </div>
        <p><span class="blue" aria-hidden="true">{username}</span><span class="white" aria-hidden="true">/</span><span class="red" aria-hidden="true">cli-crypto.com</span> <span class="white" aria-hidden="true">&gt;</span> <input type="text" class="terminal-input" spellcheck="false"></p>
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
        padding: .5rem;
        height: 20rem;
        width: 100%;
        font-size: 1rem;
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
        padding-top: .5rem;
        margin-top: 0rem;
        margin-bottom: 1rem;
    }

    .loading-span {
        margin-top: 2rem;
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

    .textart {
        white-space: pre;
    }
</style>
