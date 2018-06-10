
//\\_____________________//\\
//\\ Global variables    //\\
//\\_____________________//\\
var partySize = 4;
var population =1000;
var startingPopulation = population;
var food = 100;
var startingFood = food;
var supplies=150;
var startingResources = supplies;
var currentBGM;
var currentAct = "act1";
var cne;//curent narative event
var forestFn=1;//forest function number
var assaultCastleFn=1;//assault castle function number
//\\_____________________//\\
//\\ Global variables    //\\
//\\_____________________//\\

window.onload = function(){
    game = new Phaser.Game(1200, 800, Phaser.AUTO, '');

		// add states to StateManager and start MainMenu
    game.state.add('preload', Preload);
    game.state.add('mainMenu', MainMenu);
    game.state.add('load', Load);
    game.state.add('LoadCampfire', LoadCampfire);

		game.state.add('boot', Boot);

		game.state.add('combat', Combat);

		game.state.add('act1', Act1);
		game.state.add('act2', Act2);
		game.state.add('act3', Act3);

    game.state.add('DebugMenu', DebugMenu);


		game.state.start('boot');

};

// define MainMenu state and methods
var Preload = function(game) {};
Preload.prototype = {
	preload: function() {
		//Preload menu assets and music here!
		//Centers the game screen.
    game.load.image('TextWindow','assets/imgs/TextWindow.png')
    game.load.image('LongWindow','assets/imgs/UILongPlain.png')


    	game.load.atlas('RndButton', 'assets/imgs/RndButton.png','assets/imgs/RndButton.json',
		Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

		game.load.atlas('instructions', 'assets/imgs/instructions.png','assets/imgs/instructions.json'),
		game.load.atlas('backgrounds', 'assets/imgs/backgrounds.png','assets/imgs/backgrounds.json'),
		game.load.atlas('bgimages', 'assets/imgs/bgimages.png','assets/imgs/bgimages.json'),
		game.load.atlas('narrativeButtons', 'assets/imgs/narrativeButtons.png','assets/imgs/narrativeButtons.json',
     	Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.atlas('A1T', 'assets/imgs/NarrativeText/act_1_text.png', 'assets/imgs/NarrativeText/act_1_text.json'), // Act 1 Narrative atlas + .json
		game.load.atlas('A2T', 'assets/imgs/NarrativeText/act_2_text.png', 'assets/imgs/NarrativeText/act_2_text.json'), // Act 2 Narrative atlas + .json

		//Sprites
		game.load.atlas('knightL', 'assets/imgs/Sprites/knightLeft.png', 'assets/imgs/Sprites/knightLeft.json'),
		game.load.atlas('knightR', 'assets/imgs/Sprites/knightRight.png', 'assets/imgs/Sprites/knightRight.json'),
		game.load.atlas('orcL', 'assets/imgs/Sprites/orcLeft.png', 'assets/imgs/Sprites/orcLeft.json'),

		game.load.audio('menuSnd', 'assets/snds/menu.ogg');
		game.load.audio('battleSnd', 'assets/snds/battle.ogg');

	},
	create: function() {
    var info = {timer: 3, scene: "DebugMenu", keepPreload: true, keepCreate: false, combat: null}
    LoadScene(info);

	}
}

var LoadCampfire = function(game) {};
LoadCampfire.prototype = {
  init: function(loadInfo) {
    //			var combatEnd = {scene: act, lost: (partySize / partySize) * 100, scene: act, next: lossFunction}
   this.info = loadInfo

  },
  create: function() {
    if(this.info.win){
      UpdateResources(-(200 - 170 * (this.info.lost / 100)),+getRandomInt(50), 0);}
    else {
      UpdateResources(-(200 - 170 * (this.info.lost / 100)),0, 0);
    }


    if(currentAct != this.info.scene)
    {
      game.state.start("load", true, false, this.info);
    }
    else {
      cont = game.add.button(game.camera.width/2, game.camera.height/2 + 100, 'RndButton', LoadScene, this, 'Hover','Up','Down');
      cont.anchor.set(0.5);
      cont.next = this.info.next;
      cont.scene = this.info.scene;
      cont.keepPreload = true;
      cont.keepCreate = false;
    }
  }
}


var Load = function(game) {};
Load.prototype = {
  init: function(loadInfo) {
   this.loadInfo = loadInfo

  },
  preload: function() {
    // preload assets
  	game.load.atlas('loading','assets/imgs/loadingAtlas.png','assets/imgs/loading.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  	game.load.image('window','assets/imgs/TextWindow.png');//Replace with UI atlas when its made available
  	treesSprite = ["Tree1","Tree2","Tree3","Tree4","Tree5","Tree6","skull","Skeleton"];
  	dustSprite = ["dust1","dust2","dust3"];
  	//replace with global variables

  	//replace with global variables
  	//if variable names change check the bottom of create at ~line 90
  },
  create: function() {
    game.add.sprite(0,0,'loading','Gradient');
  	sun = game.add.sprite(800,535,'loading','Sun');
  	sun.anchor.setTo(.5,.5);
  	game.add.sprite(0,443,'loading','Mountains');
  	hills = game.add.tileSprite(0,590,1800,166,'loading','Hills');
  	game.add.sprite(0,672,'loading','Floor');

    bgtrees = game.add.group();

  	bgTreeTimer = game.time.create(false);
  	bgTreeTimer.loop(10000+(Math.random()*1000), createbgTree, this);
  	bgTreeTimer.start();

  	banner1 = game.add.sprite(346,605,'loading','Flag-1');
  	banner1.animations.add('flag',[1,2,3,4],4,true);
  	banner1.animations.play('flag');
  	banner1.scale.setTo(.5,.5);
  	banner2 = game.add.sprite(497,602,'loading','Flag-1');
  	banner2.animations.add('flag',[1,2,3,4],4,true);
  	banner2.animations.play('flag');
  	banner2.scale.setTo(.5,.5);
  	banner3 = game.add.sprite(654,610,'loading','Flag-1');
  	banner3.animations.add('flag',[1,2,3,4],4,true);
  	banner3.animations.play('flag');
  	banner3.scale.setTo(.5,.5);
  	banner4 = game.add.sprite(877,600,'loading','Flag-1');
  	banner4.animations.add('flag',[1,2,3,4],4,true);
  	banner4.animations.play('flag');
  	banner4.scale.setTo(.5,.5);

  	army = game.add.sprite(210,660,'loading','Army-1');
  	armyStretch = 0.
  	armyDir = 0;

  	heads1 = game.add.sprite(260,665,'loading','Heads1');
  	headBobDir1 = 0;
  	heads2 = game.add.sprite(260,665,'loading','Heads2');
  	headBobDir2 = 0;

  	fgtrees = game.add.group();

  	fgTreeTimer = game.time.create(false);
  	fgTreeTimer.loop(4000+(Math.random()*5000), createfgTree, this);
  	fgTreeTimer.start();

  	armyTimer = game.time.create(false);
  	armyTimer.loop(3000, switchDir, this);
  	headBob1Timer1 = game.time.create(false);
  	headBob1Timer1.loop(1500, HeadDir1, this);
  	headBob1Timer1.start();
  	headBob1Timer2 = game.time.create(false);
  	headBob1Timer2.loop(1500, HeadDir2, this);
  	headBob1Timer2.start();

  	dust = game.add.emitter(510, 665, 100)
  	dust.makeParticles('loading',dustSprite[Math.round(Math.random()*3)]);
  	dust.minParticleAlpha = 0.01;
  	dust.maxParticleAlpha = 0.1;
  	dust.minParticleScale = .5;
  	dust.maxParticleScale = 1;
  	dust.setXSpeed(-70,-55);
  	dust.setYSpeed(-50,0);
  	dust.gravity = 0;
  	dust.maxRotation = 0;
  	dust.flow(10000,500,5,-1);

  	Lwindow = game.add.sprite(game.camera.width/2,game.camera.height/2 - 100,'window');
  	Lwindow.scale.setTo(.55,.4)
    Lwindow.anchor.setTo(0.5,0.5)
  	Lwindow.alpha = 0;
  	game.add.tween(Lwindow).to( { alpha: .8 }, 5000, "Linear", true);

    if(startingFood - food > 0)
    {
      currentFood = game.add.text(285, 220, startingFood-food+" extra food was scavanged this round");

    }
    else {
      currentFood = game.add.text(285, 220, startingFood-food+" Food was consumed or lost");

    }

    if(startingPopulation-population > 0)
    {
      currentPopulation = game.add.text(285, 170, startingPopulation-population+" People joined you on this stretch of your march");

    }
    else {
      currentPopulation = game.add.text(285, 170, startingPopulation-population+" People died on this stretch of your journey");
    }

    if(startingResources-supplies > 0)
    {
      currentResources = game.add.text(285, 270, startingResources-supplies+" Resources were 'acquired' this round");

    }
    else {
      currentResources = game.add.text(285, 270, startingResources-supplies+" Resources were consumed or lost");

    }



    console.log(this.loadInfo);
    info = game.add.button(game.camera.width/2,game.camera.height/2 + 0, 'LongWindow', LoadScene, this);
    infoTxt = game.add.text(game.camera.width/2 - 50,game.camera.height/2 - 10, "March!");
    info.anchor.set(0.5);
    info.scale.setTo(0.2,0.2)
    var tween = game.add.tween(info.scale).to( { x:0.21, y:0.21 }, 500, "Linear", true, 0, -1);
    tween.yoyo(true, 400);

    info.scene = this.loadInfo.scene;
    info.keepPreload = this.loadInfo.keepPreload;
    info.keepCreate = this.loadInfo.keepCreate;
    info.combat = this.loadInfo.combat;

    startingFood=food;
    startingResources=supplies;
    startingPopulation=population;
    //game.time.events.add(Phaser.Timer.SECOND * this.loadInfo.timer, LoadScene, this, this.loadInfo);
  },
  update: function() {
    hills.tilePosition.x-=.1;
    sun.angle+=.1;
    bgtrees.forEachAlive(function(bgtree) {bgtree.x-=.3},this);
    fgtrees.forEachAlive(function(fgtree) {fgtree.x-=.7},this);
    if(armyDir == 0){armyStretch+=.0001};
    if(armyDir == 1){armyStretch-=.0001};
    army.scale.setTo(1+armyStretch,1-armyStretch);
    if(headBobDir1==0){heads1.y+=.025};
    if(headBobDir1==1){heads1.y-=.025};
    if(headBobDir2==0){heads1.y+=.025};
    if(headBobDir2==1){heads1.y-=.025};
	   armyTimer.start();

	  headBob1Timer1 = game.time.create(false);
 }
}

//Loadscreen Functions!
function createbgTree() {
	var bgtree = bgtrees.create(1300,705+(Math.random()*15),'loading',treesSprite[Math.round(Math.random()*7)])
	bgtree.scale.setTo(.2+(Math.random()*.2),.2+(Math.random()*.2));
	bgtree.anchor.setTo(0,1);
}
function createfgTree() {
	var fgtree = fgtrees.create(1300,835-(Math.random()*60),'loading',treesSprite[Math.round(Math.random()*7)])
	fgtree.scale.setTo(.6+(Math.random()*.3),.6+(Math.random()*.3));
	fgtree.anchor.setTo(0,1);
}
function switchDir(){
  if(armyDir==0){armyDir=1}else{armyDir=0}
}
function HeadDir1(){
  if(headBobDir1==0){headBobDir1=1}else{headBobDir1=0}
}
function HeadDir2(){
  if(headBobDir2==0){headBobDir2=1}else{headBobDir2=0}
}

function LoadScene(info) {
  console.log(info);
 if(info.scene == "combat")
  {
    game.state.start(info.scene, info.keepPreload, info.keepCreate,info.combat);
  }
  else {
      narrative = {next:info.next}
      game.state.start(info.scene, info.keepPreload, info.keepCreate, narrative);
  }
}

//Temp Laod Functions

function LoadCombat(button) {
  var combat = {map:button.combatmap, prevScene:button.scene,
     lossFunction: button.lossFunction,  winFunction: button.winFunction}
  var info = {timer: 3, scene: "combat", keepPreload: true, keepCreate: false, combat:combat}
  game.state.start("load", true, false, info);
}

function LoadNarrative(button) {
  var combat;
  var info = {timer: 3, scene: button.scene, keepPreload: true, keepCreate: false, combat:combat}
  game.state.start("load", true, false, info);
	//game.state.start("act1", true, false);
}

//ADD MAIN MENU HERE
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

		bg = game.add.sprite(0,0, 'bgimages', 'Loading');
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

		bNarrative = game.add.button(game.camera.width / 2,game.camera.height / 2 + 100, 'RndButton', LoadNarrative, this, 'Hover', 'Up','Down');
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


/////////////////////////////

/////////////////////////////

var DebugMenu = function(game) {};
DebugMenu.prototype = {
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

    style = { fontSize: '31px', fill: '#000000', boundsAlignH: 'center'};
    menuWindow = game.add.sprite(game.camera.width / 2,game.camera.height / 2, 'TextWindow');
    menuWindow.anchor.x = menuWindow.anchor.y = 0.5;
    menuWindow.scale.setTo(0.5,0.5);

		act1 = game.add.button(game.camera.width / 2 - 300,game.camera.height / 2 - 150, 'RndButton', LoadNarrative, this, 'Hover', 'Up','Down');
		act1.anchor.x = act1.anchor.y = 0.5;
		act1.scale.setTo(1.2,1);
    act1.scene = "act1";

    act1Txt = game.add.text(game.camera.width / 2 - 250 , game.camera.height / 2 - 150, 'Load Act1',style)


    act2 = game.add.button(game.camera.width / 2 -300 ,game.camera.height / 2 -50, 'RndButton', LoadNarrative, this, 'Hover', 'Up','Down');
		act2.anchor.x = act2.anchor.y = 0.5;
		act2.scale.setTo(1.2,1);
    act2.scene = "act2";

    act2Txt = game.add.text(game.camera.width / 2 - 250 , game.camera.height / 2 - 50, 'Load Act2',style)

    act3 = game.add.button(game.camera.width / 2 - 300 , game.camera.height / 2 + 50, 'RndButton', LoadNarrative, this, 'Hover', 'Up','Down');
		act3.anchor.x = act3.anchor.y = 0.5;
		act3.scale.setTo(1.2,1);
    act3.scene = "act3";

    act3Txt = game.add.text(game.camera.width / 2 - 250 , game.camera.height / 2 + 50, 'Load Act3',style)



	},
	update: function() {
		//game.state.start('GamePlay', true, false);

	}
}
