
 
 <!--弹窗组件-->
<template>
  <div class="wrapper" v-show="isShow">
    <div class="content">
      <section v-if="type === 0" class="tip-div" @touchmove.stop.prevent  >
        <div class="text" :style="tipTextStyle">{{ $t(textOptions.content) }}</div>
        <div class="btn" @click="okClick">{{ $t(textOptions.leftBtn) }}</div>
      </section>
      <section v-else-if="type === 1" class="confirm-div" @touchmove.stop.prevent  >
        <div class="text" :style="confirmTextStyle">{{ $t(textOptions.content) }}</div>
        <div class="btn-div">
          <span class="left-btn" @click="leftBtnClick">{{ $t(textOptions.leftBtn) }}</span>
          <span class="right-btn" @click="rightBtnClick">{{ $t(textOptions.rightBtn) }}</span>
        </div>
      </section>
      <section v-else @touchmove="touchMove" @touchstart="touchStart" ref="selfDefPopBox" >
        <slot></slot>
      </section>
    </div>
    <div class="mask" @touchmove.stop.prevent @click="maskClick"></div>
  </div>
</template>
<script>
  import Utils from '../../../src/utils/utils'
  export default {
    name: 'ElDialog',
    props: {
      // 是否弹窗
      isShow: {
        type: Boolean,
        default () {
          return false
        }
      },
      // 弹窗类型 0: 单个按钮提示框，1：两个按钮确认框，-1：自定义框（默认）
      type: {
        type: Number,
        default () {
          return -1
        }
      },
      // 内容选项
      textOptions: {
        type: Object,
        default () {
          return {
            content: '',
            leftBtn: 'cancel',
            rightBtn: 'sure'
          }
        }
      },
      // 提示框文本自定义样式
      tipTextStyle: {
        type: Object,
        default () {
          return {
          }
        }
      },
      // 确认框自定义样式
      confirmTextStyle: {
        type: Object,
        default () {
          return {
          }
        }
      },
      dom: {
        type: String 
      }
    },
    data() {
      return {
        clientY: '',
        firstY: ''
      }
    },
    methods: {
      okClick () {
        this.$emit('okClick')
      },
      leftBtnClick () {
        this.$emit('leftBtnClick')
      },
      rightBtnClick () {
        this.$emit('rightBtnClick')
      },
      maskClick () {
        this.$emit('maskClick')
      },
      touchMove (e) {
        this.clientY = e.targetTouches[0].clientY
        if (!this.dom && !this.$refs.selfDefPopBox.firstElementChild) return
        Utils.preventTouchScroll(e, this.firstY, this.clientY, document.getElementById(this.dom) || this.$refs.selfDefPopBox.firstElementChild)
      },
      touchStart (e) {
        this.firstY = e.targetTouches[0].clientY
      }
    },
    created() {},
  }
</script>
<style scoped lang='scss'>
  @import "../../../src/style/variable.scss";
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9997;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-weight: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      position: fixed;
      z-index: 9999;
      background-color: #fff;
      text-align: left;
      font-size: .16rem;
      border-radius: .13rem;
    
      .tip-div {
        width: 2.7rem;
        .text {
          padding: .3rem .2rem;
          text-align: center;
          font-family: Helvetica;
          font-size: .17rem;
          color: #000000;
          letter-spacing: 0;
          text-align: center;
          line-height: .22rem;
        }
        .btn {
          border-top: solid 1px $border-color;
          height: .44rem;
          line-height: .44rem;
          color: $theme-color;
          text-align: center;
          font-size: .17rem;
          font-family: Helvetica;
        }
      }
      .confirm-div {
        width: 2.7rem;
        .text {
          text-align: center;
          padding: .3rem .2rem;
          font-size: .17rem;
          color: #000000;
          letter-spacing: 0;
          text-align: center;
          line-height: .22rem;
        }
        .btn-div {
          border-top: solid 1px $border-color;
          height: .44rem;
          line-height: .44rem;
          text-align: center;
          font-size: .17rem;
          position: relative;
          font-family: Helvetica;
          .left-btn {
            display: inline-block;
            width: 50%;
            color: #000000;
            border-right: solid 1px $border-color;
            box-sizing: border-box;
          }
          .right-btn {
            display: inline-block;
            width: 50%;
            color: $theme-color;
          }
        }
      }
    }
    .mask {
      position: fixed;
      z-index: 9998;
      width: 100%;
      height: 100%;
      opacity: 0.48;
      background-color: #000000;
    }
  }
</style>
