<template>
  <div class="story-dropdown" :class="{opened: toggleDropdown}">
    <label for="" class="story-dropdown__selected" v-on:click="toggleDropdown = !toggleDropdown">{{$root.dataStory.name}}</label>
    <ul class="story-dropdown__options" v-show="toggleDropdown">
      <li v-for="item in stories" :class="{active: item === $root.dataStory.name}" :key="item">
        <a v-on:click="changeStory(item)">
          <figure>
            <svg :viewBox="viewBox(item)"><use :xlink:href="mapPath(item)"></use></svg>
          </figure>
          <span>{{item}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StoryDropdown',
  data () {
    return {
      toggleDropdown: false,
      stories: ['Liberia', 'Haiti', 'Kenya']
    }
  },
  methods: {
    changeStory: function (selectedStory) {
      var data = require('../assets/data/data.json')
      var stories = {'Haiti': 'HTI', 'Liberia': 'LBR', 'Kenya': 'KEN'}
      var storyCountry = stories[selectedStory]
      this.$root.dataStory = {name: data[storyCountry].name, number: data[storyCountry].number}
      this.toggleDropdown = false
      this.orderMenu()
    },
    mapPath: function (name) {
      var src = require('../assets/images/maps.svg')

      return src + '#' + name + '-filled'
    },
    viewBox: function (name) {
      switch (name) {
        case 'Haiti':
          return '0 0 237 165'
        case 'Liberia':
          return '0 0 190 197'
        case 'Kenya':
          return '0 0 132 158'
      }
    },
    orderMenu: function () {
      this.$root.menuOrder = ['/', '/map']

      if (this.$root.dataStory.name === 'Liberia') {
        this.$root.menuOrder.push('/liberia', '/haiti', '/kenya')
      } else if (this.$root.dataStory.name === 'Haiti') {
        this.$root.menuOrder.push('/haiti', '/liberia', '/kenya')
      } else if (this.$root.dataStory.name === 'Kenya') {
        this.$root.menuOrder.push('/kenya', '/liberia', '/haiti')
      }

      this.$root.menuOrder.push('/closing')
    }
  }
}
</script>

<style lang="scss" scoped>
.story-dropdown{
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 1em;
  font-family: $font_title;
  display: inline-block;
  position: relative;

  &__selected{
    display: inline-block;
    color: $color1;
    padding-right: em(10, 50);
    position: relative;
    cursor: pointer;

    &:before{
      content: "";
      display: block;
      width: calc(100% - 0.4em);
      height: 1px;
      background-color: $color1;
      position: absolute;
      bottom: em(5, 50);
      left: 0;
      transform: scale(0, 1);
      transition: transform 0.3s ease-in-out;
    }

    &:after{
      content: "";
      display: inline-block;
      width: em(10, 50);
      height: em(14, 50);
      background: url(../assets/images/arrow-dropdown.svg) no-repeat center;
      background-size: contain;
      vertical-align: middle;
      margin-left: em(5, 50);
    }

    &:hover{
      &:before{
        transform: scale(1, 1);
      }
    }
  }

  &.opened{
    .story-dropdown__selected{
      &:before{
        transform: scale(1, 1);
      }
    }
  }

  &__options{
    font-size: em(30, 50);
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #fff;
    padding: em(40, 30);
    box-shadow: 0 5px 10px 0 rgba(181,181,181,0.50);
    border-radius: em(10, 50);

    li{
      display: block;
      color: #0C1020;

      &:not(:last-child){
        margin-bottom: em(25, 50);
      }

      a{
        cursor: pointer;
        display: flex;
        text-decoration: none;
        color: currentColor;

        figure{
          height: 1em;
          width: 1em;
          margin-right: em(10, 30);
          display: flex;
          align-items: center;
          svg{
            height: 100%;
            width: 100%;
          }
        }

        span{
          line-height: 1em;
          color: currentColor;
        }
      }

      &:not(.active){
        opacity: 0.2;
      }
    }
  }
}
</style>
