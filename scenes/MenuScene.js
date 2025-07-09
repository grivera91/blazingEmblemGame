export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.game.events.emit('play_music', 'main_music');
    
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // 🖼️ Fondo centrado y ajustado proporcionalmente
    const fondo = this.add.image(centerX, centerY, 'menu');
    const scaleX = this.sys.game.config.width / fondo.width;
    const scaleY = this.sys.game.config.height / fondo.height;
    const scale = Math.min(scaleX, scaleY);
    fondo.setScale(scale).setScrollFactor(0);

    // 🔘 Botón iniciar
    this.startButton = this.add.text(centerX, centerY + 350, 'Iniciar Juego', {
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 20, y: 10 },
      fontFamily: 'Arial',
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#ffffff',
        blur: 0,
        stroke: false,
        fill: true
      }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    // ✨ Efecto de brillo intermitente
    this.tweens.add({
      targets: this.startButton,
      alpha: { from: 1, to: 0.6 },
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // 🖱️ Efectos al pasar el mouse (hover)
    this.startButton.on('pointerover', () => {
      this.startButton.setStyle({ backgroundColor: '#5555ff', color: '#ffffcc' });
      this.startButton.setShadow(2, 2, '#000000', 3, true, true);
    });

    // 🖱️ Restaurar estilo al quitar el mouse
    this.startButton.on('pointerout', () => {
      this.startButton.setStyle({ backgroundColor: '#333333', color: '#ffffff' });
      this.startButton.setShadow(0, 0, '#ffffff', 0, false, false);
    });

    // 🖱️ Efecto al hacer clic
    this.startButton.on('pointerdown', () => {
      this.startButton.setStyle({ backgroundColor: '#222222' });
      this.scene.start('MapScene');
    });

    // ⌨️ Enter también inicia el juego
    this.input.keyboard.on('keydown-ENTER', () => this.scene.start('MapScene'));
  }
}
