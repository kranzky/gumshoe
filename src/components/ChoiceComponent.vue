<template>
  <div>
    <q-linear-progress size="xs" color="secondary" :value="progressValue" style="margin-bottom: 8px;" />
    <transition appear enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <q-btn color="secondary" :icon="icon" class="float-right" :label="label" v-if="choices.length > 0 && !showProgress" :key="3">
        <q-badge color="negative" floating transparent v-if="showBadge">
          {{ badgeCount }}
        </q-badge>
        <q-menu content-class="bg-primary" transition-show="fade" transition-hide="fade" @show="seen">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-for="choice in choices" :key="choice.id" @click="action(choice)">
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
import { ActionMixin } from "../mixins/ActionMixin.js"

export default {
  name: "ChoiceComponent",
  mixins: [ActionMixin],
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
    },
    badgeCount: {
      get () {
        return this.$store.getters[`${this.module}/badgeCount`]
      }
    }
  },
  methods: {
    seen () {
      this.$store.dispatch(`${this.module}/seen`)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
