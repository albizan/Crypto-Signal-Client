<template>
  <div>
    <div class="chart-info">
      <p class="has-text-centered value">Now: {{currentValue}} {{tsym}}</p>
      <p class="has-text-centered diff" v-bind:class="{positive: isPositive }">
        From Signal: {{diff}} %
      </p>
    </div>
    <div class="chart-container" v-if="displayChart">
      <canvas v-bind:id="customId">
      </canvas>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js';

export default {
  name: 'chart',
  props: ['identifier', 'fsym', 'tsym', 'buyPrice'],
  data() {
    return {
      customId: this.identifier,
      displayChart: true,
      currentValue: null,
      suggestedPrice: this.buyPrice,
    };
  },
  computed: {
    diff() {
      if (this.currentValue >= this.suggestedPrice) {
        const dif = this.currentValue - this.suggestedPrice;
        return this.calculatePercentage(this.suggestedPrice, dif);
      }
      const dif = this.suggestedPrice - this.currentValue;
      return this.calculatePercentage(this.suggestedPrice, dif) * (-1);
    },
    isPositive() {
      if (this.currentValue >= this.suggestedPrice) {
        return true;
      }
      return false;
    },
  },
  methods: {
    getChartData() {
      const self = this;
      const f = this.fsym;
      const isSatoshi = (this.tsym === 'Satoshi');
      const t = this.tsym === 'Satoshi' ? 'BTC' : this.tsym;
      const h = 168; // number oh hours in a week;
      const url = `https://min-api.cryptocompare.com/data/histohour?fsym=${f}&tsym=${t}&limit=${h}`;
      axios
        .get(url)
        .then((res) => {
          let data;
          if (isSatoshi) {
            // Get satoshi value of charts data
            data = res.data.Data.map(price => (((price.high + price.low) / 2) * 100000000));
          } else {
            data = res.data.Data.map(price => (price.high + price.low) / 2);
          }
          if (data.length <= 0 /* || isSatoshi */) {
            self.displayChart = false;
            return;
          }
          self.drawChart(data);
        })
        .catch(err => console.log(err));
    },
    drawChart(data) {
      const chart = document.getElementById(this.customId).getContext('2d');
      const gradient = chart.createLinearGradient(0, 0, 700, 0);
      gradient.addColorStop(0, '#f1c40f');
      gradient.addColorStop(0.5, '#e67e22');
      gradient.addColorStop(1, '#e74c3c');
      const option = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(200, 200, 200, 0.3)',
                beginAtZero: false,
                padding: 5,
              },
              gridLines: {
                zeroLineColor: 'transparent',
                color: 'rgba(200, 200, 200, 0.15)',
                display: true,
                drawTicks: false,
                drawBorder: false,
                lineWidth: 0.8,
              },
            },
          ],
        },
        elements: {
          line: {
            tension: 0.5,
          },
        },
        legend: {
          position: 'none',
          display: false,
        },
        tooltips: {
          display: false,
        },
        point: {
          backgroundColor: 'trasparent',
        },
      };
      const values = {
        labels: data,
        datasets: [
          {
            label: '2 Days Chart',
            borderColor: gradient,
            pointBorderColor: gradient,
            pointBackgroundColor: gradient,
            pointHoverBackgroundColor: gradient,
            pointHoverBorderColor: gradient,
            pointBorderWidth: 1,
            pointHoverRadius: 1,
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            fill: false,
            borderWidth: 3,
            data,
          },
        ],
      };
      // eslint-disable-next-line
      new Chart(chart, {
        type: 'line',
        data: values,
        options: option,
      });
    },
    getCoinStats() {
      const self = this;
      const f = this.fsym;
      let t = this.tsym;
      let isSatoshi = false;
      const satMultiplier = 100000000; // one hunder millions
      if (t === 'Satoshi') {
        isSatoshi = true;
        t = 'BTC';
      }
      const url = `https://min-api.cryptocompare.com/data/price?fsym=${f}&tsyms=${t}`;
      axios
        .get(url)
        .then((res) => {
          const priceObj = res.data;
          // eslint-disable-next-line
          if(isSatoshi) {
            self.currentValue = (Object.values(priceObj)[0] * satMultiplier).toFixed(0);
          } else {
            self.currentValue = Object.values(priceObj)[0];
          }
        })
        .catch();
    },
    calculatePercentage(value, dif) {
      return (dif / (value / 100)).toFixed(2);
    },
  },
  mounted() {
    this.getChartData();
    this.getCoinStats();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.chart-container {
  padding: 1rem 1rem 1rem .5rem;
  background-color: #2d3436;
}
.chart-info {
  background-color: #2d3436;
  padding: 1rem 0;
  .value {
    font-size: 1.5rem;
    color: $belize;
  }
  .diff {
    font-size: 1.2rem;
    color: $pomegranate;
  }
  .positive {
    color: $nephritis!important;
  }
}
</style>

