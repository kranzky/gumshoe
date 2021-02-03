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
    }
  },
  data () {
    return {
      width: 0,
      sections: [
        {
          id: 1,
          heading: true,
          body: 'Chapter 1'
        },
        {
          id: 2,
          name: "First Thing",
          date: "Sunday, 11:00",
          body: "Some long sentence. Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz."
        },
        {
          id: 3,
          name: "Second Thing",
          date: "Sunday, 15:00",
          icon: "face",
          body: "Another long sentence."
        },
        {
          id: 4,
          heading: true,
          body: 'Chapter 2'
        },
        {
          id: 5,
          name: "Third Thing",
          date: "Monday, 7:00",
          body: "Drank some covfefe. Felt great."
        },
        {
          id: 6,
          heading: true,
          body: 'Chapter 3'
        },
        {
          id: 7,
          name: "First Thing",
          date: "Sunday, 11:00",
          body: "Some long sentence."
        },
        {
          id: 8,
          name: "Second Thing",
          date: "Sunday, 15:00",
          icon: "face",
          body: "Some long sentence. Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz."
        },
        {
          id: 9,
          heading: true,
          body: 'Chapter 4'
        },
        {
          id: 10,
          name: "Third Thing",
          date: "Monday, 7:00",
          body: "Drank some covfefe. Felt great."
        }
      ]
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
  }
}
</script>

<style scoped lang="stylus">
</style>
