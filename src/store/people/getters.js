function unseen (state) {
  return _.filter(state.items, (item) => { return !item.seen }).length
}

export const badgeCount = state => {
  return unseen(state)
}

export const hasItems = state => {
  return state.items.length > 0
}

export const showBadge = state => {
  return unseen(state) > 0
}
