<template>
  <div class="close-btn">
    <button class="close-btn__button" ref="button" v-on:click="toggle">
      <span>close</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CloseButton',
  data () {
    return {
      limit: 0
    }
  },
  methods: {
    toggle: function () {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.close-btn{
  padding: em(30);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;

  &__button{
    font-size: 1em;
    cursor: pointer;
    background: none;
    padding: 0;
    border: 0;
    width: em(76);
    height: em(76);
    border-radius: 50%;
    border: 1px solid #979797;

    span{
      display: block;
      font-size: em(18);
      line-height: em(60, 18);
      width: em(60, 18);
      height: em(60, 18);
      color: #FFF;
      position: absolute;
      top: calc(50% - 1.65em);
      left: calc(50% - 1.65em);
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    font-size: em(12);
  }
}
</style>
