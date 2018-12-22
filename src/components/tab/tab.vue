<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :showSlider=true
      :data="tabs"
      ref:="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        ref="slide"
      >
        <cube-slide-item>
          <goods></goods>
        </cube-slide-item>
        <cube-slide-item>
          <ratings></ratings>
        </cube-slide-item>
        <cube-slide-item>
          <seller></seller>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  import Goods from 'components/goods/goods'
  import Ratings from 'components/ratings/ratings'
  import Seller from 'components/seller/seller'

  export default {
    name: 'tabs',
    data () {
      return {
        index: 0,
        tabs: [{
          label: '商品'
        }, {
          label: '评价'
        }, {
          label: '商家'
        }]
      }
    },
    methods: {
      clickHandler () {
        console.log(1)
      },
      changeHandler () {
        console.log(2)
      }
    },
    computed: {
      selectedLabelDefault: {
        get () {
          return this.tabs[this.index].label
        },
        set (newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    component: {
      Goods,
      Ratings,
      Seller
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
      overflow: hidden
</style>
