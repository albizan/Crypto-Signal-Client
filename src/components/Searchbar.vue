<template>
<section class="container-fluid">
  <div class="search-bar">
    <div class="columns is-mobile">
      <div class="column">
        <div class="input-container">
          <div @click="setCoin" class="icon-wrapper">
            <icon class=".icon" name="search"></icon>
          </div>
          <input
            v-on:keyup.enter="setCoin"
            v-model="coin"
            autocomplete="off"
            type="text"
            id="search"
            placeholder="Coin"
          />
        </div>
      </div>
      <div class="column">
        <div class="input-container">
          <div @click="setExchange" class="icon-wrapper">
            <icon class=".icon" name="search"></icon>
          </div>
          <input
            v-on:keyup.enter="setExchange"
            v-model="exchange"
            autocomplete="off"
            type="text"
            id="search"
            placeholder="Exchange"
          />
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import 'vue-awesome/icons/search';
import Icon from 'vue-awesome/components/Icon.vue';

export default {
  name: 'searchBar',
  components: {
    Icon,
  },
  data() {
    return {
      coin: '',
      exchange: '',
    };
  },
  methods: {
    setCoin() {
      if (this.coin !== '') {
        this.$store.dispatch('SEARCH_COIN', {
          coin: this.coin,
        });
      }
    },
    setExchange() {
      if (this.exchange !== '') {
        this.$store.dispatch('SEARCH_EXCHANGE', {
          exchange: this.exchange,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.search-bar {
  background-color: #000;
  padding: 1rem;
  margin-bottom: 5rem;
}
.input-container {
  background: #2b303b;
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-radius: .8rem;
  input#search {
    border-radius: .8rem;
    outline: none;
    background: #2b303b;
    width: 90%;
    height: 50px;
    border: none;
    color: #fff;
    padding-left: .5rem;
    font-size: 1.3rem;
    -webkit-transition: all .55s ease;
    -moz-transition: all .55s ease;
    -ms-transition: all .55s ease;
    -o-transition: all .55s ease;
    transition: all .55s ease;
  }
  input#search::-webkit-input-placeholder {
    color: #65737e;
    font-size: 1.3rem;
  }
  input#search:-moz-placeholder {
    /* Firefox 18- */
    color: #65737e;
    font-size: 1.3rem;
  }
  input#search::-moz-placeholder {
    /* Firefox 19+ */
    color: #65737e;
    font-size: 1.3rem;
  }
}

.icon-wrapper {
  height: 3rem;
  width: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: .7rem;
  border-bottom-left-radius: .7rem;
  font-size: 2rem;
  color: white;
  transition: background-color .33s ease;
}

.icon-wrapper:hover {
  cursor: pointer;
  background: $nephritis;
  color: $dark;
}

.fa-icon {
  width: auto;
  height: 1.2rem;
  max-width: 100%;
  max-height: 100%;
}

@media screen and (max-width: 480px) {
  .icon-wrapper {
    width: 2rem;
  }
  .column {
    padding: .4rem .25rem;
  }
  .input-container {
    border-radius: .6rem;
    input#search {
      border-radius: .6rem;
      padding-left: .4rem;
      font-size: 1.1rem;
      -webkit-transition: all .55s ease;
      -moz-transition: all .55s ease;
      -ms-transition: all .55s ease;
      -o-transition: all .55s ease;
      transition: all .55s ease;
    }
    input#search::-webkit-input-placeholder {
      font-size: 1.1rem;
    }
    input#search:-moz-placeholder {
      /* Firefox 18- */
      font-size: 1.1rem;
    }
    input#search::-moz-placeholder {
      /* Firefox 19+ */
      font-size: 1.1rem;
    }
  }
}
</style>
