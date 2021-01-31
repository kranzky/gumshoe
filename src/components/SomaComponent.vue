<template>
  <div>
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" >
      <q-tab name="inventory" icon="cases">
        <q-badge color="negative" floating transparent v-if="badge.inventory > 0">
          {{ badge.inventory }}
        </q-badge>
      </q-tab>
      <q-tab name="notebook" icon="bookmark">
        <q-badge color="negative" floating transparent v-if="badge.notebook > 0">
          {{ badge.notebook }}
        </q-badge>
      </q-tab>
      <q-tab name="quests" icon="task">
        <q-badge color="negative" floating transparent v-if="badge.quests > 0">
          {{ badge.quests }}
        </q-badge>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated swipeable transition-prev="slide-right" transition-next="slide-left" style="height: 100%;">
      <q-tab-panel name="inventory" style="padding: 0;"><inventory /></q-tab-panel>
      <q-tab-panel name="notebook" style="padding: 0;"><notebook /></q-tab-panel>
      <q-tab-panel name="quests" style="padding: 0;"><quests /></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "SomaComponent",
  data () {
    return {
      tab: 'inventory'
    }
  },
  computed: {
    badge: {
      get () {
        return {
          inventory: 0,
          notebook: 0,
          quests: this.$store.getters['quests/badgeCount']
        }
      }
    }
  },
  components: {
    "inventory": () => import("components/InventoryComponent.vue"),
    "notebook": () => import("components/NotebookComponent.vue"),
    "quests": () => import("components/QuestsComponent.vue")
  }
}
</script>
