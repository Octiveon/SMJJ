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
var button3;
var b3t;
var windoww;
var ctxt="text has been changed";
var b1t="";
Act1.prototype = {

  init: function(info) {
    combatInfo = info;//variables used for stuff

  },
	preload: function() {
		game.load.image('window', 'assets/imgs/TextWindow.png');
		game.load.image('tb', 'assets/imgs/tempButton.png');
		game.load.image('hold','assets/imgs/hold.png');
		game.load.image('descend','assets/imgs/descend.png');
	},
	create: function() {
		//background

		bg = game.add.sprite(0,0, 'backgrounds', 'Act1');
		bg.scale.setTo(1.2,1.2);
		windoww = game.add.sprite(487,320,'window');
		windoww.scale.set(.4,.4);
		windoww.inputEnabled = true;
		windoww.input.enableDrag();
		windoww.x =2000;
		//code taken from phaser//    https://phaser.io/examples/v2/text/center-text-on-sprite
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: windoww.width, align: "left"};
		text = game.add.text(0, 0, "A landslide befalls you and your caravan killing some and wounding others. Amidst all of the confusion the a war horns can be heard in the distance!\n Scouts are sent out and report that you will be besieged by orcs in 3 days time! Your options are: \n Executing an emergency descent — leaving a group behind to slow the orcs. \n Holding your ground — fighting in arduous terrain to avoid the orcs", style);
		text.anchor.set(0.5);
		b1t =game.add.text(0,0,"tempword",style);
		b1t.anchor.set(0.5);
		b2t =game.add.text(0,0,"tempword",style);
		b2t.anchor.set(0.5);
		b3t =game.add.text(0,0,"tempword",style);
		b3t.anchor.set(0.5);
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };
    // console.log(windoww.position);

    // SpawnOldButtons();

    // if(Path.length == 0)
    // {
       caravanStart = game.add.button(game.camera.width *0.15, game.camera.height *0.7, 'RndButton', elderbattleEnd, this, 'Hover','Up','Down');
       caravanStart.anchor.set(0.5);
    //   //caravanStart.textWindow = "[KEY IN ATLAS]"
    //   caravanStart.textWindow = ""
    //   caravanStart.choice1 = "";
    //   caravanStart.choice2 = "";

    //   Path[cnt++] =
    //   {
    //     x:game.camera.width *0.15,
    //     y:600
    //   };
    // }
    //texbox buttons
    //game.add.button(portrait.width * 0.9 ,game.height - portrait.height * 0.4, [Atlas], [Function], this, [Hover], [UP],[Down]);
		button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
		button2 = game.add.button(2000,0,'RndButton',villagerBattle,this,'Hover','Up','Down');
		button3 = game.add.button(2000,0,'RndButton',null,this,'Hover','Up','Down');
		poptxt = game.add.text(16, 16, 'Population: 1000', { fontSize: '32px', fill: '#999999' });
		supplytxt = game.add.text(300, 16, 'Supplies: 1000', { fontSize: '32px', fill: '#818181' });
		foodtxt = game.add.text(750, 16, 'Food: 1000', { fontSize: '32px', fill: '#000' });

		//elderBattle = game.add.sprite (100, 200, 'A1T', 'Elder Battle');
		//elderBattle.fixedToCamera = true;
		//actInstructions = game.add.sprite(100, 400, 'instructions', 'actInstructions');
		//actInstructions.fixedToCamera = true;
    DrawPath();
	},
	update: function() {

		text.x = Math.floor(windoww.x + windoww.width / 2 );
		text.y = Math.floor(windoww.y + windoww.height / 2 - 50);
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
		//b1t.text="this";
		//console.log(button1.callback);

	}
}

var Act2 = function(game) {};
Act2.prototype = {
  init: function() {
  },

	preload: function() {

		game.load.image('window', 'assets/imgs/TextWindow.png');
		game.load.image('tb', 'assets/imgs/tempButton.png');
		game.load.image('hold','assets/imgs/hold.png');
		game.load.image('descend','assets/imgs/descend.png');
	},
	create: function() {
		bg = game.add.sprite(0,0, 'backgrounds', 'Act1');
		bg.scale.setTo(1.2,1.2);
		windoww = game.add.sprite(487,320,'window');
		windoww.scale.set(.4,.4);
		windoww.inputEnabled = true;
		windoww.input.enableDrag();
		windoww.x =2000;
		//code taken from phaser//    https://phaser.io/examples/v2/text/center-text-on-sprite
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: windoww.width, align: "left"};
		text = game.add.text(0, 0, "A landslide befalls you and your caravan killing some and wounding others. Amidst all of the confusion the a war horns can be heard in the distance!\n Scouts are sent out and report that you will be besieged by orcs in 3 days time! Your options are: \n Executing an emergency descent — leaving a group behind to slow the orcs. \n Holding your ground — fighting in arduous terrain to avoid the orcs", style);
		text.anchor.set(0.5);
		b1t =game.add.text(0,0,"tempword",style);
		b1t.anchor.set(0.5);
		b2t =game.add.text(0,0,"tempword",style);
		b2t.anchor.set(0.5);
		b3t =game.add.text(0,0,"tempword",style);
		b3t.anchor.set(0.5);
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };
	},
	update: function() {
		text.x = Math.floor(windoww.x + windoww.width / 2 );
		text.y = Math.floor(windoww.y + windoww.height / 2 - 50);
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
// act2 functions
function siege(){
		
	}


var Act3 = function(game) {};
Act2.prototype = {
  init: function() {
  },
	preload: function() {
	},
	create: function() {
	},
	update: function() {
	}
}

function createWindow() {
  if(curentTextWindow != null) {
    curentTextWindow.kill();
  }
  //curentTextWindow = game.add.sprite()

}

function CreateNewNode(info) {
  buttn = game.add.button(info.newbutton.x, info.newbutton.y, 'RndButton', createWindow, this, 'Hover','Up','Down');
  buttn.anchor.set(0.5);
  //caravanStart.textWindow = "[KEY IN ATLAS]"
  buttn.textWindow = info.newbutton.textboxID;
  buttn.choice1 = info.newbutton.choice1;
  buttn.choice2 = info.newbutton.choice2;
  Path[cnt++] =
  {
    x:info.newbutton.x,
    y:info.newbutton.y
  };
}

function SpawnOldButtons() {
  for (bttn of Path) {
    x = game.add.sprite(bttn.x,bttn.y, 'RndButton', 'Down');
    x.anchor.set(0.5);
  }
}
//moves window
function moveWindow(){
	windoww.x = 60;
	windoww.y = 200;
	population -= 70;
}
function moveWindowOnScreen(){
	windoww.x = 60;
	windoww.y = 200;
}
function moveWindowOffScreen(){
	windoww.x = 60;
	windoww.y = 2000;
}
//event functions
function elderbattleEnd(){
	console.log("elderbattle");
	b1t.text="Asscend Mountains";
	b2t.text="villagerbattle";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.callback=LoadCombat;
	moveWindowOnScreen();
}
function rockslide(){
	console.log("rockslide");
	supplies-=getRandomInt(5);
	food-=getRandomInt(5)+3;
	b1t.text="Take higher path";
	b2t.text="clear path";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',Orcbattle,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy
	button2 = game.add.button(2000,0, 'RndButton',clearPath,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOnScreen();
}
function clearPath(){
	console.log(cp);
	button1.distroy();
	button2.distroy();
	supplies-= getRandomInt(5)+10 ;
	food-=getRandomInt(5)+13;
	bt1="Venture forward";
	button1 = game.add.button(2000,0, 'RndButton',weatherDecision,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
}
function Orcbattle(){
	console.log("ob");
	b1t.text="Start Comabt";
	b2t.text="";
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	cne=weatherDecision;
	moveWindowOnScreen();
}
function weatherDecision(){
	supplies-=getRandomInt(5);
	foor-=getRandomInt(5)+3;
	bt1.text="Risk Storm";
	bt2.text="Decend to the coast";
	button1.callback=RiskStorm;
	button2.callback=LoadCombat;//banditlevel
	moveWindowOnScreen();
}
function RiskStorm(){
	supplies-=getRandomInt(5)+3;
	food-=getRandomInt(12);
	if(getRandomInt(1)==1){
		population-=getRandomInt(100)+12;
		supplies-=getRandomInt(12)+12;
		food-=getRandomInt(12);
	}
	//texthere;
	bt1="Mountain Decent";
	button1.callback=mountainDesent;
	moveWindowOnScreen();
}
function mountainDesent(){
	moveWindowOnScreen();
	b1t.text="go fast";
	b2t.text="go slow";
	button1.callback=goFast;
	button1.callback=goSlow;
}
function gofast(){
	supplies-=getRandomInt(5);

}
function foothilbandits(){
	bt1="take higherpath"
	bt2="decend mountains"
	button1.callback=RiskStorm;
	button2.callback=crossroad;
}
function villagerBattle(){
	//settext
	b1t="Start Comabt";
	button1.callback=LoadCombat;
	//end of this battle nbeeds to have cne set to either vblost or vbwon
}

function vbwon(){
	b1t="Lootvilage";
	b2t="recruit villagers";
	button1.callback=lootvillage;
	button2.callback=recruitvillagers;
}
function vblost(){
	b1t.text="Move on";
	b2t.text="avenge";
	button1.callback=rest;
	button2.callback=avenge;
}
function lootvillage(){
	supplies+=getRandomInt(10);
	bt1="rest";
	//textimage call

}
function recruitvillagers(){
	population+=getRandomInt(10);
	bt1="rest";
	button1=rest();

}
function rest(){

	bt1="Take rest";
	bt2="press on";
	//text image call
	button1.callback=takeRest;
	button2.callback= PressOn;
}

function takeRest(){
	//rest image call
	bt1="mountain pass"
	bt2="foothill Bandits"
	button1.callback=crossroad;
	button2.callback=foothilbandits;
}
function crossroad(){
	bt1="raider batle";
	bt2="avoid village";
	button1.callback=raiderBattle;//loadcomabt;
	button2.callback=avoidVillage;
}
function avoidVillage(){
	bt1="border battle";
 }
//apropriated from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}




function DrawPath(){
  for (var i = 0; i < Path.length; i++) {
    if(i == 0)
    {
      line.moveTo(Path[i].x, Path[i].y);
    }
    else {
      line.lineTo(Path[i].x, Path[i].y);
    }
  }

}

