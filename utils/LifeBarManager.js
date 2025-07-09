const LifeBarManager = {
  bars: {},

  create(scene, id, x, y, maxHP = 100, width = 200, height = 20) {
    const bg = scene.add.graphics();
    bg.fillStyle(0x333333, 1);
    bg.fillRect(0, 0, width, height);
    bg.setPosition(x - width / 2, y);

    const redBar = scene.add.graphics();
    redBar.fillStyle(0xff0000, 1);
    redBar.fillRect(0, 0, width, height);
    redBar.setPosition(x - width / 2, y);
    redBar.widthValue = width;

    const greenBar = scene.add.graphics();
    greenBar.fillStyle(0x00ff00, 1);
    greenBar.fillRect(0, 0, width, height);
    greenBar.setPosition(x - width / 2, y);

    const text = scene.add.text(x, y + height / 2, `${maxHP} / ${maxHP}`, {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    LifeBarManager.bars[id] = {
      maxHP,
      currentHP: maxHP,
      width,
      height,
      greenBar,
      redBar,
      text,
      bg,
      scene,
      x,
      y
    };
  },

  setHP(id, newHP) {
    const bar = LifeBarManager.bars[id];
    if (!bar) return;

    const hp = Phaser.Math.Clamp(newHP, 0, bar.maxHP);
    bar.currentHP = hp;
    const ratio = hp / bar.maxHP;
    const targetWidth = bar.width * ratio;
    const currentWidth = bar.redBar.widthValue || bar.width;

    bar.text.setText(`${hp} / ${bar.maxHP}`);

    bar.greenBar.clear();
    bar.greenBar.fillStyle(0x00ff00, 1);
    bar.greenBar.fillRect(0, 0, targetWidth, bar.height);

    if (currentWidth > targetWidth) {
      bar.redBar.widthValue = targetWidth;
    } else {
      bar.scene.tweens.addCounter({
        from: currentWidth,
        to: targetWidth,
        duration: 500,
        ease: 'Cubic.easeOut',
        onUpdate: tween => {
          const w = tween.getValue();
          bar.redBar.clear();
          bar.redBar.fillStyle(0xff0000, 1);
          bar.redBar.fillRect(0, 0, w, bar.height);
          bar.redBar.widthValue = w;
        }
      });
    }
  },

  getHP(id) {
    return LifeBarManager.bars[id]?.currentHP ?? null;
  },

  reset() {
    LifeBarManager.bars = {};
  },

  createHPBars(scene) {
    const offsetY = 85;

    LifeBarManager.create(scene, 'hector', scene.hector.x, scene.hector.y + offsetY);
    LifeBarManager.create(scene, 'serra', scene.serra.x, scene.serra.y + offsetY);
    LifeBarManager.create(scene, 'enemigo', scene.enemigo.x, scene.enemigo.y + offsetY);

  }
};

export default LifeBarManager;
