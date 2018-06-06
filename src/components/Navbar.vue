<template>
<nav class="navbar is-transparent">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="">
        <h1 class="subtitle has-text-light">Signals</h1>
      </a>
      <div
        class="navbar-burger burger"
        data-target="menu"
        @click="toggleMenu"
        :class="{'is-active': isNavActive}">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="menu" class="navbar-menu" :class="{'is-active': isNavActive}">
      <div class="navbar-start">
      </div>
      <div class="navbar-end">
        <a class="navbar-item has-text-light" href="">Home</a>
        <a class="navbar-item has-text-light" href="">Gems</a>
        <a class="navbar-item has-text-light" href="">What is this?</a>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      isNavActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isNavActive = !this.isNavActive;
    },
  },
};
</script>


<style lang="scss" scoped>
</style>

