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

      }
    },
    methods:{
      
    }
  }
</script>

<template>
  <AppHedaer />
  <AppHome />
</template>

<style lang="scss">
  @use './style/general.scss' as *;
  @use './style/partials/variables' as *;

</style>
