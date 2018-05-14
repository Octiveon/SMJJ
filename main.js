var game = new Phaser.Game(1008, 506, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var score = 0;
var scoreText;

function preload() {
	// preload assets
	game.load.image('Floor', 'assets/img/Floor.png');
	game.load.image('BG', 'assets/img/Gradient.png');
	game.load.image('Hills', 'assets/img/Hills.png');
	game.load.image('Mountains' , 'assets/img/Mountains.png');
	game.load.image('Sun' , 'assets/img/Sun.png');
	game.load.image('army','assets/img/Army.png');
	game.load.image('heads1','assets/img/Heads1.png');
	game.load.image('heads2','assets/img/Heads2.png');
	game.load.spritesheet('flag','assets/img/Flag.png',50,200,3);
	game.load.image('Tree1', 'assets/img/Tree1.png');
	game.load.image('Tree2', 'assets/img/Tree2.png');
	game.load.image('Tree3', 'assets/img/Tree3.png');
	game.load.image('Tree4', 'assets/img/Tree4.png');
	game.load.image('Tree5', 'assets/img/Tree5.png');
	game.load.image('Tree6', 'assets/img/Tree6.png');
	treesSprite = ["Tree1","Tree2","Tree3","Tree4","Tree5","Tree6"];
}
function create() {
	game.add.sprite(0,0,'BG');
	sun = game.add.sprite(670,355,'Sun');
		sun.anchor.setTo(.5,.5);
	game.add.sprite(0,243,'Mountains');
	hills = game.add.tileSprite(0,340,1008,166,'Hills');
	game.add.sprite(0,422,'Floor');
	
	bgtrees = game.add.group();

	bgTreeTimer = game.time.create(false);
	bgTreeTimer.loop(10000+(Math.random()*1000), createbgTree, this);
	bgTreeTimer.start();
	
	banner1 = game.add.sprite(246,355,'flag');
	banner1.animations.add('flag',[0,1,2,3],4,true);
	banner1.animations.play('flag');
	banner1.scale.setTo(.5,.5);
	banner2 = game.add.sprite(397,352,'flag');
	banner2.animations.add('flag',[0,1,2,3],4,true);
	banner2.animations.play('flag');
	banner2.scale.setTo(.5,.5);
	banner3 = game.add.sprite(554,360,'flag');
	banner3.animations.add('flag',[0,1,2,3],4,true);
	banner3.animations.play('flag');
	banner3.scale.setTo(.5,.5);
	banner4 = game.add.sprite(777,350,'flag');
	banner4.animations.add('flag',[0,1,2,3],4,true);
	banner4.animations.play('flag');
	banner4.scale.setTo(.5,.5);
	
	army = game.add.sprite(110,410,'army');
	armyStretch = 0.
	armyDir = 0;
	
	heads1 = game.add.sprite(160,415,'heads1');
	headBobDir1 = 0;
	heads2 = game.add.sprite(160,415,'heads2');
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
}
function update() {
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

function createbgTree() {
	var bgtree = bgtrees.create(1030,435+(Math.random()*15),treesSprite[Math.round(Math.random()*6)])
	bgtree.scale.setTo(.2+(Math.random()*.2),.2+(Math.random()*.2));
	bgtree.anchor.setTo(0,1);
}
function createfgTree() {
	var fgtree = fgtrees.create(1030,585-(Math.random()*60),treesSprite[Math.round(Math.random()*6)])
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

