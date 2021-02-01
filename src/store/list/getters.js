export const badgeCount = state => {
  return _.filter(state.items, (item) => { return !item.seen }).length
}
