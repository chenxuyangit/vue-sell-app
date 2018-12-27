# 遇到问题解决

### class=icon***无法显示的问题？

> 要在main.js中加载静态资源

### 如何向响应式对象添加属性

> Vue.set( target, key, value )
 它必须用于向响应式对象上添加新属性，
 因为 Vue 无法探测普通的新增属性

### 关于transition 动画的问题

```
<transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

&.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
```

### getBoundingClientRect

```
//shop-cart
     const ball = this.dropBalls[this.dropBalls.length - 1]
            // 获取x,y偏移量 getBoundingClientRect是object对象
            const rect = ball.el.getBoundingClientRect()
            const x = rect.left - 32
```
>  getBoundingClientRect用于获取某个元素相对于视窗的位置集合

### 小球过度动画实现

思路：在shop-cart控件内 有数个小球
     当在shop控件上点击按钮的时候触发事件
     小球从初始位置到被点击的位置
     点击后 过渡动画到初始位置

