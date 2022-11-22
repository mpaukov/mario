import increaseScore from "../ui/increaseScore";

class Coin {
  constructor(scene) {
    this.scene = scene;
    this.coins = this.scene.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    // const coinObjects = this.scene.map.getObjectLayer("coin").objects;

    // for (const coin of coinObjects) {
    //   this.coins.create(coin.x, coin.y, "atlas").setOrigin(0).setDepth(-1);
    // }

    const coinSprites = this.scene.map.createFromObjects("coin");

    for (const coin of coinSprites) {
      coin
        .setTexture("atlas")
        .setScale(1) // setTexture resets the scale to .5 so this is needed
        .setOrigin(0)
        .setDepth(-1);

      this.coins.add(coin);
    }

    for (const coin of this.coins.children.entries) {
      coin.collider = this.scene.physics.add.overlap(
        coin,
        this.scene.player.sprite,
        this.collect,
        null,
        this
      );
    }
  }

  update() {
    for (const coin of this.coins.children.entries) {
      coin.play("rotate", true);
    }
  }

  collect(coin) {
    this.scene.tweens.add({
      targets: coin,
      ease: "Power1",
      scaleX: 0,
      scaleY: 0,
      duration: 200,
      onComplete: () => coin.destroy(),
    });

    increaseScore(1);

    coin.collider.destroy();
  }
}

export default Coin;
