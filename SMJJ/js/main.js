
var game = new Phaser.Game(1120, 800, Phaser.AUTO);
var partySize = 4;
var population =1000;
var food = 1000;
var supplies=1000;
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
//variables used for stuff
var winndow;
var text;
var tb;
var hold;
var descend;
var poptxt;
var foodtxt;
var supplytext;
Act1.prototype = {
	preload: function() {
		game.load.image('winndow', 'assets/imgs/winndow.png');
		game.load.image('map', 'assets/imgs/Act1.png');
		game.load.image('tb', 'assets/imgs/tempButton.png');
		game.load.image('hold','assets/imgs/hold.png');
		game.load.image('descend','assets/imgs/descend.png');

	},
	create: function() {
		//background 
		bg = game.add.sprite(0,0, 'map');
		bg.scale.setTo(1.2,1.2);
		//textbox window
		winndow = game.add.sprite(487,320,'winndow');
		winndow.inputEnabled = true;
		winndow.input.enableDrag();
		winndow.x =2000;
		//code taken from phaser//    https://phaser.io/examples/v2/text/center-text-on-sprite
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: winndow.width, align: "left", backgroundColor: "#c3c3c3" };
		text = game.add.text(0, 0, "A landslide befalls you and your caravan killing some and wounding others. Amidst all of the confusion the a war horns can be heard in the distance!\n Scouts are sent out and report that you will be besieged by orks in 3 days time! Your options are: \n Executing an emergency descent — leaving a group behind to slow the orks. \n Holding your ground — fighting in arduous terrain to avoid the orks", style);
		text.anchor.set(0.5);
		//map button
		tb = game.add.button(game.world.centerX - 95, 400, 'tb', moveWinndow);
		//texbox buttons
		hold = game.add.button(2000,0,'hold',LoadCombat);
		descend = game.add.button(2000,0,'descend',descendF);
		poptxt = game.add.text(16, 16, 'Population: 1000', { fontSize: '32px', fill: '#999999' });
		supplytxt = game.add.text(300, 16, 'Supplies: 1000', { fontSize: '32px', fill: '#818181' });
		foodtxt = game.add.text(750, 16, 'Food: 1000', { fontSize: '32px', fill: '#000' });
	},
	update: function() {
		
		text.x = Math.floor(winndow.x + winndow.width / 2 );
		text.y = Math.floor(winndow.y + winndow.height / 2 - 50);
		hold.x = Math.floor(winndow.x + 27);
		hold.y = Math.floor(winndow.y + 237);
		descend.x = Math.floor(winndow.x + 300);
		descend.y = Math.floor(winndow.y + 237);
		poptxt.text = 'Population: ' + population;
		supplytxt.text = 'Supplies: ' + supplies;
		foodtxt.text = 'Food: ' + food;
	} 
}
//moves winndow
function moveWinndow(){
	winndow.x = 560;
	winndow.y = 400;
	population -= 70;
}
function holdF(){
	winndow.x = 560;
	winndow.y = 400;

}
function descendF(){
	winndow.x = 560;
	winndow.y = 400;
	supplies -= 150;
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
	init: function() {
		partyAlive = partySize;

	},
	preload: function() {
		game.load.atlas('Characters', 'assets/imgs/Characters.png','assets/imgs/Characters.json',
		Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.tilemap('map', 'assets/imgs/Test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/imgs/tiles.png');
	},
	create: function() {
		this.units = [];
		//function Mapp(game, csvKey, csvSrc, imgSrc) {
		//map = new Mapp(game, 'map', 'tiles', 'spritesheet(2)')
		map = game.add.tilemap('map');
		map.addTilesetImage('spritesheet(2)','tiles');
		layer = map.createLayer(0);
		layer.resizeWorld();

		mapp = new Mapp(game, map, layer);

		vanguard = game.add.group();
		vanguard.enableBody = true;
		enemyUnits = game.add.group();
		enemyUnits.enableBody = true;


////////////////////////////////////////////////////////////////////
	     marker = game.add.graphics();
	     marker.lineStyle(2, 0xffffff, 1);
	     marker.drawRect(0, 0, 32, 32);
////////////////////////////////////////////////////////////////////

		player = new PlayerUnit(game, 'Characters','Player', 1, 64, 32);
		game.add.existing(player);
		vanguard.add(player);
		game.camera.follow(player, 0, 1, 1);

// Arg(HowMany, key of enemy image in atlas)
		SpawnEnemies(3, 'Enemy');
////////////////////////////////////////////////////////////////////
			     playermarker = game.add.graphics();
			     playermarker.lineStyle(2, 0x00ff77, 1);
			     playermarker.drawRect(player.position.x,player.position.y, 32 * 3, 32 * 3);
////////////////////////////////////////////////////////////////////

		game.input.onDown.add(GetTile, this);
		game.input.addMoveCallback(updateMarker, this);

	},
	update: function() {
		CheckForInput();


	}
}

function CheckForInput() {}

function updateMarker() {
    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;
}


function GetTile() {
	//Gets tile location in order to move the player
	var x = layer.getTileX(game.input.activePointer.worldX);
  var y = layer.getTileY(game.input.activePointer.worldY);
	
  var tile = map.getTile(x, y, layer);

	if(!mapp.isTileOpen(x,y))
	{
		console.log("Cant Move There");
	}
	else {
		player.MoveTo(x * 32, y * 32 - 32);
		playermarker.x = x * 32 - 1.5 * 64;
		playermarker.y = y * 32 - 1 * 64;
		tile.properties.Occupied = true;
	}
}

function SpawnEnemies(count, type) {
	for (var i = 0; i < count; i++) {
		var x = game.rnd.integerInRange(0, 63);
		var y = game.rnd.integerInRange(0, 31)

		//Checks to make sure tile they will spawn in is open
		while (!mapp.isTileOpen(x,y)) {
			x = game.rnd.integerInRange(0, 63);
			y = game.rnd.integerInRange(0, 31)
		}

		eUnit = new EnemyUnit(game, 'Characters',type, 1, x * 32, y * 32);
		game.add.existing(eUnit);
		enemyUnits.add(eUnit);
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
