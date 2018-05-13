
var game = new Phaser.Game(1200, 800, Phaser.AUTO);
var partySize = 4;

// define MainMenu state and methods
var Preload = function(game) {};
Preload.prototype = {
	preload: function() {
		//Preload menu assets and music here!
		//Centers the game screen.

		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

		game.load.image('Act1', 'assets/imgs/Act1.png');
	  game.load.image('Button','assets/imgs/Button.png');
		game.load.image('ButtonRnd','assets/imgs/Button_up.png');

		game.load.image('MainMenu','assets/imgs/MainMenu.png');

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
	init: function() {
		partyAlive = partySize;

	},
	preload: function() {
		game.load.atlas('Characters', 'assets/imgs/Characters.png','assets/imgs/Characters.json',
		Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.tilemap('map', 'assets/imgs/Test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/imgs/tiles.png');
		game.load.image('UIHalfWindow', 'assets/imgs/UIWindow3.png');

	},
	create: function() {

		units = [];
		currentUnit = 0;
		unitNum = 0;
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

		portrait = game.add.sprite(0,game.height - (600 * 0.2), 'UIHalfWindow');
		portrait.scale.setTo(0.2,0.2);
		portrait.fixedToCamera = true;

		endTurn = game.add.button(portrait.width * 0.9 ,game.height - portrait.height * 0.4, 'ButtonRnd', EndTurn, this);
		endTurn.anchor.x = 0.5;
		endTurn.anchor.y = 0.5;
		endTurn.fixedToCamera = true;
    endTurn.scale.setTo(1,1);

		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,
		 wordWrapWidth: portrait.width, align: "center", fontWeight: "bold" };
		unitWindowtext = game.add.text(portrait.width * 0.5 ,game.height - portrait.height * 0.7, "Health: \n Move:", style);
		unitWindowtext.fixedToCamera = true;



////////////////////////////////////////////////////////////////////
	     marker = game.add.graphics();
	     marker.lineStyle(2, 0xffffff, 1);
	     marker.drawRect(0, 0, 32, 32);
////////////////////////////////////////////////////////////////////
		SpawnParty();
		SpawnEnemies(3, 'Enemy');

		var i;
		for (var i = 0; i < vanguard.children.length; i++) {
			units[i] = vanguard.children[i];
		}
		for (i; i < enemyUnits.children.length + vanguard.children.length; i++) {
			units[i] = enemyUnits.children[i - vanguard.children.length];
		}
		currentUnit = units[unitNum];
		game.camera.follow(currentUnit, 0, 0.2, 0.2);

// Arg(HowMany, key of enemy image in atlas)

////////////////////////////////////////////////////////////////////
			     playermarker = game.add.graphics();
			     playermarker.lineStyle(2, 0x00ff77, 1);
					 playermarker.drawRect(0,0, 32 * 3, 32 * 3);
					 playermarker.x = currentUnit.position.x - 32;
					 playermarker.y = currentUnit.position.y;

					 key1 = game.input.keyboard.addKey(Phaser.Keyboard.T);
    	 		 key1.onDown.add(EndTurn, this);

////////////////////////////////////////////////////////////////////

		game.input.onDown.add(GetTile, this);
		game.input.addMoveCallback(updateMarker, this);

	},
	update: function() {
		CheckForInput();


	}
}

function EndTurn() {
	//Check for end turn button
	unitNum++;
	if(unitNum > units.length - 1){unitNum = 0;}
	currentUnit = units[unitNum];
	while(enemyUnits.children.indexOf(currentUnit) > -1)
	{//What to do when enemy turn comes up
		EnemyAct();
		unitNum++;
		if(unitNum > units.length - 1){unitNum = 0;}
		currentUnit = units[unitNum];

	}
	UpdateUI();
	game.camera.follow(currentUnit, 0, 0.2, 0.2);

}


function EnemyAct() {

	pnt = getRandomTile();
	x = layer.getTileX(currentUnit.position.x + pnt[0]);
  y = layer.getTileY(currentUnit.position.y + pnt[1]);

	currentUnit.MoveTo(x * 32, y * 32 - 32);


}

function getRandomTile()
{
	var randX = game.rnd.integerInRange(0,2);
	var randY = game.rnd.integerInRange(0,2);
	var x = 0;
	var y = 0;

	if (randX == 0) {
		x = 32;

	} else if(randX == 1) {
		x = -32;
	}

	if (randY == 0) {
		y = 32;

	} else if(randY == 1) {
		y = -32;
	}

	return [x,y];
}

function CheckForInput() {
}

function UpdateUI() {
	//Update Player unit UI
	var ptxt = "Health: " + currentUnit.health + "\n" + "Move: " + currentUnit.movement;
	unitWindowtext.text = ptxt;
	//Update boundry box of currentUnit
	playermarker.x = currentUnit.position.x - 32;
	playermarker.y = currentUnit.position.y;
}

function updateMarker() {
    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;
}


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
		currentUnit.MoveTo(x * 32, y * 32 - 32);
		playermarker.x = currentUnit.position.x - 32;
		playermarker.y = currentUnit.position.y;
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

		//function EnemyUnit(game, key, frame, scale, x, y, health, baseDmg) {
		eUnit = new EnemyUnit(game, 'Characters',type, 1, x * 32, y * 32, 50, 10);
		game.add.existing(eUnit);
		enemyUnits.add(eUnit);
	}
}

function SpawnParty() {
	for (var i = 0; i < partySize; i++) {
		var x = game.rnd.integerInRange(0, 63);
		var y = game.rnd.integerInRange(0, 31)

		//Checks to make sure tile they will spawn in is open
		while (!mapp.isTileOpen(x,y)) {
			x = game.rnd.integerInRange(0, 63);
			y = game.rnd.integerInRange(0, 31)
		}

//function PlayerUnit(game, key, frame, scale, x, y, health, baseDmg) {
		pUnit = new PlayerUnit(game, 'Characters','Player', 1, x * 32, y * 32, 100, 15);
		game.add.existing(pUnit);
		vanguard.add(pUnit);
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
