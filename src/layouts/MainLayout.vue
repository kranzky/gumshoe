<template>
  <div class="bg-grey-2">
    <q-layout view="lHr LpR fFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn dense flat round icon="home" @click="left = !left">
            <q-badge color="negative" floating transparent v-if="badge.mind > 0 && !left">
              {{ badge.mind }}
            </q-badge>
          </q-btn>
          <q-toolbar-title class="text-center">{{ pageTitle }}</q-toolbar-title>
          <q-btn dense flat round icon="person" @click="right = !right">
            <q-badge color="negative" floating transparent v-if="badge.soma > 0 && !right">
              {{ badge.soma }}
            </q-badge>
          </q-btn>
        </q-toolbar>
      </q-header>
      <q-drawer :show-if-above="false" v-model="left" side="left" bordered>
        <mind />
      </q-drawer>
      <q-drawer :show-if-above="false" v-model="right" side="right" bordered>
        <soma />
      </q-drawer>
      <q-page-container>
        <div class="row justify-center bg-accent">
          <router-view class="gumshoe-view col bg-grey-2 shadow-12" />
        </div>
      </q-page-container>
      <q-footer elevated>
        <q-tabs v-model="tab" align="center">
          <q-tab name="read" icon="local_library" />
          <q-tab name="find" icon="remove_red_eye" />
          <q-tab name="talk" icon="forum" />
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
  created() {
    this.registerPunk()
  },
  beforeDestroy() {
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
          mind: this.$store.getters['people/badgeCount'],
          soma: this.$store.getters['quests/badgeCount']
        }
      }
    }
  },
  components: {
    'mind': () => import("components/MindComponent.vue"),
    'soma': () => import("components/SomaComponent.vue")
  }
}
</script>

<style scoped>
.gumshoe-view {
  width: 100%;
  max-width: 768px;
}
</style>
