export const TabMixin = {
  name: "TabMixin",
  computed: {
    tab: {
      get () {
        return this.$store.state.page.tab
      },
      set (val) {
        this.$store.commit('page/tab', val)
      }
    }
  }
}
