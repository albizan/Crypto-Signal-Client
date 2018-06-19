<template>
  <div class="container">
    <div class="card">

      <!-- INFO about signal -->
      <div class="info">
        <div v-if="signal.isGem" class="info-component has-text-white has-background-dark">
          <icon name="gem"></icon>
        </div>
        <div v-if="signal.riskFactor" class="info-component has-background-danger">
          {{signal.riskFactor}} risk
        </div>
        <div v-if="signal.timeFrame" class="info-component has-background-warning has-text-dark">
          {{signal.timeFrame}} term
        </div>
        <div v-if="signal.date" class="info-component has-background-link date">
          {{signal.date | calculateTime}} hours ago
        </div>
      </div>

      <!-- Header of Signal -->
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img class="round-image" :src="logoUrl" alt="Altcoin Logo">
            </figure>
          </div>
          <div class="media-content">
            <h3 class="title is-3 is-size-4-mobile">
              {{signal.name | capitalize}} ({{signal.ticker | toUpperCase}})</h3>
            <div class="subtitle is-5 is-size-6-mobile">
              <strong>Buy on: </strong>
              <i class="comma" v-for="(ex, i) in signal.exchanges" :key="i">
                {{ex | capitalize}}
              </i>
            </div>
          </div>
        </div>
      </div>

      <!-- Comment about Signal -->
      <div v-if="signal.comment" class="comment has-text-justified">
        {{signal.comment}}
      </div>

      <!-- Chart -->
      <chart
        :identifier="chartId"
        :fsym="signal.ticker.toUpperCase()"
        :tsym="signal.coinAgainst"
        :buyPrice="signal.buyPrice">
      </chart>

      <!-- Buy Price section -->
      <div class="signal-core">
        <div class="core-label has-background-link">
          <p class="task">Buy up to:</p>
        </div>
        <div class="values">
          <p class="value">{{ signal.buyPrice | fillVoid }}</p>
          <span class="trade-against">{{ signal.coinAgainst }}</span>
        </div>
      </div>

      <!-- Stop Loss section -->
      <div class="signal-core">
        <div class="core-label has-background-danger">
          <p class="task">Stop Loss:</p>
        </div>
        <div class="values">
          <p class="value">{{ signal.stopLoss | fillVoid }}</p>
          <span class="trade-against">{{ signal.coinAgainst }}</span>
        </div>
      </div>

      <!-- Target section -->
      <div class="signal-core">
        <div class="core-label has-background-nephritis">
          <p class="task">Targets:</p>
        </div>
        <div class="values">
          <p class="value">
            <span class="comma" v-for="(target, i) in signal.targets" :key="i">
              {{ target | fillVoid }}
            </span>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/gem';
import Icon from 'vue-awesome/components/Icon.vue';
import Chart from './Chart.vue';

export default {
  name: 'signal',
  props: ['signal'],
  components: {
    Icon,
    Chart,
  },
  data() {
    return {
      // eslint-disable-next-line
      chartId: this.signal._id,
      logoUrl: `https://chasing-coins.com/api/v1/std/logo/${this.signal.ticker}`,
    };
  },
  filters: {
    capitalize(value) {
      if (!value) {
        return '';
      }
      // Capitalize the first letter
      return (
        value
          .toString()
          .charAt(0)
          .toUpperCase() + value.slice(1)
      );
    },
    toUpperCase(value) {
      if (!value) {
        return '';
      }
      return value.toString().toUpperCase();
    },
    fillVoid(value) {
      if (!value) {
        return ' - ';
      }
      return value;
    },
    calculateTime(value) {
      const hours = Math.floor(new Date().getTime() / 1000 / 3600);
      return hours - value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.card {
  margin: 3rem 0.5rem;
  border-radius: .8rem;
}

.info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.6rem;
  color: #fff;
  font-weight: normal;
  text-transform: uppercase;
  .info-component {
    margin: 0 0.35rem;
    padding: 0.55rem 0.85rem;
    border-radius: 0.5rem;
    text-align: center;
  }
}

.card-content {
  border-bottom: 1px solid $border-color;
  border-top: 1px solid $border-color;
}

.round-image {
  border-radius: 100%;
}

.comment {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid $border-color;
}

/* .chartContainer {
  background-color: #263238;
  padding: 1rem;
} */

.signal-core {
  display: flex;
  padding: 0.6rem 1.5rem;
}

.core-label {
  border-radius: 0.5rem;
  width: 6rem;
  display: flex;
  align-items: center;
  .task {
    display: block;
    width: 100%;
    text-align: center;
    padding: 0.5rem 0.6rem;
    color: white;
  }
}

.values {
  display: flex;
  align-items: center;
  .value {
    margin-left: 1rem;
  }
}

.trade-against {
  margin-left: 0.4rem;
}

.comma:not(:last-child):after {
  content: "/";
}

.has-background-nephritis {
  background-color: $nephritis;
}

@media screen and (max-width: 480px) {
  .info {
    justify-content: center;
    .info-component {
      margin: 0 0.15rem;
      padding: 0.35rem 0.5em;
      font-size: 0.7rem;
    }
  }
  .comment {
    font-size: 0.9rem;
  }
  .core-label {
    width: 5.1rem;
    .task {
      font-size: 0.7rem;
      padding: 0.5rem 0.2rem;
    }
    .value {
      font-size: 0.7rem;
    }
  }
}
</style>
