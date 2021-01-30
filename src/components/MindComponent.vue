<template>
  <div>
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" >
      <q-tab name="settings" icon="settings" />
      <q-tab name="skills" icon="self_improvement" />
      <q-tab name="people" icon="groups" />
    </q-tabs>
    <q-tab-panels v-model="tab" style="height: 100%;">
      <q-tab-panel name="settings"><settings /></q-tab-panel>
      <q-tab-panel name="skills"><skills /></q-tab-panel>
      <q-tab-panel name="people"><people /></q-tab-panel>
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
  components: {
    "settings": () => import("components/SettingsComponent.vue"),
    "skills": () => import("components/SkillsComponent.vue"),
    "people": () => import("components/PeopleComponent.vue")
  }
}
</script>

<style lang="stylus">
</style>
