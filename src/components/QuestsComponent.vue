<template>
  <div>
    <q-toolbar position="top" class="bg-accent text-white">
      <q-toolbar-title>Ideas</q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator v-if="items.length > 0" class="rounded-borders text-primary">
      <q-item clickable v-ripple v-for="item in items" :key="item.id" @click="show(item)">
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>{{ item.name }}</q-item-section>
      </q-item>
    </q-list>
    <p v-else class="text-body1 text-center">... nothing ...</p>
  </div>
</template>

<script>
export default {
  name: "QuestsComponent",
  computed: {
    items: {
      get () {
        return this.$store.state.quests.items
      }
    }
  },
  methods: {
    show (item) {
      this.$root.$emit("item:clicked")
      this.$store.dispatch('quests/seen', item.id)
    }
  }
}
</script>

<style lang="stylus">
</style>
