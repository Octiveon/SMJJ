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
	this.attacked = false;
	this.movement = 7;
	this.target = null;

}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Enemy)
EnemyUnit.prototype = Object.create(Phaser.Sprite.prototype);
EnemyUnit.prototype.constructor = EnemyUnit;

EnemyUnit.prototype.NewTurn = function(x,y) {
  this.movement = 7;
}

EnemyUnit.prototype.ChooseTarget = function() {
	//Chooses vanguard unit by closest
	var distance = 999999;
	var newDist;

	for (var i = 0; i < vanguard.children.length; i++) {
		newDist = GetUnitToUnitDistance(vanguard.children[i], this);
		if(newDist < distance)
		{
			distance = newDist;
			this.target = vanguard.children[i];
		}
	}
}

EnemyUnit.prototype.InRange = function() {
	//Chooses vanguard unit by closest
		if(this.target != null && GetUnitToUnitDistance(this.target, this) < 50)
		{
			return true;
		}
		return false;
}

EnemyUnit.prototype.MoveCloser = function() {
	//Moves unit towards its chosen target
	var distance = GetUnitToUnitDistance(this.target, this);
	var newDistance;
	var oldx;
	var oldy;
	var x;
	var y;
	var moved = false;

	//Finds tile closest
	for (var i = 0; i < 3; i++) {
		for (var j = -1; j < 2; j++) {

			oldx = this.position.x +(j * 32);
			oldy = this.position.y + (i * 32);
			newDistance =  GetUnitToPointDistance(this.target, oldx, oldy);
			oldx = dataLayer.getTileX(oldx);
			oldy = dataLayer.getTileY(oldy);

			if(distance > newDistance  && mapp.isTileOpen(oldx,oldy) && currentUnit.CanMove(mapp.getTileCost(oldx,oldy))){
				x = oldx;
				y = oldy;
				moved = true;
				distance = newDistance;
			}
		}
	}

	if(moved){
		var oldx = dataLayer.getTileX(currentUnit.position.x);
		var oldy = dataLayer.getTileY(currentUnit.position.y);

		mapp.OccupentLeft(oldx, oldy+1);
		currentUnit.MoveTo(x * 32, y * 32 - 32, mapp.getTileCost(x,y));
		playermarker.x = currentUnit.position.x - 32;
		playermarker.y = currentUnit.position.y;
		mapp.Occupy(x,y,currentUnit);
	}

}


// override Phaser.Sprite update (to spin the diamond)
EnemyUnit.prototype.update = function() {
	if(this.isAlive == false)
	{
		this.OnDeath();
	}
}

EnemyUnit.prototype.Attack = function() {
	if(!this.attacked)
	{
		this.attacked = true;
		var hit = game.add.audio('atk');
		hit.play();
		this.target.Hit(this.baseDmg);
	}

}

EnemyUnit.prototype.Hit = function(dmg) {

	this.health = (Math.max(0,this.health-dmg));
	if(this.health == 0){this.isAlive = false;}
}

EnemyUnit.prototype.OnDeath = function() {
	EnemyDied(this);
	this.kill();
}

EnemyUnit.prototype.MoveTo = function(x,y) {
  this.position.x = x;
  this.position.y = y;
}

EnemyUnit.prototype.CanMove = function(cost) {
	if(cost > this.movement){return false;}
	return true;
}
