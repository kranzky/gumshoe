<template>
  <div>
    <q-tabs v-model="tab" align="center" class="bg-primary text-white shadow-2" >
      <q-tab name="settings" icon="settings" />
      <q-tab name="skills" icon="self_improvement" />
      <q-tab name="people" icon="groups">
        <q-badge color="negative" floating>1</q-badge>
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
  components: {
    "settings": () => import("components/SettingsComponent.vue"),
    "skills": () => import("components/SkillsComponent.vue"),
    "people": () => import("components/PeopleComponent.vue")
  }
}
</script>

<style lang="stylus">
</style>
