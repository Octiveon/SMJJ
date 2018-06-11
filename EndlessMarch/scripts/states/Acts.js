//Gloabal Var
Path = [];
cnt = 0;
var poptxt;
var foodtxt;
var supplytext;


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
    SpawnOldButtons();
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

    if(population <= 0)
    {
      game.state.start('GameOver');
    }
    else if (supplies <= 0) {SupDrop();}
    else if(food <= 0){FoodDrop();}

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
  //Update the the players resources (People/Supplies/Food)
  UpdateResources(0,-getRandomInt(5), -getRandomInt(5)-3);

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
	caravanStart = game.add.button(560, 400, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
  AddPath();

  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Rock Slide');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
}
function clearPath(){
  //Update the the players resources (People/Supplies/Food)
  UpdateResources(0,-getRandomInt(5) -10, -getRandomInt(5)-13);
	button1.destroy();
	button2.destroy();

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

//Battle
function Orcbattle(){
	//Console.log("ob");
	b1t.text="Start Combat";
	b2t.text="";
	button1.destroy();
	button2.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button1.combatmap = "OrcBattle";
	button1.enemy = "Orc";
	button1.winFunction = "OrcbattleW";
	button1.lossFunction = "OrcbattleL";
	button1.scene = "act1";
  cne=weatherDecision;
  moveWindowOffScreen();
  caravanStart.destroy();
  caravanStart = game.add.button(540,330, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
  AddPath();
  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Orc Battle');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
}
function OrcbattleW(){
  button1.destroy();
	button2.destroy();
	b1t.text="Venture forward";
	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',weatherDecision,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Orc Battle Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();
} //Win
function OrcbattleL(){
  button1.destroy();
  button2.destroy();
  b1t.text="Venture forward";
  b2t.text=" ";
  button1 = game.add.button(2000,0, 'RndButton',weatherDecision,this,'Hover','Up','Down');
  button1.x = Math.floor(windoww.x + 40);
  button1.y = Math.floor(windoww.y + 350);
  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Orc Battle Lose');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();

} //Loss

function weatherDecision(){

  //Update the the players resources (People/Supplies/Food)
  UpdateResources(0,-getRandomInt(5) -10, -getRandomInt(5)-3);

	b1t.text="Risk Storm";
	b2t.text="Descend to the coast";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',RiskStormM,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',FoothillM2C,this,'Hover','Up','Down');//banditlevel
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
  caravanStart = game.add.button(770,400, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
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
  moveWindowOnScreen();

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
  moveWindowOnScreen();

}

function FoothillC2M(){
	button1.destroy();
	button2.destroy();
	b1t.text="Fight!";
	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button1.combatmap = "FootHillC2M";
  button1.enemy = "Orc";
  button1.winFunction = "FoothillC2MWin";
  button1.lossFunction = "FoothillC2MLose";
  button1.scene = "act1";

	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Foothill Bandits CtoM');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function FoothillC2MWin(){
	button1.destroy();
	button2.destroy();
	b1t.text="Venture forward";
	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',crossroad,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Foothill Bandits CtoM Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();

}
function FoothillC2MLose(){
	button1.destroy();
	button2.destroy();
	b1t.text="Retreat back to the coast";
	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',RiskStormC,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Foothill Bandits CtoM Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();

}

function RiskStormM(){
  //Update the the players resources (People/Supplies/Food)
	if(getRandomInt(2)==1){
    UpdateResources(-getRandomInt(100)-12,-getRandomInt(12)-12, -getRandomInt(12));
  }
  else {UpdateResources(0,-getRandomInt(5) -3, -getRandomInt(12));}
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
function RiskStormC(){
	//Console.log("RS-C");
  narrative.destroy();
  button1.destroy();
  button2.destroy();
	if(getRandomInt(3)==1){
    b1t.text="...collect whats left and press on.";
    narrative = game.add.sprite(2000, 0, 'A1T','Coastal Storm Ravage');
    UpdateResources(-getRandomInt(100)-12,-getRandomInt(12)-12, -getRandomInt(12));

  }
  else {
    b1t.text="Press on!";
    narrative = game.add.sprite(2000, 0, 'A1T','Coastal Storm Minimal');
    UpdateResources(0,-getRandomInt(5) -3, -getRandomInt(12));
  }
	//texthere;

	b2t.text=" ";
	button1 = game.add.button(2000,0, 'RndButton',crossroad,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);

	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}

function mountainDesent(){
	//Console.log("MD");
  UpdateResources(0,-getRandomInt(5) -3, -getRandomInt(5));
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

	var control;
	control=getRandomInt(2);
	//Console.log("control = " + control);
	if (control==1) { // if controlled fast descent
    UpdateResources(-getRandomInt(100)-25, -getRandomInt(26)-8, -getRandomInt(10)-8);
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
		UpdateResources(0,-getRandomInt(20) -5, -getRandomInt(10));
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
  UpdateResources(-getRandomInt(8)-4,-getRandomInt(4) -1, -getRandomInt(5)-3);
  b1t.text="Continue to the border";
  b2t.text="";
  button1.destroy();
  button2.destroy();
  button1 = game.add.button(2000,0, 'RndButton',BorderBattle,this,'Hover','Up','Down');
  button1.x = Math.floor(windoww.x + 40);
  button1.y = Math.floor(windoww.y + 350);
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

function villagerBattle(){
	//settext
  UpdateResources(0,-getRandomInt(5) -3, -getRandomInt(12) - 5);

	button2.destroy();
	//Console.log("vb");
	b1t.text="Send out vanguard!";
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
	caravanStart = game.add.button(589,689, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
	AddPath();
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Village Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function vbwon(){
	//Console.log("vbw");
	b1t.text ="Loot Village";
	b2t.text ="Recruit Villagers";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.combatmap = "VillageRaid";
  button1.enemy = "Knight";
  button1.winFunction = "lootvillage";
  button1.lossFunction = "vblost";
  button1.scene = "act1";

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
	//Console.log("vblost");
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
	button1 = game.add.button(2000,0, 'RndButton',lootvillage,this,'Hover','Up','Down');//avenge combat
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Avenge');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function lootvillage(){
  UpdateResources(0,getRandomInt(20) +5, getRandomInt(10));

	supplies+=getRandomInt(15);
	b1t.text="March On...";
  b2t.text="";
	//textimage call
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();

	caravanStart.destroy();
	caravanStart = game.add.button(680,680, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
 	AddPath();

  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Loot Village');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function recruitvillagers(){
  UpdateResources(getRandomInt(10) + 15,getRandomInt(5), getRandomInt(5));

  partySize++;
	b1t.text = "[Vanguard Member Added!] March On...";
  b2t.text="";

	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',rest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(680,680,'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
  AddPath();

  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Recruit Villagers');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);

}

function rest(){
  UpdateResources(0,-getRandomInt(5), +getRandomInt(5)+3);

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
	caravanStart = game.add.button(1120,720, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
  AddPath();

  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Rest');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);

}
function PressOn(){
  UpdateResources(0,-getRandomInt(6), -getRandomInt(5)-3);
	b1t.text="Venture into the hills";
	b2t.text="Coastal Storm";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',FoothillC2M,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button2.destroy();
  button2 = game.add.button(2000,0, 'RndButton',RiskStormC,this,'Hover','Up','Down');
  button2.x = Math.floor(windoww.x + 300);
  button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1080,640, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
 	caravanStart.anchor.set(0.5);
  AddPath();
  narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Press On');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function takeRest(){
  UpdateResources(0,-getRandomInt(6), -getRandomInt(25)-10);
	//rest image call
	b1t.text="Head into mountains.";
	b2t.text="Risk the storm...";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',FoothillC2M,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',RiskStormC,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1080,645, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
	AddPath();

 	narrative.destroy();
 	narrative = game.add.sprite(2000, 0, 'A1T','Take A Rest');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}

function crossroad(){
  UpdateResources(0,-getRandomInt(6), -getRandomInt(5)-3);

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
	caravanStart = game.add.button(987,430, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
	AddPath();

	narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A1T','Crossroad');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}
function avoidVillage(){
  UpdateResources(0,-getRandomInt(6), -getRandomInt(5)-3);

	b1t.text="Border Battle";
	b2t.text="";

	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',BorderBattle,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);

	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(900,350, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
	AddPath();

	narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Avoid Village');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
}

function raiderBattle(){
 	cne=BorderBattle;
  b1t.text="Fight!";
  b2t.text="";
 	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//load raider battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button1.combatmap = "RaiderBattle";
	button1.enemy = "Knight";
	button1.winFunction = "raiderBattleW";
	button1.lossFunction = "raiderBattleL";
	button1.scene = "act1";

	button2.destroy();
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(978,381, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
  AddPath();

 	narrative.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Raider Battle');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
 }
function raiderBattleW(){
  //Console.log("vbL");
  b1t.text ="Continue to the border";
  b2t.text ="";
  button1.destroy();
  button2.destroy();
  button1 = game.add.button(2000,0, 'RndButton',BorderBattle,this,'Hover','Up','Down');
  button1.x = Math.floor(windoww.x + 40);
  button1.y = Math.floor(windoww.y + 350);
  narrative = game.add.sprite(2000, 0, 'A1T','Raider Battle Win');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();
}
function raiderBattleL(){
  //Console.log("rbL");
  b1t.text ="Retreat and head towards border...";
  b2t.text ="";
  button1.destroy();
  button1 = game.add.button(2000,0, 'RndButton',avoidVillage,this,'Hover','Up','Down');
  button1.x = Math.floor(windoww.x + 40);
  button1.y = Math.floor(windoww.y + 350);

  button2.destroy();
  narrative = game.add.sprite(2000, 0, 'A1T','Raider Battle Lose');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();
}
function BorderBattle(){
 	//Console.log("BB");
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
	caravanStart = game.add.button(884, 70, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
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
    currentAct = "act2";
		bg = game.add.sprite(0,0, 'bgimages', 'Act2');
		bg.scale.setTo(1.2,1.2);
		windoww = game.add.sprite(487,320,'window');
		windoww.scale.set(.4,.4);
		windoww.inputEnabled = true;
		windoww.input.enableDrag();
		windoww.x =2000;

    line = game.add.graphics(0,0);
    line.lineStyle(5, 0xffd900, .8);

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
    if(Path== 0){
    	caravanStart = game.add.button(765, 740, 'RndButton', bbl, this, 'Hover','Up','Down');
    	caravanStart.anchor.set(0.5);
    }


		button1 = game.add.button(2000,0, 'RndButton',null,this,'Hover','Up','Down');
		button2 = game.add.button(2000,0,'RndButton',null,this,'Hover','Up','Down');
		button3 = game.add.button(2000,0,'RndButton',null,this,'Hover','Up','Down');
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };
    narrative = game.add.sprite(0, 0);
    statusWindow = game.add.image(0,game.camera.height - 150,"statusBar");
    statusWindow.scale.setTo(0.5,0.3);

    poptxt = game.add.text(24,game.camera.height -125, 'Population: 1000', { fontSize: '24px', fill: '#00000' });
		supplytxt = game.add.text(235,game.camera.height - 125, 'Supplies: 1000', { fontSize: '24px', fill: '#00000' });
		foodtxt = game.add.text(190,game.camera.height -80, 'Food: 1000', { fontSize: '24px', fill: '#00000' });

    if(nextFunction!= null)
    {
      window[nextFunction]();
    }
    else {
      bbv();
    }
    SpawnOldButtons();
    DrawPath();


	},
	update: function() {
		// window button 1
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		b1t.x = Math.floor(windoww.x + 90);
		b1t.y = Math.floor(windoww.y + 360);
		//window button 2
		button2.x = Math.floor(windoww.x + 300);
		button2.y = Math.floor(windoww.y + 350);
		b2t.x = Math.floor(windoww.x + 350);
		b2t.y = Math.floor(windoww.y + 360);
		//window button 3
		button3.x = Math.floor(windoww.x + 500);
		button3.y = Math.floor(windoww.y + 350);
		b3t.x = Math.floor(windoww.x + 580);
		b3t.y = Math.floor(windoww.y + 370);
		poptxt.text = 'Population: ' + population;
		supplytxt.text = 'Supplies: ' + supplies;
		foodtxt.text = 'Food: ' + food;

    narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);

    if(population <= 0)
    {
      game.state.start('GameOver');
    }
    else if (supplies <= 0) {SupDrop();}
    else if(food <= 0){FoodDrop();}
	}
}

///////////////////// act2 functions begin
//won border battle
function bbv(){
  AddPath();
  partySize++;
	button1.destroy();
	button2.destroy();
	button3.destroy();
	//Console.log("bbv");
  //Update the the players resources (People/Supplies/Food)
  UpdateResources(0,getRandomInt(50) + 50, -getRandomInt(5)-3);

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
	moveWindowOnScreen();
}
function bbl(){ // border battle lose
  caravanStart.position.setTo(1100,645)
  AddPath();

	button1.destroy();
	button2.destroy();
	button3.destroy();
	//Console.log("bbl");

	b1t.text="Go Through Forest";
	b2t.text="Walk The Edge";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',forest,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',walkEdge,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','Border Battle Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
}

function siege(){
	//mapbuttoncode
  UpdateResources(0,-getRandomInt(5) - 5, -getRandomInt(5)-3);

	narrative.destroy();
	//Console.log("siege");
	b1t.text="Starve Out";
	b2t.text="Assualt";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',starveOut,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button2 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
	button2.x = Math.floor(windoww.x + 300);
	button2.y = Math.floor(windoww.y + 350);
  button2.combatmap = "AssaultTheCastle";
  button2.enemy = "Knight";
  button2.winFunction = "assaultCastleW";
  button2.lossFunction = "assaultCastleL";
  button2.scene = "act2";
	narrative = game.add.sprite(2000, 0, 'A2T','Siege');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);

  caravanStart.destroy();
  caravanStart = game.add.button(637, 674, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
  caravanStart.anchor.set(0.5);
  AddPath();
	moveWindowOffScreen();
}
function marchOn(){
	narrative.destroy();
  UpdateResources(0,-getRandomInt(30) - 10, -getRandomInt(10)-10);

	//Console.log("marchOn");
	b1t.text="Continue on";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','March On');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(700, 610, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function starveOut(){
	narrative.destroy();
	//Console.log("starveOut")
  starve = getRandomInt(100);
  //Console.log(starve);
	if(starve<10){
    UpdateResources(getRandomInt(25),getRandomInt(100) + 100,0);
    partySize++;
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		b1t.text="Continue on";
		b2t.text=""
		//starvation succesfull
		narrative = game.add.sprite(2000, 0, 'A2T','Starve Them Out Success');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	}
  else{
		//starvation fail
    UpdateResources(-getRandomInt(10)-12,-getRandomInt(10) - 10, -getRandomInt(5)-10);
		b1t.text="Continue siege";
		b2t.text ="Assualt castle";
		button1.destroy();
		button1 = game.add.button(2000,0, 'RndButton',starveOut,this,'Hover','Up','Down');
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		button2.destroy();
		button2 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//castle assult level
		button2.x = Math.floor(windoww.x + 300);
		button2.y = Math.floor(windoww.y + 350);
    button2.combatmap = "AssaultTheCastle";
    button2.enemy = "Knight";
    button2.winFunction = "assaultCastleW";
    button2.lossFunction = "assaultCastleL";
    button2.scene = "act2";
		narrative = game.add.sprite(2000, 0, 'A2T','Starve Them Out Failure');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	}
	moveWindowOnScreen();
}

function assaultCastleW(){
  narrative.destroy();
  UpdateResources(-getRandomInt(150),getRandomInt(150) +100, getRandomInt(25)+25);

  b1t.text="Continue On";
  button1.destroy();
  button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
  button1.x = Math.floor(windoww.x + 40);
  button1.y = Math.floor(windoww.y + 350);
  button2.destroy();
  narrative = game.add.sprite(2000, 0, 'A2T','Assault The Castle Win');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
  moveWindowOffScreen();
  caravanStart.destroy();
	caravanStart = game.add.button(700, 523, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();

}
function assaultCastleL(){
  narrative.destroy();
  UpdateResources(-getRandomInt(150) - 300,-getRandomInt(150) -100, -getRandomInt(25));

  b1t.text="Go through forest";
  b2t.text="Walk the edge";
  button1.destroy();
  button1 = game.add.button(2000,0, 'RndButton',walkEdge,this,'Hover','Up','Down');
  button1.x = Math.floor(windoww.x + 40);
  button1.y = Math.floor(windoww.y + 350);
  button2.destroy();
  button2 = game.add.button(2000,0, 'RndButton',forest,this,'Hover','Up','Down');
  button2.x = Math.floor(windoww.x + 300);
  button2.y = Math.floor(windoww.y + 350);
  narrative = game.add.sprite(2000, 0, 'A2T','Assault The Castle Lose');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
  moveWindowOffScreen();
  caravanStart.destroy();
	caravanStart = game.add.button(233, 465, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}

function walkEdge(){
	narrative.destroy();
  UpdateResources(0,-getRandomInt(10) +5, getRandomInt(10)+5);

	//Console.log("we");
	b1t.text="Fight!";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//forest edge battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.combatmap = "forrestBattle";
	button1.enemy = "Knight";
	button1.winFunction = "walkEdgeW";
	button1.lossFunction = "walkEdgeL";
	button1.scene = "act2";
	button2.destroy();
  narrative.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Walk The Edge');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(963, 400, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function walkEdgeW(){
  //Console.log("forestW");
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
  button3 = game.add.button(2000,0, 'RndButton',executeEdge,this,'Hover','Up','Down');
  button3.x = Math.floor(windoww.x + 300);
  button3.y = Math.floor(windoww.y + 350);
  narrative = game.add.sprite(2000, 0, 'A2T','Walk The Edge Win');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();
}
function walkEdgeL(){
	narrative.destroy();
  //Console.log("walkEdgeL");
  b1t.text ="You flee away from the forest edge furthur into the plains.";
  b2t.text ="";
  button1.destroy();
  button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
  button1.x = Math.floor(windoww.x + 40);
  button1.y = Math.floor(windoww.y + 350);

  button2.destroy();

  narrative = game.add.sprite(2000, 0, 'A2T','Walk The Edge Lose');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();
}
//1 first time 2 victory or 3 losst combat
function forest(){
	narrative.destroy();
  UpdateResources(0,getRandomInt(30) +5, getRandomInt(25)+10);


	//Console.log("forest");
	b1t.text="Fight!";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//forest battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.combatmap = "forrestBattle";
	button1.enemy = "Knight";
	button1.winFunction = "forestW";
	button1.lossFunction = "forestL";
	button1.scene = "act2";

	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();

	caravanStart.destroy();
	caravanStart = game.add.button(1100, 420, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function forestW(){
  //Console.log("forestW");
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
  button3 = game.add.button(2000,0, 'RndButton',executeForest,this,'Hover','Up','Down');
  button3.x = Math.floor(windoww.x + 300);
  button3.y = Math.floor(windoww.y + 350);
  narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest Win');
  narrative.x = Math.floor(windoww.x + 100);
  narrative.y = Math.floor(windoww.y + 100);
  moveWindowOnScreen();
}
function forestL(){
  //Console.log("forestL");
  if(getRandomInt(100)<25){
    //elves don't come
    b1t.text="Journey to river";
    button1.destroy();
    button2.destroy();
    button3.destroy();
    b2t.text="";
    b3t.text="";
    button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');
    button1.x = Math.floor(windoww.x + 40);
    button1.y = Math.floor(windoww.y + 350);

    //add text here
    narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest Lose');
    narrative.x = Math.floor(windoww.x + 100);
    narrative.y = Math.floor(windoww.y + 100);

  }
  else{
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
    button2.combatmap = "forrestBattle";
    button2.enemy = "Knight";
    button2.winFunction = "recoupWin";
    button2.lossFunction = "recoupLose";
    button2.scene = "act2";
		narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest Lose');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
		}
    moveWindowOnScreen();

}

function recoupWin(){
	narrative.destroy();
  UpdateResources(0,getRandomInt(30) +5, getRandomInt(10)+10);

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
  AddPath();
}
function recoupLose(){
  moveWindowOnScreen();
	narrative.destroy();
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

		narrative = game.add.sprite(2000, 0, 'A2T','Go Through The Forest Lose');
		narrative.x = Math.floor(windoww.x + 100);
		narrative.y = Math.floor(windoww.y + 100);
	}else{
		//elves do come
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

function executeEdge(){
	narrative.destroy();
  UpdateResources(0,getRandomInt(30) +10,getRandomInt(15) +10);

	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	//Console.log("execute");
	button3.destroy();
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Execute Edge');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(960, 324, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}

function enslave(){
	narrative.destroy();
  UpdateResources(0,getRandomInt(150) +100, 0);

	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	//Console.log("enslave");
	button3.destroy();
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Enslave');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1140, 345, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function eat(){
	narrative.destroy();
  UpdateResources(0,0,getRandomInt(150) +100);

	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	//Console.log("eat");
	button3.destroy();
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Eat');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1140, 345, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function executeForest(){
	narrative.destroy();
  UpdateResources(0,getRandomInt(30) +10,getRandomInt(15) +10);

	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	//Console.log("execute");
	button3.destroy();
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',fieldOfGrain,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Execute Forest');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(1140, 345, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}

function fieldOfGrain(){
  UpdateResources(0,-getRandomInt(15) -10,-getRandomInt(15) -10);

	narrative.destroy();
	button2.destroy();
	b3t.text="Pillage fields";
	b1t.text="Pass fields to river";
	b2t.text="";
	//Console.log("fieldOfGrain");
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',passField,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button3 = game.add.button(2000,0, 'RndButton',pillage,this,'Hover','Up','Down');
	button3.x = Math.floor(windoww.x + 300);
	button3.y = Math.floor(windoww.y + 350);
	narrative = game.add.sprite(2000, 0, 'A2T','Field Of Grains');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(830, 300, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function pillage(){
	narrative.destroy();
	//Console.log("pillage");
	b1t.text="Fight the plainsfolk";
  b2t.text="";
  b3t.text="";

	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//plains combat
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.combatmap = "GrainBattle";
	button1.enemy = "Knight";
	button1.winFunction = "pillageW";
	button1.lossFunction = "pillageL";
	button1.scene = "act2";

	button2.destroy();
	b2t.text="";
	narrative = game.add.sprite(2000, 0, 'A2T','Pillage Grains');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(696, 286, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function pillageW(){
  narrative.destroy();
  UpdateResources(0,getRandomInt(30) +10,getRandomInt(150) +150);

	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');//forest battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button3.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Pillage Grains Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	caravanStart.destroy();
	caravanStart = game.add.button(630, 295, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();

}
function pillageL(){
  narrative.destroy();
	b1t.text="Journey to river";
	b2t.text="";
	b3t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');//forest battle
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	button3.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Pillage Grains Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	caravanStart.destroy();
	caravanStart = game.add.button(630, 295, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();

}
function passField(){
	narrative.destroy();
	b1t.text="Carry onward";
  b2t.text="";
  b3t.text="";

	//Console.log("passField");
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',river,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button3.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Pass');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(630, 295, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}

function river(){
	narrative.destroy();
  UpdateResources(0,-getRandomInt(30) -10,-getRandomInt(15) -10);

	//Console.log("river");
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
	caravanStart = game.add.button(528, 173, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function buyPassage(){
	narrative.destroy();
  UpdateResources(0,-getRandomInt(50) -150,-getRandomInt(30) -10);

	//Console.log("buyPassage");
	b1t.text="to the bridge";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',BridgeTrolls,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Buy Passage');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(455, 216, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}
function fordRiver(){
	b1t.text="to the bridge";
	b2t.text="";
	narrative.destroy();
  UpdateResources(-getRandomInt(150) -100,-getRandomInt(150) -100,-getRandomInt(150) -100);
	//Console.log("fordRiver");
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',BridgeTrolls,this,'Hover','Up','Down');
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Ford The River');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(300, 141, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();
}

function BridgeTrolls(){
	narrative.destroy();
  UpdateResources(0,-getRandomInt(10) -10,-getRandomInt(10) -10);

	//Console.log("BridgeTrolls");
	b1t.text="Slay the trolls";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');//bridgetrolls
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.combatmap = "Bridgebattle";
	button1.enemy = "Knight";
	button1.winFunction = "BridgeTrollsWin";
	button1.lossFunction = "BridgeTrollsLose";
	button1.scene = "act2";

	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Bridge Trolls');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOffScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(283, 81, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();

}
function BridgeTrollsWin(){
	//Console.log("BridgeTrolls Win");
	b1t.text="Begin final leg";
	b2t.text="";
	button1.destroy();

	button1 = game.add.button(2000,0, 'RndButton',LoadNarrative,this,'Hover','Up','Down');//bridgetrolls
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.narrative = {next:info.next}
  button1.scene = "act3";
  button1.keepPreload = true;
  button1.keepCreate = false;

	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Bridge Trolls Win');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(186, 40, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();


}
function BridgeTrollsLose(){
	//Console.log("BridgeTrolls Lose");
  UpdateResources(-getRandomInt(50) -50,-getRandomInt(50) -50,-getRandomInt(50) -50);

	b1t.text="Begin final leg";
	b2t.text="";
	button1.destroy();
	button1 = game.add.button(2000,0, 'RndButton',LoadNarrative,this,'Hover','Up','Down');//bridgetrolls
	button1.x = Math.floor(windoww.x + 40);
	button1.y = Math.floor(windoww.y + 350);
  button1.narrative = {next:info.next}
  button1.scene = "act3";
  button1.keepPreload = true;
  button1.keepCreate = false;

	button2.destroy();
	narrative = game.add.sprite(2000, 0, 'A2T','Bridge Trolls Lose');
	narrative.x = Math.floor(windoww.x + 100);
	narrative.y = Math.floor(windoww.y + 100);
	moveWindowOnScreen();
	caravanStart.destroy();
	caravanStart = game.add.button(110, 11, 'RndButton', moveWindowOnScreen, this, 'Hover','Up','Down');
	caravanStart.anchor.set(0.5);
  AddPath();


}


///////////////////////act2 functions end
var Act3 = function(game) {};
Act3.prototype = {
	init: function(info) {
  },
	preload: function() {
	},
	create: function() {
    game.state.start('GameOver', true, false, true);

	},
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

//+ or minus resources in here!
function UpdateResources(p, s, f){
  var Neg = { fontSize: '24px', fill: '#ea0000' };
  var Pos = { fontSize: '24px', fill: '#0edb11' }
  var tweenSpd = 1500;

  population += p;
  supplies += s;
  food += f;

  if(p > 0){
    popTxtP = game.add.text(game.camera.width/2, game.camera.height/2, 'Population + ' + p, Pos );
    popTxtP.alpha = 1;
    popTxtP.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    game.add.tween(popTxtP).to({y: game.camera.height/2 - 200, alpha:0}, tweenSpd, null, true);
  }else if (p < 0){
    popTxtP = game.add.text(game.camera.width/2, game.camera.height/2, 'Population ' + p, Neg );
    popTxtP.alpha = 1;
    popTxtP.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    game.add.tween(popTxtP).to({y: game.camera.height/2 - 200, alpha:0}, tweenSpd, null, true);
  }

  if(s > 0){
    popTxtS = game.add.text(game.camera.width/2, game.camera.height/2 +50, 'Supplies + ' + s, Pos );
    popTxtS.alpha = 1;
    popTxtS.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    game.add.tween(popTxtS).to({y: game.camera.height/2 - 200, alpha:0}, tweenSpd, null, true);

  }
  else if (s < 0){
    popTxtS = game.add.text(game.camera.width/2, game.camera.height/2 + 50, 'Supplies ' + s, Neg );
    popTxtS.alpha = 1;
    popTxtS.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    game.add.tween(popTxtS).to({y: game.camera.height/2 - 200, alpha:0}, tweenSpd, null, true);
  }

  if(f > 0){
    popTxtF = game.add.text(game.camera.width/2, game.camera.height/2 +100, 'Food + ' + f, Pos );
    popTxtF.alpha = 1;
    popTxtF.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    game.add.tween(popTxtF).to({y: game.camera.height/2 - 200, alpha:0}, tweenSpd, null, true);

  }
  else if (f < 0){
    popTxtF = game.add.text(game.camera.width/2, game.camera.height/2 + 100, 'Food ' + f, Neg );
    popTxtF.alpha = 1;
    popTxtF.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    game.add.tween(popTxtF).to({y: game.camera.height/2 - 200, alpha:0}, tweenSpd, null, true);
  }

}

function SupDrop(){
  var amt = getRandomInt(population/4);
  UpdateResources(-amt,amt,0)
}

function FoodDrop(){
  var amt = getRandomInt(population/3);
  UpdateResources(-amt,0,amt)
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

  windoww.bringToTop();
  narrative.bringToTop();
  button1.bringToTop();
  button2.bringToTop();

  b1t.bringToTop();
	b2t.bringToTop();
  caravanStart.bringToTop();

  if(button3 != null)
  {
    button3.bringToTop();
    b3t.bringToTop();
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
      //Console.log(Path[i].x +"---"+ Path[i].y);

    }
    else {
      //Console.log(Path[i].x +"---"+ Path[i].y);
      line.lineTo(Path[i].x, Path[i].y);
    }
  }
}
