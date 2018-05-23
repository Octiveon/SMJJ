var game = new Phaser.Game(1200, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	// preload assets
	game.load.atlas('loading','assets/img/loadingAtlas.png','assets/img/loading.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	game.load.image('window','assets/img/TextWindow.png');//Replace with UI atlas when its made available 
	treesSprite = ["Tree1","Tree2","Tree3","Tree4","Tree5","Tree6","skull","Skeleton"];
	dustSprite = ["dust1","dust2","dust3"];
	food=75;
	resources=75;
	population=1250;
	//replace with global variables
	startingFood=100;
	startingResources=100;
	startingPopulation=1500;
	//replace with global variables
	//if variable names change check the bottom of create at ~line 90
}
function create() {
	game.add.sprite(0,0,'loading','BG');
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

	Lwindow = game.add.sprite(225,30,'window');
	Lwindow.scale.setTo(.4,.4)
	Lwindow.alpha = 0;
	game.add.tween(Lwindow).to( { alpha: .8 }, 5000, "Linear", true);
	
	currentPopulation = game.add.text(285, 170, startingPopulation-population+" People died on this stretch of you journey");
	currentFood = game.add.text(285, 220, startingFood-food+" Food was consumed or lost");
	currentResources = game.add.text(285, 270, startingResources-resources+" resources were consumer or lost");
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

