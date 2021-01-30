<template>
  <q-timeline :layout="layout" color="secondary">
    <q-timeline-entry heading>
      Chapter 1
    </q-timeline-entry>

    <q-timeline-entry
      title="Somewhere?"
      subtitle="Sunday, 11:00 AM"
      side="left"
    >
      <div>
        I emerged somewhere from nothingness. I have no memory of what came
        before, apart from a fleeting vision of utter chaos. Something is very
        wrong.
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>

<script>
export default {
  name: "ReadComponent",
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  }
}
</script>

<style lang="stylus">
</style>
