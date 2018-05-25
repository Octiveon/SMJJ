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
	this.attacked = false;


}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
PlayerUnit.prototype = Object.create(Phaser.Sprite.prototype);
PlayerUnit.prototype.constructor = PlayerUnit;

PlayerUnit.prototype.NewTurn = function(x,y) {
  this.movement = 7;
	this.attacked = false;

}

PlayerUnit.prototype.Attack = function(target) {
	target.Hit(this.baseDmg);
	this.attacked = true;
}

PlayerUnit.prototype.Hit = function(dmg) {
	health = (Math.min(0,health-dmg));
	if(health == 0){this.isAlive = false;}
}

PlayerUnit.prototype.MoveTo = function(x,y, cost) {
  this.position.x = x;
  this.position.y = y;
	this.movement -= cost;
}

PlayerUnit.prototype.CanMove = function(cost) {
	if(cost > this.movement){return false;}
	return true;
}
