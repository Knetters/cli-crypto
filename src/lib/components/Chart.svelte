<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  onMount(async () => {
    let createBtcChart;

    const btcData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily"
      );
      const data = await response.json();
      const times = data.prices.map((e) => e[0]);
      const prices = data.prices.map((e) => e[1]);
      return { times, prices };
    };

    async function printBtcChart() {
      let { times, prices } = await btcData();

      let btcChart = document.getElementById("btcChart").getContext("2d");

      Chart.defaults.font.family = "Poppins";
      Chart.defaults.font.size = 12;

      createBtcChart = new Chart(btcChart, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "$",
              data: prices,
              borderColor: "#61dab6",
              borderJoinStyle: "round",
              borderCapStyle: "round",
              borderWidth: 1,
              pointRadius: 0,
              pointHitRadius: 10,
              tension: 0.1,
            },
          ],
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          scales: {
            x: {
              display: false,
              grid: {},
            },
            y: {
              display: false,
              grid: {},
            },
          },
        },
      });
    }

    printBtcChart();
  });
</script>

<div>
  <canvas id="btcChart"></canvas>
</div>

<style>
  div {
    width: 100%;
    height: 28vh;
  }

  canvas {
    margin: 0;
    width: 100%;
  }
</style>
