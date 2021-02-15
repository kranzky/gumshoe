<template>
  <q-list dense>
    <q-item clickable v-for="object in objects" :key="object.id" @click="nav(object)" class="text-secondary">
      <q-item-section avatar>
        <q-icon name="label" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ object.name }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-for="npc in npcs" :key="npc.id" @click="nav(npc)" class="text-secondary">
      <q-item-section avatar>
        <q-icon name="face" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ npc.name }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-for="exit in exits" :key="exit.id" @click="nav(exit)" class="text-secondary">
      <q-item-section avatar>
        <q-icon name="place" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ exit.name }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "OptionComponent",
  props: {
    id: {
      default: null
    },
    showPeople: {
      default: false
    },
    showPlaces: {
      default: false
    }
  },
  methods: {
    nav (crumb) {
      this.$root.$emit("game:view", crumb)
    }
  },
  computed: {
    objects: {
      get () {
        return _.filter(this.$store.state.objects.items, (item) => {
          return item.id != this.id
        })
      }
    },
    npcs: {
      get () {
        return _.filter(this.$store.state.people.items, (item) => {
          return this.showPeople && item.id != this.id
        })
      }
    },
    exits: {
      get () {
        return _.filter(this.$store.state.places.items, (item) => {
          return this.showPlaces && item.id != this.id
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
