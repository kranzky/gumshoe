<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "gumshoe",
  mounted() {
    this.$q.dark.set(true)
    this.$store.dispatch("people/clear")
    this.$store.dispatch("people/items", { id: 1, name: 'Limbic System', icon: 'person', seen: false })
    this.$store.dispatch("quests/clear")
    this.$store.dispatch("quests/items", { id: 1, name: 'Wake Up!', icon: 'emoji_events', seen: false })
  }
};
</script>

<style></style>
