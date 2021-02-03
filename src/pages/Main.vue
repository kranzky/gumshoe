<template>
  <q-page>
    <q-tab-panels animated swipeable transition-prev="slide-right" transition-next="slide-left" v-model="tab" style="top: 50px; margin-bottom: 50px; height: calc(100% - 2px);">
      <q-tab-panel name="transcript"><transcript /></q-tab-panel>
      <q-tab-panel name="viewport"><viewport /></q-tab-panel>
      <q-tab-panel name="dialogue"><dialogue /></q-tab-panel>
    </q-tab-panels>
    <q-page-sticky position="top" class="bg-accent text-white shadow-2">
      <q-toolbar>
        <q-chip icon="today" color="primary" v-if="show.time">{{ stats.time }}</q-chip>
        <q-chip icon="face" color="primary" v-if="show.player">{{ stats.player }}</q-chip>
        <q-chip icon="star" color="primary" v-if="show.score">{{ stats.score }}</q-chip>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { TitleMixin } from "../mixins/TitleMixin.js"
import { TabMixin } from "../mixins/TabMixin.js"
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
          score: this.$store.getters['stats/showScore']
        }
      }
    }
  },
  components: {
    "transcript": () => import("components/TranscriptComponent.vue"),
    "viewport": () => import("components/ViewportComponent.vue"),
    "dialogue": () => import("components/DialogueComponent.vue")
  }
}
</script>

<style scoped lang="stylus">
</style>
