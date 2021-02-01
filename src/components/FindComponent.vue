<template>
  <div>
    <h4>Nothingness.</h4>
    <p class="text-body1">
      A lingering memory of chaos intrudes upon the void.
    </p>
    <q-btn color="secondary" icon="navigate_next" label="What now?">
      <q-menu content-class="bg-primary">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>
              What is there to do but wait?
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "FindComponent"
}
</script>

<style lang="stylus">
</style>
