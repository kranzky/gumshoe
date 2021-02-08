<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-chat-message v-for="message in messages" size=6
          :key="message.id"
          :label="message.label"
          :name="message.name"
          :text="message.text"
          :stamp="message.time"
          :avatar="avatar(message)"
          :sent="message.player"
        />
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
  methods: {
    avatar (message) {
      return message.label ? undefined : "images/avatar.png"
    }
  },
  mounted () {
    this.$store.dispatch("dialogue/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("dialogue/seen")
  },
  components: {
    "choices": () => import("components/ChoiceComponent.vue")
  }
}
</script>

<style scoped lang="stylus">
</style>
