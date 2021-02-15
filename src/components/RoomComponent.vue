<template>
  <div class="row justify-center">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div style="max-width:700px; width: 100%;" v-if="!loading">
        <h4>{{ title }}</h4>
        <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <p class="text-body1" v-for="item in items" :key="item.id">
            {{ item.text }}
          </p>
        </transition-group>
        <choices label="What now?" icon="keyboard_arrow_right" module="roomChoices" />
        <options :id="current" showPeople="true" showPlaces="true" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "RoomComponent",
  computed: {
    title: {
      get () {
        return this.$store.state.room.title
      }
    },
    items: {
      get () {
        return this.$store.state.roomItems.items
      }
    },
    loading: {
      get () {
        return this.$store.state.room.loading
      }
    },
    current: {
      get () {
        return this.$store.state.room.current
      }
    }
  },
  mounted () {
    this.$store.dispatch("room/seen")
    this.$root.$emit("game:items", 'room')
  },
  beforeDestroy () {
    this.$store.dispatch("room/seen")
  },
  components: {
    "choices": () => import("components/ChoiceComponent.vue"),
    "options": () => import("components/OptionComponent.vue")
  }
}
</script>

<style scoped lang="stylus">
</style>
