<template>
  <div class="row justify-center">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div style="max-width:700px; width: 100%;" v-if="visible">
        <div>
          <q-btn class="glossy float-right" round outline color="secondary" :icon="bookmarked ? 'bookmark' : 'bookmark_border'" size="sm" @click="toggleBookmark" />
          <h4>{{ title }}</h4>
        </div>
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
    visible: {
      get () {
        // TODO: make this a getter on the store instead
        return this.$store.state.room.visible && !_.isNull(this.$store.state.room.title)
      }
    },
    current: {
      get () {
        return this.$store.state.room.current
      }
    },
    bookmarked: {
      get () {
        return !_.isUndefined(_.find(this.$store.state.notebook.items, (item) => { return item.id == this.current }))
      }
    }
  },
  methods: {
    toggleBookmark () {
      if (!this.bookmarked) {
        this.$root.$emit("game:mark", 'room', this.current)
      } else {
        this.$root.$emit("game:unmark", 'room', this.current)
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
