import Player from "../gameObjects/Player";
import generateAnimations from "../config/animations";

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("tiles", "./assets/img/tiles.png");
    this.load.tilemapTiledJSON("map", "./assets/json/map.json");
    this.load.atlas(
      "atlas",
      "./assets/img/mario-atlas.png",
      "./assets/json/mario-atlas.json"
    );
    this.load.on("complete", () => {
      generateAnimations(this);
    });
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("map-tileset", "tiles");
    this.platform = this.map.createStaticLayer("platform", this.tileset, 0, 0);
    this.map.createStaticLayer("background", this.tileset, 0, 0);
    this.platform.setCollisionByExclusion(-1, true);
    this.player = new Player(this, 25, 200, this.platform);
    this.inputs = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update(this.inputs);
  }
}

export default Game;
