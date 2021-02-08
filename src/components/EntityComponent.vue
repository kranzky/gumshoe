<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <h4>{{ title }}</h4>
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <p class="text-body1" v-for="item in items" :key="item.id">
          {{ item.text }}
        </p>
      </transition-group>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-linear-progress size="xs" color="secondary" v-if="showProgress" :value="progressValue" />
      </transition>
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
