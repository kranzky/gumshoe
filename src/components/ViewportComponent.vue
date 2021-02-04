<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <h4>{{ title }}</h4>
      <p class="text-body1" v-for="item in items" :key="item.id">
        {{ item.text }}
      </p>
      <q-separator spaced />
      <q-btn color="secondary" :icon="menu.icon" :label="menu.label">
        <q-menu content-class="bg-primary">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-for="choice in menu.choices" :key="choice.id" @click="select(choice)">
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
  data () {
    return {
      title: "Automatic Update?",
      items: [
        { id: 1, text: "This is the first paragraph." },
        { id: 2, text: "And this is the second!" }
      ],
      menu: {
        icon: "keyboard_arrow_right",
        label: "What next?",
        choices: [
          { id: 1, text: "Not much..." },
          { id: 2, text: "Lots of things!" }
        ]
      }
    }
  },
  methods: {
    select (choice) {
      this.$root.$emit("choice:selected")
      this.$root.$emit("punk:success", `You selected '${choice.text}'!`)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
