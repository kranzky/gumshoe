export function addItem(state, data) {
  state.items.append(data)
}

export function setBadge(state, data) {
  state.badge = data;
}
