
var game = new Phaser.Game(1120, 800, Phaser.AUTO);

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
	},
	create: function() {
		//Centers the game screen.
		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
	},
	update: function() {
		//game.state.start('GamePlay', true, false);

	}
}

var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function() {
	},
	create: function() {

	},
	update: function() {

	}
}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.start('MainMenu');
