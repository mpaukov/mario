class Player {
  constructor(scene, x, y, platform) {
    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(x, y, "atlas").setScale(2);
    this.sprite.setCollideWorldBounds(true);

    this.collider = this.scene.physics.add.collider(this.sprite, platform);

    scene.cameras.main
      .setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels)
      .startFollow(this.sprite);

    return this;
  }

  update(input) {
    // Mario is moving to the left
    if (input.left.isDown) {
      this.sprite.setVelocityX(-200).setFlipX(true);
      this.sprite.body.onFloor() && this.sprite.play("run", true);

      this.scene.cameras.main.stopFollow(this.sprite);

      // Mario is moving to the right
    } else if (input.right.isDown) {
      this.sprite.setVelocityX(200).setFlipX(false);
    } else {
      // Mario is standing still
      this.sprite.setVelocityX(0);
    }

    // Mario is jumping
    if (input.space.isDown && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-350);
    }
  }
}

export default Player;
