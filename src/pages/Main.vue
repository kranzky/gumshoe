<template>
  <q-page>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <splash v-if="showSplash" />
      <q-tab-panels animated swipeable transition-prev="slide-right" transition-next="slide-left" v-model="tab" v-else style="top: 50px; margin-bottom: 50px; height: calc(100% - 2px);">
        <q-tab-panel name="transcript"><transcript /></q-tab-panel>
        <q-tab-panel name="viewport"><viewport /></q-tab-panel>
        <q-tab-panel name="dialogue"><dialogue /></q-tab-panel>
      </q-tab-panels>
    </transition>
    <q-page-sticky position="top" class="bg-accent text-white">
      <q-toolbar>
        <q-chip icon="today" color="primary">SUN 11:00</q-chip>
        <q-chip icon="face" color="primary">Yourself</q-chip>
        <q-chip icon="star" color="primary">0 / 100</q-chip>
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
  data () {
    return {
      showSplash: !process.env.DEV
    }
  },
  mounted () {
    if (this.showSplash) {
      setTimeout(() => {
        this.showSplash = false
      }, 1500)
    }
  },
  components: {
    "splash": () => import("components/SplashComponent.vue"),
    "transcript": () => import("components/TranscriptComponent.vue"),
    "viewport": () => import("components/ViewportComponent.vue"),
    "dialogue": () => import("components/DialogueComponent.vue")
  }
}
</script>

<style lang="stylus">
</style>
