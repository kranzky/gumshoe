export const showBadge = state => {
  return _.some(state.items, (item) => { return !item.seen })
}

export const badgeCount = state => {
  return _.filter(state.items, (item) => { return !item.seen }).length
}
