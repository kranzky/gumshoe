<template>
  <div style="height: calc(100% - 50px);">
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" style="height: 50px;">
      <q-tab name="inventory" icon="work" v-if="show.inventory">
        <q-badge color="negative" floating transparent v-if="badge.inventory > 0">
          {{ badge.inventory }}
        </q-badge>
      </q-tab>
      <q-tab name="notebook" icon="bookmarks" v-if="show.notebook">
        <q-badge color="negative" floating transparent v-if="badge.notebook > 0">
          {{ badge.notebook }}
        </q-badge>
      </q-tab>
      <q-tab name="quests" icon="priority_high" v-if="show.quests">
        <q-badge color="negative" floating transparent v-if="badge.quests > 0">
          {{ badge.quests }}
        </q-badge>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated swipeable transition-prev="slide-right" transition-next="slide-left" style="height: 100%;">
      <q-tab-panel name="inventory" style="padding: 0;" v-if="show.inventory"><drawer title="Inventory" module="inventory" /></q-tab-panel>
      <q-tab-panel name="notebook" style="padding: 0;" v-if="show.notebook"><drawer title="Notebook" module="notebook" /></q-tab-panel>
      <q-tab-panel name="quests" style="padding: 0;" v-if="show.quests"><drawer title="Quests" module="quests" /></q-tab-panel>
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
          inventory: this.$store.getters['inventory/badgeCount'],
          notebook: this.$store.getters['notebook/badgeCount'],
          quests: this.$store.getters['quests/badgeCount']
        }
      }
    },
    show: {
      get () {
        return {
          inventory: this.$store.state.inventory.show,
          notebook: this.$store.state.notebook.show,
          quests: this.$store.state.quests.show
        }
      }
    }
  },
  components: {
    "drawer": () => import("components/DrawerComponent.vue")
  }
}
</script>

<style scoped lang="stylus">
</style>
