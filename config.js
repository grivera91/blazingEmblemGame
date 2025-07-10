import PreloadScene from './scenes/PreloadScene.js';
import SplashScene from './scenes/SplashScene.js';
import MenuScene from './scenes/MenuScene.js';
import MapScene from './scenes/MapScene.js';
import BattleScene from './scenes/BattleScene.js';
import BackgroundScene from './scenes/BackgroundScene.js';

const isLocal = location.hostname === 'localhost';
// isLocal = false; //Descomentar para apuntar al api aloajda desde local

const API_BASE_URL = isLocal
  ? 'http://localhost:5274/api'
  : 'https://blazingemblemapi.onrender.com/api';

export default {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [PreloadScene, BackgroundScene, SplashScene, MenuScene, MapScene, BattleScene],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};

export { API_BASE_URL, isLocal };
