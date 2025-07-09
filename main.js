import config from './config.js';
new Phaser.Game(config);

//  const config = {
//    type: phaser.auto,
//    width: window.innerwidth,
//    height: window.innerheight,
//    physics: { default: 'arcade' },
//    scene: { preload, create, update }
//  };
//  let hector, serra, enemigo;
//  let attacksprite, attackwindow, hiteffect;
//  let recordbutton;
//  const game = new phaser.game(config);
//  function preload() {
//    this.load.image('fondo', 'assets/img/bg/fondo.png');
//    this.load.image('hector', 'assets/img/characters/hector.png');
//    this.load.image('serra', 'assets/img/characters/serra.png');
//    this.load.image('enemigo', 'assets/img/characters/enemigo.png');
//    this.load.spritesheet('hector_attack', 'assets/animations/hector_attack.png', { framewidth: 64, frameheight: 64 });
//    this.load.spritesheet('hector_transition', 'assets/animations/hector_transition.png', { framewidth: 96, frameheight: 80 });
//    this.load.spritesheet('hector_cast', 'assets/animations/hector_cast.png', { framewidth: 96, frameheight: 80 });
//    this.load.spritesheet('serra_attack', 'assets/animations/serra_attack.png', { framewidth: 64, frameheight: 64 });
//    this.load.spritesheet('serra_transition', 'assets/animations/serra_transition.png', { framewidth: 96, frameheight: 80 });
//    this.load.spritesheet('serra_cast', 'assets/animations/serra_cast.png', { framewidth: 96, frameheight: 80 });
//    this.load.spritesheet('normal_hit', 'assets/animations/normal_hit.png', { framewidth: 240, frameheight: 160 });
//  }
//  function create() {
//    const centerx = this.cameras.main.width / 2;
//    const centery = this.cameras.main.height / 2;
//    // filtros de texturas
//    ['hector', 'serra', 'enemigo', 'hector_attack', 'hector_transition', 'hector_cast', 'serra_attack', 'serra_transition', 'serra_cast', 'normal_hit', 'fondo'].foreach(key => {
//      this.textures.get(key).setfilter(phaser.textures.filtermode.nearest);
//    });
//    const fondo = this.add.image(centerx, centery, 'fondo');
//    fondo.setscale(math.max(config.width / fondo.width, config.height / fondo.height)).setscrollfactor(0);
//    hector = this.add.sprite(centerx + 400, centery - 150, 'hector').setscale(5);
//    serra = this.add.sprite(centerx + 400, centery + 50, 'serra').setscale(5);
//    enemigo = this.add.sprite(centerx - 400, centery - 50, 'enemigo').setscale(5);
//    // animaciones idle
//    this.tweens.add({ targets: [hector, serra], scaley: '+=0.2', yoyo: true, repeat: -1, duration: 2000, ease: 'sine.easeinout' });
//    this.tweens.add({ targets: [hector, serra], y: '+=2', yoyo: true, repeat: -1, duration: 2000, ease: 'sine.easeinout' });
//    this.tweens.add({ targets: [enemigo], scaley: '+=0.2', yoyo: true, repeat: -1, duration: 2000, delay: 1000, ease: 'sine.easeinout' });
//    this.tweens.add({ targets: [enemigo], y: '+=2', yoyo: true, repeat: -1, duration: 2000, delay: 1000, ease: 'sine.easeinout' });
//    // hud
//    const hudheight = 255;
//    const hudwidth = config.width;
//    const hudy = config.height - hudheight - 10;
//    const hudgraphics = this.add.graphics();
//    hudgraphics.fillstyle(0x0000aa, 0.6).fillroundedrect(0, hudy, hudwidth, hudheight, 30);
//    hudgraphics.linestyle(4, 0xffffff, 1).strokeroundedrect(0, hudy, hudwidth, hudheight, 30);
//    this.add.text(30, hudy + 80, "héctor:\n- ataque físico\n- ataque distancia\n- esquivar\n- poción de vida", { fontfamily: "arial", fontsize: "26px", color: "#ffffff", align: "left" });
//    this.add.text(config.width / 2 + 30, hudy + 80, "serra:\n- bola de fuego\n- trueno\n- barrera\n- curar", { fontfamily: "arial", fontsize: "26px", color: "#ffffff", align: "left" });
//    // animaciones de ataque héctor
//    this.anims.create({ key: 'hector_melee', frames: this.anims.generateframenumbers('hector_attack', { start: 0, end: 23 }), framerate: 12, repeat: 0 });
//    this.anims.create({ key: 'hector_transition', frames: this.anims.generateframenumbers('hector_transition', { start: 0, end: 3 }), framerate: 1, repeat: 0 });
//    this.anims.create({ key: 'hector_cast', frames: this.anims.generateframenumbers('hector_cast', { start: 0, end: 5 }), framerate: 8, repeat: -1 });
//    // animaciones de ataque serra
//    this.anims.create({ key: 'serra_melee', frames: this.anims.generateframenumbers('serra_attack', { start: 0, end: 8 }), framerate: 12, repeat: 0 });
//    this.anims.create({ key: 'serra_transition', frames: this.anims.generateframenumbers('serra_transition', { start: 0, end: 3 }), framerate: 1, repeat: 0 });
//    this.anims.create({ key: 'serra_cast', frames: this.anims.generateframenumbers('serra_cast', { start: 0, end: 5 }), framerate: 8, repeat: -1 });
//    // animación de impacto
//    this.anims.create({ key: 'normal_hit', frames: this.anims.generateframenumbers('normal_hit', { start: 0, end: 8 }), framerate: 12, repeat: 0 });
//    attackwindow = this.add.graphics();
//    const windowwidth = 600, windowheight = 400, windowx = centerx - windowwidth / 2, windowy = centery - windowheight / 2;
//    attackwindow.fillstyle(0x555555, 0.6).fillroundedrect(windowx, windowy, windowwidth, windowheight, 30);
//    attackwindow.linestyle(4, 0xffffff, 1).strokeroundedrect(windowx, windowy, windowwidth, windowheight, 30);
//    attackwindow.setvisible(false);
//    attacksprite = this.add.sprite(centerx, centery, 'hector_attack').setvisible(false).setscale(6);
//    hiteffect = this.add.sprite(enemigo.x + 150, enemigo.y, 'normal_hit').setvisible(false).setscale(5);
//    // botón para grabar
//    recordbutton = this.add.text(centerx, centery + 300, '🎤 grabar', {
//      fontfamily: "arial",
//      fontsize: "36px",
//      color: "#ffffff",
//      backgroundcolor: "#333333",
//      padding: { x: 20, y: 10 },
//      align: "center"
//    }).setorigin(0.5).setinteractive();
//    recordbutton.on('pointerdown', () => {
//      startrecordingandsend.call(this);
//    });
//  }
//  function update() {}
//  function startrecordingandsend() {
//    const self = this;
//    navigator.mediadevices.getusermedia({ audio: true })
//      .then(stream => {
//        const mediarecorder = new mediarecorder(stream);
//        const audiochunks = [];
//        mediarecorder.ondataavailable = event => audiochunks.push(event.data);
//        mediarecorder.onstop = () => {
//          const audioblob = new blob(audiochunks, { type: 'audio/wav' });
//          sendaudiotobackend(audioblob);
//        };
//        mediarecorder.start();
//        console.log('🎙️ grabando audio...');
//        self.time.delayedcall(5000, () => {
//          mediarecorder.stop();
//          console.log('🛑 grabación finalizada.');
//        });
//      })
//      .catch(err => console.error('no se pudo acceder al micrófono:', err));
//  }
//  function sendaudiotobackend(audioblob) {
//    const formdatagender = new formdata();
//    formdatagender.append('file', audioblob, 'audio.wav');
//    // 1️⃣ primera llamada: detectar género
//    fetch('http://localhost:5274/api/genderdetector', {
//      method: 'post',
//      body: formdatagender
//    })
//      .then(response => response.json())
//      .then(data => {
//        console.log('🟢 respuesta genderdetector:', data);
//        const detectedgender = data.gender;
//        if (!detectedgender) {
//          console.error('🔴 no se detectó género.');
//          return;
//        }
//        // 2️⃣ segunda llamada: procesar batalla con audio y género
//        const formdatabattle = new formdata();
//        formdatabattle.append('file', audioblob, 'audio.wav');
//        formdatabattle.append('gender', detectedgender);
//        fetch('http://localhost:5274/api/battle', {
//          method: 'post',
//          body: formdatabattle
//        })
//          .then(response => response.json())
//          .then(data => {
//            console.log('🟢 respuesta battle:', data);
//          })
//          .catch(error => console.error('🔴 error al enviar audio a battle:', error));
//      })
//      .catch(error => console.error('🔴 error al enviar audio a genderdetector:', error));
//  }


