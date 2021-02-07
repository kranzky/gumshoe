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
      <choices label="What now?" module="locationChoices" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationComponent",
  computed: {
    title: {
      get () {
        return this.$store.state.location.title
      }
    },
    items: {
      get () {
        return this.$store.state.locationItems.items
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
    this.$store.dispatch("location/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("location/seen")
  },
  components: {
    "choices": () => import("components/ChoiceComponent.vue")
  }
}
</script>

<style scoped lang="stylus">
</style>
