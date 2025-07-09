export default class SplashScene extends Phaser.Scene {
  constructor() {
    super('SplashScene');
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // 🖼️ Mostrar el logo (centrado y arriba del texto)
    const logo = this.add.image(centerX, centerY - 200, 'logo');
    
    // Escalar si es muy grande (opcional)
    const maxWidth = this.sys.game.config.width * 0.6;
    const maxHeight = 150;
    const scaleX = maxWidth / logo.width;
    const scaleY = maxHeight / logo.height;
    const scale = Math.min(scaleX, scaleY, 1); // máximo 1: no agranda si es más chico
    logo.setScale(scale).setOrigin(0.5);

    // 📝 Textos informativos
    this.add.text(centerX, centerY - 50, 'Diseño y desarrollo de juegos interactivos II', {
      fontSize: '50px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 50, 'Proyecto Final: Blazing Emblem', {
      fontSize: '40px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 100, 'Gianmarco Rivera Carhuapoma', {
      fontSize: '30px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5);

    // 🎮 Iniciar con ENTER
    this.input.keyboard.on('keydown-ENTER', () => this.scene.start('MenuScene'));
  }
}
