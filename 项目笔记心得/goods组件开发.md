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

