<template>
  <div class="bg-grey-2">
    <q-layout view="lHr LpR fFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn dense flat round icon="public" @click="left = !left">
            <q-badge color="negative" floating transparent v-if="badge.world > 0 && !left">
              {{ badge.world }}
            </q-badge>
          </q-btn>
          <q-toolbar-title class="text-center">{{ pageTitle }}</q-toolbar-title>
          <q-btn dense flat round icon="person" @click="right = !right">
            <q-badge color="negative" floating transparent v-if="badge.player > 0 && !right">
              {{ badge.player }}
            </q-badge>
          </q-btn>
        </q-toolbar>
      </q-header>
      <q-drawer :show-if-above="false" v-model="left" side="left" bordered>
        <world />
      </q-drawer>
      <q-drawer :show-if-above="false" v-model="right" side="right" bordered>
        <player />
      </q-drawer>
      <q-page-container>
        <div class="row justify-center bg-accent">
          <router-view class="gumshoe-view col bg-grey-2 shadow-12" />
        </div>
      </q-page-container>
      <q-footer elevated>
        <q-tabs v-model="tab" align="center">
          <q-tab name="transcript" icon="local_library" />
          <q-tab name="viewport" icon="remove_red_eye" />
          <q-tab name="dialogue" icon="forum" />
        </q-tabs>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { LoggerMixin } from "../mixins/LoggerMixin.js"
import { TabMixin } from "../mixins/TabMixin.js"
export default {
  name: "MainLayout",
  mixins: [LoggerMixin, TabMixin],
  data () {
    return {
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
    this.$root.$on("item:clicked", this.hide);
  },
  beforeDestroy () {
    this.$root.$off("item:clicked", this.hide);
    this.deregisterPunk()
  },
  computed: {
    pageTitle: {
      get() {
        return this.$store.state.page.title
      }
    },
    badge: {
      get() {
        return {
          world: this.$store.getters['people/badgeCount'],
          player: this.$store.getters['quests/badgeCount']
        }
      }
    }
  },
  components: {
    'world': () => import("components/WorldComponent.vue"),
    'player': () => import("components/PlayerComponent.vue")
  }
}
</script>

<style scoped>
.gumshoe-view {
  width: 100%;
  max-width: 768px;
}
</style>
