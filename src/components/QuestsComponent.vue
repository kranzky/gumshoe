<template>
  <div>
    <q-toolbar position="top" class="bg-accent text-white">
      <q-toolbar-title>Desires</q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator class="rounded-borders text-primary">
      <q-item clickable v-ripple v-for="item in items" :key="item.id">
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>{{ item.name }}</q-item-section>
      </q-item>
    </q-list>
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
  }
}
</script>

<style lang="stylus">
</style>
