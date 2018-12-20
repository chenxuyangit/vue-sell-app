<template>
  <div id="app">
    <v-header></v-header>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'

  export default {
    name: 'app',
    components: {
      VHeader
    }
  }
</script>

<style lang="stylus" sroped>
  /*
  scoped 属性是一个布尔属性。
  如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素。
  */
</style>
