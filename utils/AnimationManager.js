const AnimationManager = {
  registerAll(scene) {
    const { anims } = scene;

    function safeCreate(config) {
      if (!anims.exists(config.key)) {
        anims.create(config);
      }
    }

    // 🎮 Player
    safeCreate({
      key: 'player_idl',
      frames: anims.generateFrameNumbers('player_idl', { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1
    });
    safeCreate({
      key: 'player_left_walk',
      frames: anims.generateFrameNumbers('player_left_walk', { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });
    safeCreate({
      key: 'player_right_walk',
      frames: anims.generateFrameNumbers('player_right_walk', { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });
    safeCreate({
      key: 'player_up_walk',
      frames: anims.generateFrameNumbers('player_up_walk', { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });
    safeCreate({
      key: 'player_down_walk',
      frames: anims.generateFrameNumbers('player_down_walk', { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });

    // 👾 Enemigo
    safeCreate({
      key: 'enemy_axe_idl',
      frames: anims.generateFrameNumbers('enemy_axe_idl', { start: 0, end: 2 }),
      frameRate: 2,
      repeat: -1
    });

    // ⚔️ Héctor
    safeCreate({
      key: 'hector_normal_attack',
      frames: anims.generateFrameNumbers('hector_normal_attack', { start: 0, end: 23 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'hector_strong_attack',
      frames: anims.generateFrameNumbers('hector_strong_attack', { start: 0, end: 35 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'hector_distant_attack',
      frames: anims.generateFrameNumbers('hector_distant_attack', { start: 0, end: 23 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'hector_special_attack',
      frames: anims.generateFrameNumbers('hector_special_attack', { start: 0, end: 29 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'hector_transition',
      frames: anims.generateFrameNumbers('hector_transition', { start: 0, end: 3 }),
      frameRate: 1,
      repeat: 0
    });
    safeCreate({
      key: 'hector_cast',
      frames: anims.generateFrameNumbers('hector_cast', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: 0
    });

    // 🔥 Serra
    safeCreate({
      key: 'serra_fire_attack',
      frames: anims.generateFrameNumbers('serra_fire_attack', { start: 0, end: 8 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'serra_thunder_attack',
      frames: anims.generateFrameNumbers('serra_thunder_attack', { start: 0, end: 8 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'serra_wind_attack',
      frames: anims.generateFrameNumbers('serra_wind_attack', { start: 0, end: 8 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'serra_divine_attack',
      frames: anims.generateFrameNumbers('serra_divine_attack', { start: 0, end: 8 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'serra_transition',
      frames: anims.generateFrameNumbers('serra_transition', { start: 0, end: 3 }),
      frameRate: 1,
      repeat: 0
    });
    safeCreate({
      key: 'serra_cast',
      frames: anims.generateFrameNumbers('serra_cast', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: 0
    });

    // 💥 Animaciones de impacto
    safeCreate({
      key: 'enemy_normal_attack',
      frames: anims.generateFrameNumbers('enemy_normal_attack', { start: 0, end: 11 }),
      frameRate: 12,
      repeat: 0
    });

    safeCreate({
      key: 'normal_hit',
      frames: anims.generateFrameNumbers('normal_hit', { start: 0, end: 6 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'strong_hit',
      frames: anims.generateFrameNumbers('strong_hit', { start: 0, end: 6 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'distant_hit',
      frames: anims.generateFrameNumbers('normal_hit', { start: 0, end: 6 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'special_hit',
      frames: anims.generateFrameNumbers('special_hit', { start: 0, end: 17 }),
      frameRate: 12,
      repeat: 0
    });

    safeCreate({
      key: 'fire_hit',
      frames: anims.generateFrameNumbers('fire_hit', { start: 0, end: 23 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'thunder_hit',
      frames: anims.generateFrameNumbers('thunder_hit', { start: 0, end: 8 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'wind_hit',
      frames: anims.generateFrameNumbers('wind_hit', { start: 0, end: 43 }),
      frameRate: 12,
      repeat: 0
    });
    safeCreate({
      key: 'divine_hit',
      frames: anims.generateFrameNumbers('divine_hit', { start: 0, end: 45 }),
      frameRate: 12,
      repeat: 0
    });
  }
};

export default AnimationManager;
