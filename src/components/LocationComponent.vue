<template>
  <div style="height: calc(100% - 50px);">
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" style="height: 50px;" transition-show="jump-down">
      <q-tab name="places" icon="map" v-if="show.places">
        <q-badge color="negative" floating transparent v-if="badge.places > 0">
          {{ badge.places }}
        </q-badge>
      </q-tab>
      <q-tab name="people" icon="groups" v-if="show.people">
        <q-badge color="negative" floating transparent v-if="badge.people > 0">
          {{ badge.people }}
        </q-badge>
      </q-tab>
      <q-tab name="objects" icon="category" v-if="show.objects">
        <q-badge color="negative" floating transparent v-if="badge.objects > 0">
          {{ badge.objects }}
        </q-badge>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated swipeable transition-prev="slide-right" transition-next="slide-left" style="height: 100%;">
      <q-tab-panel name="places" style="padding: 0;" v-if="show.places"><drawer title="Exits" module="places" empty="There is nowhere to go."/></q-tab-panel>
      <q-tab-panel name="people" style="padding: 0;" v-if="show.people"><drawer title="NPCs" module="people" empty="There is nobody here."/></q-tab-panel>
      <q-tab-panel name="objects" style="padding: 0;" v-if="show.objects"><drawer title="Items" module="objects" empty="There is nothing here."/></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "LocationComponent",
  data () {
    return {
      tab: 'objects'
    }
  },
  computed: {
    badge: {
      get () {
        return {
          places: this.$store.getters['places/badgeCount'],
          people: this.$store.getters['people/badgeCount'],
          objects: this.$store.getters['objects/badgeCount']
        }
      }
    },
    show: {
      get () {
        return {
          places: this.$store.state.places.show,
          people: this.$store.state.people.show,
          objects: this.$store.state.objects.show
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
