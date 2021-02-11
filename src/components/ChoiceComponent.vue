<template>
  <div>
    <q-linear-progress size="xs" color="secondary" :value="progressValue" style="margin-bottom: 8px;" />
    <transition appear enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <q-btn color="secondary" :icon="icon" class="float-right" :label="label" v-if="choices.length > 0 && !showProgress" :key="3">
        <q-badge color="negative" floating class="gumshoe-badge" v-if="showBadge" />
        <q-menu content-class="bg-primary" transition-show="fade" transition-hide="fade" @show="seen">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-for="choice in choices" :key="choice.id" @click="select(choice.id)">
              <q-item-section>
                {{ choice.text }}
              </q-item-section>
              <q-item-section avatar v-if="choice.icon">
                <q-icon color="white" :name="choice.icon" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ChoiceComponent",
  props: {
    label: {
      default: "Untitled"
    },
    icon: {
      default: "report"
    },
    module: {
      default: "undefined"
    }
  },
  computed: {
    choices: {
      get () {
        return this.$store.state[this.module].items
      }
    },
    showProgress: {
      get () {
        return this.$store.state.progress.show
      }
    },
    progressValue: {
      get () {
        return this.$store.state.progress.value
      }
    },
    showBadge: {
      get () {
        return this.$store.getters[`${this.module}/showBadge`]
      }
    }
  },
  methods: {
    find (id) {
      return _.find(this.choices, (choice) => { return choice.id == id })
    },
    select (id) {
      let choice = this.find(id)
      if (choice.action) {
        this.$root.$emit("game:action", choice.action)
      }
    },
    seen () {
      this.$store.dispatch(`${this.module}/seen`)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
