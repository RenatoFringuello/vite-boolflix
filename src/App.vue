<script>
  import AppHedaer from './components/AppHedaer.vue';
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
  @use './style/general.scss' as *

</style>
