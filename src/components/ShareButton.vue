<template>
  <button class="btn-share" v-on:click="click">
    <label for="">Share</label>
    <div class="btn-share__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" ref="circleSvg"><circle cx="50" cy="50" r="47" stroke="currentColor" fill="none"/></svg>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ShareButton',
  methods: {
    click: function () {
      this.$emit('click')
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.btn-share{
  cursor: pointer;
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0;
  border: none;
  font-size: 1em;

  label{
    font-size: em(12);
    font-weight: 500;
    letter-spacing: em(0.8, 12);
    text-transform: uppercase;
    margin-right: em(25, 12);
    color: #999999;
    display: inline-block;
    cursor: pointer;
  }

  &__icon{
    width: em(60);
    height: em(60);
    margin: 0 em(30) 0 0;
    border-radius: 50%;
    color: #0C1020;
    border: 1px solid #EAEAEC;
    position: relative;
    text-decoration: none;
    font-family: $font_title;
    background: url(../assets/images/icon-share.svg) no-repeat center;
    background-size: auto em(30);

    &:before, &:after{
      content: "";
      display: block;
      position: absolute;
      top: -1px;
      left: -1px;
      width: 100%;
      height: 100%;
      border: 1px solid currentColor;
      border-radius: 50%;
      transform-origin: center;
    }

    &:before{
      transform: scale(1.3);
      opacity: 0.2;
      animation: circle1 1.5s ease-out infinite;
    }

    &:after{
      transform: scale(1.6);
      opacity: 0.05;
      animation: circle2 1.5s ease-out 0.1s infinite;
    }

    &__content{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1em;
      box-sizing: border-box;
    }

    svg{
      position: absolute;
      top: -2.5%;
      left: -2.5%;
      width: 105%;
      height: 105%;
      stroke-width: 1px;
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      transform: rotate(-90deg);
      transition: stroke-dashoffset 0.7s ease-in-out;
    }
  }

  &:hover{
    svg{
      stroke-dashoffset: 0;
    }
  }

  &.light{
    .btn-share__icon{
      color: #FFF;
    }
  }
  &.vertical{
    flex-direction: column-reverse;
    label{
      margin: 0;
      margin-top: em(35);
      font-size: em(14);
    }
    .btn-share__icon{
      margin: 0;
    }
  }
  &.small{
    label{
      display: none;
    }
    .btn-share__icon{
      width: em(40);
      height: em(40);
      margin: 0;
      background-size: auto em(20);

    }
  }
}

@keyframes circle1 {
  0% {
    transform: scale(1.2);
    opacity: 0;
  }
  30% {
    transform: scale(1.3);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

@keyframes circle2 {
  0% {
    transform: scale(1.4);
    opacity: 0;
  }
  50% {
    transform: scale(1.6);
    opacity: 0.05;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
