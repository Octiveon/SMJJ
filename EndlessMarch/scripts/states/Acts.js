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

    /////////////////////////////
    line = game.add.graphics();
		line.lineStyle(3, 0xf20418, 1);
    /////////////////////////////


    ////
    curentTextWindow = null;
    ////
		//textbox window
<<<<<<< HEAD
		windoww = game.add.sprite(487,320,'window');
		windoww.scale.set(.4,.4);
=======
		windoww = game.add.sprite(game.camera.width *0.5, game.camera.height * 0.5,'TextWindow');
    windoww.scale.set(0.5);
    windoww.anchor.setTo(0.5,0.5);
>>>>>>> 813600d53fd5e15156fdbd8f137fab8a2cc23862
		windoww.inputEnabled = true;
		windoww.input.enableDrag();
		//windoww.x =2000;
		//code taken from phaser//    https://phaser.io/examples/v2/text/center-text-on-sprite
<<<<<<< HEAD
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: windoww.width, align: "left"};
		text = game.add.text(0, 0, "A landslide befalls you and your caravan killing some and wounding others. Amidst all of the confusion the a war horns can be heard in the distance!\n Scouts are sent out and report that you will be besieged by orcs in 3 days time! Your options are: \n Executing an emergency descent — leaving a group behind to slow the orcs. \n Holding your ground — fighting in arduous terrain to avoid the orcs", style);
		text.anchor.set(0.5);
		b1t =game.add.text(0,0,"tempword",style);
		b1t.anchor.set(0.5);
		b2t =game.add.text(0,0,"tempword",style);
		b2t.anchor.set(0.5);
		b3t =game.add.text(0,0,"tempword",style);
		b3t.anchor.set(0.5);

=======
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true,  };
    console.log(windoww.position);
    text = game.add.text(windoww.position.x, windoww.position.y, "A landslide befalls you and your caravan killing some and wounding others. Amidst all of the confusion the a war horns can be heard in the distance!\n Scouts are sent out and report that you will be besieged by orcs in 3 days time! Your options are: \n Executing an emergency descent — leaving a group behind to slow the orcs. \n Holding your ground — fighting in arduous terrain to avoid the orcs", style);
		//text.anchor.set(0.5);
>>>>>>> 813600d53fd5e15156fdbd8f137fab8a2cc23862
		//map button
    SpawnOldButtons();

    if(Path.length == 0)
    {
      caravanStart = game.add.button(game.camera.width *0.15, game.camera.height *0.7, 'RndButton', moveWindow, this, 'Hover','Up','Down');
      caravanStart.anchor.set(0.5);
      //caravanStart.textWindow = "[KEY IN ATLAS]"
      caravanStart.textWindow = ""
      caravanStart.choice1 = "";
      caravanStart.choice2 = "";

      Path[cnt++] =
      {
        x:game.camera.width *0.15,
        y:600
      };
    }
    //texbox buttons
    //game.add.button(portrait.width * 0.9 ,game.height - portrait.height * 0.4, [Atlas], [Function], this, [Hover], [UP],[Down]);

<<<<<<< HEAD
		button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
		button2 = game.add.button(2000,0,'RndButton',holdF,this,'Hover','Up','Down');
		button3 = game.add.button(2000,0,'RndButton',holdF,this,'Hover','Up','Down');
=======
		hold = game.add.button(2000,0, 'narrativeButtons',LoadCombat,this,'hold','hold','hold');
		descend = game.add.button(2000,0,'narrativeButtons',CreateNewNode,this,'descend','descend','descend');
    //descend.newbutton = {x,y, textboxID, choice1, choice2}
    descend.newbutton = {x:game.camera.width * 0.4, y:600, textboxID:"tstin", choice1:"this", choice2:"button"}
>>>>>>> 813600d53fd5e15156fdbd8f137fab8a2cc23862
		poptxt = game.add.text(16, 16, 'Population: 1000', { fontSize: '32px', fill: '#999999' });
		supplytxt = game.add.text(300, 16, 'Supplies: 1000', { fontSize: '32px', fill: '#818181' });
		foodtxt = game.add.text(750, 16, 'Food: 1000', { fontSize: '32px', fill: '#000' });

		//elderBattle = game.add.sprite (100, 200, 'A1T', 'Elder Battle');
		//elderBattle.fixedToCamera = true;
		//actInstructions = game.add.sprite(100, 400, 'instructions', 'actInstructions');
		actInstructions.fixedToCamera = true;
    DrawPath();
	},
	update: function() {

		text.x = Math.floor(windoww.x + windoww.width / 2 );
		text.y = Math.floor(windoww.y + windoww.height / 2 - 50);
		// window button 1 
		button1.x = Math.floor(windoww.x + 40);
		button1.y = Math.floor(windoww.y + 350);
		b1t.x = Math.floor(windoww.x + 120);
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

var Act2 = function(game) {};
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
	windoww.x = 560;
	windoww.y = 400;
	population -= 70;
}
function holdF(){
	windoww.x = 560;
	windoww.y = 400;

}
function descendF(){
	windoww.x = 560;
	windoww.y = 400;
	supplies -= 150;
}
function elderbattle(){

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
