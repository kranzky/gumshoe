<template>
  <div style="height: calc(100% - 48px);">
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" >
      <q-tab name="inventory" icon="work">
        <q-badge color="negative" floating transparent v-if="badge.inventory > 0">
          {{ badge.inventory }}
        </q-badge>
      </q-tab>
      <q-tab name="notebook" icon="cloud">
        <q-badge color="negative" floating transparent v-if="badge.notebook > 0">
          {{ badge.notebook }}
        </q-badge>
      </q-tab>
      <q-tab name="quests" icon="lightbulb">
        <q-badge color="negative" floating transparent v-if="badge.quests > 0">
          {{ badge.quests }}
        </q-badge>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated swipeable transition-prev="slide-right" transition-next="slide-left" style="height: 100%;">
      <q-tab-panel name="inventory" style="padding: 0;"><drawer title="Possessions" module="quests" /></q-tab-panel>
      <q-tab-panel name="notebook" style="padding: 0;"><drawer title="Thoughts" module="quests" /></q-tab-panel>
      <q-tab-panel name="quests" style="padding: 0;"><drawer title="Ideas" module="quests" /></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "PlayerComponent",
  data () {
    return {
      tab: 'inventory'
    }
  },
  computed: {
    badge: {
      get () {
        return {
          inventory: this.$store.getters['quests/badgeCount'],
          notebook: this.$store.getters['quests/badgeCount'],
          quests: this.$store.getters['quests/badgeCount']
        }
      }
    }
  },
  components: {
    "drawer": () => import("components/DrawerComponent.vue")
  }
}
</script>
