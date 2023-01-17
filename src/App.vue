<script>
  import AppHedaer from './components/AppHeader.vue';
  import AppHome from './components/AppHome.vue';

  export default{
    components:{
      AppHome,
      AppHedaer
    },
    data() {
      return {
        activePage : 0,
      }
    },
    methods:{
        openPage(index){
          this.activePage = index;
        }
    }
  }
</script>

<template>
  <div>
    <AppHedaer @openPage="openPage"/>
    <main>
      <AppHome v-if="this.activePage == 0" />
      <h1 v-else-if="this.activePage == 1">1</h1>
      <h1 v-else="this.activePage == 2">2</h1>
    </main>
  </div>
</template>

<style lang="scss">
  @use './style/general.scss' as *;
  @use './style/partials/variables' as *;

</style>
