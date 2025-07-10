export default class BackgroundScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BackgroundMusicScene', active: true });
  }

  create() {
    this.music = null;
    this.currentKey = null;

    // Escuchar eventos de cambio de música
    this.game.events.on('play_music', this.playMusic, this);
  }

  playMusic(key) {
    if (this.currentKey === key) return;

    // Detener música anterior
    if (this.music) {
      this.music.stop();
      this.music.destroy();
    }

    // Iniciar nueva música
    this.music = this.sound.add(key, { loop: true, volume: 0.5 });
    this.music.play();
    this.currentKey = key;
  }
}