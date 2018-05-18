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

EnemyUnit.prototype.NewTurn = function(x,y) {
  this.movement = 7;
}

// override Phaser.Sprite update (to spin the diamond)
EnemyUnit.prototype.update = function() {
	if(this.isAlive == false)
	{
		this.OnDeath();
	}

}

EnemyUnit.prototype.Attack = function(target) {
	target.Hit(this.baseDmg);

}

EnemyUnit.prototype.Hit = function(dmg) {

	this.health = (Math.max(0,this.health-dmg));
	if(this.health == 0){this.isAlive = false;}
}

EnemyUnit.prototype.OnDeath = function() {
	this.kill();
}

EnemyUnit.prototype.MoveTo = function(x,y) {
  this.position.x = x;
  this.position.y = y;

}
