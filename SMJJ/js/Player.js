// Player prefab constructor function
function Player(game, key, frame, scale, x, y, health, baseDmg) {
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

}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update (to spin the diamond)
Player.prototype.update = function() {
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		this.body.angularVelocity += 5;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.body.angularVelocity -= 5;
	}
}

Player.prototype.MoveTo = function(x,y) {
  this.position.x = x;
  this.position.y = y;

}
