<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <h4>{{ title }}</h4>
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <p class="text-body1" v-for="item in items" :key="item.id">
          {{ item.text }}
        </p>
      </transition-group>
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-linear-progress size="xs" color="secondary" v-if="showProgress" :value="progressValue" :key="1" />
        <q-separator spaced color="secondary" v-if="showChoices" :key="2" />
        <q-btn color="secondary" icon="keyboard_arrow_right" class="float-right" label="What now?" v-if="showChoices" :key="3">
          <q-menu content-class="bg-primary" transition-show="fade" transition-hide="fade">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup v-for="choice in choices" :key="choice.id" @click="select(choice)">
                <q-item-section>
                  {{ choice.text }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewportComponent",
  computed: {
    title: {
      get () {
        return this.$store.state.viewport.title
      }
    },
    items: {
      get () {
        return this.$store.state.viewport.items
      }
    },
    choices: {
      get () {
        return this.$store.state.viewport.choices
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
    showChoices: {
      get () {
        return this.$store.state.viewport.hasChoices
      }
    }
  },
  methods: {
    select (choice) {
      let action = this.$store.state.viewport.choices[choice.id].action
      this.$store.dispatch("viewport/removeChoice", choice.id)
      if (action) {
        this.$root.$emit("game:action", action)
      }
    }
  },
  mounted () {
    this.$store.dispatch("viewport/seen")
  }
}
</script>

<style scoped lang="stylus">
</style>
