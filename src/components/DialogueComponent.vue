<template>
  <div class="row justify-center">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div style="max-width:700px; width: 100%;" v-if="!loading">
        <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <message v-for="message in messages" :message="message" :key="message.id" />
        </transition-group>
        <choices label="What now?" icon="textsms" module="dialogueChoices" style="margin-top: 18px;" />
      </div>
    </transition>
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
    },
    loading: {
      get () {
        return this.$store.state.dialogue.loading
      }
    }
  },
  mounted () {
    this.$store.dispatch("dialogue/seen")
    this.$root.$emit("game:items", 'dialogue')
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
