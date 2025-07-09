import AnimationManager from '../utils/AnimationManager.js';

export default class MapScene extends Phaser.Scene {
  constructor() {
    super('MapScene');
  }

  create(data) {
    this.game.events.emit('play_music', 'map_music');

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const mapaTexture = this.textures.get('mapa').getSourceImage();
    const scaleX = this.sys.game.config.width / mapaTexture.width;
    const scaleY = this.sys.game.config.height / mapaTexture.height;
    const scale = Math.min(scaleX, scaleY);

    const fondo = this.add.image(centerX, centerY, 'mapa')
      .setScale(scale)
      .setScrollFactor(0)
      .setName('mapa');

    AnimationManager.registerAll(this);

    const fondoLeft = centerX - (mapaTexture.width * scale) / 2;
    const fondoTop = centerY - (mapaTexture.height * scale) / 2;

    // 🧍 Posición del jugador
    const playerX = data?.fromBattle && data.victory ? data.lastPlayerX : fondoLeft + 32;
    const playerY = data?.fromBattle && data.victory ? data.lastPlayerY : fondoTop + 32;

    this.player = this.physics.add.sprite(playerX, playerY, 'player_idl')
      .setScale(5)
      .setDepth(2)
      .setCollideWorldBounds(true);

    this.player.play('player_idl');

    // 🧟 Mostrar enemigo solo si no fue victoria
    const showEnemy = !(data?.fromBattle && data.victory);

    if (showEnemy) {
      const enemyX = fondoLeft + 1050;
      const enemyY = fondoTop + 150;

      this.enemy = this.physics.add.sprite(enemyX, enemyY, 'enemy_axe_idl')
        .setScale(5)
        .setDepth(2)
        .setImmovable(true);

      this.physics.add.collider(this.player, this.enemy, () => {
        this.initiateBattleTransition();
      });
    }

    // 🎮 Controles
    this.cursors = this.input.keyboard.createCursorKeys();

    const centerYText = centerY + 120;
    // this.battleButton = this.add.text(centerX, centerYText, '⚔️ Batalla', {
    //   fontSize: '28px',
    //   color: '#ffffff',
    //   backgroundColor: '#333333',
    //   padding: { x: 20, y: 10 },
    //   fontFamily: 'Arial'
    // }).setOrigin(0.5).setInteractive().setDepth(3);

    // this.battleButton.on('pointerdown', () => this.initiateBattleTransition());
    // this.input.keyboard.on('keydown-ENTER', () => this.initiateBattleTransition());

    this.transitioning = false;
  }

  update() {
    const speed = 300;
    let moving = false;

    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.play('player_left_walk', true);
      moving = true;
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.play('player_right_walk', true);
      moving = true;
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.play('player_up_walk', true);
      moving = true;
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.play('player_down_walk', true);
      moving = true;
    }

    if (!moving) {
      this.player.play('player_idl', true);
    }

    const fondo = this.children.getByName('mapa');
    const scale = fondo.scaleX;
    const fondoWidth = fondo.width * scale;
    const fondoHeight = fondo.height * scale;

    const fondoLeft = fondo.x - fondoWidth / 2;
    const fondoRight = fondo.x + fondoWidth / 2;
    const fondoTop = fondo.y - fondoHeight / 2;
    const fondoBottom = fondo.y + fondoHeight / 2;

    const halfPlayerWidth = this.player.displayWidth / 2;
    const halfPlayerHeight = this.player.displayHeight / 2;

    this.player.x = Phaser.Math.Clamp(this.player.x, fondoLeft + halfPlayerWidth, fondoRight - halfPlayerWidth);
    this.player.y = Phaser.Math.Clamp(this.player.y, fondoTop + halfPlayerHeight, fondoBottom - halfPlayerHeight);
  }

  initiateBattleTransition() {
    if (this.transitioning) return;
    this.transitioning = true;

    const playerX = this.player.x;
    const playerY = this.player.y;

    this.cameras.main.fadeOut(800, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('BattleScene', { playerX, playerY });
    });
  }
}
