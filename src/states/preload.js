class PreloadState {
  constructor () {
    this._asset = null
    this._ready = false
  }

  preload () {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    this.game.scale.pageAlignVertically = true

    this.load.onLoadComplete.addOnce(() => (this._ready = true), this)

    this._asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader')
    this._asset.anchor.setTo(0.5, 0.5)
    this.load.setPreloadSprite(this._asset)

    this.load.image('background', 'assets/images/background.png')
    this.load.image('ground', 'assets/images/ground.png')
    this.load.image('title', 'assets/images/title.png')
    this.load.image('startButton', 'assets/images/start-button.png')

    this.load.spritesheet('bird', 'assets/sprites/bird.png', 34, 24, 3)
    this.load.spritesheet('pipe', 'assets/sprites/pipes.png', 54, 320, 2)

    this.load.image('instructions', 'assets/images/instructions.png')
    this.load.image('getReady', 'assets/images/get-ready.png')

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt')

    this.load.audio('score', 'assets/audio/score.wav')
    this.load.audio('flap', 'assets/audio/flap.wav')
    this.load.audio('pipeHit', 'assets/audio/pipe-hit.wav')
    this.load.audio('groundHit', 'assets/audio/ground-hit.wav')

    this.load.image('scoreboard', 'assets/images/scoreboard.png')
    this.load.image('gameover', 'assets/images/gameover.png')
    this.load.image('particle', 'assets/images/particle.png')
    this.load.spritesheet('medals', 'assets/sprites/medals.png', 44, 46, 2)
  }

  create () {
    this._asset.cropEnabled = false
  }

  update () {
    if (this._ready) {
      this.game.state.start('menu')
    }
  }
}

export default PreloadState
