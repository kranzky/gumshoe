<template>
  <div class="bg-grey-10 text-white">
    <q-toolbar position="top" class="bg-accent text-white">
      <q-toolbar-title>{{ title }}</q-toolbar-title>
    </q-toolbar>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="!loading">
        <q-list separator v-if="items.length > 0" class="rounded-borders text-primary">
          <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <q-item clickable v-ripple v-for="item in items" :key="item.id" @click="show(item.id)">
              <q-item-section avatar>
                <q-icon :name="item.icon">
                  <q-badge color="negative" floating class="gumshoe-badge" v-if="!item.seen" />
                </q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption>{{ item.detail }}</q-item-label>
              </q-item-section>
            </q-item>
          </transition-group>
        </q-list>
        <p v-else class="text-body1 text-center" style="padding-top: 10px;">...</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "DrawerComponent",
  props: {
    title: {
      default: "Untitled"
    },
    module: {
      default: "undefined"
    }
  },
  computed: {
    items: {
      get () {
        return this.$store.state[this.module].items
      }
    },
    loading: {
      get () {
        return this.$store.state[this.module].loading
      }
    }
  },
  methods: {
    find (id) {
      return _.find(this.items, (item) => { return item.id == id })
    },
    show (id) {
      let item = this.find(id)
      if (item.action && !item.seen) {
        this.$root.$emit("game:action", item.action)
      }
      this.$store.dispatch(`${this.module}/seen`, id)
      this.$root.$emit("item:clicked", item)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
