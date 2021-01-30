<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "TalkComponent"
}
</script>

<style lang="stylus">
</style>
