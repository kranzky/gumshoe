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
        name="Thalamus"
        sent
        :text="['huh?']"
        stamp="4 minutes ago"
      />
      <q-chat-message
        name="Thalamus"
        sent
        :text="['where am i?']"
        stamp="2 minutes ago"
      />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="chat" color="secondary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "TalkComponent"
}
</script>

<style lang="stylus">
</style>
