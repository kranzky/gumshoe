<template>
  <q-timeline :layout="layout" color="secondary">
    <q-timeline-entry v-for="section in sections"
      :key="section.id"
      :heading="section.heading"
      :title="section.name"
      :subtitle="section.date"
      :body="section.body"
      :icon="section.icon"
      :side="alternate(section)"
    />
    <q-resize-observer @resize="onResize" />
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
    }
  },
  data () {
    return {
      width: 0
    }
  },
  methods: {
    onResize (size) {
      this.width = size.width
    },
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
  }
}
</script>

<style scoped lang="stylus">
</style>
