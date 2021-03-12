<template>
  <transition-group appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" style="--animate-duration: 0.5s;">
    <q-chip icon="today" color="primary" v-if="show.time" key="1">{{ status.time }}</q-chip>
    <q-chip icon="home" color="primary" v-if="show.location" key="2">{{ status.location }}</q-chip>
    <q-chip icon="face" color="primary" v-if="show.player" key="3">{{ status.player }}</q-chip>
    <q-chip icon="star" color="primary" v-if="show.score" key="4">{{ status.score }}</q-chip>
  </transition-group>
</template>

<script>
export default {
  name: "StatusComponent",
  computed: {
    status: {
      get () {
        return {
          time: this.$store.state.status.time,
          player: this.$store.state.status.player,
          location: this.$store.state.status.location,
          score: this.$store.state.status.score
        }
      }
    },
    show: {
      get () {
        return {
          time: this.$store.getters['status/showTime'],
          player: this.$store.getters['status/showPlayer'],
          location: this.$store.getters['status/showLocation'],
          score: this.$store.getters['status/showScore']
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
