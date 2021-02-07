<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <splash v-if="showSplash" />
    <q-layout view="lHr LpR fFf" v-else>
      <q-header elevated>
        <q-toolbar>
          <q-btn dense flat round icon="public" @click="left = !left" v-if="show.world">
            <q-badge color="negative" floating transparent v-if="badge.world > 0 && !left">
              {{ badge.world }}
            </q-badge>
          </q-btn>
          <q-toolbar-title class="text-center">{{ pageTitle }}</q-toolbar-title>
          <q-btn dense flat round icon="person" @click="right = !right" v-if="show.player">
            <q-badge color="negative" floating transparent v-if="badge.player > 0 && !right">
              {{ badge.player }}
            </q-badge>
          </q-btn>
        </q-toolbar>
      </q-header>
      <q-drawer no-swipe-open no-swipe-close v-model="left" side="left" elevated>
        <world />
      </q-drawer>
      <q-drawer no-swipe-open no-swipe-close v-model="right" side="right" elevated>
        <player />
      </q-drawer>
      <q-page-container>
        <div class="row justify-center gumshoe-page">
          <router-view class="gumshoe-view col shadow-12" />
        </div>
      </q-page-container>
      <q-footer elevated>
        <q-tabs v-model="tab" align="center">
          <q-tab name="location" v-if="show.location">
            <q-icon name="home" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.location" />
            </q-icon>
          </q-tab>
          <q-tab name="item" v-if="show.item">
            <q-icon name="search" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.item" />
            </q-icon>
          </q-tab>
          <q-tab name="dialogue" v-if="show.dialogue">
            <q-icon name="forum" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.dialogue" />
            </q-icon>
          </q-tab>
          <q-tab name="task" v-if="show.task">
            <q-icon name="fact_check" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.task" />
            </q-icon>
          </q-tab>
          <q-tab name="transcript" v-if="show.transcript">
            <q-icon name="local_library" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.transcript" />
            </q-icon>
          </q-tab>
        </q-tabs>
      </q-footer>
    </q-layout>
  </transition>
</template>

<script>
import { LoggerMixin } from "../mixins/LoggerMixin.js"
import { TabMixin } from "../mixins/TabMixin.js"
export default {
  name: "MainLayout",
  mixins: [LoggerMixin, TabMixin],
  data () {
    return {
      showSplash: !process.env.DEV,
      left: false,
      right: false
    }
  },
  methods: {
    hide () {
      if (this.$q.screen.lt.md) {
        this.left = false
        this.right = false
      }
    }
  },
  created () {
    this.registerPunk()
  },
  mounted () {
    this.$root.$on("item:clicked", this.hide)
    if (this.showSplash) {
      setTimeout(() => {
        this.showSplash = false
      }, 1500)
    }
  },
  beforeDestroy () {
    this.$root.$off("item:clicked", this.hide)
    this.deregisterPunk()
  },
  computed: {
    pageTitle: {
      get() {
        return this.$store.state.page.title
      }
    },
    badge: {
      get () {
        return {
          world: this.$store.getters['places/badgeCount'] + this.$store.getters['people/badgeCount'] + this.$store.getters['objects/badgeCount'],
          player: this.$store.getters['inventory/badgeCount'] + this.$store.getters['notebook/badgeCount'] + this.$store.getters['quests/badgeCount'],
          location: this.$store.getters['location/showBadge'] && this.$store.state.page.tab != 'location',
          item: true,
          dialogue: this.$store.getters['dialogue/showBadge'] && this.$store.state.page.tab != 'dialogue',
          task: true,
          transcript: this.$store.getters['transcript/showBadge'] && this.$store.state.page.tab != 'transcript'
        }
      }
    },
    show: {
      get () {
        return {
          world: this.$store.state.places.show || this.$store.state.people.show ||this.$store.state.objects.show,
          player: this.$store.state.inventory.show || this.$store.state.notebook.show || this.$store.state.quests.show,
          location: this.$store.state.location.show,
          item: true,
          dialogue: this.$store.state.dialogue.show,
          task: true,
          transcript: this.$store.state.transcript.show
        }
      }
    }
  },
  components: {
    'splash': () => import("components/SplashComponent.vue"),
    'world': () => import("components/WorldComponent.vue"),
    'player': () => import("components/PlayerComponent.vue")
  }
}
</script>

<style scoped lang="stylus">
.gumshoe-page {
  background-color: #191919;
}
.gumshoe-view {
  width: 100%;
  max-width: 840px;
}
</style>
