class Ground extends Phaser.TileSprite {
  constructor (game, x, y, width, height) {
    super(game, x, y, width, height, 'ground')

    /**
     * Enable physics on the ground sprite, this is needed for collision detection
     */
    game.physics.arcade.enableBody(this)

    /**
     * start scrolling our ground
     */
    this.autoScroll(-200, 0)

    /**
     * We don't want the ground's body to be affected by gravity
     */
    this.body.allowGravity = false

    /**
     * Tells the physics system that any Ground object created should only react to physics created and set by itself, and not from external forces
     */
    this.body.immovable = true
  }

  _stop () {
    this.stopScroll()
  }
}

export default Ground
