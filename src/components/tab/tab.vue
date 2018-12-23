<template>
  <!-- useTransition false 禁止调用默认的transition -->
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabelDefault"
    :useTransition=false
    :showSlider=true
    :data="tabs"
    ref="tabBar"
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
        @change="onChange"
        @scroll="onScroll"
        :options="slideOptions"
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
  import Goods from '../goods/goods'
  import Ratings from '../ratings/ratings'
  import Seller from '../seller/seller'

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
        }],
        slideOptions: {
          listenScroll: true,
          probeType: 3
        }
      }
    },
    methods: {
      // 需要和头部联动
      //
      onChange (current) {
        console.log(current)
        this.index = current
      },
      onScroll (pos) {
        // 设置滚动的距离
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
        console.log(this.$refs.tabBar)
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
    components: {
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
