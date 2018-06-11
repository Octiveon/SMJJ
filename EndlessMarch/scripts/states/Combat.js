var Combat = function(game) {};
Combat.prototype = {
	init: function(info) {
		//Var needed
		partyAlive = partySize;
		enemieCnt = 1;
		winFunction = info.winFunction;
		lossFunction = info.lossFunction;
		act = info.prevScene;
		enemyType = info.enemy;
		actionEnum = "Move"; //Move, Ability, Attack
		_mapAssetPath = 'assets/imgs/CombatMaps/'  + info.map;

		mapWidth = -1;
		mapHeight = -1;
		overUI = false;
		enemyActing = false;
	},
	preload: function() {
		//Loading in dynamic combat maps
		game.load.tilemap('map', _mapAssetPath + '.json', null, Phaser.Tilemap.TILED_JSON);
  
		game.load.image('UIHalfWindow', 'assets/imgs/UIWindow3.png');

		//Sounds
		game.load.audio("atk",'assets/snds/atk.ogg');
	},
	create: function() {
		//Stoping and playing combat audi

		if(currentBGM != 0){
			game.sound.stopAll();
			currentBGM = game.add.audio('battleSnd');
			currentBGM.play('',0,0.1,true);
		}
		else {
			currentBGM.play('',0,0.1,true);
		}

		//Turn tracking vars
		units = [];
		currentUnit = 0;
		unitNum = 0;

		//Set up for maps
		//function Mapp(game, csvKey, csvSrc, imgSrc) {
		//map = new Mapp(game, 'map', 'tiles', 'spritesheet(2)')
		map = game.add.tilemap('map');
		map.addTilesetImage('32X32', 'tiles');
		map.addTilesetImage('64X64');

		mapWidth = map.layers[0].width;
		mapHeight = map.layers[0].height;

		spawnLayer = map.createLayer(3);
		dataLayer = map.createLayer(2);
		map.createLayer(0);
		map.createLayer(1);

		dataLayer.resizeWorld();
		mapp = new Mapp(game, map, dataLayer, spawnLayer);

		//For bringing to front
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

		uiGrp.add(endTurn);
		tileText = game.add.text(game.camera.width * 0.70 , 80, "", style);

		//Current tile selected
		////////////////////////////////////////////////////////////////////
		marker = game.add.graphics();
		marker.lineStyle(2, 0xffffff, 1);
		marker.beginFill(0xffffff, 0.5);
		marker.drawRect(0, 0, 32, 32);
		marker.endFill();
		////////////////////////////////////////////////////////////////////

		SpawnEnemies('Enemy');
		SpawnParty();

		//Addding Groups

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
		if(partyAlive == 0)
		{
			var combatEnd = {scene: act, win:false, lost: (partyAlive / partySize) * 100, scene: act, next: lossFunction}

			game.state.start("LoadCampfire", true, false, combatEnd);

		}else if (enemieCnt == 0) {
			var combatEnd = {win:true, lost: (partyAlive / partySize) * 100, scene: act, next: winFunction}
			game.state.start("LoadCampfire", true, false,combatEnd);

		}

	},
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
		if(enemyUnits.children.length-1 > 0)
		{
			game.time.events.repeat(Phaser.Timer.SECOND * 7.2, enemyUnits.children.length-1, StartEnemyTurns, this);
		}
	}

}

function StartEnemyTurns(){
	game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 7, EnemyAct, this);
	game.time.events.add((Phaser.Timer.SECOND * 0.5) * 7, EndTurn, this);
}

function EnemyAct() {
	//Basic AI
	if(enemyActing == true)
	{
		currentUnit.ChooseTarget();
		if(currentUnit.InRange())
		{
			currentUnit.Attack();
		}
		{
			currentUnit.MoveCloser();
		}
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

//Updates tile selected
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
	if(flag == 0)
	{
		actionEnum = "Move";
	}
	else {
		if(enemyUnits.children.indexOf(flag) > -1)
		{
			actionEnum = "Attack";
		}
		else {
			actionEnum = "Attack";
		}
	}

	if(actionEnum == "Move"){
		tileText.text = mapp.getTileCost(x,y);
		tileText.position.x = x * 32 + 12;
		tileText.position.y = y * 32 + 10;

		if(GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60 && currentUnit.CanMove(mapp.getTileCost(x, y)))
		{ marker.tint = 0x3eff03; }
		else{		marker.tint = 0xBD0404; }
	}
	else if (actionEnum == "Attack") {
		tileText.text = "";
		if(GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60 && enemyUnits.children.indexOf(flag) > -1)
		{ marker.tint = 0xBD0404; }
		else{ marker.tint = 0x42e5f4; }

	}

  marker.x = x * 32;
  marker.y = y * 32;
}

//Does soemthign upon mouse click
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
	game.time.events.add(Phaser.Timer.SECOND * 0.1, updateMarker, this);

}

//Moves Player
function Move(x,y) {
		//Gets tile location in order to move the player
		x = dataLayer.getTileX(game.input.activePointer.worldX);
	  y = dataLayer.getTileY(game.input.activePointer.worldY);

		var prevX = dataLayer.getTileX(currentUnit.position.x);
		var prevY = dataLayer.getTileY(currentUnit.position.y);

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
	//unimplemnted

}

//Attacks
function Attack(x,y) {
	if(!mapp.isTileOpen(x,y) && GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60){
		var flag = mapp.getTileStatus(x,y);

		if(flag != 0 && currentUnit.attacked == false){
			occup = mapp.getTileOccupant(x,y);
			if(enemyUnits.children.indexOf(occup) > -1) {
				 currentUnit.animations.play('pAttack');
				 currentUnit.Attack(occup);
			}
		}
	}
}

//Distance calculations
function GetDistance(x1,y1,x2,y2) {
	return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function GetUnitToUnitDistance(unit1,unit2) {
	var x1 = unit1.position.x;
	var y1 = unit1.position.y;
	var x2 = unit2.position.x;
	var y2 = unit2.position.y;

	return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function GetUnitToPointDistance(unit1,x2,y2) {
	var x1 = unit1.position.x;
	var y1 = unit1.position.y;


	return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

//Enemy type spawn
function EnemyAnimSetup(){
	if(enemyType == "Orc"){
		enemyAtkAnim = "[INSERT FRAM NAME HERE]";
		enemyMoveAnim = "[INSERT FRAM NAME HERE]";
	}
	else if (enemyType == "Knight") {
		enemyAtkAnim = "[INSERT FRAM NAME HERE]";
		enemyMoveAnim = "[INSERT FRAM NAME HERE]";

	}
	else{
		enemyAtkAnim = "[INSERT FRAM NAME HERE]";
		enemyMoveAnim = "[INSERT FRAM NAME HERE]";
	}

}
function SpawnEnemies(type) {
	//Checks to make sure tile they will spawn in is open
	locs = mapp.GetESpawn();
	for (var i = 0; i < locs.length; i++) {
		//function EnemyUnit(game, key, frame, scale, x, y, health, baseDmg) {
		var x = locs[i].x;
		var y = locs[i].y;
		eUnit = new EnemyUnit(game, 'orcL','Orc1', 1.5, x * 32, y * 32 - 32, 50, 25);
		eUnit.animations.add('eAttack', Phaser.Animation.generateFrameNames('Orc', 1,9), 10, false); // Attack animation for enemies
		game.add.existing(eUnit);
		enemyUnits.add(eUnit);
		mapp.Occupy(x,y,eUnit);
		enemieCnt=i+1;
	}
}
function EnemyDied(unit){
	var eInd = enemyUnits.children.indexOf(unit);
	var uInd = units.indexOf(unit);

	var x = dataLayer.getTileX(currentUnit.position.x);
	var y = dataLayer.getTileY(currentUnit.position.y);

	mapp.OccupentLeft(x + 1, y + 1);


	if(eInd > -1)
	{
		enemieCnt--;
		enemyUnits.children.splice(eInd, 1);
	}

	if(uInd > -1)
	{
		units.splice(uInd, 1);
	}

}

//Manages Party Life and death
function SpawnParty() {
	locs = mapp.GetVSpawn();

	for (var i = 0; i < locs.length; i++) {
		if(i >= partySize){break;}
		var x = locs[i].x;
		var y = locs[i].y;

		//function PlayerUnit(game, key, frame, scale, x, y, health, baseDmg) {
		pUnit = new PlayerUnit(game, 'knightR','Knight1', 1.5, x * 32, y * 32, 100, 25);
		pUnit.animations.add('pAttack', Phaser.Animation.generateFrameNames('Knight', 1,9), 10, false); // Attack animation for player unit
		game.add.existing(pUnit);
		vanguard.add(pUnit);
		mapp.Occupy(x,y + 1, pUnit);

	}

}
function VanguardDied(unit){

	var index = vanguard.children.indexOf(unit);
	var uInd = units.indexOf(unit);

	var x = dataLayer.getTileX(currentUnit.position.x);
	var y = dataLayer.getTileY(currentUnit.position.y);

	mapp.OccupentLeft(x, y+1);

	if(uInd > -1)
	{
		partySize--;
		partyAlive--;
		vanguard.children.splice(uInd, 1);
	}

	if(uInd > -1)
	{
		units.splice(uInd, 1);
	}

}
