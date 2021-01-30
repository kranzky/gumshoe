<template>
  <div class="bg-grey-2">
    <q-layout view="lHr LpR fFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round icon="psychology" @click="left = !left" />
          <q-toolbar-title class="text-center">{{ pageTitle }}</q-toolbar-title>
          <q-btn flat round icon="luggage" @click="right = !right" />
        </q-toolbar>
      </q-header>
      <q-drawer show-if-above v-model="left" side="left" bordered>
        <mind />
      </q-drawer>
      <q-drawer show-if-above v-model="right" side="right" bordered>
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
  methods: {
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
