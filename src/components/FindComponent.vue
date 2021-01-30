<template>
  <div>
    <q-page>
      <div>
        <h4>Somewhere?</h4>
        <p class="text-body1">Slowly arising from nothingness, you imagine yourself sprawled in a chair. But something is amiss. This place feels different, but is still enshrouded in blackness.</p>
        <p class="text-body1">You need to pull yourself together.</p>
        <p class="text-body1">Although you feel nothing, hear nothing and smell nothing, you somehow know that those abilities are now available to you.</p>
      </div>
      <q-btn color="secondary" icon="construction" label="What Now?">
        <q-menu content-class="bg-primary">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Focus on your feelings</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Inhale deeply through your nostrils</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Listen intently to the world around you</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-page-sticky position="top" class="bg-accent text-white">
        <q-toolbar>
          <q-breadcrumbs>
            <template v-slot:separator>
              <q-icon size="1.2em" name="arrow_forward" />
            </template>
            <q-breadcrumbs-el label="..." />
            <q-breadcrumbs-el label="Chaos" />
            <q-breadcrumbs-el label="Nothingness" />
            <q-breadcrumbs-el label="Somewhere" />
          </q-breadcrumbs>
        </q-toolbar>
      </q-page-sticky>
    </q-page>
  </div>
</template>

<script>
export default {
  name: "FindComponent"
}
</script>

<style lang="stylus">
</style>
