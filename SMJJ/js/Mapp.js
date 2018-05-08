function Mapp(game,width, length, csvKey, csvSrc, imgKey, imgSrc) {
  //Call the sprite constructor in phaser.
  //Phaser.Sprite.call(this, game);
  this.map = game.add.tilemap('map', 32, 32);
  this.map.addTilesetImage('tiles');

  this.layer = map.createLayer(0);
  this.layer.resizeWorld();

  //Set Specilized values for the prefab object
  //this.anchor.set(0.5,0.5);

  //Set da physics

}

function Tile(game, movable, moveCost) {

  //Set Specilized values for the prefab object
  //this.anchor.set(0.5,0.5);
  this.movable = movable;
  this.moveCost = moveCost;

  //Set da physics
}

//Link the prototype up
Mapp.prototype = Object.create(Phaser.Tilemap.prototype);
Mapp.prototype.constructor = Mapp;
