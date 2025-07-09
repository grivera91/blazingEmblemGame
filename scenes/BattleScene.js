import VoiceManager from '../utils/VoiceManager.js';
import AnimationManager from '../utils/AnimationManager.js';
import HUDManager from '../utils/HUDManager.js';
import AttackWindowManager from '../utils/AttackWindowManager.js';
import LifeBarManager from '../utils/LifeBarManager.js';
import BattleManager from '../utils/BattleManager.js';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create(data) {
    this.game.events.emit('play_music', 'battle_music');

    // 📥 Guardar posición previa del jugador
    this.playerStartX = data?.playerX ?? null;
    this.playerStartY = data?.playerY ?? null;

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const fondo = this.add.image(centerX, centerY, 'fondo');
    fondo.setScale(Math.max(this.sys.game.config.width / fondo.width, this.sys.game.config.height / fondo.height)).setScrollFactor(0);

    // 🧍 Sprites
    this.hector = this.add.sprite(centerX + 400, centerY - 150, 'hector').setScale(5);
    this.serra = this.add.sprite(centerX + 400, centerY + 50, 'serra').setScale(5);
    this.enemigo = this.add.sprite(centerX - 400, centerY - 50, 'enemigo').setScale(5);

    this.addIdleTweens();
    HUDManager.createBattleHUD(this);
    AnimationManager.registerAll(this);
    AttackWindowManager.create(this);
    LifeBarManager.createHPBars(this);

    this.attackSprite = this.add.sprite(centerX, centerY, 'hector_attack').setVisible(false).setScale(6);
    this.hitEffect = this.add.sprite(this.enemigo.x + 150, this.enemigo.y, 'normal_hit').setVisible(false).setScale(5);

    // 💖 Vidas iniciales
    this.hectorHP = 100;
    this.serraHP = 100;
    this.enemigoHP = 100;
    this.maxHP = 100;

    this.createRecordButton();

    // 🔁 Iniciar combate
    BattleManager.start(this);

    // 🎤 Evento tras detectar género y obtener datos del ataque
    VoiceManager.onGenderDetected = (scene, blob, gender) => {
      let animationDone = false;
      let battleData = null;

      const tryToPlay = () => {
        if (animationDone && battleData) {
          AttackWindowManager.playSequence(scene, gender, battleData.audioUrl, battleData, () => {
            BattleManager.markAttack(gender === 'male' ? 'hector' : 'serra');
          });
        }
      };

      AttackWindowManager.showTransition(scene, gender, () => {
        animationDone = true;
        tryToPlay();
      });

      VoiceManager.sendBattle(blob, gender, scene, (data) => {
        if (!data || !data.attack_animation) {
          console.error('❌ Respuesta inválida de la API de batalla:', data);
          AttackWindowManager.hide();
          return;
        }

        if (data.audioBase64) {
          const binary = atob(data.audioBase64);
          const byteArray = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            byteArray[i] = binary.charCodeAt(i);
          }
          const audioBlob = new Blob([byteArray], { type: 'audio/wav' });
          data.audioUrl = URL.createObjectURL(audioBlob);
        }

        battleData = data;
        tryToPlay();
      });
    };
  }

  addIdleTweens() {
    this.tweens.add({ targets: [this.hector, this.serra], scaleY: '+=0.2', yoyo: true, repeat: -1, duration: 2000, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: [this.hector, this.serra], y: '+=2', yoyo: true, repeat: -1, duration: 2000, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: [this.enemigo], scaleY: '+=0.2', yoyo: true, repeat: -1, duration: 2000, delay: 1000, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: [this.enemigo], y: '+=2', yoyo: true, repeat: -1, duration: 2000, delay: 1000, ease: 'Sine.easeInOut' });
  }

  createRecordButton() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2 + 200;
    const radius = 50;

    const circle = this.add.circle(centerX, centerY, radius, 0xff4444)
      .setStrokeStyle(4, 0xffffff)
      .setInteractive({ useHandCursor: true });

    const label = this.add.text(centerX, centerY, 'Dar instrucción', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: radius * 1.8 }
    }).setOrigin(0.5);

    const pulse = this.tweens.add({
      targets: circle,
      scale: { from: 1, to: 1.2 },
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    circle.on('pointerdown', () => {
      this.disableRecordButton(circle, label, pulse);

      // 🔇 Pausar toda la música durante la grabación
      this.sound.pauseAll();

      // Iniciar grabación
      VoiceManager.startRecording(this);

      // 🧠 Asegurar reanudación al terminar
      VoiceManager.onResultReceived = () => {
        this.sound.resumeAll();
      };
    });
    
    this.recordButtonGroup = this.add.container(0, 0, [circle, label]);
    this.recordButtonGroup.circle = circle;
    this.recordButtonGroup.label = label;
    this.recordButtonGroup.pulse = pulse;
  }

  disableRecordButton(circle = this.recordButtonGroup.circle, label = this.recordButtonGroup.label, pulse = this.recordButtonGroup.pulse) {
    circle.disableInteractive();
    label.setText("⏳ Ejecutando...");
    circle.setFillStyle(0x777777);
    pulse.pause();
  }

  enableRecordButton() {
    const { circle, label, pulse } = this.recordButtonGroup;
    circle.setInteractive();
    label.setText("Dar instrucción");
    circle.setFillStyle(0xff4444);
    pulse.resume();
  }

  update() {}
}
