<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <h4>{{ title }}</h4>
      <p class="text-body1" v-for="item in items" :key="item.id">
        {{ item.text }}
      </p>
      <q-separator spaced />
      <q-btn color="secondary" icon="keyboard_arrow_right" label="What next?">
        <q-menu content-class="bg-primary">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-for="choice in choices" :key="choice.id" @click="select(choice)">
              <q-item-section>
                {{ choice.text }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
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
    }
  },
  methods: {
    select (choice) {
      this.$root.$emit("choice:selected")
      this.$root.$emit("punk:success", `You selected '${choice.text}'!`)
    }
  },
  mounted () {
    this.$store.dispatch("viewport/seen")
  }
}
</script>

<style scoped lang="stylus">
</style>
