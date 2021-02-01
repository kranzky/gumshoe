<template>
  <div>
    <q-chat-message label="Sunday, 11:00" />
    <q-chat-message name="Limbic System" avatar="~assets/avatar.png" :text="['IT IS TIME TO AWAKEN']" stamp="0 minutes ago" />
    <q-chat-message name="Yourself" avatar="~assets/avatar.png" sent :text="['huh?']" stamp="0 minutes ago" />
    <q-chat-message name="Yourself" avatar="~assets/avatar.png" sent :text="['where am i?']" stamp="0 minutes ago" />
  </div>
</template>

<script>
export default {
  name: "TalkComponent"
}
</script>

<style lang="stylus">
</style>
