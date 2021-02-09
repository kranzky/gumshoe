<template>
  <q-chat-message size=6
    :label="message.label"
    :name="message.name"
    :text="lines"
    :stamp="typing ? message.name + ' is typing...' : message.time"
    :avatar="avatar"
    :sent="message.player"
  >
    <q-spinner-dots size="1rem" v-if="typing" />
  </q-chat-message>
</template>

<script>
export default {
  name: "MessageComponent",
  props: {
    message: {
      default: {}
    }
  },
  data () {
    return {
      typing: _.isEmpty(this.message.label),
      avatar: this.message.label ? undefined : "images/avatar.png",
      lines: [],
      remain: this.message.text
    }
  },
  methods: {
    showMessage () {
      setTimeout (() => {
        this.typing = false
        if (!_.isUndefined(this.remain) && this.remain.length > 0) {
          this.lines.push(_.first(this.remain))
          this.remain = _.drop(this.remain)
          if (this.remain.length > 0) {
            this.typing = true
            this.showMessage()
          }
        }
      }, 1000)
    }
  },
  mounted () {
    this.showMessage()
  }
}
</script>

<style scoped lang="stylus">
</style>
