import BootState from './states/boot'
import PreloadState from './states/preload'
import MenuState from './states/menu'
import PlayState from './states/play'

let game = new Phaser.Game(288, 505, Phaser.auto, 'flappy-bird')

game.state.add('boot', BootState)
game.state.add('preload', PreloadState)
game.state.add('menu', MenuState)
game.state.add('play', PlayState)

game.state.start('boot')

// this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
// this.game.scale.pageAlignVertically = true
// this.game.scale.startFullScreen(false)
