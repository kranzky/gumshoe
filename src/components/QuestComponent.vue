<template>
  <div class="row justify-center">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div style="max-width:700px; width: 100%;" v-if="!loading">
        <h4>{{ title }}</h4>
        <p class="text-body1">{{ description }}</p>
        <q-list>
          <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <q-item tag="label" v-for="item in items" :key="item.id">
              <q-item-section avatar style="padding-right: 0;">
                <q-checkbox :value="item.done" />
              </q-item-section>
              <q-item-section>
                <q-item-label :class="item.done ? 'text-strike' : ''">{{ item.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </transition-group>
        </q-list>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "QuestComponent",
  computed: {
    title: {
      get () {
        return this.$store.state.quest.title
      }
    },
    description: {
      get () {
        return this.$store.state.quest.description
      }
    },
    items: {
      get () {
        return this.$store.state.questItems.items
      }
    },
    loading: {
      get () {
        return this.$store.state.quest.loading
      }
    }
  },
  mounted () {
    this.$store.dispatch("quest/seen")
  },
  beforeDestroy () {
    this.$store.dispatch("quest/seen")
  }
}
</script>

<style scoped lang="stylus">
</style>
