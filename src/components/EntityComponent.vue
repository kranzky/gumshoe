<template>
  <div class="row justify-center">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div style="max-width:700px; width: 100%;" v-if="!loading">
        <q-breadcrumbs active-color="secondary">
          <template v-slot:separator>
            <q-icon size="1.2em" name="arrow_forward" />
          </template>
          <q-breadcrumbs-el v-for="crumb in crumbs" :key="crumb.id" :label="crumb.name" @click="nav(crumb)" class="cursor-pointer" />
        </q-breadcrumbs>
        <h4 style="margin-top: 24px;">{{ title }}</h4>
        <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <p class="text-body1" v-for="item in items" :key="item.id">
            {{ item.text }}
          </p>
        </transition-group>
        <choices label="What now?" icon="construction" module="entityChoices" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "EntityComponent",
  computed: {
    title: {
      get () {
        return this.$store.state.entity.title
      }
    },
    items: {
      get () {
        return this.$store.state.entityItems.items
      }
    },
    loading: {
      get () {
        return this.$store.state.entity.loading
      }
    },
    crumbs: {
      get () {
        return _.reverse(this.$store.state.entityCrumbs.items)
      }
    }
  },
  methods: {
    nav (crumb) {
      this.$root.$emit("game:view", crumb)
    }
  },
  mounted () {
    this.$store.dispatch("entity/seen")
    this.$root.$emit("game:items", 'entity')
  },
  beforeDestroy () {
    this.$store.dispatch("entity/seen")
  },
  components: {
    "choices": () => import("components/ChoiceComponent.vue")
  }
}
</script>
