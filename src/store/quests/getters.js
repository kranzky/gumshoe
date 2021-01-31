export const badgeCount = state => {
  return state.items.length
}

export const showBadge = state => {
  return state.items.length == 0
}
