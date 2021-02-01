<template>
  <div style="height: calc(100% - 48px);">
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
      <q-tab name="objects" icon="category">
        <q-badge color="negative" floating transparent v-if="badge.objects > 0">
          {{ badge.objects }}
        </q-badge>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated swipeable transition-prev="slide-right" transition-next="slide-left" style="height: 100%;">
      <q-tab-panel name="exits" style="padding: 0;"><drawer title="Locations" module="people" /></q-tab-panel>
      <q-tab-panel name="people" style="padding: 0;"><drawer title="People" module="people" /></q-tab-panel>
      <q-tab-panel name="objects" style="padding: 0;"><drawer title="Objects" module="people" /></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "WorldComponent",
  data () {
    return {
      tab: 'objects'
    }
  },
  computed: {
    badge: {
      get () {
        return {
          exits: this.$store.getters['people/badgeCount'],
          objects: this.$store.getters['people/badgeCount'],
          people: this.$store.getters['people/badgeCount']
        }
      }
    }
  },
  components: {
    "drawer": () => import("components/DrawerComponent.vue")
  }
}
</script>

<style lang="stylus">
</style>
