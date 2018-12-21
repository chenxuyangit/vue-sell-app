<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import { getSeller } from 'api'

  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this._getSeller()
    },
    methods: {
      _getSeller () {
        getSeller().then((seller) => {
          this.seller = seller
          console.log('数据请求成功')
        })
      }
    },
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
