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
        <!--抽象tab组件 -->
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'tabs',
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
      // 可以扩展初始显示页面
      initialIndex: {
        type: Number,
        default: 2
      }
    },
    data () {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3
        }
      }
    },
    methods: {
      // 需要和头部联动
      onChange (current) {
        // console.log(current)
        this.index = current
      },
      onScroll (pos) {
        // 设置滚动的距离
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
        // console.log(this.$refs.tabBar)
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
