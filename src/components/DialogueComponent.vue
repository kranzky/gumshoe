<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <message v-for="message in messages" :message="message" :key="message.id" />
      </transition-group>
      <choices label="What now?" icon="textsms" module="dialogueChoices" style="margin-top: 18px;" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogueComponent",
  computed: {
    messages: {
      get () {
        return this.$store.state.dialogueItems.items
      }
    }
  },
  mounted () {
    this.$store.dispatch("dialogue/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("dialogue/seen")
  },
  components: {
    "choices": () => import("components/ChoiceComponent.vue"),
    "message": () => import("components/MessageComponent.vue")
  }
}
</script>

<style scoped lang="stylus">
</style>
