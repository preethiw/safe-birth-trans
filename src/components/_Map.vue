<template>
  <main class="wrap" :class="{menuOpened: $root.menuOpened}">
    <map-statistics></map-statistics>
  </main>
</template>

<script>
import MapStatistics from './MapStatistics.vue'

export default {
  name: 'Map',
  data () {
    return {
    }
  },
  created () {
    if (this.$root.women === null) {
      this.$root.women = 0
    }
  },
  components: {
    MapStatistics
  }
}
</script>

<style lang="scss">

</style>
