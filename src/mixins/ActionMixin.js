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
      console.log(payload)
      this.$root.$emit("game:action", payload)
    }
  }
}
