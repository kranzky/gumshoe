<template>
  <div>
    <q-toolbar position="top" class="bg-accent text-white">
      <q-toolbar-title>Characters</q-toolbar-title>
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
  name: "PeopleComponent",
  computed: {
    items: {
      get () {
        return this.$store.state.people.items
      }
    }
  },
  methods: {
    show (item) {
      this.$store.dispatch('people/seen', item.id)
    }
  }
}
</script>

<style lang="stylus">
</style>
