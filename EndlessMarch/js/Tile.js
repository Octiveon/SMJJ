function Tile(game, movable, moveCost) {
  this.movable = canMove;
  this.moveCost = moveCost;
  this.occupied = false;
}

//Link the prototype up
//Tile.prototype = Object.create(Phaser.Tilemap.prototype);
Tile.prototype.constructor = Tile;
