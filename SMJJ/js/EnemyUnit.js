// Enemy prefab constructor function
function EnemyUnit(game, key, frame, scale, x, y, health, baseDmg) {
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
	this.threat = 0;

}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Enemy)
EnemyUnit.prototype = Object.create(Phaser.Sprite.prototype);
EnemyUnit.prototype.constructor = EnemyUnit;

// override Phaser.Sprite update (to spin the diamond)
EnemyUnit.prototype.update = function() {

}

function MoveTo() {

}
