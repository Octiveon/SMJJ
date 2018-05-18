var Combat = function(game) {};


Combat.prototype = {
	init: function(mapAssetName) {
		partyAlive = partySize;
		actionEnum = "Move"; //Move, Ability, Attack
		_mapAssetPath = 'assets/imgs/'  + mapAssetName;

		mapWidth = -1;
		mapHeight = -1;
	},
	preload: function() {
		game.load.atlas('Characters', 'assets/imgs/Characters.png','assets/imgs/Characters.json',
		Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.tilemap('map', _mapAssetPath + '.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/imgs/tiles.png');
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
		map.addTilesetImage('spritesheet(2)','tiles');

		mapWidth = map.layers[0].width;
		mapHeight = map.layers[0].height;


		layer = map.createLayer(0);
		layer.resizeWorld();
		mapp = new Mapp(game, map, layer);

		uiGrp = game.add.group();
		uiGrp.enableBody = true;

		vanguard = game.add.group();
		vanguard.enableBody = true;

		enemyUnits = game.add.group();
		enemyUnits.enableBody = true;

		//Add Things in after here

		portrait = game.add.sprite(0, game.height - (600 * 0.2), 'UIHalfWindow');
		portrait.scale.setTo(0.2,0.2);
		portrait.fixedToCamera = true;
		portrait.enableBody = true;
		uiGrp.add(portrait);

		var style = { font: "10px Arial", fill: "#000000", wordWrap: true,
		 wordWrapWidth: portrait.width, align: "center", fontWeight: "bold" };

		wind = game.add.sprite(game.camera.width,0, 'TextWindow');
		wind.anchor.x =  1;
		wind.scale.setTo(0.1,0.15);
		wind.fixedToCamera = true;
		uiGrp.add(wind);


		unitWindowtext = game.add.text(portrait.width * 0.5 ,game.height - portrait.height * 0.7, "Health: \n Move:", style);
		unitWindowtext.fixedToCamera = true;

		endTurn = game.add.button(portrait.width * 0.9 ,game.height - portrait.height * 0.4, 'RndButton', EndTurn, this, 'Hover', 'Up','Down');
		endTurn.anchor.x = endTurn.anchor.y = 0.5;
		endTurn.fixedToCamera = true;
    endTurn.scale.setTo(1,1);
		endTurn.enableBody = true;

		endTurntext = game.add.text(portrait.width * 0.85 ,game.height - portrait.height * 0.25, "End Turn", style);
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

		moveBtn = game.add.button(wind.position.x - 150 ,35, 'RndButton', MoveMode, this, 'Hover', 'Up','Down');
		moveBtn.anchor.x = exitBtn.anchor.y = 0.5;
		moveBtn.fixedToCamera = true;
    moveBtn.scale.setTo(1,1);
		moveBtn.enableBody = true;
		uiGrp.add(moveBtn);


		moveBtntext = game.add.text(game.camera.width - wind.width * 0.70 , 35, "Move", style);
		moveBtntext.fixedToCamera = true;

		attackBtn = game.add.button(wind.position.x - 150 ,70, 'RndButton', AttackMode, this, 'Hover', 'Up','Down');
		attackBtn.anchor.x = exitBtn.anchor.y = 0.5;
		attackBtn.fixedToCamera = true;
    attackBtn.scale.setTo(1,1);
		attackBtn.enableBody = true;

		uiGrp.add(attackBtn);

		attackBtntext = game.add.text(game.camera.width - wind.width * 0.70 , 70, "Attack", style);
		attackBtntext.fixedToCamera = true;

		abilityBtn = game.add.button(wind.position.x - 150 ,105, 'RndButton', AbilityMode, this, 'Hover', 'Up','Down');
		abilityBtn.anchor.x = exitBtn.anchor.y = 0.5;
		abilityBtn.fixedToCamera = true;
		abilityBtn.scale.setTo(1,1);
		abilityBtn.enableBody = true;

		uiGrp.add(abilityBtn);

		abilityBtntext = game.add.text(game.camera.width - wind.width * 0.70 , 105, "Ability", style);
		abilityBtntext.fixedToCamera = true;

		// add instructions in the bottom right corner
		combatInstructions = game.add.sprite(850, 600, 'instructions','combatInstructions');
		combatInstructions.fixedToCamera = true;

		uiGrp.add(endTurn);

		style = { font: "16px Arial", fill: "#000000", wordWrap: true,
		 wordWrapWidth: portrait.width, align: "center", fontWeight: "bold" };

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

		key1 = game.input.keyboard.addKey(Phaser.Keyboard.T);
		key1.onDown.add(EndTurn, this);
		////////////////////////////////////////////////////////////////////

		game.input.onDown.add(TileSelect, this);
		game.input.addMoveCallback(updateMarker, this);
		UpdateUI();
		//mapp.Debug();


	},
	update: function() {

	},
	render: function()
	{
		//game.debug.body(portrait);
	}
};


function AttackMode() {
	actionEnum = "Attack";
}

function MoveMode() {
	actionEnum = "Move";

}

function AbilityMode() {
	actionEnum = "Ability";
}

function Exit() {
	game.state.start('mainMenu');
}

function EndTurn() {
	//Check for end turn button
	unitNum++;
	if(unitNum > units.length - 1){unitNum = 0;}
	currentUnit.NewTurn();
	currentUnit = units[unitNum];
	currentUnit.bringToTop();

	while(enemyUnits.children.indexOf(currentUnit) > -1)
	{//What to do when enemy turn comes up
		EnemyAct();
		unitNum++;
		if(unitNum > units.length - 1){unitNum = 0;}
		currentUnit = units[unitNum];

	}

	UpdateUI();
	game.camera.follow(currentUnit, 0, 0.2, 0.2);

}

function DEBUGTURNS() {

	for (var i = 0; i < 25 * partySize; i++) {
EndTurn();
	}

}

function EnemyAct() {

	pnt = getRandomTile();

	x = layer.getTileX(currentUnit.position.x + pnt[0]);
  y = layer.getTileY(currentUnit.position.y + pnt[1]);

	while (y >= 0 && !mapp.isTileOpen(x, y)) {
		pnt = getRandomTile();
		x = layer.getTileX(currentUnit.position.x + pnt[0]);
	  y = layer.getTileY(currentUnit.position.y + pnt[1]);
	}

	prevX = layer.getTileX(currentUnit.position.x);
  prevY = layer.getTileY(currentUnit.position.y);

	mapp.OccupentLeft(prevX,prevY + 1);
	mapp.Occupy(x,y, currentUnit);

	currentUnit.MoveTo(x * 32, y * 32 - 32);

}

function getRandomTile(){
	var randX = game.rnd.integerInRange(0,2);
	var randY = game.rnd.integerInRange(0,2);
	var x = 0;
	var y = 0;

	if (randX == 0) {
		x = 32;

	} else if(randX == 1) {
		x = -32;
	}

	if (randY == 0) {
		y = 32;

	} else if(randY == 1) {
		y = -32;
	}

	return [x,y];
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
	//Bounds buggy
	/*for (var i = 0; i < uiGrp.children.length; i++) {
		//console.log(uiGrp.children[i].getBounds().contains(x, y));
		if ((uiGrp.children[i].getBounds().contains(x, y))){return;}
	}
	*/

	x = layer.getTileX(x);
	y = layer.getTileY(y);

	if(x < 0){ x = 0;}
	if(y < 0){ y = 0;}

	var flag = mapp.getTileStatus(x,y);

	if(actionEnum == "Move")
	{
		if(GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60 && currentUnit.CanMove(mapp.getTileCost(x, y)))
		{ marker.tint = 0x3eff03; }
		else{		marker.tint = 0xBD0404; }
	}
	else if (actionEnum == "Attack") {

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
	/*for (var i = 0; i < uiGrp.children.length; i++) {
		//console.log(uiGrp.children[i].getBounds().contains(x, y));
		if ((uiGrp.children[i].getBounds().contains(x, y))){return;}
	}
	*/
	var x = game.input.activePointer.worldX;
	var y = game.input.activePointer.worldY;

	//Gets tile location in order to move the player
	x = layer.getTileX(game.input.activePointer.worldX);
	y = layer.getTileY(game.input.activePointer.worldY);

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
		x = layer.getTileX(game.input.activePointer.worldX);
	  y = layer.getTileY(game.input.activePointer.worldY);

		var prevX = layer.getTileX(currentUnit.position.x);
		var prevY = layer.getTileY(currentUnit.position.y);

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
	x = layer.getTileX(game.input.activePointer.worldX);
	y = layer.getTileY(game.input.activePointer.worldY);
}

function Attack(x,y) {
	if(!mapp.isTileOpen(x,y) && GetDistance(x * 32, y * 32 - 32, currentUnit.position.x,currentUnit.position.y) < 60){
		var flag = mapp.getTileStatus(x,y);

		if(flag == 1){
			occup = mapp.getTileOccupant(x,y);
			if(enemyUnits.children.indexOf(occup) > -1) {
				 console.log("Attack");
				 currentUnit.Attack(occup);
			}
		}
	}
}

function GetDistance(x1,y1,x2,y2) {
	return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function SpawnEnemies(count, type) {
	for (var i = 0; i < count; i++) {
		var x = game.rnd.integerInRange(1, mapWidth-1);
		var y = game.rnd.integerInRange(1, mapHeight-1);

		//Checks to make sure tile they will spawn in is open
		while (!mapp.isTileOpen(x,y+1)) {
			x = game.rnd.integerInRange(1, mapWidth-1);
			y = game.rnd.integerInRange(1, mapHeight-1);
		}


		//function EnemyUnit(game, key, frame, scale, x, y, health, baseDmg) {
		eUnit = new EnemyUnit(game, 'Characters',type, 1, x * 32, y * 32 -32, 50, 10);
		game.add.existing(eUnit);
		enemyUnits.add(eUnit);
		console.log(x, y + 1);
		mapp.Occupy(x,y,eUnit);

	}
}

function SpawnParty() {
	for (var i = 0; i < partySize; i++){
		var x = game.rnd.integerInRange(1, mapWidth-1);
		var y = game.rnd.integerInRange(1, mapHeight-1);

		//Checks to make sure tile they will spawn in is open
		while (!mapp.isTileOpen(x,y+1)) {
			x = game.rnd.integerInRange(1, mapWidth-1);
			y = game.rnd.integerInRange(1, mapHeight-1);
		}

		//function PlayerUnit(game, key, frame, scale, x, y, health, baseDmg) {
		pUnit = new PlayerUnit(game, 'Characters','Player', 1, x * 32, y * 32, 100, 15);
		game.add.existing(pUnit);
		vanguard.add(pUnit);
		mapp.Occupy(x,y, pUnit);

	}

}
