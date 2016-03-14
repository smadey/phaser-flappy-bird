import Pipe from './pipe'

class PipeGroup extends Phaser.Group {
  constructor (game, parent) {
    super(game, parent)

    this.topPipe = new Pipe(this.game, 0, 0, 0)
    this.add(this.topPipe)

    // y = pipe.height + (bird.height * 5)
    this.bottomPipe = new Pipe(this.game, 0, 440, 1)
    this.add(this.bottomPipe)

    this.setAll('body.velocity.x', -200)

    this.hasScored = false
  }

  update () {
    if (!this.topPipe.inWorld) {
      this.exists = false
    }
  }

  reset (x, y) {
    this.topPipe.reset(0, 0)

    this.bottomPipe.reset(0, 440)

    this.x = x
    this.y = y

    this.setAll('body.velocity.x', -200)

    this.hasScored = false

    this.exists = true
  }

  stop () {
    this.setAll('body.velocity.x', 0)
  }
}

export default PipeGroup
