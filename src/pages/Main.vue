<template>
  <q-page>
    <q-tab-panels animated swipeable transition-prev="slide-right" transition-next="slide-left" v-model="tab" style="top: 50px; margin-bottom: 50px; height: calc(100% - 2px);">
      <q-tab-panel name="room" v-if="show.room"><room /></q-tab-panel>
      <q-tab-panel name="entity" v-if="show.entity"><entity /></q-tab-panel>
      <q-tab-panel name="dialogue" v-if="show.dialogue"><dialogue /></q-tab-panel>
      <q-tab-panel name="quest" v-if="show.quest"><quest /></q-tab-panel>
      <q-tab-panel name="transcript" v-if="show.transcript"><transcript /></q-tab-panel>
    </q-tab-panels>
    <q-page-sticky position="top" class="bg-accent text-white shadow-2">
      <q-toolbar>
        <transition-group appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" style="--animate-duration: 0.5s;">
          <q-chip icon="today" color="primary" v-if="show.time" key="1">{{ game.time }}</q-chip>
          <q-chip icon="face" color="primary" v-if="show.player" key="2">{{ game.player }}</q-chip>
          <q-chip icon="star" color="primary" v-if="show.score" key="3">{{ game.score }}</q-chip>
        </transition-group>
      </q-toolbar>
    </q-page-sticky>
    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script>
import { TitleMixin } from "../mixins/TitleMixin.js"
import { TabMixin } from "../mixins/TabMixin.js"
import Game from '../gumshoe/game.js'

export default {
  name: "Main",
  title: "Gumshoe v" + process.env.PACKAGE_VERSION,
  mixins: [TitleMixin, TabMixin],
  data () {
    return {
      loading: 0
    }
  },
  methods: {
    onResize (size) {
      this.$store.commit('page/width', size.width)
    },
    showLoading () {
      if (this.loading == 0) {
        this.$q.loading.show()
      }
      this.loading += 1
    },
    hideLoading () {
      this.loading -= 1
      if (this.loading == 0) {
        this.$q.loading.hide()
      }
    }
  },
  computed:  {
    game: {
      get () {
        return {
          time: this.$store.state.game.time,
          player: this.$store.state.game.player,
          score: this.$store.state.game.score
        }
      }
    },
    show: {
      get () {
        return {
          time: this.$store.getters['game/showTime'],
          player: this.$store.getters['game/showPlayer'],
          score: this.$store.getters['game/showScore'],
          room: this.$store.state.room.show,
          entity: this.$store.state.entity.show,
          dialogue: this.$store.state.dialogue.show,
          quest: this.$store.state.quest.show,
          transcript: this.$store.state.transcript.show
        }
      }
    }
  },
  components: {
    "room": () => import("components/RoomComponent.vue"),
    "entity": () => import("components/EntityComponent.vue"),
    "dialogue": () => import("components/DialogueComponent.vue"),
    "quest": () => import("components/QuestComponent.vue"),
    "transcript": () => import("components/TranscriptComponent.vue")
  },
  created () {
    this.$game = new Game(this.$root, this.$store)
  },
  mounted () {
    this.$q.dark.set(true)
    this.$root.$on("page:showLoading", this.showLoading)
    this.$root.$on("page:hideLoading", this.hideLoading)
    this.$game.run()
  },
  beforeDestroy () {
    this.$game.stop()
    this.$root.$off("page:showLoading", this.showLoading)
    this.$root.$off("page:hideLoading", this.hideLoading)
    this.$game = undefined
  }
}
</script>

<style scoped lang="stylus">
</style>
