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

Mapp.prototype.getTileOccupant = function(x,y){
  return this.tiles[y][x].occupant;
}

Mapp.prototype.getTileStatus = function(x,y){
  if(this.tiles[y][x].occupied)
  {
    return 1;
  }
  else if (this.tiles[y][x].movable) {
    return 0;
  }
}

Mapp.prototype.isTileOpen = function(x,y) {
  return this.tiles[y][x].Open();
}

Mapp.prototype.Occupy = function(x,y,character) {
  this.tiles[y][x].occupant = character;
  this.tiles[y][x].occupied = true;
}

Mapp.prototype.setOccupied = function(x,y,bool) {
  this.tiles[y][x].occupied = bool;
}
Mapp.prototype.OccupentLeft = function(x,y) {
  this.tiles[y][x].occupied = false;
  this.tiles[y][x].occupant = null;


}

Mapp.prototype.CreateTiles = function(x,y){
  return this.tiles[y][x];
}

class Tile {
  constructor(x, y, movable, moveCost) {
    this.x = x;
    this.y = y;

    this.movable = movable;
    this.moveCost = moveCost;
    this.occupied = false;
    this.currentOccupant;
  }

  get movable() {return this._movable;}
  set movable(value){this._movable = value}

  get occupied() {return this._occupied;}
  set occupied(value){this._occupied = value}

  get moveCost() {return this._moveCost;}
  set moveCost(value){this._moveCost = value}

  get currentOccupant() {return this._currentOccupant;}
  set currentOccupant(occupant){
    this._currentOccupant = occupant;
    occupied = true;
  }

  Open()
  {
    return (!this.occupied && this.movable)
  }
}

Mapp.prototype.constructor = Mapp;
