<template>
  <div>
    <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-separator spaced color="secondary" v-if="choices.length > 0" :key="1" />
      <q-btn color="secondary" icon="keyboard_arrow_right" class="float-right" :label="label" v-if="choices.length > 0" :key="2">
        <q-menu content-class="bg-primary" transition-show="fade" transition-hide="fade">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-for="choice in choices" :key="choice.id" @click="select(choice.id)">
              <q-item-section>
                {{ choice.text }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "ChoiceComponent",
  props: {
    label: {
      default: "Untitled"
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
    }
  },
  methods: {
    find (id) {
      return _.find(this.choices, (choice) => { return choice.id == id })
    },
    select (id) {
      let choice = this.find(id)
      this.$store.dispatch(`${this.module}/remove`, id)
      if (choice.action) {
        this.$root.$emit("game:action", choice.action)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
