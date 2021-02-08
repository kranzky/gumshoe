<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <h4>{{ title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemComponent",
  computed: {
    title: {
      get () {
        return this.$store.state.item.title
      }
    }
  },
  mounted () {
    this.$store.dispatch("item/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("item/seen")
  }
}
</script>

<style scoped lang="stylus">
</style>
