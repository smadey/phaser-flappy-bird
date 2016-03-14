class Pipe extends Phaser.Sprite {
  constructor (game, x, y, frame) {
    super(game, x, y, 'pipe', frame)

    /**
     * Set the sprite's anchor to the center
     */
    this.anchor.setTo(0.5, 0.5)

    /**
     * Enable physics on the ground sprite, this is needed for collision detection
     */
    this.game.physics.arcade.enableBody(this)

    /**
     * We don't want the ground's body to be affected by gravity
     */
    this.body.allowGravity = false

    /**
     * Tells the physics system that any Ground object created should only react to physics created and set by itself, and not from external forces
     */
    this.body.immovable = true
  }
}

export default Pipe
