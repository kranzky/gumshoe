<template>
  <q-page>
      <q-chat-message
        label="Sunday, 11:00 AM"
      />

      <q-chat-message
        name="Limbic System"
        :text="['IT IS TIME TO AWAKEN']"
        stamp="7 minutes ago"
      />
      <q-chat-message
        name="Claustrum"
        sent
        :text="['huh?']"
        stamp="4 minutes ago"
      />
      <q-chat-message
        name="Claustrum"
        sent
        :text="['where am i?']"
        stamp="2 minutes ago"
      />
  </q-page>
</template>

<script>
export default {
  name: "TalkComponent"
}
</script>

<style lang="stylus">
</style>
