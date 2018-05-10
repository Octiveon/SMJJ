function Mapp(game, map, layer) {
  this.tiles = [];



  for (var i = 0; i < 32; i++) {
    this.tiles.push([]);
    for (var j = 0; j < 64; j++) {
      var tile = map.getTile(j,i, layer);
      this.tiles[i][j] = new Tile(j, i, tile.properties.canMove, tile.properties.MoveCost);
    }
  }
}

Mapp.prototype.getTile = function(x,y){
  return this.tiles[y][x];
}

Mapp.prototype.isTileOpen = function(x,y) {
  return this.tiles[y][x].Open();
}

Mapp.prototype.Occupy = function(character, x,y) {
  this.tiles[y][x].occupant = character;
}

class Tile {
  constructor(x, y, movable, moveCost) {
    this.x = x;
    this.y = y;

    this.movable = movable;
    this.moveCost = moveCost;
    this.occupied = false;
    this.currentOccupant = NULL;
  }

  get movable() {return this.movable;}
  get occupied() {return this.occupied;}
  get moveCost() {return this.moveCost;}
  get currentOccupant() {return this.currentOccupant;}
  set currentOccupant(occupant){
    this.currentOccupant = occupant;
    occupied = true;
  }
}

Mapp.prototype.constructor = Mapp;
