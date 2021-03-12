<template>
  <q-page>
    <q-tab-panels animated swipeable transition-prev="slide-right" transition-next="slide-left" v-model="tab" style="top: 50px; margin-bottom: 50px; height: calc(100% - 2px);">
      <q-tab-panel name="room" v-if="show.room">
        <room />
      </q-tab-panel>
      <q-tab-panel name="entity" v-if="show.entity">
        <entity />
      </q-tab-panel>
      <q-tab-panel name="dialogue" v-if="show.dialogue">
        <dialogue />
      </q-tab-panel>
      <q-tab-panel name="quest" v-if="show.quest">
        <quest />
      </q-tab-panel>
      <q-tab-panel name="transcript" v-if="show.transcript">
        <transcript />
      </q-tab-panel>
    </q-tab-panels>
    <q-page-sticky position="top" class="bg-accent text-white shadow-2">
      <q-toolbar>
        <status />
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
  methods: {
    onResize (size) {
      this.$store.commit('page/width', size.width)
    },
    selectScenario (scenario) {
      if (process.env.DEV) {
        this.$game.run(scenario)
        return
      }
      this.$q.dialog({
        title: 'New Game',
        message: 'Which scenario shall I load?',
        options: {
          type: 'radio',
          model: scenario,
          items: [
            { label: 'Remote Server', value: 'remote' },
            { label: 'Demo Quests', value: 'demo' },
            { label: 'Prologue WIP', value: 'prologue' },
            { label: 'Example Content', value: 'example' }
          ],
        },
        cancel: false,
        persistent: true
      }).onOk(data => {
        this.$game.run(data)
      })
    }
  },
  computed: {
    show: {
      get () {
        return {
          room: this.$store.state.room.visible,
          entity: this.$store.state.entity.show,
          dialogue: this.$store.state.dialogue.show,
          quest: this.$store.state.quest.show,
          transcript: this.$store.state.transcript.show
        }
      }
    }
  },
  components: {
    "status": () => import("components/StatusComponent.vue"),
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
    this.selectScenario('remote')
  },
  beforeDestroy () {
    this.$game.stop()
    this.$game = undefined
  }
}
</script>

<style scoped lang="stylus">
</style>
