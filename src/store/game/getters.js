export const showTime = state => {
  return !_.isNull(state.time)
}

export const showPlayer = state => {
  return !_.isNull(state.player)
}

export const showLocation = state => {
  return !_.isNull(state.location)
}

export const showScore = state => {
  return !_.isNull(state.score)
}
