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
	this.isAlive = true;
	this.movement = 7;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Enemy)
EnemyUnit.prototype = Object.create(Phaser.Sprite.prototype);
EnemyUnit.prototype.constructor = EnemyUnit;

// override Phaser.Sprite update (to spin the diamond)
EnemyUnit.prototype.update = function() {

}

EnemyUnit.prototype.attack = function() {

}

EnemyUnit.prototype.hit = function(dmg) {

	health = (Math.min(0,health-dmg));
	if(health == 0){this.isAlive = false;}
}

EnemyUnit.prototype.onDeath = function() {
	this.kill();
}

EnemyUnit.prototype.MoveTo = function(x,y) {
  this.position.x = x;
  this.position.y = y;

}
