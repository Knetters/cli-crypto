<script lang="ts">
    import { onMount } from "svelte";

    onMount(async () => {
        var ctx = document.getElementById('btcChart').getContext('2d');
        var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
            label: 'Bitcoin (BTC)',
            data: [],
            borderColor: '#4caf50',
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
    });

    axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
    .then(function (response) {
        var data = response.data;
        chart.data.labels = data.prices.map(function(item) {
        return new Date(item[0]).toLocaleDateString();
        });
        chart.data.datasets[0].data = data.prices.map(function(item) {
        return item[1];
        });
        chart.update();
    })
    .catch(function (error) {
        console.log(error);
    });
    });
</script>

<canvas id="btcChart"></canvas>

<style type="scss">
</style>