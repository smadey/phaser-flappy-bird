import Bird from '../prefabs/bird'
import Ground from '../prefabs/ground'

class MenuState {
  create () {
    /**
     * Add the background sprite
     */
    this.game.add.sprite(0, 0, 'background')

    /**
     * Add the ground sprite as a tile and start scrolling in the negative x direction
     */
    let ground = new Ground(this.game, 0, 400, 335, 112)
    this.game.add.existing(ground)

    /**
     * Create a group to put the title assets in, so they can be manipulated as a whole
     */
    let tileGroup = this.game.add.group()

    /**
     * Create the title sprite and add it to the group
     */
    let title = this.game.add.sprite(0, 0, 'title')
    tileGroup.add(title)

    /**
     * Create the bird sprite and add it to the group
     */
    let bird = new Bird(this.game, 200, 5)
    tileGroup.add(bird)

    /**
     * Set the originating location of the group
     */
    tileGroup.x = (this.game.width - tileGroup.width) / 2
    tileGroup.y = 75

    /**
     * create an oscillating animation tween for the group
     */
    this.game.add.tween(tileGroup).to({y: tileGroup.y + 15}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true)

    /**
     * Add our start button with a callback
     */
    let startButton = this.game.add.button(this.game.width / 2, 325, 'startButton', this.startClick, this)
    startButton.anchor.setTo(0.5, 0.5)
  }

  /**
   * start button click handler
   */
  startClick () {
    /**
     * start the 'play' state
     */
    this.game.state.start('play')
  }
}

export default MenuState
