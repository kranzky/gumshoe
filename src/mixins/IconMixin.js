export const IconMixin = {
  name: "IconMixin",
  methods: {
    icon (item) {
      if (!_.isUndefined(item.icon)) {
        return item.icon
      }
      switch (item.type) {
        case 'room':
          return 'place'
        case 'bot':
          return 'face'
        case 'item':
          return 'label'
        case 'task':
          if (item.complete) {
            return 'assignment_turned_in'
          } else {
            return 'assignment_late'
          }
      }
      return 'help'
    }
  }
}
