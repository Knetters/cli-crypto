<script>
  // @ts-nocheck

  import { signIn } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  onMount(() => {
    let inputElem = document.querySelector("input");

    window.addEventListener("load", function (e) {
      inputElem.focus();
    });

    window.addEventListener("click", function (e) {
      inputElem.focus();
    });

    const input = document.querySelector(".terminal-input");

    if (!Object.keys($page.data.session || {}).length) {
      input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          // If statements for all the functions
          const inputValue = input.value.toLowerCase();

          let words = inputValue.split(" ");
          let assignment = words[0];

          if (assignment === "login") {
            output.insertAdjacentHTML(
              "beforeend",
              `<p><span class="blue" aria-hidden="true">guest</span><span class="white" aria-hidden="true">/</span><span class="red" aria-hidden="true">cli-crypto.com</span> <span class="white" aria-hidden="true">&gt; ${input.value}</p>`
            );
            output.insertAdjacentHTML("beforeend", `<p>Requesting URl:</p>`);
            output.insertAdjacentHTML(
              "beforeend",
              `<p>Progress: [<span id="progressBar">................................................................</span>]</p>`
            );
            const progressBars = document.querySelectorAll("#progressBar");
            const progressBar = progressBars[progressBars.length - 1];

            let bar =
              "................................................................";

            function fillBar() {
              let i = 0;
              let interval = setInterval(function () {
                if (i === bar.length) {
                  clearInterval(interval);
                  signIn("google");
                }
                bar = bar.substring(0, i) + "#" + bar.substring(i + 1);
                progressBar.innerHTML = bar;
                i++;
              }, 500 / bar.length);
            }

            fillBar();
          }
          // Command failsafe
          else {
            output.insertAdjacentHTML(
              "beforeend",
              `<p><span class="blue" aria-hidden="true">guest</span><span class="white" aria-hidden="true">/</span><span class="red" aria-hidden="true">cli-crypto.com</span> <span class="white" aria-hidden="true">&gt; ${input.value}</p>`
            );
            output.insertAdjacentHTML(
              "beforeend",
              `<p class="grey">"${input.value}: command not found. Type or click login to get started."</p>`
            );
          }
          input.value = "";
        }
      });

      const textArt = document.getElementById("text-art");

      textArt.innerHTML = `
 ██████╗██╗     ██╗               ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗ 
██╔════╝██║     ██║              ██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗
██║     ██║     ██║    █████╗    ██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║   ██║
██║     ██║     ██║    ╚════╝    ██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██║   ██║
╚██████╗███████╗██║              ╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝
 ╚═════╝╚══════╝╚═╝               ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝ v.1.0
`;
    }
  });
</script>

<section class="terminal">
  <div class="toolbar">
    <span class="toolbar-text">cli-Crypto login, version 1.0</span>
  </div>
  <div class="terminal-content">
    <p aria-hidden="true" id="text-art" class="text-art">
      <span class="loading">Loading...</span>
    </p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <p class="intro-text">
      Welcome, type <span
        class="login"
        tabindex="0"
        on:click={() => signIn("google")}>login</span
      > to get started. (Project still in progress)
    </p>
    <div id="output">
      <!-- The output of the terminal input generated by the JavaScript -->
    </div>
    <p>
      <span class="blue" aria-hidden="true">guest</span><span
        class="white"
        aria-hidden="true">/</span
      ><span class="red" aria-hidden="true">cli-crypto.com</span>
      <span class="white" aria-hidden="true">&gt;</span>
      <input type="text" class="terminal-input" spellcheck="false" />
    </p>
  </div>
</section>

<style>
  .terminal {
    background-color: var(--bg-terminal);
    max-width: 60rem;
    height: 36rem;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6rem;
    border-radius: 0.2rem;
    box-shadow: 0rem 0rem 0rem 1px var(--f-blue);
    position: relative;
  }

  .toolbar {
    background-color: var(--bg-toolbar);
    position: absolute;
    width: 100%;
    border-radius: 0.2rem 0.2rem 0rem 0rem;
    padding: 0.2rem 1rem;
    box-shadow: 0px 1px 3px 0px rgb(27, 27, 27);
    user-select: none;
    z-index: 999;
  }

  .toolbar-text {
    font-size: 0.8rem;
  }

  .terminal-content {
    position: absolute;
    margin-top: 1rem;
    padding: 0.2rem 1rem;
    height: 34rem;
    width: 100%;
    font-size: 0.9rem;
    user-select: none;
    overflow-y: scroll;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .terminal-content::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .terminal-content {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .text-art {
    white-space: pre;
    color: var(--f-blue);
    font-family: monospace;
  }

  .intro-text {
    margin-top: 0rem;
    margin-bottom: 1rem;
  }

  .login {
    color: var(--f-purple);
    cursor: pointer;
    font-style: italic;
  }

  .login:hover {
    text-decoration: underline;
  }

  .terminal-input {
    background-color: transparent;
    border: none;
    font-size: 0.9rem;
    color: var(--f-white);
    font-family: "IBM Plex Mono", monospace;
  }

  .terminal-input:focus {
    outline: none;
  }

  .loading {
    margin-top: 2rem;
  }
</style>
