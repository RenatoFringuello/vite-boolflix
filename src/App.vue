<script>
  import AppHedaer from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue';

  export default{
    components:{
      AppMain,
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
  <AppMain />
</template>

<style lang="scss">
  @use './style/general.scss' as *;
  @use './style/partials/variables' as *;

</style>
