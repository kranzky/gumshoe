<template>
  <div class="bg-grey-10 text-white">
    <q-toolbar position="top" class="bg-accent text-white">
      <q-toolbar-title>{{ title }}</q-toolbar-title>
    </q-toolbar>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="visible">
        <q-list separator v-if="items.length > 0" class="rounded-borders text-primary">
          <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <q-item clickable v-ripple v-for="item in items" :key="item.id" @click="action(item)">
              <q-item-section avatar>
                <q-icon :name="icon(item)">
                  <q-badge color="negative" floating class="gumshoe-badge" v-if="!item.seen" />
                </q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption v-if="item.detail">({{ item.detail }})</q-item-label>
              </q-item-section>
            </q-item>
          </transition-group>
        </q-list>
        <p v-else class="text-center text-weight-light text-italic" style="padding-top: 10px;">{{ empty }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { IconMixin } from "../mixins/IconMixin.js"
import { ActionMixin } from "../mixins/ActionMixin.js"

export default {
  name: "DrawerComponent",
  mixins: [IconMixin, ActionMixin],
  props: {
    title: {
      default: "Untitled"
    },
    empty: {
      default: "..."
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
    visible: {
      get () {
        return this.$store.state[this.module].visible
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
