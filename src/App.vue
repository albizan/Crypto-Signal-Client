<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700|Overpass+Mono:300');

#app {
  font-family: 'Open Sans', 'Avenir', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
