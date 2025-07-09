import LifeBarManager from '../utils/LifeBarManager.js';
import BattleManager from './BattleManager.js';

function createCenteredHudSprite(scene, key, scale = 3, offsetY = 0) {
  const sprite = scene.add.sprite(0, offsetY, key).setScale(scale).setVisible(true);
  AttackWindowManager.hudContainer.add(sprite);
  return sprite;
}

const AttackWindowManager = {
  hudContainer: null,
  transitionSprite: null,

  create(scene) {
    const width = scene.sys.game.config.width;
    const height = scene.sys.game.config.height;
    const hudWidth = 600;
    const hudHeight = 400;

    this.hudContainer = scene.add.container(width / 2, height / 2);
    const background = scene.add.rectangle(0, 0, hudWidth, hudHeight, 0x000000, 0.7)
      .setStrokeStyle(4, 0xffffff)
      .setOrigin(0.5)
      .setName('attackWindowBackground');

    this.hudContainer.add(background);
    this.hudContainer.setDepth(10).setVisible(false);
  },

  show() {
    this.hudContainer?.setVisible(true);
  },

  hide() {
    this.hudContainer?.setVisible(false);
  },

  clear() {
    if (this.hudContainer) {
      this.hudContainer.iterate(child => {
        if (child.name !== 'attackWindowBackground') {
          child.destroy();
        }
      });
    }
    this.transitionSprite = null;
  },

  showTransition(scene, gender, onComplete) {
    const key = gender === 'male' ? 'hector_transition' : 'serra_transition';

    this.clear();
    this.show();

    const sprite = createCenteredHudSprite(scene, key, 5);
    this.transitionSprite = sprite;

    sprite.play(key).once('animationcomplete', () => {
      onComplete?.();
    });
  },

  playSequence(scene, gender, audioUrl, attackData, onComplete) {
    const { attack_name, attack_animation, attack_effect, attack_sound, attack_damage, cast_animation } = attackData;
    
    if (!attack_name || !attack_animation || !attack_effect || !attack_sound) {
      console.warn("⚠️ Faltan datos de animación. Abortando secuencia.");
      this.hide();
      onComplete?.();
      return;
    }
  
    if (this.transitionSprite) {
      this.transitionSprite.destroy();
      this.transitionSprite = null;
    }
  
    this.clear();
    this.show();
  
    // 🆕 Mostrar nombre del ataque centrado debajo del HUD
    const attackText = scene.add.text(0, 180, attack_name, {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff',
      align: 'center',
      backgroundColor: '#000000',
      padding: { x: 15, y: 5 }
    }).setOrigin(0.5);
    this.hudContainer.add(attackText);
  
    const audio = new Audio(audioUrl);
    audio.play();
  
    const castSprite = createCenteredHudSprite(scene, cast_animation, 5);
    castSprite.play(cast_animation).once('animationcomplete', () => {
      castSprite.destroy();
    
      const attackSprite = createCenteredHudSprite(scene, attack_animation, 5);
      attackSprite.play(attack_animation).once('animationcomplete', () => {
        attackSprite.destroy();
      
        const hitSprite = createCenteredHudSprite(scene, attack_effect, 3.5, 0);
        hitSprite.x = -300;
        hitSprite.play(attack_effect);
        scene.sound.play(attack_sound);
      
        hitSprite.once('animationcomplete', () => {
          hitSprite.destroy();
          scene.enemigoHP = Math.max(0, scene.enemigoHP - attack_damage);
          LifeBarManager.setHP('enemigo', scene.enemigoHP);
        
          this.hide();
        
          const { width, height } = scene.scale;
        
          if (scene.recordButtonGroup) {
            scene.recordButtonGroup.setVisible(true);
          }
          if (scene.enableRecordButton) {
            scene.enableRecordButton();
          }
        
          if (scene.enemigoHP <= 0) {
            const label = scene.add.text(width / 2, height / 2, '¡Victoria!', {
              fontFamily: 'Arial',
              fontSize: '48px',
              color: '#ffffff',
              backgroundColor: '#000000',
              padding: { x: 20, y: 10 }
            }).setOrigin(0.5).setDepth(200);
          
            scene.time.delayedCall(2000, () => {
              scene.scene.start('MapScene');
            });
          } else {
            onComplete?.();
          }
        });
      });
    });
  }
};

export default AttackWindowManager;
