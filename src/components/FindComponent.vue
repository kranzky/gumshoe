<template>
  <div>
    <q-page>
      <q-page-sticky position="top" class="bg-accent text-white">
        <q-toolbar>
          <q-breadcrumbs>
            <template v-slot:separator>
              <q-icon size="1.2em" name="arrow_forward" />
            </template>
            <q-breadcrumbs-el label="Chaos" />
            <q-breadcrumbs-el label="Brilliance" />
            <q-breadcrumbs-el label="Nothingness" />
            <q-breadcrumbs-el label="Somewhere" />
          </q-breadcrumbs>
        </q-toolbar>
      </q-page-sticky>
      <h4>Somewhere</h4>
      <p class="text-body1">Slowly arising from nothingness, you imagine yourself sprawled in a chair. But something is amiss. This place feels different, but is still enshrouded in blackness.</p>
      <p class="text-body1">You need to pull yourself together.</p>
      <p class="text-body1">Although you see nothing, hear nothing and smell nothing, you somehow know that those abilities are now available to you.</p>
      <p class="text-body1">What will you do?</p>
      <q-page-sticky position="top-right" :offset="[18, 64]">
        <q-btn fab icon="explore" color="secondary" />
      </q-page-sticky>
      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn fab icon="construction" color="secondary" />
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
