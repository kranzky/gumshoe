<template>
  <div>
    <h4>Somewhere?</h4>
    <p class="text-body1">Slowly arising from nothingness, you imagine yourself sprawled in a chair. But something is amiss. This place feels different, but is still enshrouded in blackness.</p>
    <p class="text-body1">You need to pull yourself together.</p>
    <p class="text-body1">Although you <i>feel</i> nothing, <i>hear</i> nothing and <i>smell</i> nothing, you somehow know that those abilities are now available to you.</p>
    <q-btn color="secondary" icon="navigate_next" label="What now?">
      <q-menu content-class="bg-primary">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>Focus on your feelings</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Listen intently to the world around you</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Inhale deeply through your nostrils</q-item-section>
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
