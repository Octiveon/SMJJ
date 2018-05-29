var Combat = function(game) {};


Combat.prototype = {
	init: function(mapAssetName) {
		partyAlive = partySize;
		actionEnum = "Move"; //Move, Ability, Attack
		_mapAssetPath = 'assets/imgs/'  + mapAssetName;

		mapWidth = -1;
		mapHeight = -1;
		overUI = false;
		enemyActing = false;
	},
	preload: function() {
		game.load.atlas('Characters', 'assets/imgs/Characters.png','assets/imgs/Characters.json',
		Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.tilemap('map', _mapAssetPath + '.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/imgs/32X32.png');
		game.load.image('64X64', 'assets/imgs/64x64.png');
		game.load.image('Tree3', 'assets/imgs/tree3.png');

		game.load.image('UIHalfWindow', 'assets/imgs/UIWindow3.png');
	},
	create: function() {

		if(currentBGM != 0)
		{
			game.sound.stopAll();
			currentBGM = game.add.audio('battleSnd');
			currentBGM.play('',0,0.1,true);
		}
		else {
			currentBGM.play('',0,0.1,true);
		}

		units = [];
		currentUnit = 0;
		unitNum = 0;
		//function Mapp(game, csvKey, csvSrc, imgSrc) {
		//map = new Mapp(game, 'map', 'tiles', 'spritesheet(2)')
		map = game.add.tilemap('map');
		map.addTilesetImage('32X32', 'tiles');
		map.addTilesetImage('64X64');

		mapWidth = map.layers[0].width;
		mapHeight = map.layers[0].height;

		//spawnLayer = map.createLayer(3);
		spawnLayer = map.createLayer(3);
		dataLayer = map.createLayer(2);
		map.createLayer(0);
		map.createLayer(1);

		dataLayer.resizeWorld();
		mapp = new Mapp(game, map, dataLayer, spawnLayer);

		uiGrp = game.add.group();
		uiGrp.enableBody = true;

		vanguard = game.add.group();
		vanguard.enableBody = true;

		enemyUnits = game.add.group();
		enemyUnits.enableBody = true;

		//Add Things in after here

		unitWindow = game.add.sprite(0, game.height - (600 * 0.2), 'UIHalfWindow');
		unitWindow.scale.setTo(0.2,0.2);
		unitWindow.fixedToCamera = true;
		unitWindow.enableBody = true;
		uiGrp.add(unitWindow);

		style = { font: "16px Arial", fill: "#000000", wordWrap: true,
		  wordWrapWidth: unitWindow.width, align: "center", fontWeight: "bold" };
		wind = game.add.sprite(game.camera.width,0, 'TextWindow');
		wind.anchor.x =  1;
		wind.scale.setTo(0.15,0.15);
		wind.fixedToCamera = true;
		uiGrp.add(wind);


		unitWindowtext = game.add.text(unitWindow.width * 0.5 ,game.height - unitWindow.height * 0.7, "Health: \n Move:", style);
		unitWindowtext.fixedToCamera = true;

		endTurn = game.add.button(unitWindow.width * 0.9 ,game.height - unitWindow.height * 0.4, 'RndButton', EndTurn, this, 'Hover', 'Up','Down');
		endTurn.anchor.x = endTurn.anchor.y = 0.5;
		endTurn.fixedToCamera = true;
    endTurn.scale.setTo(1,1);
		endTurn.enableBody = true;
		uiGrp.add(endTurn);

		var style = { font: "10px Arial", fill: "#000000", wordWrap: true,
		 wordWrapWidth: unitWindow.width, align: "center", fontWeight: "bold" };

		endTurntext = game.add.text(unitWindow.width * 0.85 ,game.height - unitWindow.height * 0.25, "End Turn", style);
		endTurntext.fixedToCamera = true;

		exitBtn = game.add.button(50 ,50, 'RndButton', Exit, this, 'Hover', 'Up','Down');
		exitBtn.anchor.x = exitBtn.anchor.y = 0.5;
		exitBtn.fixedToCamera = true;
    exitBtn.scale.setTo(1,1);
		exitBtn.enableBody = true;

		var style = { font: "14px Arial", fill: "#000000", wordWrap: true,
		wordWrapWidth: wind.width, align: "center", fontWeight: "bold" };
		exitBtntext = game.add.text(40 ,40, "Exit", style);
		exitBtntext.fixedToCamera = true;

		moveBtn = game.add.button(wind.position.x - 225 ,35, 'RndButton', MoveMode, this, 'Hover', 'Up','Down');
		moveBtn.anchor.x = exitBtn.anchor.y = 0.5;
		moveBtn.fixedToCamera = true;
    moveBtn.scale.setTo(1,1);
		moveBtn.enableBody = true;
		uiGrp.add(moveBtn);


		moveBtntext = game.add.text(game.camera.width - wind.width * 0.70 , 40, "Move", style);
		moveBtntext.fixedToCamera = true;

		attackBtn = game.add.button(wind.position.x - 225 ,70, 'RndButton', AttackMode, this, 'Hover', 'Up','Down');
		attackBtn.anchor.x = exitBtn.anchor.y = 0.5;
		attackBtn.fixedToCamera = true;
    attackBtn.scale.setTo(1,1);
		attackBtn.enableBody = true;
		uiGrp.add(attackBtn);


		attackBtntext = game.add.text(game.camera.width - wind.width * 0.70 , 80, "Attack", style);
		attackBtntext.fixedToCamera = true;

		abilityBtn = game.add.button(wind.position.x - 225 ,105, 'RndButton', AbilityMode, this, 'Hover', 'Up','Down');
		abilityBtn.anchor.x = exitBtn.anchor.y = 0.5;
		abilityBtn.fixedToCamera = true;
		abilityBtn.scale.setTo(1,1);
		abilityBtn.enableBody = true;
		uiGrp.add(abilityBtn);


		abilityBtntext = game.add.text(game.camera.width - wind.width * 0.70 , 120, "Ability", style);
		abilityBtntext.fixedToCamera = true;

		// add instructions in the bottom right corner
		combatInstructions = game.add.sprite(850, 600, 'instructions','combatInstructions');
		combatInstructions.fixedToCamera = true;

		uiGrp.add(endTurn);
		tileText = game.add.text(game.camera.width - wind.width * 0.70 , 80, "", style);



		////////////////////////////////////////////////////////////////////
		marker = game.add.graphics();
		marker.lineStyle(2, 0xffffff, 1);
		marker.beginFill(0xffffff, 0.5);
		marker.drawRect(0, 0, 32, 32);
		marker.endFill();
		////////////////////////////////////////////////////////////////////

		SpawnParty();
		SpawnEnemies(3, 'Enemy');

		var i;
		for (var i = 0; i < uiGrp.children.length; i++) {
			uiGrp.children[i].inputEnabled = true;
			uiGrp.children[i].events.onInputOver.add(Over, this);
			uiGrp.children[i].events.onInputOut.add(Out, this);
		}
		for (var i = 0; i < vanguard.children.length; i++) {
			units[i] = vanguard.children[i];
		}
		for (i; i < enemyUnits.children.length + vanguard.children.length; i++) {
			units[i] = enemyUnits.children[i - vanguard.children.length];
		}
		currentUnit = units[unitNum];
		game.camera.follow(currentUnit, 0, 0.2, 0.2);
		// Arg(HowMany, key of enemy image in atlas)
		////////////////////////////////////////////////////////////////////
		playermarker = game.add.graphics();
		playermarker.lineStyle(2, 0x00ff77, 1);
		playermarker.drawRect(0,0, 32 * 3, 32 * 3);
		playermarker.x = currentUnit.position.x - 32;
		playermarker.y = currentUnit.position.y;

		//key1 = game.input.keyboard.addKey(Phaser.Keyboard.T);
		//key1.onDown.add(EndTurn, this);
		////////////////////////////////////////////////////////////////////

		for (var i = uiGrp.children.length; i < uiGrp.children.length; i++) {
			uiGrp.children[i].bringToTop();
		}
		currentUnit.bringToTop();

		game.input.onDown.add(TileSelect, this);
		game.input.addMoveCallback(updateMarker, this);
		UpdateUI();
	},
	update: function() {

	},
	render: function(){
		//game.debug.body(unitWindow);
		//game.debug.body(wind);

	}
};

//Functions for UI Detection
function Over(){overUI = true;}
function Out(){overUI = false;}

//Functions for Action Selection
function AttackMode() {actionEnum = "Attack";}
function MoveMode() {actionEnum = "Move";}
function AbilityMode() {actionEnum = "Ability";}

function Exit() {game.state.start('mainMenu');}

function EndTurn() {
	//Check for end turn button
	unitNum++;
	if(unitNum > units.length - 1){unitNum = 0;}

	currentUnit = units[unitNum];
	game.camera.follow(currentUnit, 0, 0.2, 0.2);
	currentUnit.bringToTop();
	currentUnit.NewTurn();
	UpdateUI();


	console.log("UNIT:" + unitNum);

	for (var i = uiGrp.children.length; i < uiGrp.children.length; i++) {
		uiGrp.children[i].bringToTop();
	}

	if(enemyUnits.children.indexOf(currentUnit) == -1)
	{
		endTurn.inputEnabled = true;
		enemyActing = false;
	}
	else if(enemyActing == false) {
		endTurn.inputEnabled = false;
		enemyActing = true;
		StartEnemyTurns();
		game.time.events.repeat(Phaser.Timer.SECOND * 8, enemyUnits.children.length-1, StartEnemyTurns, this);
	}

}

function StartEnemyTurns(){
	game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 7, EnemyAct, this);
	game.time.events.add((Phaser.Timer.SECOND * 0.5) * 7, EndTurn, this);

}

function DEBUGTURNS() {for (var i = 0; i < 25 * partySize; i++) {EndTurn();}}

function EnemyAct() {
	rnd= getRandomTile();
	x = dataLayer.getTileX(rnd.xPos + currentUnit.position.x);
	y = dataLayer.getTileY(rnd.yPos + currentUnit.position.y);

	var prevX = dataLayer.getTileX(currentUnit.position.x);
	var prevY = dataLayer.getTileY(currentUnit.position.y);
	d ={x:prevX, y:prevY, toX:x, toY:y}
	console.log(d);

	if(mapp.isTileOpen(x,y) &&
	 GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60 &&
	 currentUnit.CanMove(mapp.getTileCost(x,y))){
		mapp.OccupentLeft(prevX, prevY+1);
		currentUnit.MoveTo(x * 32, y * 32 - 32, mapp.getTileCost(x,y));
		playermarker.x = currentUnit.position.x - 32;
		playermarker.y = currentUnit.position.y;
		mapp.Occupy(x,y,currentUnit)
	}

}

function getRandomTile(){
	var randX = game.rnd.integerInRange(0,2);
	var randY = game.rnd.integerInRange(0,2);
	var x = 0;
	var y = 0;

	if (randX == 0) {
		x = 64;

	} else if(randX == 1) {
		x = -31;
	}

	if (randY == 0) {
		y = 64;

	} else if(randY == 1) {
		y = -31;
	}
	var r = {xPos:x,yPos:y};
	//console.log(r);
	return r
}

function UpdateUI() {
	//Update Player unit UI
	var ptxt = "Health: " + currentUnit.health + "\n" + "Move: " + currentUnit.movement;
	unitWindowtext.text = ptxt;
	//Update boundry box of currentUnit
	playermarker.x = currentUnit.position.x - 32;
	playermarker.y = currentUnit.position.y;

}

function updateMarker() {
	var x = game.input.activePointer.worldX;
	var y = game.input.activePointer.worldY;

	//Stops tile selection if over tiles
	if (overUI || enemyActing){return;}


	x = dataLayer.getTileX(x);
	y = dataLayer.getTileY(y);

	if(x < 0){ x = 0;}
	if(y < 0){ y = 0;}

	var flag = mapp.getTileStatus(x,y);

	if(actionEnum == "Move")
	{
		tileText.text = mapp.getTileCost(x,y);
		tileText.position.x = x * 32 + 12;
		tileText.position.y = y * 32 + 10;

		if(GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60 && currentUnit.CanMove(mapp.getTileCost(x, y)))
		{ marker.tint = 0x3eff03; }
		else{		marker.tint = 0xBD0404; }
	}
	else if (actionEnum == "Attack") {
		tileText.text = "";
		if(GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60 && flag == 1)
		{ marker.tint = 0xBD0404; }
		else{ marker.tint = 0xffffff; }

	}

  marker.x = x * 32;
  marker.y = y * 32;
}

function TileSelect() {
	var x = game.input.activePointer.worldX;
	var y = game.input.activePointer.worldY;
	//Stops tile selection if over tiles
	if (overUI){return;}

	var x = game.input.activePointer.worldX;
	var y = game.input.activePointer.worldY;

	//Gets tile location in order to move the player
	x = dataLayer.getTileX(game.input.activePointer.worldX);
	y = dataLayer.getTileY(game.input.activePointer.worldY);

	switch (actionEnum) {
		case "Move":
		Move(x,y);
			break;
		case "Ability":
		Ability(x,y);
			break;
		case "Attack":
		Attack(x,y);
			break;
		default:
	}
	UpdateUI();

}

function Move(x,y) {
		//Gets tile location in order to move the player
		x = dataLayer.getTileX(game.input.activePointer.worldX);
	  y = dataLayer.getTileY(game.input.activePointer.worldY);

		var prevX = dataLayer.getTileX(currentUnit.position.x);
		var prevY = dataLayer.getTileY(currentUnit.position.y);

		//console.log(tile);
		if(mapp.isTileOpen(x,y) &&
		 GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60 &&
		 currentUnit.CanMove(mapp.getTileCost(x,y))){
			mapp.OccupentLeft(prevX, prevY+1);
			currentUnit.MoveTo(x * 32, y * 32 - 32, mapp.getTileCost(x,y));
			playermarker.x = currentUnit.position.x - 32;
			playermarker.y = currentUnit.position.y;
			mapp.Occupy(x,y,currentUnit)
		}
}

function Ability(x,y) {
	x = dataLayer.getTileX(game.input.activePointer.worldX);
	y = dataLayer.getTileY(game.input.activePointer.worldY);
}

function Attack(x,y) {
	if(!mapp.isTileOpen(x,y) && GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60){
		var flag = mapp.getTileStatus(x,y);

		if(flag == 1 && currentUnit.attacked == false){
			occup = mapp.getTileOccupant(x,y);
			if(enemyUnits.children.indexOf(occup) > -1) {
				 console.log("Attack");
				 currentUnit.Attack(occup);
				 console.log(occup.health);
			}
		}
	}
}

function GetDistance(x1,y1,x2,y2) {
	return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function SpawnEnemies(count, type) {
	//Checks to make sure tile they will spawn in is open
	locs = mapp.GetESpawn();
	for (var i = 0; i < locs.length; i++) {
		//function EnemyUnit(game, key, frame, scale, x, y, health, baseDmg) {
		var x = locs[i].x;
		var y = locs[i].y;
		if(i > count){break;}
		eUnit = new EnemyUnit(game, 'Characters',type, 1, x * 32, y * 32 - 32, 50, 10);
		game.add.existing(eUnit);
		enemyUnits.add(eUnit);
		console.log(x, y + 1);
		mapp.Occupy(x,y,eUnit);
	}
}

function SpawnParty() {
	locs = mapp.GetVSpawn();

	for (var i = 0; i < locs.length; i++) {
		if(i >= partySize){break;}
		var x = locs[i].x;
		var y = locs[i].y;
		//function PlayerUnit(game, key, frame, scale, x, y, health, baseDmg) {
		pUnit = new PlayerUnit(game, 'Characters','Player', 1, x * 32, y * 32, 100, 15);
		game.add.existing(pUnit);
		vanguard.add(pUnit);
		mapp.Occupy(x,y +1, pUnit);

	}

}
