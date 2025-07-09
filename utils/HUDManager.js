const HUDManager = {
  createBattleHUD(scene) {
    const hudHeight = 255;
    const hudWidth = scene.scale.width;
    const hudY = scene.scale.height - hudHeight - 10;
    const hudGraphics = scene.add.graphics();

    hudGraphics.fillStyle(0x0000aa, 0.6).fillRoundedRect(0, hudY, hudWidth, hudHeight, 30);
    hudGraphics.lineStyle(4, 0xffffff, 1).strokeRoundedRect(0, hudY, hudWidth, hudHeight, 30);

    scene.add.text(30, hudY + 80,
      "Héctor:\n- Ataque Normal\n- Ataque Fuerte\n- Ataque a Distancia\n- Ataque Especial",
      {
        fontFamily: "Arial",
        fontSize: "26px",
        color: "#ffffff",
        align: "left"
      });

    scene.add.text(hudWidth / 2 + 30, hudY + 80,
      "Serra:\n- Ataque de Fuego\n- Ataque de Trueno\n- Ataque de Viento\n- Ataque Divino",
      {
        fontFamily: "Arial",
        fontSize: "26px",
        color: "#ffffff",
        align: "left"
      });
  }
};

export default HUDManager;
