<template>
  <q-list dense>
    <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-item clickable v-for="option in options" :key="option.id" @click="action(option)" class="text-secondary">
        <q-item-section avatar>
          <q-icon :name="icon(option)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ option.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </transition-group>
  </q-list>
</template>

<script>
import { IconMixin } from "../mixins/IconMixin.js"
import { ActionMixin } from "../mixins/ActionMixin.js"

export default {
  name: "OptionComponent",
  mixins: [IconMixin, ActionMixin],
  props: {
    module: {
      default: "undefined"
    }
  },
  computed: {
    options: {
      get () {
        return this.$store.state[this.module].items
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
