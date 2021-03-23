export const ActionMixin = {
  name: "ActionMixin",
  methods: {
    action (item) {
      if (_.isUndefined(item.action)) {
        this.$root.$emit("punk:error", `No action defined: ${item.id}`) 
        return
      }
      let payload = {
        id: item.id,
        action: item.action,
        data: item.data || {}
      }
      // TODO: also perhaps a default UI action for the component
      //       (e.g. selecting a different tab)
      this.$root.$emit("game:action", payload)
    }
  }
}
