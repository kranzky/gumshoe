<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <h4>{{ title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskComponent",
  computed: {
    title: {
      get () {
        return this.$store.state.task.title
      }
    }
  },
  mounted () {
    this.$store.dispatch("task/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("task/seen")
  }
}
</script>

<style scoped lang="stylus">
</style>
