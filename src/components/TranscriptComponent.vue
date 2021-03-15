<template>
  <q-timeline :layout="layout" color="secondary">
    <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-timeline-entry v-for="section in sections"
        :key="section.id"
        :heading="section.heading"
        :title="section.title"
        :subtitle="section.subtitle"
        :body="section.body"
        :icon="section.icon"
        :side="alternate(section)"
      />
    </transition-group>
  </q-timeline>
</template>

<script>
export default {
  name: "TranscriptComponent",
  computed: {
    layout () {
      return (this.width <= 540) ? 'dense' : (this.width <= 720) ? 'comfortable' : 'loose'
    },
    sections: {
      get () {
        return this.$store.state.transcript.items
      }
    },
    width: {
      get () {
        return this.$store.state.page.width
      }
    }
  },
  methods: {
    alternate (section) {
      if (section.heading) {
        this.flip = false
      }
      this.flip = !this.flip
      return this.flip ? "right" : "left"
    }
  },
  mounted () {
    this.$store.dispatch("transcript/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("transcript/seen")
  }
}
</script>

<style scoped lang="stylus">
</style>
