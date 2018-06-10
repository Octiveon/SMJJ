var Acts = function(game) {};
Path = [];
cnt = 0;
var poptxt;
var foodtxt;
var supplytext;

Acts.prototype = {
    preload: function () {
    },

    create: function () {
    },

    update: function () {
    }
};

var Act1 = function(game) {};
var text;
var tb;
var button1;
var b1t;
var button2;
var b2t;
var windoww;
var ctxt="text has been changed";
var b1t="";
var narrative;

//Act 1
Act1.prototype = {
  init: function(info) {
    combatInfo = info;//variables used for stuff
    nextFunction = info.next;

  },
	preload: function() {
    game.load.image('statusBar', 'assets/imgs/UIHalfWindow.png');
		game.load.image('window', 'assets/imgs/TextWindow.png');

	},
	create: function() {
		//background
		bg = game.add.sprite(0,0, 'bgimages', 'Act1');
		bg.scale.setTo(1.2,1.2);

    line = game.add.graphics(0,0);
    line.lineStyle(5, 0xffd900, .8);
    SpawnOldButtons();

		windoww = game.add.sprite(487,320,'window');
		windoww.scale.set(.4,.4);
		windoww.inputEnabled = true;
		windoww.input.enableDrag();
		windoww.x =2000;
		//code taken from phaser//    https://phaser.io/examples/v2/text/center-text-on-sprite
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: windoww.width-25, align: "left"};
		b1t =game.add.text(0,0,"tempword",style);
		b1t.anchor.set(0);
		b2t =game.add.text(0,0,"tempword",style);
		b2t.anchor.set(0);
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };
		narrative = game.add.sprite(0, 0);
    if(Path[0] == null){
      caravanStart = game.add.button(game.camera.width *0.15, game.camera.height *0.7, 'RndButton', elderbattleEnd, this, 'Hover','Up','Down');
      caravanStart.anchor.set(0.5);
      AddPath();

    }

		button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
		button2 = game.add.button(2000,0,'RndButton',villagerBattle,this,'Hover','Up','Down');

    statusWindow = game.add.image(0,0,"statusBar");
    statusWindow.scale.setTo(0.5,0.3);

		poptxt = game.add.text(16, 16, 'Population: 1000', { fontSize: '24px', fill: '#00000' });
		supplytxt = game.add.text(250, 16, 'Supplies: 1000', { fontSize: '24px', fill: '#00000' });
		foodtxt = game.add.text(155, 45, 'Food: 1000', { fontSize: '24px', fill: '#00000' });

    if(nextFunction!= null)
    {
      window[nextFunction]();
    }
    DrawPath();
	},
	update: function() {

		// window button 1
		button1.x = Math.floor(windoww.x + 200);
		button1.y = Math.floor(windoww.y + 350);
		b1t.x = Math.floor(windoww.x + 250);
		b1t.y = Math.floor(windoww.y + 355);
		//window button 2
		button2.x = Math.floor(windoww.x + 400);
		button2.y = Math.floor(windoww.y + 350);
		b2t.x = Math.floor(windoww.x + 450);
		b2t.y = Math.floor(windoww.y + 355);
		poptxt.text = 'Population: ' + population;
		supplytxt.text = 'Supplies: ' + supplies;
		foodtxt.text = 'Food: ' + food;
		//narrative box
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);

    DebugPos();

	}
}


function DebugPos() {
  var x = game.input.activePointer.worldX;
	var y = game.input.activePointer.worldY;
  x = x.toFixed(2);
  y = y.toFixed(2);
  game.debug.text( "X: "+x+" Y: "+y, 260, 80 );
}

////////////////////////act1 functions begin
function elderbattleEnd(){
	console.log("elderbattle");
  caravanStart.destroy();
	b1t.text="Ascend Mountains";
	b2t.text="Villager Battle";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',villagerBattle,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Elder Battle Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
}
function rockslide(){
	console.log("rockslide");
	supplies-=getRandomInt(5);
	food-=getRandomInt(5)+3;
	b1t.text="Take Higher Path";
	b2t.text="Clear Path";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',Orcbattle,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',clearPath,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(400, 400, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Rock Slide');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function clearPath(){
	console.log("cp");
	button1.destroy();
	button2.destroy();
	supplies-= getRandomInt(5)+10 ;
	food-=getRandomInt(5)+13;
	b1t.text="Venture Forward";
	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',weatherDecision,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Clear A Path');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);

}
function Orcbattle(){
	console.log("ob");
	b1t.text="Start Combat";
	b2t.text="";
	button1.destroy();
	button2.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  	button1.combatmap = "Bridgebattle";
  	button1.enemy = "Orc";
  	button1.winFunction = "weatherDecision";
  	button1.lossFunction = "weatherDecision";
  	button1.scene = "act1";
	cne=weatherDecision;
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(435,300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();
  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Orc Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function weatherDecision(){
	console.log("wd");
	supplies-=getRandomInt(5);
	food-=getRandomInt(5)+3;
	b1t.text="Risk Storm";
	b2t.text="Descend to the coast";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',RiskStorm,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',FoothillM2C,this,'Hover','Up','Down');//banditlevel
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(265,203, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();
  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Weather Decision');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}

function FoothillM2C(){
	button1.destroy();
	button2.destroy();
	b1t.text="Fight!";
	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button1.combatmap = "FootHillM2C";
  button1.enemy = "Orc";
  button1.winFunction = "FoothillM2CWin";
  button1.lossFunction = "FoothillM2CLose";
  button1.scene = "act1";

	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Foothill Bandits MtoC');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function FoothillM2CWin(){
	button1.destroy();
	button2.destroy();
	b1t.text="Venture forward";
	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',crossroad,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Foothill Bandits MtoC Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function FoothillM2CLose(){
	button1.destroy();
	button2.destroy();
	b1t.text="Retreat back to lower pass";
	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',RiskStorm,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Foothill Bandits MtoC Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}

function RiskStorm(){
	console.log("RS");
	supplies-=getRandomInt(5)+3;
	food-=getRandomInt(12);
	if(getRandomInt(1)==1){
		population-=getRandomInt(100)+12;
		supplies-=getRandomInt(12)+12;
		food-=getRandomInt(12);
	}
	//texthere;
	b1t.text="Mountain Descent";
	b2t.text=" ";
	button1.destroy();
	button2.destroy();
	button1 = game.add.button(2000,0, 'RndButton',mountainDesent,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(468,153, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();
  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Mountain Storm');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}

function mountainDesent(){
	console.log("MD");
	b1t.text="Go Fast";
	b2t.text="Go Slow";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',gofast,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.callback=goSlow;
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',goSlow,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(515,166, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Mountain Descent');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function gofast(){
	supplies-=getRandomInt(5);
	var control;
	control=getRandomInt(1);
	console.log("control = " + control);
	if (control==1) { // if controlled fast descent
		supplies-=getRandomInt(8)+8;
		b1t.text="Continue to the border";
		b2t.text="";
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',BorderBattle,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		moveWindowOffScreen();
		caravanStart.destroy();
		caravanStart = game.add.button(791,349, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	 	caravanStart.anchor.set(0.5);
	 	AddPath();
	  narrative.destroy();
	  narrative = game.add.sprite(2000, 0, 'A1T','Go Fast Win');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	} else { // if not controlled fast descent
		supplies-=getRandomInt(15)+8;
		b1t.text="Continue to the border";
		b2t.text="";
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',BorderBattle,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		moveWindowOffScreen();
		caravanStart.destroy();
		caravanStart = game.add.button(791,349, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	 	caravanStart.anchor.set(0.5);
	 	AddPath();
	  	narrative.destroy();
	  	narrative = game.add.sprite(2000, 0, 'A1T','Go Fast Lose');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	}
}
function goSlow(){
	supplies-=getRandomInt(5)+1;
	food-=getRandomInt(5)+3;
	population-=getRandomInt(8)+4;
	var c=getRandomInt(100);
	if (c>30){
		population-=getRandomInt(8)+4;
		food-=getRandomInt(5)+3;
		supplies-=getRandomInt(4)+1;
		//text code here
	}else{
		population-=getRandomInt(98)+24;
		food-=getRandomInt(12)+4;
		supplies-=getRandomInt(12)+12;
		//textcode here
	}
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(791,349, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Go Slow');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}

function foothilbandits(){
	b1t="Take Higher Path";
	b2t="Descend Mountains";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',RiskStorm,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',crossroad,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);

	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(338,240, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

}

function villagerBattle(){
	//settext
	button2.destroy();
	console.log("vb");
	b1t.text="Start Combat";
	b2t.text=" ";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  	button1.combatmap = "VillageBattle";
  	button1.enemy = "{Insert ENEMY TYPE HERE IE Orc/Knight}";
  	button1.winFunction = "vbwon";
  	button1.lossFunction = "vblost";
  	button1.scene = "act1";

	//end of this battle nbeeds to have cne set to either vblost or vbwon
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(548,576, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();
  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Village Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function vbwon(){
	console.log("vbw");
	b1t.text ="Loot Village";
	b2t.text ="Recruit Villagers";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',lootvillage,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',recruitvillagers,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A1T','Village Battle Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
}
function vblost(){
	console.log("vblost");
	b1t.text="Move On";
	b2t.text="Avenge";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',avenge,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A1T','Village Battle Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
}
function avenge(){
	cne=rest;
	b1t.text="Kill Them All";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//avenge combat
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  	button1.combatmap = "VillageRaid";
    button1.enemy = "{Insert ENEMY TYPE HERE IE Orc/Knight}";
  	button1.winFunction = "{INSERT FUNCTION NAME}";
  	button1.lossFunction = "{INSERT FUNCTION NAME}";
  	button1.scene = "Act1";

	button2.destroy();
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Avenge');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function lootvillage(){
	supplies+=getRandomInt(10);
	b1t.text="Rest";
  b2t.text="";
	//textimage call
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(700,700, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
 	AddPath();

  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Loot Village');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function recruitvillagers(){
	population+=getRandomInt(10);
  	partySize++;
	b1t.text = "Rest";
  	b2t.text="";

	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(565,565,'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Recruit Villagers');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);

}

function rest(){
	food=+3;
	supplies-=4;
	b1t.text="Take Rest";
	b2t.text="Press On";
	//text image call
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',takeRest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',PressOn,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(548,576, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Rest');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);

}
function PressOn(){
	supplies-=6;
	food-=6;
	b1t.text="Start Combat";
	b2t.text="";
	//text image call
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',foothilbandits,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(644,477, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
 	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Press On');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function PressOnWon(){
	b1t.text="Venture into the hills";
	b2t.text="Coastal Storm";
	//text image call
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',takeRest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',PressOn,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(548,576, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Press On Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function PressOnLose(){
	b1t.text="Venture into the hills";
	b2t.text="Coastal Storm";
	//text image call
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',takeRest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',PressOn,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(548,576, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Press On Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function takeRest(){
	food-=3;
	//rest image call
	b1t.text="Mountain Pass";
	b2t.text="Foothill Bandits";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',crossroad,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',foothilbandits,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(548,576, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

 	narrative.destroy();
 	narrative = game.add.sprite(2000, 0, 'A1T','Take A Rest');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function crossroad(){
	food-=3;
	b1t.text="Raider Battle";
	b2t.text="Avoid Village";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',raiderBattle,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',avoidVillage,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(822,360, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Crossroad');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function avoidVillage(){
	supplies-=3;
	food-=3;
	b1t.text="Border Battle";
  	b2t.text="";

	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',BorderBattle,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(750,277, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

  	narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Avoid Village');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function raiderBattle(){
 	cne=BorderBattle;
 	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//load raider battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button1.combatmap = "RaiderBattle";
	button1.enemy = "{Insert ENEMY TYPE HERE IE Orc/Knight}";
	button1.winFunction = "{INSERT FUNCTION NAME}";
	button1.lossFunction = "{INSERT FUNCTION NAME}";
	button1.scene = "act1";

	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(750,277, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  	caravanStart.anchor.set(0.5);
  	AddPath();

 	 narrative.destroy();
  	narrative = game.add.sprite(2000, 0, 'A1T','Raider Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
 }
function BorderBattle(){
 	console.log("BB");
 	b1t.text="FIGHT!";
 	b2t.text=" ";
 	food -=getRandomInt(5)+3;
 	supplies-=getRandomInt(5);
 	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//border battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  	//Addes data to the button to be pulled by LoadCombat
	button1.combatmap = "BorderBattle";
	button1.enemy = "Knight";
	button1.winFunction = "bbv";
	button1.lossFunction = "bbl";
	button1.scene = "act2";

	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(614,58, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
	AddPath();
  Path = [];
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Battle At The Border');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
////////////////////act1 functions end


var Act2 = function(game) {};
var tb;
var button1;
var b1t;
var button2;
var b2t;
var button3;
var b3t;
var windoww;
var ctxt="text has been changed";
var b1t="";
var narrative;

Act2.prototype = {
  init: function(info) {
    combatInfo = info;//variables used for stuff
    nextFunction = info.next;
  },

	preload: function() {
		game.load.image('window', 'assets/imgs/TextWindow.png');
    game.load.image('statusBar', 'assets/imgs/UIHalfWindow.png');

	},
	create: function() {
		bg = game.add.sprite(0,0, 'bgimages', 'Act2');
		bg.scale.setTo(1.2,1.2);
		windoww = game.add.sprite(487,320,'window');
		windoww.scale.set(.4,.4);
		windoww.inputEnabled = true;
		windoww.input.enableDrag();
		windoww.x =2000;

    line = game.add.graphics(0,0);
    line.lineStyle(5, 0xffd900, .8);
    SpawnOldButtons();

		//code taken from phaser//    https://phaser.io/examples/v2/text/center-text-on-sprite
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: windoww.width, align: "left"};
		b1t =game.add.text(0,0,"",style);
		b1t.anchor.set(0);
		b2t =game.add.text(0,0,"",style);
		b2t.anchor.set(0);
		b3t =game.add.text(0,0,"",style);
		b3t.anchor.set(0);
		//make if statements ass needed here for combat results
		//caravanStart.destroy();

		caravanStart = game.add.button(502, 562, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
		caravanStart.anchor.set(0.5);

		button1 = game.add.button(2000,0, 'RndButton',null,this,'Hover','Up','Down');
		button2 = game.add.button(2000,0,'RndButton',null,this,'Hover','Up','Down');
		button3 = game.add.button(2000,0,'RndButton',null,this,'Hover','Up','Down');
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };

    statusWindow = game.add.image(0,0,"statusBar");
    statusWindow.scale.setTo(0.5,0.3);

    poptxt = game.add.text(16, 16, 'Population: 1000', { fontSize: '24px', fill: '#00000' });
		supplytxt = game.add.text(250, 16, 'Supplies: 1000', { fontSize: '24px', fill: '#00000' });
		foodtxt = game.add.text(155, 45, 'Food: 1000', { fontSize: '24px', fill: '#00000' });

    if(nextFunction!= null)
    {
      window[nextFunction]();
    }
	},
	update: function() {
		// window button 1
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		b1t.x = Math.floor(windoww.x + 160);
		b1t.y = Math.floor(windoww.y + 370);
		//window button 2
		button2.x = Math.floor(windoww.x + 300);
		button2.y = Math.floor(windoww.y + 350);
		b2t.x = Math.floor(windoww.x + 380);
		b2t.y = Math.floor(windoww.y + 370);
		//window button 3
		button3.x = Math.floor(windoww.x + 500);
		button3.y = Math.floor(windoww.y + 350);
		b3t.x = Math.floor(windoww.x + 580);
		b3t.y = Math.floor(windoww.y + 370);
		poptxt.text = 'Population: ' + population;
		supplytxt.text = 'Supplies: ' + supplies;
		foodtxt.text = 'Food: ' + food;
	}
}

///////////////////// act2 functions begin
//won border battle
function bbv(){
	button1.destroy();
	button2.destroy();
	button3.destroy();
	console.log("bbv");
	population-=population/12;
	supplies+=100;
	b1t.text="Siege";
	b2t.text="March On";
	// window button 1
	button1 = game.add.button(2000,0, 'RndButton',siege,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	//window button 2
	button2 = game.add.button(2000,0, 'RndButton',marchOn,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','Border Battle Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
}
function bbl(){ // border battle lose
	button1.destroy();
	button2.destroy();
	button3.destroy();
	console.log("bbl");
	population-=population/6;
	supplies-=100;
	food-=100;
	b1t.text="Go Through Forest";
	b2t.text="Walk The Edge";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',walkEdge,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',forest,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','Border Battle Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
}
function siege(){
	//mapbuttoncode
	caravanStart.destroy();
	caravanStart = game.add.button(280, 516, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
	console.log("siege");
	b1t.text="Starve Out";
	b2t.text="March On";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',starveOut,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',assaultCastle,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','Siege');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
}
function marchOn(){
	console.log("marchOn");
	b1t.text="Continue on";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',pillage,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','March On');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(233, 462, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function starveOut(){
	console.log("starveOut")
	if(math.getRandomInt(1)<.5){
		supplies+=100;
		food+=7;
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		b1t.text="continue on";
		b2t.text=""
		//starvation succesfull
		narrative = game.add.sprite(2000, 0, 'A2T','Starve Them Out Success');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	}else{
		//starvation fail
		food-=10;
		supplies-=12;
		population-=getRandomInt(12)+12;
		b1t.text="contiue siege";
		b2t.text ="assult castle";
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',starveOut,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		button2 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//castle assult level
		button2.x = Math.floor(windoww.x + 300);
		button2.y = Math.floor(windoww.y + 350);
		narrative = game.add.sprite(2000, 0, 'A2T','Starve Them Out Failure');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	}
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(233, 465, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
//set greater than 1 for win
function assaultCastle(c){
	console.log("assaultCastle");
	if(c>1){
		population-=getRandomInt(300)+200;
		supplies+=150;
		food+=20;
		b1t.text="Continue On";
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		narrative = game.add.sprite(2000, 0, 'A2T','Assault The Castle Win');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
		moveWindowOnScreen();
	}else{
		population-=getRandomInt(450)+350;
		supplies-=150;
		b1t.text="Go through forest";
		b2t.text="Walk the edge";
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',walkEdge,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		button2 = game.add.button(2000,0, 'RndButton',forest(1),this,'Hover','Up','Down');
		button2.x = Math.floor(windoww.x + 300);
		button2.y = Math.floor(windoww.y + 350);
		narrative = game.add.sprite(2000, 0, 'A2T','Assault The Castle Lose');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
		moveWindowOnScreen();
}
caravanStart.destroy();
		caravanStart = game.add.button(233, 465, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
		caravanStart.anchor.set(0.5);

}
function walkEdge(){
	console.log("we");
	b1t.text="Fight!";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//forest edge battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Walk The Edge');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(758, 306, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
//1 first time 2 victory or 3 losst combat
function forest(c){
	supplies+=7;
	if(c==1){
		food+=10;
		console.log("forest");
		b1t.text="Fight!";
		b2t.text="";
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//forest battle
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
		moveWindowOffScreen();
	}
	//win combat
	if (c==2) {
		console.log("forest");
		b1t.text="Enslave";
		b2t.text="Eat";
		b3t.text="Execute";
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',enslave,this,'Hover','Up','Down');//forest battle
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		button2 = game.add.button(2000,0, 'RndButton',eat,this,'Hover','Up','Down');
		button2.x = Math.floor(windoww.x + 300);
		button2.y = Math.floor(windoww.y + 350);
		button3.destroy();
		button3 = game.add.button(2000,0, 'RndButton',execute,this,'Hover','Up','Down');
		button3.x = Math.floor(windoww.x + 300);
		button3.y = Math.floor(windoww.y + 350);
		narrative = game.add.sprite(2000, 0, 'A1T','Go Through The Forest Win');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
		moveWindowOffScreen();
	}
	//lose combat
	if (c==3) {
		supplies-=100;
		if(getRandomInt(10)>5){
			//elves don't come
			b1t.text="Journey to river";
			button1.destroy();
			button2.destroy();
			button3.destroy();
			b2t.text="Recoup Supplies";
			b3t.text="";
			button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');
			button1.x = Math.floor(windoww.x + 40);
			button1.y = Math.floor(windoww.y + 350);
			button2 = game.add.button(2000,0, 'RndButton',recoupWin,this,'Hover','Up','Down');//forest battle
			//add text here
			narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest Lose');
			narrative.x = Math.floor(windoww.x + 100);
			narrative.y = Math.floor(windoww.y + 100);
		}else{
			//elves do come
			supplies+=100;
			b1t.text="Journey to river";
			button1.destroy();
			button2.destroy();
			button3.destroy();
			b2t.text="Recoup Supplies";
			b3t.text="";
			button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');
			button1.x = Math.floor(windoww.x + 40);
			button1.y = Math.floor(windoww.y + 350);
			button2 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//forest battle
			//addtext here
			narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest Lose');
			narrative.x = Math.floor(windoww.x + 100);
			narrative.y = Math.floor(windoww.y + 100);
		}
	}
	caravanStart.destroy();
	caravanStart = game.add.button(903, 289, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function recoupWin(){
	supplies+=100;
	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');//forest battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button3.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Recoup Supplies Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	caravanStart.destroy();
	caravanStart = game.add.button(903, 289, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}

function recoupLose(){
	if(getRandomInt(10)>5){
		//elves don't come
		b1t.text="Journey to river";
		button1.destroy();
		button2.destroy();
		button3.destroy();
		b2t.text="Recoup Supplies";
		b3t.text="";
		button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2 = game.add.button(2000,0, 'RndButton',recoupWin,this,'Hover','Up','Down');//forest battle
		//add text here
		narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest Lose');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	}else{
		//elves do come
		supplies+=100;
		b1t.text="Journey to river";
		button1.destroy();
		button2.destroy();
		button3.destroy();
		b2t.text="Recoup Supplies";
		b3t.text="";
		button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//forest battle
		//addtext here
		narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest Lose');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	}
}

function enslave(){
	supplies+=120;
	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	console.log("enslave");
	button3.destroy();
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Enslave');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(903, 289, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function eat(){
	food+=100;
	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	console.log("eat");
	button3.destroy();
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Eat');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(903, 289, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function execute(){
	supplies+=20;
	food+=30;
	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	console.log("execute");
	button3.destroy();
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Execute');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(903, 289, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function fieldOfGrain(){
	button3.destroy();
	b3t.text="Pillage fields";
	b1t.text="Pass fields to river";
	b2t.text="";
	console.log("fieldOfGrain");
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',pillage,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',passField,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','Field Of Grains');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(630, 295, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function pillage(){
	console.log("pillage");
	b1t.text="Fight the plainsfolk";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//plains combat
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	b2t.text="";
	narrative = game.add.sprite(2000, 0, 'A2T','Pillage Grains');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(542, 222, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function passField(){
	b1t.text="";
	console.log("passField");
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Pass');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(630, 295, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}

function river(){
	console.log("river");
	b1t.text="Buy passage";
	b2t.text="Ford the river";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',buyPassage,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',fordRiver,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','River');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(384, 171, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function buyPassage(){
	supplies-=200;
	console.log("buyPassage");
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',villagerBattle,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','Buy Passage');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(384, 171, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function fordRiver(){
	supplies-=getRandomInt(300);
	food-=getRandomInt(300);
	population-=getRandomInt(300);
	console.log("fordRiver");
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',villagerBattle,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','Ford The River');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(384, 171, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function BridgeTrolls(){
	console.log("BridgeTrolls");
	b1t.text="Slay the trolls";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//bridgetrolls
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Bridge Trolls');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(283, 81, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}

function BridgeTrollsWin(){
	console.log("BridgeTrolls Win");
	b1t.text="Begin final leg";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//bridgetrolls
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Bridge Trolls Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(283, 81, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function BridgeTrollsLose(){
	console.log("BridgeTrolls Lose");
	b1t.text="Begin final leg";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//bridgetrolls
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Bridge Trolls Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(283, 81, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}


///////////////////////act2 functions end
var Act3 = function(game) {};
var tb;
var button1;
var b1t;
var button2;
var b2t;
var windoww;
var ctxt="text has been changed";
var b1t="";
var narrative;
var b3t;
var button3;
Act3.prototype = {
	init: function(info) {
    combatInfo = info;//variables used for stuff
    nextFunction = info.next;
  },
	preload: function() {

		game.load.image('window', 'assets/imgs/TextWindow.png');
    game.load.image('statusBar', 'assets/imgs/UIHalfWindow.png');

	},
	create: function() {
    bg = game.add.sprite(0,0, 'bgimages', 'Act3');
		bg.scale.setTo(1.2,1.2);
		windoww = game.add.sprite(487,320,'window');
		windoww.scale.set(.4,.4);
		windoww.inputEnabled = true;
		windoww.input.enableDrag();
		windoww.x =2000;
		//code taken from phaser//    https://phaser.io/examples/v2/text/center-text-on-sprite
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: windoww.width, align: "left"};
		b1t =game.add.text(0,0,"",style);
		b1t.anchor.set(0);
		b2t =game.add.text(0,0,"",style);
		b2t.anchor.set(0);
		b3t =game.add.text(0,0,"",style);
		b3t.anchor.set(0);
		//make if statements ass needed here for combat results
		//caravanStart.destroy();
		caravanStart = game.add.button(502, 562, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
		caravanStart.anchor.set(0.5);
		button1 = game.add.button(20000,0, 'RndButton',null,this,'Hover','Up','Down');
		button2 = game.add.button(20000,0,'RndButton',null,this,'Hover','Up','Down');
		button3 = game.add.button(20000,0,'RndButton',null,this,'Hover','Up','Down');
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };

    statusWindow = game.add.image(0,0,"statusBar");
    statusWindow.scale.setTo(0.5,0.3);

    poptxt = game.add.text(16, 16, 'Population: 1000', { fontSize: '24px', fill: '#00000' });
		supplytxt = game.add.text(250, 16, 'Supplies: 1000', { fontSize: '24px', fill: '#00000' });
		foodtxt = game.add.text(155, 45, 'Food: 1000', { fontSize: '24px', fill: '#00000' });
	},
	update: function() {
		// window button 1
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		b1t.x = Math.floor(windoww.x + 160);
		b1t.y = Math.floor(windoww.y + 370);
		//window button 2
		button2.x = Math.floor(windoww.x + 300);
		button2.y = Math.floor(windoww.y + 350);
		b2t.x = Math.floor(windoww.x + 380);
		b2t.y = Math.floor(windoww.y + 370);
		//window button 3
		button3.x = Math.floor(windoww.x + 500);
		button3.y = Math.floor(windoww.y + 350);
		b3t.x = Math.floor(windoww.x + 580);
		b3t.y = Math.floor(windoww.y + 370);
		poptxt.text = 'Population: ' + population;
		supplytxt.text = 'Supplies: ' + supplies;
		foodtxt.text = 'Food: ' + food;
	}
}
///////////////////////act3 functions begin
function villageSpring(){
	console.log("villageSpring");
	b1t.text="Take the spring";
	b2t.text="Leave the spring";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',takeSpring,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(20000,0, 'RndButton',leaveSpring,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(384, 171, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function takeSpring(){
	console.log("takeSpring");
	b1t.text="Fight";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//village spring lvl
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(384, 171, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function springv(){
	population-=10;
	console.log("villageSpring");
	b1t.text="Trench onward";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',ruins,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(384, 171, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function springL(){
	population-=40;
	console.log("villageSpring");
	b1t.text="Trench onward";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',ruins,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(384, 171, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function leaveSpring(){
	population-=80;
	console.log("leaveSpring");
	b1t.text="Trench onward";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',ruins,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(384, 171, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function ruins(){
	console.log("ruins");
	b1t.text="Delve the ruins";
	b2t.text="Leave the ruins";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',delveRuins,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(20000,0, 'RndButton',leaveSpring,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1081, 337, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function leaveRuins(){
	supplies+=20;
	console.log("leaveRuins");
	b1t.text="Trench onward";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',ruins,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1081, 337, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function delveRuins(){
	console.log("delveRuins");
	b1t.text="Fight";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//ruins lvl
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1081, 337, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function ruinsWin(){
	food+=50;
	console.log("ruinsWin");
	b1t.text="Trench onward";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',kindredPeople,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1081, 337, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function ruinsLoss(){
	population-=10;
	console.log("ruinsLoss");
	b1t.text="Trench onward";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',kindredPeople,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1081, 337, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function kindredPeople(){
	console.log("leaveRuins");
	b1t.text="Trench onward";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',marchAway,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(20000,0, 'RndButton',intercept,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1775, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function marchAway(){
	population-=10;
	console.log("ruinsLoss");
	b1t.text="Trench onward";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',kindredPeople,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1775, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function intercept(){
	console.log("intercept");
	b1t.text="Fight";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//village spring lvl
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1777, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function interceptVictory(){
	console.log("interceptVictory");
	b1t.text="Enslave";
	b2t.text="Execute";
	b3t.text="Conscript";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',enslave2,this,'Hover','Up','Down');//forest battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',execute2,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	button3.destroy();
	button3 = game.add.button(2000,0, 'RndButton',conscript,this,'Hover','Up','Down');
	button3.x = Math.floor(windoww.x + 300);
	button3.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1777, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}
function interceptLoss(){
	population=0;
	console.log("intercept");
	b1t.text=" let go";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',null,this,'Hover','Up','Down');//village spring lvl
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1777, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function enslave2(){
	supplies+=130;
	console.log("enslave2");
	b1t.text="Trench on";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',wonder,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1777, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function execute2(){
	food+=20;
	console.log("execute2");
	b1t.text="Trench on";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',wonder,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1777, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function conscript(){
	population+=50;
	console.log("conscript");
	b1t.text="Trench on";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',wonder,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1777, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);

}
function wonder(){
	console.log("intercept");
	b1t.text="Fight";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(20000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//wonder lvl
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(20000, 0, 'A1T','Elder Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(2255, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
}

//moves window for all three acts
function moveWindow(){
	windoww.x = 60;
	windoww.y = 200;

}
function moveWindowOnScreen(){
  caravanStart.destroy();
  SpawnOldButtons();
	windoww.x = 60;
	windoww.y = 200;
}
function moveWindowOffScreen(){
	windoww.x = 60;
	windoww.y = 2000;
  DrawPath();
}

//apropriated from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//SPawns old button choices as images
function SpawnOldButtons() {
  for (bttn of Path) {
    x = game.add.image(bttn.x,bttn.y, 'RndButton', 'Down');
    x.anchor.set(0.5);
  }
}

//Adds the path variables everytime carvan button is created.
function AddPath(){
  Path[cnt++] =
  {
    x:caravanStart.position.x,
    y:caravanStart.position.y
  };
  DrawPath();
}
//Draws the caravan path taken
function DrawPath(){
  //line = game.add.graphics(game.camera.width/2, game.camera.height/2);

  for (var i = 0; i < Path.length; i++) {
    if(i == 0)
    {
      line.moveTo(Path[i].x-1, Path[i].y-1);
      line.lineTo(Path[i].x, Path[i].y);
      console.log(Path[i].x +"---"+ Path[i].y);

    }
    else {
      console.log(Path[i].x +"---"+ Path[i].y);
      line.lineTo(Path[i].x, Path[i].y);
    }
  }
}
