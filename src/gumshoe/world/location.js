import List from './list.js'

class Location {
  constructor (store) {
    this.$store = store
    this.places = new List(store, 'places')
    this.people = new List(store, 'people')
    this.objects = new List(store, 'objects')
  }

  _reset () {
    this.places._reset()
    this.people._reset()
    this.objects._reset()
  }
}

export default Location
