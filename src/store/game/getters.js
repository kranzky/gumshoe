export const showTime = state => {
  return !_.isNull(state.time)
}

export const showPlayer = state => {
  return !_.isNull(state.player)
}

export const showScore = state => {
  return !_.isNull(state.score)
}
