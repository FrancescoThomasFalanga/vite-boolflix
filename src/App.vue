<script>
import {store} from './store.js';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

export default {
  data() {
    return {
      store,
    }
  },

  components: {
    AppHeader,
    AppMain,
  },

}

</script>


<template>
  <div>

    <AppHeader v-if="!store.APIcallTrending == '' && store.isHome == 0"></AppHeader>

    <AppMain></AppMain>
    
  </div>
</template>


<style scoped>

</style>
