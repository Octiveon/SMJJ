function Mapp(game, map, layer) {
  this.tiles = [];

  for (var i = 0; i < 32; i++) {
    for (var j = 0; j < 64; j++) {
      var tile = map.getTile(j,i, layer);

      console.log(tile.properties.MoveCost);
      this.tiles[i][j] = new Tile(j, i, tile.properties.canMove, tile.properties.MoveCost);
    }
  }
}

function getTile(x, y) {

}

class Tile {
  constructor(x, y, movable, moveCost) {
    this.x = x;
    this.y = y;

    this.movable = movable;
    this.moveCost = moveCost;
    this.occupied = false;
  }
}

Mapp.prototype.constructor = Mapp;
