<template>
  <q-page>
    <q-tab-panels animated swipeable transition-prev="slide-right" transition-next="slide-left" v-model="tab" style="top: 50px; margin-bottom: 50px; height: calc(100% - 2px);">
      <q-tab-panel name="location" v-if="show.location"><location /></q-tab-panel>
      <q-tab-panel name="item" v-if="show.item"><item /></q-tab-panel>
      <q-tab-panel name="dialogue" v-if="show.dialogue"><dialogue /></q-tab-panel>
      <q-tab-panel name="task" v-if="show.task"><task /></q-tab-panel>
      <q-tab-panel name="transcript" v-if="show.transcript"><transcript /></q-tab-panel>
    </q-tab-panels>
    <q-page-sticky position="top" class="bg-accent text-white shadow-2">
      <q-toolbar>
        <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <q-chip icon="today" color="primary" v-if="show.time" key="1">{{ stats.time }}</q-chip>
          <q-chip icon="face" color="primary" v-if="show.player" key="2">{{ stats.player }}</q-chip>
          <q-chip icon="star" color="primary" v-if="show.score" key="3">{{ stats.score }}</q-chip>
        </transition-group>
      </q-toolbar>
    </q-page-sticky>
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
  computed:  {
    stats: {
      get () {
        return {
          time: this.$store.state.stats.time,
          player: this.$store.state.stats.player,
          score: this.$store.state.stats.score
        }
      }
    },
    show: {
      get () {
        return {
          time: this.$store.getters['stats/showTime'],
          player: this.$store.getters['stats/showPlayer'],
          score: this.$store.getters['stats/showScore'],
          location: this.$store.state.location.show,
          item: this.$store.state.item.show,
          dialogue: this.$store.state.dialogue.show,
          task: this.$store.state.task.show,
          transcript: this.$store.state.transcript.show
        }
      }
    }
  },
  components: {
    "location": () => import("components/LocationComponent.vue"),
    "item": () => import("components/ItemComponent.vue"),
    "dialogue": () => import("components/DialogueComponent.vue"),
    "task": () => import("components/TaskComponent.vue"),
    "transcript": () => import("components/TranscriptComponent.vue")
  },
  created () {
    this.$game = new Game(this.$root, this.$store)
  },
  mounted () {
    this.$q.dark.set(true)
    this.$game.run()
  },
  beforeDestroy () {
    this.$game.stop()
    this.$game = undefined
  }
}
</script>

<style scoped lang="stylus">
</style>
