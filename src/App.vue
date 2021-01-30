<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "gumshoe",
  mounted() {
    this.$q.dark.set(true)
  }
};
</script>

<style></style>
