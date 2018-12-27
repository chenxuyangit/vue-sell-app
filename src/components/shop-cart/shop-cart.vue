<template>
  <div>
    <div class="shopcart">
      <!--点击shopcart组件 出现购物清单-->
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">
              <bubble :num="totalCount"></bubble>
            </div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <!-- 隐藏的小球-->
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop"
          >
            <div class="ball" v-show="ball.show">
              <!--这里是小球运动的位置-->
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bubble from 'components/bubble/bubble'

  // 小球数量
  const BALL_LEN = 10

  const innerClsHook = 'inner-hook'

  // 初始化小球
  function createBalls () {
    let balls = []
    for (let i = 0; i < BALL_LEN; i++) {
      balls.push({ show: false })
    }
    return balls
  }

  export default {
    name: 'shop-cart',
    props: {
      // 选择商品
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      // 配送费
      deliveryPrice: {
        type: Number,
        default: 0
      },
      // 到货最小金额
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: createBalls()
      }
    },
    created () {
      this.dropBalls = []
      this.listFold = true
    },
    computed: {
      // 计算总金额
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      // 计算商品总数
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      // 判断还差多少前可以结算
      payDesc () {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差¥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      // 结算状态点亮
      payClass () {
        if (!this.totalCount || this.totalCount < this.minPrice) {
          return 'no-enough'
        } else {
          return 'enough'
        }
      }
    },
    methods: {
      // 切换
      toggleList () {
        if (this.listFold) {
          if (!this.totalCount) {
            return
          }
          this.listFold = false
          this._showShopCartList()
        } else {
          this.listFold = true
          this._hideShopCartList()
        }
      },
      _showShopCartList () {
        this.shopCartList = this.shopCartList || this.$createShopCartList({
          $props: {
            selectFoods: 'selectFoods'
          },
          // 订阅事件
          $events: {
            hide: () => {
              // 箭头函数保留上下文
              this.listFold = true
            }
          }
        })
        // this.shopCartList 这个时候就像是API调用一样 可以直接调用
        this.shopCartList.show()
      },
      _hideShopCartList () {
        this.shopCartList.hide()
      },
      // ----------------------
      // 保存小球的状态
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          const ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            // 跳出循环 这个可以让一个小球持续掉落
            return
          }
        }
      },
      // 不太清楚translate的运行方式
      beforeDrop (el) {
        const ball = this.dropBalls[this.dropBalls.length - 1]
        // 获取x,y偏移量 getBoundingClientRect是object对象
        const rect = ball.el.getBoundingClientRect()
        const x = rect.left - 32
        const y = -(window.innerHeight - rect.top - 22)
        el.style.display = ''
        el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      },
      dropping (el, done) {
        this._reflow = document.body.offsetHeight
        el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
        el.addEventListener('transitionend', done)
      },
      afterDrop (el) {
        const ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    },
    components: {
      Bubble
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .shopcart
    height: 100%
    .content
      display: flex
      background: $color-background
      font-size: 0
      color: $color-light-grey
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: $color-background
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: $color-dark-grey
            &.highlight
              background: $color-blue
            .icon-shopping_cart
              line-height: 44px
              font-size: $fontsize-large-xxx
              color: $color-light-grey
              &.highlight
                color: $color-white
          .num
            position: absolute
            top: 0
            right: 0
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-weight: 700
          font-size: $fontsize-large
          &.highlight
            color: $color-white
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: $fontsize-small-s
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-weight: 700
          font-size: $fontsize-small
          &.not-enough
            background: $color-dark-grey
          &.enough
            background: $color-green
            color: $color-white
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50px
          background: $color-blue
          transition: all 0.4s linear
</style>
