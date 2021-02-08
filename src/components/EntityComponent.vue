<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <h4>{{ title }}</h4>
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <p class="text-body1" v-for="item in items" :key="item.id">
          {{ item.text }}
        </p>
      </transition-group>
      <choices label="What now?" icon="construction" module="entityChoices" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EntityComponent",
  computed: {
    title: {
      get () {
        return this.$store.state.entity.title
      }
    },
    items: {
      get () {
        return this.$store.state.entityItems.items
      }
    }
  },
  mounted () {
    this.$store.dispatch("entity/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("entity/seen")
  },
  components: {
    "choices": () => import("components/ChoiceComponent.vue")
  }
}
</script>
