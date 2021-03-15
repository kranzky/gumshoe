export const showBadge = (state, getters, rootState, rootGetters) => {
  return !state.seen || rootGetters['questItems/showBadge']
}

export const contentVisible = (state) => {
  return state.visible && !_.isNull(state.title)
}