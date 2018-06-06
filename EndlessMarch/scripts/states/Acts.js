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
var narrative;

//Act 1
Act1.prototype = {
  init: function(info) {
    combatInfo = info;//variables used for stuff

  },
	preload: function() {
    game.load.image('statusBar', 'assets/imgs/UIHalfWindow.png');

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
		b1t =game.add.text(0,0,"tempword",style);
		b1t.anchor.set(0.5);
		b2t =game.add.text(0,0,"tempword",style);
		b2t.anchor.set(0.5);
		b3t =game.add.text(0,0,"tempword",style);
		b3t.anchor.set(0.5);
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };
		narrative = game.add.sprite(0, 0);

    caravanStart = game.add.button(game.camera.width *0.15, game.camera.height *0.7, 'RndButton', elderbattleEnd, this, 'Hover','Up','Down');
    caravanStart.anchor.set(0.5);
		button1 = game.add.button(2000,0, 'RndButton',rockslide,this,'Hover','Up','Down');
		button2 = game.add.button(2000,0,'RndButton',villagerBattle,this,'Hover','Up','Down');
		button3 = game.add.button(2000,0,'RndButton',null,this,'Hover','Up','Down');
    statusWindow = game.add.image(0,0,"statusBar");
    statusWindow.scale.setTo(0.5,0.2);
		poptxt = game.add.text(16, 16, 'Population: 1000', { fontSize: '24px', fill: '#00000' });
		supplytxt = game.add.text(250, 16, 'Supplies: 1000', { fontSize: '24px', fill: '#00000' });
		foodtxt = game.add.text(155, 45, 'Food: 1000', { fontSize: '24px', fill: '#00000' });

    DrawPath();
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
		//narrative box
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);


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
		b1t =game.add.text(0,0,"tempword",style);
		b1t.anchor.set(0.5);
		b2t =game.add.text(0,0,"tempword",style);
		b2t.anchor.set(0.5);
		b3t =game.add.text(0,0,"tempword",style);
		b3t.anchor.set(0.5);
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };
	},
	update: function() {
		//text.x = Math.floor(windoww.x + windoww.width / 2 );
		//text.y = Math.floor(windoww.y + windoww.height / 2 - 50);
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
	console.log("bbv");
	population-=population/12;
	supplies+=100;
	b1t.text="";
// 	text = game.add.text(0, 0, "A landslide befalls you and your caravan killing some and wounding others. Amidst all of the confusion the a war horns can be heard in the distance!\n Scouts are sent out and report that you will be besieged by orcs in 3 days time! Your options are: \n Executing an emergency descent — leaving a group behind to slow the orcs. \n Holding your ground — fighting in arduous terrain to avoid the orcs", style);
// 	text.anchor.set(0.5);
// 	text.x = Math.floor(windoww.x + windoww.width / 2 );
// 	text.y = Math.floor(windoww.y + windoww.height / 2 - 50);
//lost border battle
}
function bbl(){
	console.log("bbl");
	population-=population/6;
	supplies-=100;
	food-=100;
}
function siege(){

}

///////////////////////act2 functions end
var Act3 = function(game) {};
Act3.prototype = {
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
////////////////////////act1 functions begin
function elderbattleEnd(){
	console.log("elderbattle");
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
	narrative = game.add.sprite(2000, 0, 'A1T','Elder Battle');
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
	caravanStart = game.add.button(185, 276, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
    caravanStart.anchor.set(0.5);
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
  button1.combatmap = "OrcBattle";
  button1.winFunction = "{INSERT FUNCTION NAME}";
  button1.lossFunction = "{INSERT FUNCTION NAME}";
  button1.scene = "Act1";
	cne=weatherDecision;
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(202,108, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
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
	button2 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//banditlevel
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
  button2.combatmap = "FootHillM2C";
  button2.winFunction = "{INSERT FUNCTION NAME}";
  button2.lossFunction = "{INSERT FUNCTION NAME}";
  button2.scene = "Act1";

	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(265,203, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Weather Decision');
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
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Mountain Descent');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function gofast(){
	supplies-=getRandomInt(5);
	var control;
	control=getRandomInt(1);
	if (control==1) {
		supplies-=getRandomInt(8)+8;
	}
	b1t.text="Border Battle";
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
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Go Fast');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function goSlow(){
	supplies-=getRandomInt(5)+1;
	food-=getRandomInt(5)+3;
	Population-=getRandomInt(8)+4;
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
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Go Slow');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function foothilbandits(){
	bt1="Take Higher Path";
	bt2="Descend Mountains";
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
}
function villagerBattle(){
	//settext
	console.log("vb");
	b1t.text="Start Combat";
	b2t.text=" ";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.combatmap = "VillageBattle";
  button1.winFunction = "{INSERT FUNCTION NAME}";
  button1.lossFunction = "{INSERT FUNCTION NAME}";
  button1.scene = "Act1";

	//end of this battle nbeeds to have cne set to either vblost or vbwon
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(548,576, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
    caravanStart.anchor.set(0.5);
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Village Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function vbwon(){
	console.log("vbw");
	b1t="Loot Village";
	b2t="Recruit Villagers";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',lootvillage,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',recruitvillagers,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
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
	moveWindowOnScreen();
}
function avenge(){
	cne=rest;
	bt1.text="Kill Them All";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//avenge combat
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.combatmap = "VillageRaid";
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
	bt1="Rest";
	//textimage call
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(548,576, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
    caravanStart.anchor.set(0.5);
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Loot Village');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function recruitvillagers(){
	population+=getRandomInt(10);
  partySize++;
	b1t="Rest";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(565,565,'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
    caravanStart.anchor.set(0.5);
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Recruit Villagers');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);

}
function rest(){
	food=+3;
	supplies-=4;
	bt1="Take Rest";
	bt2="Press On";
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
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Rest');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);

}
function PressOn(){
	supplies-=6;
	food-=6;
	bt1="Take Rest";
	bt2="Press On";
	//text image call
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',foothilbandits,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',crossroad,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(644,477, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
    caravanStart.anchor.set(0.5);
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Press On');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function takeRest(){
	food-=3;
	//rest image call
	bt1="Mountain Pass";
	bt2="Foothill Bandits";
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
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Take A Rest');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function crossroad(){
	food-=3;
	bt1="Raider Battle";
	bt2="Avoid Village";
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
    narrative.destroy();
    narrative = game.add.sprite(2000, 0, 'A1T','Crossroad');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function avoidVillage(){
	supplies-=3;
	food-=3;
	bt1="Border Battle";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',BorderBattle,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(750,277, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
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
  button1.winFunction = "{INSERT FUNCTION NAME}";
  button1.lossFunction = "{INSERT FUNCTION NAME}";
  button1.scene = "Act1";

	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(750,277, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
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
  button1.winFunction = "{INSERT FUNCTION NAME}";
  button1.lossFunction = "{INSERT FUNCTION NAME}";
  button1.scene = "Act1";

	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(614,58, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Battle At The Border');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
////////////////////act1 functions end


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
