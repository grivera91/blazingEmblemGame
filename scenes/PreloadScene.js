// scenes/PreloadScene.js

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Texto de carga
    const loadingText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Cargando...', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Logo Utp
    this.load.image('logo', 'assets/logo/logo.png');

    // Menu Principal
    this.load.image('menu', 'assets/menu.png');

    // Mapa Principal
    this.load.image('mapa', 'assets/maps/mapa.png');

    // Fondos batalla
    this.load.image('fondo', 'assets/maps/fondo.png');

    // Personajes
    this.load.image('hector', 'assets/sprites/hector.png');
    this.load.image('serra', 'assets/sprites/serra.png');
    this.load.image('enemigo', 'assets/sprites/enemigo.png');

    // Animacion Player
    this.load.spritesheet('player_idl', 'assets/sprites/animations/player/player_idl.png', { frameWidth: 31, frameHeight: 21 });
    this.load.spritesheet('player_left_walk', 'assets/sprites/animations/player/player_left_walk.png', { frameWidth: 31, frameHeight: 17 });
    this.load.spritesheet('player_right_walk', 'assets/sprites/animations/player/player_right_walk.png', { frameWidth: 31, frameHeight: 17 });
    this.load.spritesheet('player_up_walk', 'assets/sprites/animations/player/player_up_walk.png', { frameWidth: 31, frameHeight: 17 });
    this.load.spritesheet('player_down_walk', 'assets/sprites/animations/player/player_down_walk.png', { frameWidth: 31, frameHeight: 17 });

    // Animacion Enemigos Player
    this.load.spritesheet('enemy_axe_idl', 'assets/sprites/animations/enemy_player/enemy_axe_idl.png', { frameWidth: 16, frameHeight: 21 });

    // Animaciones Héctor
    this.load.spritesheet('hector_normal_attack', 'assets/sprites/animations/hector/hector_normal_attack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hector_strong_attack', 'assets/sprites/animations/hector/hector_strong_attack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hector_distant_attack', 'assets/sprites/animations/hector/hector_distant_attack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hector_special_attack', 'assets/sprites/animations/hector/hector_special_attack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hector_transition', 'assets/sprites/animations/hector/hector_transition.png', { frameWidth: 96, frameHeight: 80 });
    this.load.spritesheet('hector_cast', 'assets/sprites/animations/hector/hector_cast.png', { frameWidth: 96, frameHeight: 80 });

    // Animaciones Serra
    this.load.spritesheet('serra_fire_attack', 'assets/sprites/animations/serra/serra_attack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('serra_thunder_attack', 'assets/sprites/animations/serra/serra_attack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('serra_wind_attack', 'assets/sprites/animations/serra/serra_attack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('serra_divine_attack', 'assets/sprites/animations/serra/serra_attack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('serra_transition', 'assets/sprites/animations/serra/serra_transition.png', { frameWidth: 96, frameHeight: 80 });
    this.load.spritesheet('serra_cast', 'assets/sprites/animations/serra/serra_cast.png', { frameWidth: 96, frameHeight: 80 });

    // Animacion Enemigo
    this.load.spritesheet('enemy_normal_attack', 'assets/sprites/animations/enemy/enemy_normal_attack.png', { frameWidth: 64, frameHeight: 90 });

    // Efectos de impacto Hector
    this.load.spritesheet('normal_hit', 'assets/sprites/animations/hector/normal_hit.png', { frameWidth: 240, frameHeight: 160 });    
    this.load.spritesheet('strong_hit', 'assets/sprites/animations/hector/strong_hit.png', { frameWidth: 240, frameHeight: 160 });    
    this.load.spritesheet('distant_hit', 'assets/sprites/animations/hector/normal_hit.png', { frameWidth: 240, frameHeight: 160 });    
    this.load.spritesheet('special_hit', 'assets/sprites/animations/hector/special_hit.png', { frameWidth: 240, frameHeight: 160 });    

    // Efectos de impacto Serra
    this.load.spritesheet('fire_hit', 'assets/sprites/animations/serra/fire_hit.png', { frameWidth: 240, frameHeight: 160 });    
    this.load.spritesheet('thunder_hit', 'assets/sprites/animations/serra/thunder_hit.png', { frameWidth: 240, frameHeight: 160 });    
    this.load.spritesheet('wind_hit', 'assets/sprites/animations/serra/wind_hit.png', { frameWidth: 240, frameHeight: 160 });    
    this.load.spritesheet('divine_hit', 'assets/sprites/animations/serra/divine_hit.png', { frameWidth: 240, frameHeight: 160 });    

    // Efectos de sonido Hector  
    this.load.audio('hit_sound_normal', 'assets/audio/sfx/hit_sound_normal.mp3');
    this.load.audio('hit_sound_strong', 'assets/audio/sfx/hit_sound_strong.mp3');
    this.load.audio('hit_sound_distant', 'assets/audio/sfx/hit_sound_distant.mp3');
    this.load.audio('hit_sound_special', 'assets/audio/sfx/hit_sound_special.mp3');

    // Efectos de sonido Serra  
    this.load.audio('hit_sound_fire', 'assets/audio/sfx/hit_sound_fire.mp3');
    this.load.audio('hit_sound_thunder', 'assets/audio/sfx/hit_sound_thunder.mp3');
    this.load.audio('hit_sound_wind', 'assets/audio/sfx/hit_sound_wind.mp3');
    this.load.audio('hit_sound_divine', 'assets/audio/sfx/hit_sound_divine.mp3');

    // Musica de fondo
    this.load.audio('battle_music', 'assets/audio/music/battle_music.mp3');
    this.load.audio('main_music', 'assets/audio/music/main_music.mp3');
    this.load.audio('map_music', 'assets/audio/music/map_music.mp3');
  }

  create() {
    // Filtro NEAREST para pixel-art
    [
      'hector', 'serra', 'enemigo', 
      'hector_normal_attack', 'hector_strong_attack', 'hector_distant_attack', 'hector_special_attack', 'hector_transition', 'hector_cast',
      'serra_fire_attack', 'serra_thunder_attack', 'serra_wind_attack', 'serra_divine_attack', 'serra_transition', 'serra_cast',
      'normal_hit', 'strong_hit', 'distant_hit', 'special_hit', 
      'fire_hit','thunder_hit','wind_hit','divine_hit',
      'fondo'
    ]
    .forEach(key => this.textures.get(key)?.setFilter(Phaser.Textures.FilterMode.NEAREST));

    // Al terminar de cargar, pasar a la siguiente escena
    this.scene.start('SplashScene');
  }
}
