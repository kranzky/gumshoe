<template>
  <div>
    <q-toolbar position="top" class="bg-accent text-white">
      <q-toolbar-title>Desires</q-toolbar-title>
    </q-toolbar>
    <q-list bordered class="rounded-borders text-primary">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="emoji_events" />
        </q-item-section>
        <q-item-section>Wake Up!</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "QuestsComponent"
}
</script>

<style lang="stylus">
</style>
