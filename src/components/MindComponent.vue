<template>
  <div>
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" >
      <q-tab name="exits" icon="map">
        <q-badge color="negative" floating transparent v-if="badge.exits > 0">
          {{ badge.exits }}
        </q-badge>
      </q-tab>
      <q-tab name="people" icon="groups">
        <q-badge color="negative" floating transparent v-if="badge.people > 0">
          {{ badge.people }}
        </q-badge>
      </q-tab>
      <q-tab name="objects" icon="list">
        <q-badge color="negative" floating transparent v-if="badge.objects > 0">
          {{ badge.objects }}
        </q-badge>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated swipeable transition-prev="slide-left" transition-next="slide-right" style="height: 100%;">
      <q-tab-panel name="exits" style="padding: 0;"><exits /></q-tab-panel>
      <q-tab-panel name="people" style="padding: 0;"><people /></q-tab-panel>
      <q-tab-panel name="objects" style="padding: 0;"><objects /></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "MindComponent",
  data () {
    return {
      tab: 'objects'
    }
  },
  computed: {
    badge: {
      get () {
        return {
          exits: 0,
          objects: 0,
          people: this.$store.getters['people/badgeCount']
        }
      }
    }
  },
  components: {
    "exits": () => import("components/ExitsComponent.vue"),
    "objects": () => import("components/ObjectsComponent.vue"),
    "people": () => import("components/PeopleComponent.vue")
  }
}
</script>

<style lang="stylus">
</style>
