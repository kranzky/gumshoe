<template>
  <div class="row justify-center">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div style="max-width:700px; width: 100%;" v-if="visible">
        <q-breadcrumbs active-color="secondary">
          <template v-slot:separator>
            <q-icon size="1.2em" name="arrow_forward" />
          </template>
          <q-breadcrumbs-el v-for="crumb in crumbs" :key="crumb.id" :label="crumb.name" @click="action(crumb)" class="cursor-pointer" />
        </q-breadcrumbs>
        <div>
          <q-btn class="glossy float-right" round outline color="secondary" :icon="bookmarked ? 'bookmark' : 'bookmark_border'" size="sm" @click="toggleBookmark" />
          <h4 style="margin-top: 24px;">{{ title }}<span v-if="subtitle"><br /><small>({{ subtitle }})</small></span></h4>
        </div>
        <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <p class="text-body1" v-for="item in items" :key="item.id">
            {{ item.text }}
          </p>
        </transition-group>
        <choices label="What now?" icon="construction" module="entityChoices" />
        <options module="entityOptions" />
      </div>
    </transition>
  </div>
</template>

<script>
import { ActionMixin } from "../mixins/ActionMixin.js"

export default {
  name: "EntityComponent",
  mixins: [ActionMixin],
  computed: {
    title: {
      get () {
        return this.$store.state.entity.title
      }
    },
    subtitle: {
      get () {
        return this.$store.state.entity.subtitle
      }
    },
    items: {
      get () {
        return this.$store.state.entityItems.items
      }
    },
    visible: {
      get () {
        // TODO: make this a getter on the store instead
        return this.$store.state.entity.visible && !_.isNull(this.$store.state.entity.title)
      }
    },
    crumbs: {
      get () {
        return this.$store.state.entityCrumbs.items
      }
    },
    id: {
      get () {
        return this.$store.state.entity.id
      }
    },
    type: {
      get () {
        return this.$store.state.entity.type
      }
    },
    bookmarked: {
      get () {
        return !_.isUndefined(_.find(this.$store.state.notebook.items, (item) => { return item.id == this.current }))
      }
    }
  },
  methods: {
    toggleBookmark () {
      if (!this.bookmarked) {
        this.$root.$emit("game:mark", this.type, this.id)
      } else {
        this.$root.$emit("game:unmark", this.type, this.id)
      }
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
    "choices": () => import("components/ChoiceComponent.vue"),
    "options": () => import("components/OptionComponent.vue")
  }
}
</script>
