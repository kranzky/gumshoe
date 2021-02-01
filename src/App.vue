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
//  this.$store.dispatch("people/clear")
//  this.$store.dispatch("people/items", { id: 1, name: 'Limbic System', icon: 'person' })
//  this.$store.dispatch("quests/clear")
//  this.$store.dispatch("quests/items", { id: 1, name: 'Wake Up!', icon: 'emoji_events' })
//  this.$store.dispatch("game/clear")
//  this.$store.dispatch("game/object", { id: 1, name: "Nothingness." })
//  this.$store.dispatch("game/text", { body: "A lingering memory of chaos intrudes upon the void." })
//  this.$store.dispatch("game/choice", { id: 1, name: "What is there to do but wait?" })
  }
};
</script>

<style></style>
