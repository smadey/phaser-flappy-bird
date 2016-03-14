class Bird extends Phaser.Sprite {
  constructor (game, x, y, frame) {
    super(game, x, y, 'bird', frame)

    /**
     * Add a physics body
     */
    game.physics.arcade.enableBody(this)

    /**
     * Set the sprite's anchor to the center
     */
    this.anchor.setTo(0.5, 0.5)

    /**
     * Disable body on the bird until the game is started
     */
    this.body.enable = false

    this.checkWorldBounds = true
    this.outOfBoundsKill = true

    /**
     * Add and play animations
     */
    this.animations.add('flap')
    this.animations.play('flap', 12, true)

    this.flapSound = this.game.add.audio('flap')
  }

  update () {
    if (!this.body.enable) {
      return
    }

    /**
     * Check to see if our angle is less than 90, if it is rotate the bird towards the ground by 2.5 degrees
     */
    if (this.angle < 90) {
      this.angle += 2.5
    }
  }

  flap () {
    if (!this.body.enable) {
      return
    }

    this.flapSound.play()

    /**
     * Cause our bird to "jump" upward
     */
    this.body.velocity.y = -400

    /**
     * Rotate the bird to -40 degrees
     */
    this.game.add.tween(this).to({angle: -40}, 100).start()
  }

  startControl () {
    this.body.enable = true
  }

  stopControl () {
    this.body.enable = false
    this.animations.stop('flap')
  }
}

export default Bird
