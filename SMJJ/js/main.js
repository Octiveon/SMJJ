
var game = new Phaser.Game(1120, 800, Phaser.AUTO);
var partySize = 4;

// define MainMenu state and methods
var Preload = function(game) {};
Preload.prototype = {
	preload: function() {
		//Preload menu assets and music here!
		//Centers the game screen.

		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

		game.load.image('Act1', 'assets/imgs/Act1.png')
	  game.load.image('Button','assets/imgs/Button.png')
		game.load.image('MainMenu','assets/imgs/MainMenu.png')

	},
	create: function() {
	},
	update: function() {
		LoadScene('MainMenu');

	}
}

var Load = function(game) {};
Load.prototype = {
	preload: function() {
	},
	create: function() {

	},
	update: function() {
		//game.state.start('GamePlay', true, false);

	}
}

function LoadScene(scene) {
	game.state.start(scene, true, false);
}

function LoadCombat() {
	game.state.start("Combat", true, false);
}

function Narrative() {
	game.state.start("Act1", true, false);
}

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
	},
	create: function() {
		bg = game.add.sprite(0,0, 'MainMenu');
		bg.scale.setTo(1.2,1.6);

		bCombat = game.add.button(game.world.centerX, game.world.centerY, 'Button', LoadCombat, this);
		bCombat.anchor.x = 0.5;
		bCombat.anchor.y = 0.5;
    bCombat.scale.setTo(1.2,1);
		//new Text(game, x, y, text [, style])
	  bCombatTxt = game.add.text(bCombat.centerX,bCombat.centerY, 'Load Combat', { fontSize: '31px', fill: '#ffffff', boundsAlignH: 'center'})
		bCombatTxt.anchor.x = 0.5;
		bCombatTxt.anchor.y = 0.5;

		bNarrative = game.add.button(game.world.centerX, game.world.centerY + 100, 'Button', Narrative, this);
		bNarrative.anchor.x = 0.5;
		bNarrative.anchor.y = 0.5;
		bNarrative.scale.setTo(1.2,1);

		bNarrativeTxt = game.add.text(bCombat.centerX,bCombat.centerY + 100, 'Load Narrative', { fontSize: '31px', fill: '#ffffff', boundsAlignH: 'center'})
		bNarrativeTxt.anchor.x = 0.5;
		bNarrativeTxt.anchor.y = 0.5;

	},
	update: function() {
		//game.state.start('GamePlay', true, false);

	}
}

var Act1 = function(game) {};
Act1.prototype = {
	preload: function() {

	},
	create: function() {
		Txt2 = game.add.text(game.world.centerX, game.world.centerY + 100, 'Bam Narrative Yo', { fontSize: '31px', fill: '#ffffff', boundsAlignH: 'center'})
		Txt2.anchor.x = 0.5;
		Txt2.anchor.y = 0.5;

	},
	update: function() {

	}
}

var Act2 = function(game) {};
Act2.prototype = {
	preload: function() {
	},
	create: function() {

	},
	update: function() {

	}
}

var Act3 = function(game) {};
Act3.prototype = {
	preload: function() {
	},
	create: function() {

	},
	update: function() {

	}
}

var Combat = function(game) {};
Combat.prototype = {
	preload: function() {
		game.load.atlas('Characters', 'assets/imgs/Characters.png','assets/imgs/Characters.json',
		Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.tilemap('map', 'assets/imgs/Test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/imgs/tiles.png');
	},
	create: function() {
		map = game.add.tilemap('map');
		map.addTilesetImage('spritesheet(2)','tiles');
		outside = map.createLayer(0);

		outside.resizeWorld();

		vanguard = game.add.group();
		vanguard.enableBody = true;
		enemies = game.add.group();
		enemies.enableBody = true;


		player = new Player(game, 'Characters','Player', 1, 64, 32);
		game.add.existing(player);
		game.camera.follow(player, 0, 1, 1);

		game.input.onDown.add(GetTile, this);

	},
	update: function() {

	}
}

function GetTile() {
	//Gets tile location in order to move the player
	var x = outside.getTileX(game.input.activePointer.worldX);
  var y = outside.getTileY(game.input.activePointer.worldY);
	console.log(map.getTile(x, y, outside));

  var tile = map.getTile(x, y, outside);
	currentDataString = JSON.stringify( tile.properties );

	if(tile.properties.isMovable == false)
	{
		console.log("Cant Move There");

	}
	else {
		player.MoveTo(x * 32, y*32 - 32);
	}
}
function SpawnParty() {
	for (var i = 0; i < partySize; i++) {
		array[i]
	}

}
function AddPartyMember() {

}

// add states to StateManager and start MainMenu
game.state.add('Preload', Preload);
game.state.add('MainMenu', MainMenu);
game.state.add('Load', Load);

game.state.add('Act1', Act1);
game.state.add('Act2', Act2);
game.state.add('Act3', Act3);

game.state.add('Combat', Combat);
game.state.start('Preload');
