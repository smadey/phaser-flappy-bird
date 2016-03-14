class BootState {
  preload () {
    this.load.image('preloader', 'assets/images/preloader.gif')
  }

  create () {
    this.game.input.maxPointers = 1
    this.game.state.start('preload')
  }
}

export default BootState
