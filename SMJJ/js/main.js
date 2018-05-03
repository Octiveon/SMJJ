
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
game.state.add('Preload', Preload);
game.state.add('MainMenu', MainMenu);
game.state.add('Load', Load);

game.state.add('Act1', Act1);
game.state.add('Act2', Act2);
game.state.add('Act3', Act3);

game.state.add('GamePlay', GamePlay);

game.state.add('Combat', Combat);
game.state.start('MainMenu');
