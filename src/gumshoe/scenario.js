import Remote from './scenarios/remote.js'
import Demo from './scenarios/demo.js'
import Prologue from './scenarios/prologue.js'
import Example from './scenarios/example.js'

export default function (scenario, world) {
  switch (scenario) {
    case 'remote':
      return new Remote(world)
    case 'demo':
      return new Demo(world)
    case 'prologue':
      return new Prologue(world)
    case 'example':
      return new Example(world)
  }
}
