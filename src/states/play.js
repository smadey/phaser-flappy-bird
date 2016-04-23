import Bird from '../prefabs/bird'
import Ground from '../prefabs/ground'
import Pipe from '../prefabs/pipe'
import PipeGroup from '../prefabs/pipeGroup'
import Scoreboard from '../prefabs/scoreboard'

class PlayState {
  constructor () {
    this._ground = null

    this._bird = null

    this._pipes = null
    this._pipeGenerator = null

    this._instructionGroup = null

    this._score = null

    this._gameover = null

    this._scoreSound = null
    this._groundHitSound = null
    this._pipeHitSound = null
  }

  create () {
    /**
     * Setting global gravity for the game
     */
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    /**
     * Give our world an initial gravity of 1200
     */
    this.game.physics.arcade.gravity.y = 1200

    /**
     * Add the background sprite
     */
    this.game.add.sprite(0, 0, 'background')

    /**
     * Create and add a new Ground object
     */
    this._ground = new Ground(this.game, 0, 400, 335, 112)
    this.game.add.existing(this._ground)

    /**
     * Add the instructions and ready icon
     */
    this._instructionGroup = this.game.add.group()
    this._instructionGroup.add(this.game.add.sprite(this.game.width / 2, 100, 'getReady'))
    this._instructionGroup.add(this.game.add.sprite(this.game.width / 2, 325, 'instructions'))
    this._instructionGroup.setAll('anchor.x', 0.5)
    this._instructionGroup.setAll('anchor.y', 0.5)

    /**
     * Create and add a new Bird object
     */
    this._bird = new Bird(this.game, 100, this.game.height / 2)
    this.game.add.existing(this._bird)

    /**
     * Create and add a group to hold our pipeGroup prefabs
     */
    this._pipes = this.game.add.group()

    this._score = 0
    this._scoreText = this.game.add.bitmapText(this.game.width / 2, 10, 'flappyfont', this._score.toString(), 24)
    this._scoreText.visible = false

    /**
     * Keep the spacebar from propogating up to the browser
     */
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR])

    /**
     * Add keyboard controls
     */
    let flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    flapKey.onDown.addOnce(this._startGame, this)
    flapKey.onDown.add(this._bird._flap, this._bird)

    /**
     * Add mouse/touch controls
     */
    this.input.onDown.addOnce(this._startGame, this)
    this.input.onDown.add(this._bird._flap, this._bird)

    this._gameover = false

    this._scoreSound = this.game.add.audio('score')
    this._groundHitSound = this.game.add.audio('groundHit')
    this._pipeHitSound = this.game.add.audio('pipeHit')
  }

  update () {
    if (this._gameover) {
      return
    }

    if (!this._bird.inWorld) {
      this._deathHandler()
      return
    }

    /**
     * Enable collisions between the bird and the ground
     */
    this.game.physics.arcade.collide(this._bird, this._ground, this._deathHandler, null, this)

    this._pipes.forEach(pipeGroup => {
      this.game.physics.arcade.collide(this._bird, pipeGroup, this._deathHandler, null, this)

      if (pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this._bird.world.x) {
        pipeGroup.hasScored = true

        this._score++
        this._scoreText.setText(this._score.toString())
        this._scoreSound.play()
      }
    })
  }

  shutdown () {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR)
    this._bird.destroy()
    this._pipes.destroy()
    this._scoreboard.destroy()
  }

  _startGame () {
    if (this._gameover) {
      return
    }

    this._instructionGroup.destroy()

    this._bird._start()

    this._pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, () => {
      let pipeY = this.game.rnd.integerInRange(-100, 100)
      let pipeGroup = this._pipes.getFirstExists(false)

      if (!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this._pipes)
      }

      pipeGroup._reset(this.game.width, pipeY)
    }, this)
    this._pipeGenerator.timer.start()

    this._scoreText.visible = true
  }

  _deathHandler (bird, enemy) {
    if (this._gameover) {
      return
    }

    this._gameover = true

    if (enemy instanceof Ground) {
      this._groundHitSound.play()
    } else if (enemy instanceof Pipe) {
      this._pipeHitSound.play()
    }

    this._ground._stop()

    this._bird._stop()

    this._pipes.forEach(pipeGroup => pipeGroup._stop())
    this._pipeGenerator.timer.stop()

    this._scoreboard = new Scoreboard(this.game)
    this._scoreboard._show(this._score)
    this.game.add.existing(this._scoreboard)
  }
}

export default PlayState
