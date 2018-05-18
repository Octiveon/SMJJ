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

Mapp.prototype.Debug = function(){
  for (var i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      if (this.tiles[i][j].occupied) {
        tiled = game.add.graphics();
        tiled.lineStyle(2, 0xbd0404, 1);

        tiled.drawRect(j*32, i*32, 32, 32);


      }
      else{
        tiled = game.add.graphics();
        tiled.lineStyle(1, 0x1c693c, 1);
        tiled.drawRect(j*32, i*32, 32, 32);

      }

    }
  }

}

Mapp.prototype.getTile = function(x,y){
  return this.tiles[y][x];
}

Mapp.prototype.getTileOccupant = function(x,y){
  return this.tiles[y][x].currentOccupant;
}
Mapp.prototype.getTileCost = function(x,y){
  return this.tiles[y][x].moveCost;
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

Mapp.prototype.Occupy = function(x,y, occupant) {
  this.tiles[y][x].currentOccupant = occupant;
  this.tiles[y][x].occupied = true;
}

Mapp.prototype.setOccupied = function(x,y,bool) {
  this.tiles[y][x].occupied = bool;
}
Mapp.prototype.OccupentLeft = function(x,y) {
  this.tiles[y][x].occupied = false;
  this.tiles[y][x].currentOccupant = null;
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
    this.currentOccupant = null;
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
  }

  Open()
  {
    return (!this.occupied && this.movable)
  }
}

Mapp.prototype.constructor = Mapp;
