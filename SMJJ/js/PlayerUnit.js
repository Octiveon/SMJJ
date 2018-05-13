// Player prefab constructor function
function PlayerUnit(game, key, frame, scale, x, y, health, baseDmg) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// add custom properties
	//this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
  this.active = false;

	// put some physics on it
	game.physics.enable(this);
	this.body.collideWorldBounds = true;

  this.health = health;
  this.baseDmg = baseDmg;
	this.movement = 7;

}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
PlayerUnit.prototype = Object.create(Phaser.Sprite.prototype);
PlayerUnit.prototype.constructor = PlayerUnit;

// override Phaser.Sprite update (to spin the diamond)
PlayerUnit.prototype.update = function() {

}

PlayerUnit.prototype.MoveTo = function(x,y) {
  this.position.x = x;
  this.position.y = y;

}
