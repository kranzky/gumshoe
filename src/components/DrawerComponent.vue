<template>
  <div class="bg-grey-10 text-white">
    <q-toolbar position="top" class="bg-accent text-white">
      <q-toolbar-title>{{ title }}</q-toolbar-title>
    </q-toolbar>
    <q-list separator v-if="showItems" class="rounded-borders text-primary">
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-item clickable v-ripple v-for="item in items" :key="item.id" @click="show(item)">
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
    <p v-else class="text-body1 text-center" style="padding-top: 10px;">...  emptiness ...</p>
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
    showItems: {
      get () {
        return this.$store.state[this.module].hasItems
      }
    }
  },
  methods: {
    show (item) {
      let data = this.$store.state[this.module].items[item.id]
      if (data.action && !data.seen) {
        this.$root.$emit("game:action", data.action)
      }
      this.$store.dispatch(`${this.module}/seen`, item.id)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
