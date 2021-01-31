<template>
  <div>
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" >
      <q-tab name="settings" icon="settings">
        <q-badge color="negative" floating transparent v-if="badge.settings > 0">
          {{ badge.settings }}
        </q-badge>
      </q-tab>
      <q-tab name="skills" icon="self_improvement">
        <q-badge color="negative" floating transparent v-if="badge.skills > 0">
          {{ badge.skills }}
        </q-badge>
      </q-tab>
      <q-tab name="people" icon="groups">
        <q-badge color="negative" floating transparent v-if="badge.people > 0">
          {{ badge.people }}
        </q-badge>
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" style="height: 100%;">
      <q-tab-panel name="settings" style="padding: 0;"><settings /></q-tab-panel>
      <q-tab-panel name="skills" style="padding: 0;"><skills /></q-tab-panel>
      <q-tab-panel name="people" style="padding: 0;"><people /></q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "MindComponent",
  data () {
    return {
      tab: 'people'
    }
  },
  computed: {
    badge: {
      get () {
        return {
          settings: 0,
          skills: 0,
          people: this.$store.getters['people/badgeCount']
        }
      }
    }
  },
  components: {
    "settings": () => import("components/SettingsComponent.vue"),
    "skills": () => import("components/SkillsComponent.vue"),
    "people": () => import("components/PeopleComponent.vue")
  }
}
</script>

<style lang="stylus">
</style>
