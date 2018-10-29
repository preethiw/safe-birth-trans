<template>
  <div class="scroll-down">
    <div class="scroll-down__control">
      <i class="icon-mouse"></i>
      <p>Scroll Down</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollDown',
  data () {
    return {
      text: {
        'en': 'Scroll down',
        'fr': 'Faire défiler vers le bas'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-down{
  color: #BCBCBC;

  &__control{
    animation: scroll 1s ease-out infinite alternate;
    position: relative;

    /*&:before{
      content: "";
      display: block;
      height: em(25);
      width: 1px;
      background-color: currentColor;
      margin: 0 auto;
    }*/

    i{
      /*position: absolute;
      bottom: 0;
      left: 50%;*/
      /*transform: translate(-48%, -1px) rotate(45deg);*/
      display: block;
      width: em(20);
      height: em(25);
      background: url(../assets/images/arrow-down.svg) no-repeat center;
      background-size: contain;
      /*border-bottom: 1px solid currentColor;
      border-right: 1px solid currentColor;*/
    }
    p{
      display: none;
    }
    @media screen and (max-width: $mobile-breakpoint) {
      animation-iteration-count: 3;
    }
  }
}

@keyframes scroll{
  0% {
    transform: translateY(-20%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes scroll-line {
  0% {
   transform: translateY(-20%);
   opacity: 1;
  }
  1% {
   transform: translateY(-20%);
   opacity: 1;
  }
  30% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(0);
    opacity: 1;
  }
  99%{
    opacity: 0;
    transform: translateY(20%);
  }
  100%{
    opacity: 0;
    transform: translateY(20%);
  }
}
</style>
