<template>
  <div class="row">
    <div>
      <q-chip clickable text-color="secondary" icon="label" v-for="object in objects" :key="object.id" @click="nav(object)">{{ object.name }}</q-chip>
    </div>
    <div>
      <q-chip clickable text-color="secondary" icon="face" v-for="npc in npcs" :key="npc.id" @click="nav(npc)">{{ npc.name }}</q-chip>
    </div>
    <div>
      <q-chip clickable text-color="secondary" icon="place" v-for="exit in exits" :key="exit.id" @click="nav(exit)">{{ exit.name }}</q-chip>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionComponent",
  props: {
    id: {
      default: null
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
        return _.filter(this.$store.state.objects.items, (item) => { return item.id != this.id })
      }
    },
    npcs: {
      get () {
        return _.filter(this.$store.state.people.items, (item) => { return item.id != this.id })
      }
    },
    exits: {
      get () {
        return _.filter(this.$store.state.places.items, (item) => { return item.id != this.id })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
