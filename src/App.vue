<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
      <!-- 可扩展 选择初始页面:initialIndex=1-->
    </div>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import { getSeller } from 'api'
  import Goods from 'components/goods/goods'
  import Ratings from 'components/ratings/ratings'
  import Seller from 'components/seller/seller'
  import Tab from 'components/tab/tab'
  import qs from 'query-string'

  export default {
    name: 'app',
    data () {
      return {
        seller: {
          id: qs.parse(location.search).id
        }
      }
    },
    computed: {
      tabs () {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              seller: this.seller
            }
          },
          {
            label: '评价',
            component: Ratings,
            data: {
              seller: this.seller
            }
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller
            }
          }
        ]
      }
    },
    created () {
      this._getSeller()
    },
    methods: {
      _getSeller () {
        getSeller({
          id: this.seller.id
        }).then((seller) => {
          // 这里seller 发生了改变 以后取id 因为属性没有id所以取不到
          this.seller = seller
          console.log('数据请求成功')
        })
      }
    },
    components: {
      VHeader,
      Tab
    }
  }
</script>

<style lang="stylus" sroped>
  /*
  scoped 属性是一个布尔属性。
  如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素。
  */
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
