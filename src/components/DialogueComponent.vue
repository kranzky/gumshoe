<template>
  <div class="row justify-center">
    <div style="max-width:700px; width: 100%;">
      <q-chat-message v-for="message in messages" size=6
        :key="message.id"
        :label="message.label"
        :name="message.name"
        :text="message.text"
        :stamp="message.time"
        :avatar="avatar(message)"
        :sent="message.player"
      />
      <q-separator spaced style="margin-top: 24px;" />
      <q-btn color="secondary" icon="message" label="What Now?" class="float-right" v-if="choices.length > 0">
        <q-menu content-class="bg-primary">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-for="choice in choices" :key="choice.id" @click="say(choice)">
              <q-item-section>
                {{ choice.text }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogueComponent",
  computed: {
    messages: {
      get () {
        return this.$store.state.dialogue.items
      }
    },
    choices: {
      get () {
        return this.$store.state.dialogue.choices
      }
    }
  },
  methods: {
    avatar (message) {
      return message.label ? undefined : "images/avatar.png"
    },
    say (choice) {
      this.$root.$emit("choice:selected")
      this.$root.$emit("punk:success", `You said '${choice.text}'!`)
    }
  },
  mounted () {
    this.$store.dispatch("dialogue/seen")
  }
}
</script>

<style scoped lang="stylus">
</style>
