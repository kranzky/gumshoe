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

//  this.$store.dispatch("places/clear")
//  this.$store.dispatch("places/items", { id: 1, name: 'Chaos', icon: 'place' })
//  this.$store.dispatch("places/items", { id: 2, name: 'Nothingness.', icon: 'place' })
//  this.$store.dispatch("places/items", { id: 3, name: 'Somewhere?', icon: 'place' })

    this.$store.dispatch("people/clear")
    this.$store.dispatch("people/items", { id: 1, name: 'Limbic System 1', icon: 'face', seen: false })

//  this.$store.dispatch("objects/clear")
//  this.$store.dispatch("objects/items", { id: 1, name: 'Desk', icon: 'label' })
//  this.$store.dispatch("objects/items", { id: 2, name: 'Chair', icon: 'label' })

//  this.$store.dispatch("inventory/clear")
//  this.$store.dispatch("inventory/items", { id: 1, name: 'Gun', icon: 'label' })

//  this.$store.dispatch("notebook/clear")
//  this.$store.dispatch("notebook/items", { id: 1, name: 'Hat', icon: 'label' })
//  this.$store.dispatch("notebook/items", { id: 2, name: 'Office', icon: 'place' })
//  this.$store.dispatch("notebook/items", { id: 3, name: 'Gloria', icon: 'face' })

    this.$store.dispatch("quests/clear")
    this.$store.dispatch("quests/items", { id: 1, name: 'Wake Up!', icon: 'task', seen: false })

//  this.$store.dispatch("transcript/clear")

//  this.$store.dispatch("viewport/clear")
//  this.$store.dispatch("viewport/object", { id: 1, name: "Nothingness." })
//  this.$store.dispatch("viewport/text", { body: "A lingering memory of chaos intrudes upon the void." })
//  this.$store.dispatch("viewport/choice", { id: 1, name: "What is there to do but wait?" })

//  this.$store.dispatch("dialogue/clear")
  }
};
</script>

<style></style>
