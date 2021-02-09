<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <splash v-if="showSplash" />
    <q-layout view="lHr LpR fFf" v-else>
      <q-header elevated>
        <q-toolbar>
          <q-btn dense flat icon="public" :label="headerLabel ? 'World' : ''" @click="world = !world" v-if="show.world">
            <q-badge class="absolute-top-left" color="negative" transparent v-if="badge.world > 0 && !world">
              {{ badge.world }}
            </q-badge>
          </q-btn>
          <q-toolbar-title class="text-center">{{ pageTitle }}</q-toolbar-title>
          <q-btn dense flat icon-right="person" :label="headerLabel ? 'Player' : ''" @click="player = !player" v-if="show.player">
            <q-badge class="absolute-top-right" style="z-index: 1;" color="negative" transparent v-if="badge.player > 0 && !player">
              {{ badge.player }}
            </q-badge>
          </q-btn>
        </q-toolbar>
      </q-header>
      <q-drawer no-swipe-open no-swipe-close v-model="world" side="left" elevated>
        <world />
      </q-drawer>
      <q-drawer no-swipe-open no-swipe-close v-model="player" side="right" elevated>
        <player />
      </q-drawer>
      <q-page-container>
        <div class="row justify-center gumshoe-page">
          <router-view class="gumshoe-view col shadow-12" />
        </div>
      </q-page-container>
      <q-footer elevated>
        <q-tabs v-model="tab" align="center">
          <q-tab name="room" :label="footerLabel ? 'Look' : ''" v-if="show.room">
            <q-icon name="home" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.room" />
            </q-icon>
          </q-tab>
          <q-tab name="entity" :label="footerLabel ? 'Examine' : ''" v-if="show.entity">
            <q-icon name="search" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.entity" />
            </q-icon>
          </q-tab>
          <q-tab name="dialogue" :label="footerLabel ? 'Talk' : ''" v-if="show.dialogue">
            <q-icon name="forum" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.dialogue" />
            </q-icon>
          </q-tab>
          <q-tab name="quest" :label="footerLabel ? 'Quest' : ''" v-if="show.quest">
            <q-icon name="fact_check" size="sm">
              <q-badge color="negative" floating class="gumshoe-badge" v-if="badge.quest" />
            </q-icon>
          </q-tab>
          <q-tab name="transcript" :label="footerLabel ? 'Story' : ''" v-if="show.transcript">
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
      showSplash: !process.env.DEV
    }
  },
  methods: {
    hide () {
      if (this.$q.screen.lt.md) {
        this.world = false
        this.player = false
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
      get () {
        return this.$store.state.page.title
      }
    },
    badge: {
      get () {
        return {
          world: this.$store.getters['places/badgeCount'] + this.$store.getters['people/badgeCount'] + this.$store.getters['objects/badgeCount'],
          player: this.$store.getters['inventory/badgeCount'] + this.$store.getters['notebook/badgeCount'] + this.$store.getters['quests/badgeCount'],
          room: this.$store.getters['room/showBadge'] && this.$store.state.page.tab != 'room',
          entity: this.$store.getters['entity/showBadge'] && this.$store.state.page.tab != 'entity',
          dialogue: this.$store.getters['dialogue/showBadge'] && this.$store.state.page.tab != 'dialogue',
          quest: this.$store.getters['quest/showBadge'] && this.$store.state.page.tab != 'quest',
          transcript: this.$store.getters['transcript/showBadge'] && this.$store.state.page.tab != 'transcript'
        }
      }
    },
    show: {
      get () {
        return {
          world: this.$store.state.places.show || this.$store.state.people.show ||this.$store.state.objects.show,
          player: this.$store.state.inventory.show || this.$store.state.notebook.show || this.$store.state.quests.show,
          room: this.$store.state.room.show,
          entity: this.$store.state.entity.show,
          dialogue: this.$store.state.dialogue.show,
          quest: this.$store.state.quest.show,
          transcript: this.$store.state.transcript.show
        }
      }
    },
    headerLabel: {
      get () {
        return this.$store.state.page.width > 720
      }
    },
    footerLabel: {
      get () {
        return this.$store.state.page.width > 540
      }
    },
    world: {
      get () {
        return this.$store.state.page.world
      },
      set (open) {
        this.$store.commit("page/world", open)
      }
    },
    player: {
      get () {
        return this.$store.state.page.player
      },
      set (open) {
        this.$store.commit("page/player", open)
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
