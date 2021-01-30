<template>
  <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" >
    <q-tab name="stuff" icon="cases" />
    <q-tab name="notes" icon="bookmarks" />
    <q-tab name="cases" icon="task" />
  </q-tabs>
</template>

<script>
export default {
  name: "SomaComponent"
}
</script>

<style lang="stylus">
</style>
