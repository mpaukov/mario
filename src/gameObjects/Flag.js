class Flag {
  constructor(scene) {
    this.scene = scene;
    const objects = {
      flag: 962,
    };
    this.scene.tileset.texCoordinates[objects.flag];
    const flagObject = this.scene.map.getObjectLayer("flag").objects[0];
    const flagCoordinates = this.scene.tileset.texCoordinates[962];
    const flagRoot = this.scene.platform.getTileAt(75, 23);
    this.sprite = this.scene.add
      .tileSprite(flagObject.x, flagObject.y, 16, 16, "tiles")
      .setOrigin(0, 1)
      .setTilePosition(flagCoordinates.x, flagCoordinates.y);
    flagRoot.setCollisionCallback(() => {
      flagRoot.collisionCallback = null;
      const particles = scene.add.particles("atlas", "mario-atlas_13");
      const emitter = particles.createEmitter({
        x: flagObject.x,
        y: flagObject.y - flagObject.height,
        scale: { start: 1, end: 0 },
        speed: { min: 50, max: 100 },
        angle: { min: 0, max: -180 },
        rotate: { min: 0, max: 360 },
        alpha: 0.5,
      });
      this.scene.tweens.add({
        targets: this.sprite,
        ease: "Linear",
        y: "+=60",
        duration: 800,
        onComplete: () => emitter.stop(),
      });

      this.scene.input.keyboard.shutdown();
    });
  }
}

export default Flag;
