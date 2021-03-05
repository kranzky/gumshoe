import { LocalStorage, SessionStorage } from 'quasar'
import Dexie from 'dexie'

// store player id and current room, item, bot etc in localstorage
// exits have name, origin id and destination id
// send actions to the server
// server returns events that mutate state
// render current state to the store

class Remote {
  constructor () {
    const db = new Dexie('Gumshoe')
  	db.version(1).stores({
      rooms: 'id',
      exits: 'id, startId, endId',
      items: 'id, roomId, botId, containerId',
      bots: 'id, roomId'
    })
  }

  run () {
  }

  update (action, entity, place) {
  }

  render (store) {
  }

  renderItems (type, store) {
  }

  getEntity (type, id) {
  }

  addRoom (name, description) {
  }

  addItem (name, description, canGet, canPut, prep) {
  }

  removeItem (item, store) {
  }

  addBot (name, description, lines) {
  }

  addQuest (name, description, success, trigger, tasks) {
  }

  look (roomId) {
  }

  examine (itemId) {
  }

  examine_bot (botId) {
  }

  examine_quest (questId) {
  }

  talk () {
  }

  take () {
  }

  drop () {
  }

  spawn () {
  }
}

export default Remote
