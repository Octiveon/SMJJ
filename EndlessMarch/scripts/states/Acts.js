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

  init: function() {
    //variables used for stuff

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
		//textbox window
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

		//map button
    tb = game.add.button(game.camera.width / 2 - 95, 400, 'RndButton', moveWindow, this, 'Hover','Up','Down');
    tb.anchor.set(0.5);
    Path[cnt++] = {x:tb.position.x, y:tb.position.y};
    tb = game.add.button(game.camera.width / 2 + 50 , 300, 'RndButton', moveWindow, this, 'Hover','Up','Down');
    tb.anchor.set(0.5);
    Path[cnt++] = {x:tb.position.x, y:tb.position.y};

    //texbox buttons
    //game.add.button(portrait.width * 0.9 ,game.height - portrait.height * 0.4, [Atlas], [Function], this, [Hover], [UP],[Down]);

		button1 = game.add.button(2000,0, 'RndButton',LoadCombat,this,'Hover','Up','Down');
		button2 = game.add.button(2000,0,'RndButton',holdF,this,'Hover','Up','Down');
		button3 = game.add.button(2000,0,'RndButton',holdF,this,'Hover','Up','Down');
		poptxt = game.add.text(16, 16, 'Population: 1000', { fontSize: '32px', fill: '#999999' });
		supplytxt = game.add.text(300, 16, 'Supplies: 1000', { fontSize: '32px', fill: '#818181' });
		foodtxt = game.add.text(750, 16, 'Food: 1000', { fontSize: '32px', fill: '#000' });

		actInstructions = game.add.sprite(100, 400, 'instructions', 'actInstructions');
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


function DrawPath()
{
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
