<template>
  <div>
    <landing></landing>
    <searchbar></searchbar>
    <signal-list></signal-list>
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from '@/components/Landing.vue';
import Searchbar from '@/components/Searchbar.vue';
import SignalList from '@/components/SignalList.vue';

export default {
  name: 'home',
  components: {
    Landing,
    Searchbar,
    SignalList,
  },
};
</script>

<style>

</style>
