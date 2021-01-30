<template>
  <div>
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" >
      <q-tab name="stuff" icon="cases" />
      <q-tab name="notes" icon="bookmarks" />
      <q-tab name="cases" icon="task" />
    </q-tabs>
    <q-tab-panels v-model="tab" style="height: 100%;">
      <q-tab-panel name="stuff"><stuff /></q-tab-panel>
      <q-tab-panel name="notes"><notes /></q-tab-panel>
      <q-tab-panel name="cases"><cases /></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "SomaComponent",
  data () {
    return {
      tab: 'stuff'
    }
  },
  components: {
    "stuff": () => import("components/InventoryComponent.vue"),
    "notes": () => import("components/NotebookComponent.vue"),
    "cases": () => import("components/QuestsComponent.vue")
  }
}
</script>
