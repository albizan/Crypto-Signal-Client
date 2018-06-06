<template>
<div>
  <div class="loader-wrapper" v-if="!isListLoaded">
    <orbit-spinner
      :animation-duration="1500"
      :size="200"
      color="#ff1d5e"
    />
    <p class="hint is-size-5">Loading Signals from server</p>
  </div>
  <div v-if="isListLoaded && !noItemFound">
    <signal
      v-for="(signal, index) in signals"
      :key="signal._id"
      :signal="signals[index]"
    ></signal>
  </div>
  <div v-if="noItemFound">
    <h3 class="has-text-centered title is-4">I'm sorry, no signals found</h3>
  </div>
  <div v-if="error">
    <h3 class="has-text-centered title is-4">I'm sorry, an error occurred</h3>
  </div>
</div>
</template>


<script>
import { mapState } from 'vuex';
import { OrbitSpinner } from 'epic-spinners';
import Signal from './Signal.vue';

export default {
  name: 'signal-list',
  components: {
    Signal,
    OrbitSpinner,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['signals', 'gems', 'noItemFound', 'isListLoaded', 'error']),
  },
  created() {
    this.$store.dispatch('LOAD_SIGNAL_LIST');
  },
};
</script>


<style lang="scss">
.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .hint {
    margin-top: 3rem;
  }
}
</style>
