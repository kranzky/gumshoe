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
export default {
  name: "OptionComponent",
  props: {
    module: {
      default: "undefined"
    }
  },
  methods: {
    action (option) {
      // TODO
      console.log(option.action)
    },
    icon (option) {
      if (!_.isUndefined(option.icon)) {
        return option.icon
      }
      switch (option.type) {
        case 'room':
          return 'place'
        case 'bot':
          return 'face'
        case 'item':
          return 'label'
        case 'task':
          if (option.complete) {
            return 'assignment_turned_in'
          } else {
            return 'assignment_late'
          }
      }
      return 'help'
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
