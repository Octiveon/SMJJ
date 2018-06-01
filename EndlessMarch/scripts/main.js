
//\\_____________________//\\
//\\ Global variables    //\\
//\\_____________________//\\
var partySize = 4;
var population =1000;
var food = 1000;
var supplies=1000;
var currentBGM;
var cne;//curent narative event
//\\_____________________//\\
//\\ Global variables    //\\
//\\_____________________//\\

window.onload = function(){
    game = new Phaser.Game(1200, 800, Phaser.AUTO, '');

		// add states to StateManager and start MainMenu
    game.state.add('preload', Preload);
    game.state.add('mainMenu', MainMenu);
    game.state.add('load', Load);

		game.state.add('boot', Boot);

		game.state.add('combat', Combat);

		game.state.add('acts', Acts);
		game.state.add('act1', Act1);
		game.state.add('act2', Act2);
		game.state.add('act3', Act3);

		game.state.start('boot');

};

// define MainMenu state and methods
var Preload = function(game) {};
Preload.prototype = {
	preload: function() {
		//Preload menu assets and music here!
		//Centers the game screen.
    game.load.image('TextWindow','assets/imgs/TextWindow.png')


    	game.load.atlas('RndButton', 'assets/imgs/RndButton.png','assets/imgs/RndButton.json',
		Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

		game.load.atlas('instructions', 'assets/imgs/instructions.png','assets/imgs/instructions.json'),
		game.load.atlas('backgrounds', 'assets/imgs/backgrounds.png','assets/imgs/backgrounds.json'),
		game.load.atlas('narrativeButtons', 'assets/imgs/narrativeButtons.png','assets/imgs/narrativeButtons.json',
     Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.atlas('A1T', 'assets/imgs/act_1_text.png', 'assets/imgs/act_1_text.json'),
		game.load.atlas('knightL', 'assets/imgs/knightLeft.png', 'assets/imgs/knightLeft.json'),
		game.load.atlas('knightR', 'assets/imgs/knightRight.png', 'assets/imgs/knightRight.json'),

		game.load.audio('menuSnd', 'assets/snds/menu.ogg');
		game.load.audio('battleSnd', 'assets/snds/battle.ogg');

	},
	create: function() {
    LoadScene('mainMenu');

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

//Temp Laod Functions
function LoadCombat() {
	game.state.start("combat", true, false,'TestMap3');
}

function Narrative() {
	game.state.start("act1", true, false);
}

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
	},
	create: function() {
		if(currentBGM != 0)
		{
			game.sound.stopAll();
			currentBGM = game.add.audio('menuSnd');
			currentBGM.play('',0,0.1,true);
		}
		else {
			currentBGM = game.add.audio('menuSnd');
			currentBGM.play('',0,0.1,true);
		}

		bg = game.add.sprite(0,0, 'backgrounds', 'MainMenu');
		bg.scale.setTo(1.2,1.6);

    menuWindow = game.add.sprite(game.camera.width / 2,game.camera.height / 2, 'TextWindow');
    menuWindow.anchor.x = menuWindow.anchor.y = 0.5;
    menuWindow.scale.setTo(0.5,0.5);

		bCombat = game.add.button(game.camera.width / 2,game.camera.height / 2, 'RndButton', LoadCombat, this, 'Hover', 'Up','Down');
		bCombat.anchor.x = bCombat.anchor.y = 0.5;
    bCombat.scale.setTo(1.2,1);
		//new Text(game, x, y, text [, style])
	  bCombatTxt = game.add.text(game.camera.width / 2, game.camera.height / 2 + 50, 'Load Combat',
     { fontSize: '31px', fill: '#000000', boundsAlignH: 'center'})
		bCombatTxt.anchor.x = bCombatTxt.anchor.y = 0.5;

		bNarrative = game.add.button(game.camera.width / 2,game.camera.height / 2 + 100, 'RndButton', Narrative, this, 'Hover', 'Up','Down');
		bNarrative.anchor.x = bNarrative.anchor.y = 0.5;
		bNarrative.scale.setTo(1.2,1);

		bNarrativeTxt = game.add.text(game.camera.width / 2, game.camera.height / 2 + 150, 'Load Narrative',
     { fontSize: '31px', fill: '#000000', boundsAlignH: 'center'})
		bNarrativeTxt.anchor.x = bNarrativeTxt.anchor.y = 0.5;


	},
	update: function() {
		//game.state.start('GamePlay', true, false);

	}
}
