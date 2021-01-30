<template>
  <div>
    <q-toolbar position="top" class="bg-accent text-white">
      <q-toolbar-title>Characters</q-toolbar-title>
    </q-toolbar>
    <q-list bordered padding class="rounded-borders text-primary">
      <q-item>
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>Limbic System</q-item-section>
        <q-btn size="12px" flat dense round icon="more_vert" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "PeopleComponent"
}
</script>

<style lang="stylus">
</style>
