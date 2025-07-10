import AttackWindowManager from './AttackWindowManager.js';
import LifeBarManager from './LifeBarManager.js';

const BattleManager = {
  scene: null,
  hasAttacked: {
    hector: false,
    serra: false
  },
  turnLabel: null,

  start(scene) {
    this.scene = scene;

    this.turnLabel = scene.add.text(scene.scale.width / 2, 20, 'Turno del jugador', {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(100);

    this.resetTurnFlags();
    this.updateTurnLabel();
  },

  resetTurnFlags() {
    this.hasAttacked = { hector: false, serra: false };
  },

  updateTurnLabel(isEnemyTurn = false) {
    if (this.turnLabel) {
      this.turnLabel.setText(isEnemyTurn ? 'Turno del enemigo' : 'Turno del jugador');
    }
  },

  markAttack(actor) {
    this.hasAttacked[actor] = true;

    if (this.bothAttacked()) {
      this.updateTurnLabel(true); // turno enemigo

      //Oculta el botón durante el turno del enemigo
      this.scene.recordButtonGroup?.setVisible(false);

      this.scene.time.delayedCall(1000, () => {
        this.enemyAttack(() => {
          this.resetTurnFlags();
          this.updateTurnLabel(false);

          //Reactiva el botón tras el turno del enemigo
          this.scene.recordButtonGroup?.setVisible(true);
          this.scene.enableRecordButton?.();
        });
      });
    }
  },

  bothAttacked() {
    return this.hasAttacked.hector && this.hasAttacked.serra;
  },

  enemyAttack(onFinish) {
    const target = Math.random() < 0.5 ? 'hector' : 'serra';
    const damage = 20;
    const animationKey = 'enemy_normal_attack';
    const hitEffectKey = 'normal_hit';
    const soundKey = 'hit_sound_normal';

    AttackWindowManager.clear();
    AttackWindowManager.show();

    const sprite = this.scene.add.sprite(0, 0, animationKey).setScale(3.5);
    AttackWindowManager.hudContainer.add(sprite);
    sprite.play(animationKey);

    sprite.once('animationcomplete', () => {
      sprite.destroy();

      const hitSprite = this.scene.add.sprite(500, -150, hitEffectKey).setScale(3.5);
      AttackWindowManager.hudContainer.add(hitSprite);
      hitSprite.play(hitEffectKey);
      this.scene.sound.play(soundKey);

      hitSprite.once('animationcomplete', () => {
        hitSprite.destroy();

        const currentHP = LifeBarManager.getHP(target);
        const newHP = Math.max(0, currentHP - damage);
        LifeBarManager.setHP(target, newHP);

        AttackWindowManager.hide();

        if (newHP <= 0) {
          this.endBattle('¡Derrota!');
          return;
        }

        onFinish?.();
      });
    });
  },

  endBattle(message = 'Fin de la batalla') {
    const { width, height } = this.scene.scale;

    const label = this.scene.add.text(width / 2, height / 2, message, {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setDepth(200);

    this.scene.time.delayedCall(2000, () => {
      this.scene.scene.start('MapScene');
    });
  }
};

export default BattleManager;
