var Acts = function(game) {};
Path = [];
cnt = 0;

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
var hold;
var descend;
var poptxt;
var foodtxt;
var supplytext;
var windoww
Act1.prototype = {

  init: function() {
    //variables used for stuff

  },
	preload: function() {
		game.load.image('window', 'assets/imgs/window.png');
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
		windoww.inputEnabled = true;
		windoww.input.enableDrag();
		windoww.x =2000;
		//code taken from phaser//    https://phaser.io/examples/v2/text/center-text-on-sprite
		var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: windoww.width, align: "left", backgroundColor: "#c3c3c3" };
		text = game.add.text(0, 0, "A landslide befalls you and your caravan killing some and wounding others. Amidst all of the confusion the a war horns can be heard in the distance!\n Scouts are sent out and report that you will be besieged by orcs in 3 days time! Your options are: \n Executing an emergency descent — leaving a group behind to slow the orcs. \n Holding your ground — fighting in arduous terrain to avoid the orcs", style);
		text.anchor.set(0.5);
		//map button
    tb = game.add.button(game.camera.width / 2 - 95, 400, 'RndButton', moveWindow, this, 'Hover','Up','Down');
    tb.anchor.set(0.5);
    Path[cnt++] = {x:tb.position.x, y:tb.position.y};
    tb = game.add.button(game.camera.width / 2 + 50 , 300, 'RndButton', moveWindow, this, 'Hover','Up','Down');
    tb.anchor.set(0.5);
    Path[cnt++] = {x:tb.position.x, y:tb.position.y};

    //texbox buttons
    //game.add.button(portrait.width * 0.9 ,game.height - portrait.height * 0.4, [Atlas], [Function], this, [Hover], [UP],[Down]);

		hold = game.add.button(2000,0, 'narrativeButtons',LoadCombat,this,'hold','hold','hold');
		descend = game.add.button(2000,0,'narrativeButtons',descendF,this,'descend','descend','descend');
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
		hold.x = Math.floor(windoww.x + 27);
		hold.y = Math.floor(windoww.y + 237);
		descend.x = Math.floor(windoww.x + 300);
		descend.y = Math.floor(windoww.y + 237);
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
