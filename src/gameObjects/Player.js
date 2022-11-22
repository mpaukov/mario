class Player {
  constructor(scene, x, y, platform) {
    this.scene = scene;
    this.scene.cameras.main.setDeadzone(
      this.scene.game.config.width / 4,
      this.scene.game.config.height
    );
    this.sprite = this.scene.physics.add.sprite(x, y, "atlas").setScale(2);
    this.sprite.setCollideWorldBounds(true);

    this.collider = this.scene.physics.add.collider(this.sprite, platform);

    this.scene.cameras.main
      .setBounds(
        0,
        0,
        this.scene.map.widthInPixels,
        this.scene.map.heightInPixels
      )
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
      this.sprite.body.onFloor() && this.sprite.play("run", true);
      this.reFollowPlayer();
    } else {
      // Mario is standing still
      this.sprite.setVelocityX(0);
      this.sprite.body.onFloor() && this.sprite.play("idle", true);
    }

    // Mario is jumping
    if ((input.space.isDown || input.up.isDown) && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-350);
      this.sprite.play("jump", true);
    }
  }

  reFollowPlayer() {
    this.scene.physics.world.bounds.setPosition(
      this.scene.cameras.main.worldView.x,
      0
    );

    if (
      this.sprite.body.position.x + this.sprite.body.width / 2 >
        this.scene.cameras.main.midPoint.x &&
      !this.scene.cameras.main._follow
    ) {
      this.scene.cameras.main.startFollow(this.sprite);
    }
  }
}

export default Player;
