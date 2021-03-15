import Entity from './entity.js'

class Transcript extends Entity {
  show () {
    this._show()
  }

  addHeading (body) {
    this._append({ heading: true, body: body })

  }

  addParagraph(title, subtitle, body) {
    this._append({ title: title, subtitle: subtitle, body: body })

  }

}

export default Transcript
