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
      <q-btn color="secondary" :icon="menu.icon" :label="menu.label" class="float-right">
        <q-menu content-class="bg-primary">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-for="choice in menu.choices" :key="choice.id" @click="say(choice)">
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
  data () {
    return {
      messages: [
        {
          id: 1,
          heading: true,
          label: "Sunday, 11:00"
        },
        {
          id: 2,
          name: "Other Person",
          text: ["This is my message.", "And this is another."],
          time: "1 minute ago"
        },
        {
          id: 3,
          name: "Yourself",
          text: ["Well, there you go!"],
          time: "1 minute ago",
          player: true
        },
        {
          id: 4,
          name: "Other Person",
          text: ["JUST TESTING DUDE"],
          time: "1 minute ago"
        }
      ],
      menu: {
        icon: "message",
        label: "Say Something.",
        choices: [
          { id: 1, text: "Blah blah." },
          { id: 2, text: "Rhubarb?" }
        ]
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
  }
}
</script>

<style scoped lang="stylus">
</style>
