export function title(state, data) {
  state.title = data;
  document.title = data;
}

export function tab(state, data) {
  state.tab = data;
}
