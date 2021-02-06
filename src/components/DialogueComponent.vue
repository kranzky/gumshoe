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
      <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-separator spaced color="secondary" style="margin-top: 24px;" v-if="choices.length > 0" :key="1" />
        <q-btn color="secondary" icon="message" label="What now?" class="float-right" v-if="choices.length > 0" :key="2" >
          <q-menu content-class="bg-primary" transition-show="fade" transition-hide="fade">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup v-for="choice in choices" :key="choice.id" @click="say(choice.id)">
                <q-item-section>
                  {{ choice.text }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </transition-group>
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
    find (id) {
      return this.$root.$lodash.find(this.choices, (choice) => { return choice.id == id })
    },
    say (id) {
      let choice = this.find(id)
      if (choice.action) {
        this.$root.$emit("game:action", choice.action)
      }
      this.$store.dispatch("dialogue/removeChoice", id)
    }
  },
  mounted () {
    this.$store.dispatch("dialogue/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("dialogue/seen")
  }
}
</script>

<style scoped lang="stylus">
</style>
