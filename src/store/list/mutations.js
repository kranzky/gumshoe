import { uid } from 'quasar'

export function clear(state) {
  state.items = []
}

export function hide(state) {
  state.visible = false
}

export function show(state) {
  state.visible = true
}

export function seen(state, id) {
  if (_.isUndefined(id)) {
    _.each(state.items, (item) => { item.seen = true })
  } else {
    let item = _.find(state.items, (item) => { return item.id == id })
    item.seen = true
  }
}

export function append(state, item) {
  if (_.isEmpty(item.id)) {
    item.id = uid()
  }
  if (_.isUndefined(item.seen)) {
    item.seen = false
  }
  state.items.push(item)
}

export function remove(state, id) {
  let index = _.findIndex(state.items, (item) => { return item.id == id })
  state.items.splice(index, 1)
}