<template>
  <q-page>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <splash v-if="showSplash" />
      <q-tab-panels v-model="tab" v-else style="height: 100%;">
        <q-tab-panel name="read"><read /></q-tab-panel>
        <q-tab-panel name="find"><find /></q-tab-panel>
        <q-tab-panel name="talk"><talk /></q-tab-panel>
      </q-tab-panels>
    </transition>
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
    "find": () => import("components/FindComponent.vue"),
    "talk": () => import("components/TalkComponent.vue"),
    "read": () => import("components/ReadComponent.vue")
  }
}
</script>

<style lang="stylus">
</style>
