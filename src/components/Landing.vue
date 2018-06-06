<template>
<section id="vh" class="full-page has-background">
  <div id="overlay"></div>
  <div class="container has-text-centered has-text-monospace content">
    <h1 class="title has-text-light is-size-1-desktop is-size-2-touch">Signals</h1>
    <h2 class="subtitle has-text-light is-size-4-desktop is-size-5-touch">
      Get the best free crypto signals and start trading
    </h2>
    <div class="button-wrapper">
      <button class="fluo-btn is-size-7-mobile is-size-6-tablet is-size-5-desktop">
        Twitter
      </button>
      <button class="fluo-btn is-size-7-mobile is-size-6-tablet is-size-5-desktop">
        Telegram
      </button>
    </div>
    <arrow></arrow>
  </div>
</section>
</template>

<script>
import Arrow from './Arrow.vue';

export default {
  name: 'hero',
  components: {
    Arrow,
  },
  mounted() {
    const viewportHeight = window.innerHeight;
    document.getElementById('vh').style.height = `${viewportHeight}px`;
    document.getElementById('overlay').style.height = `${viewportHeight}px`;
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.content {
  padding: 0;
  margin: 15% 1% 0 1%;
}
.full-page {
  display: flex;
  align-items: center;
  justify-content: center;
}
#overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #000;
  opacity: 0.7;
}
.has-background {
  background: url('../assets/images/background.jpeg') center center;
  background-size: cover;
}
.has-text-monospace {
  font-family: 'Overpass Mono', monospace;
}

.fluo-btn {
  background-color: transparent;
  width: 9rem;
  margin: 1rem .5rem;
  padding: .5rem .9rem;
  text-transform: uppercase;
  text-decoration: none;
  color: $nephritis;
  outline: none;
  border: 2px solid $nephritis;
  border-radius: .2rem;
  transition: background-color 0.4s;
  -webkit-transition: background-color 0.4s;
}

.fluo-btn:hover {
  cursor: pointer;
  background: $nephritis;
  color: #151618;
}

@media screen and (max-width: 769px) {
  .fluo-btn {
    width: 6rem;
  }
}
</style>
