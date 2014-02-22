$(document).ready(function() {
/* ==================================================

================================================== */
var stage;
var mainChara;
var enemy;
var w;
var h;
var forward;
var speed = 40;
var balls = [];
var samplePoint = {};
var ballSpeed =50;

var sampleC,sampleD;

(function init(){
	stage = new createjs.Stage('myCanvas');
	stage.canvas.width = $(window).outerWidth();
	stage.canvas.height = $(window).outerHeight();

	w = stage.canvas.width;
	h = stage.canvas.height;

	forward = 'up';
	mainChara = drawRobot('red');
	enemy = drawRobot('blue');

	mainChara.y = h/2 -100;
	enemy.y = h/2 - 100;

	var range = Math.random()*w - 120;
	var range2 = Math.random()*w - 120;
	mainChara.x = 120;
	enemy.x = Math.random()*w -120;
	enemy.y = Math.random()*h - 120;

	samplePoint.x = enemy.x;
	samplePoint.y = enemy.y;

	stage.addChild(mainChara,enemy);
	stage.addEventListener("stagemousedown",handleAttack);
	stage.update();
	createjs.Ticker.addEventListener('tick',tick);

})();


function tick(){
	// enemyMove();
	ballsMove();
	stage.update();
	checkAttacked();
};

function handleAttack(){
	balls.push(createBall());
	stage.addChild(balls[balls.length-1]);
};

function ballsMove(){
	if(balls.length == 0)return;
	balls.forEach(function(ball,e){
	var vector = rwSub(enemy,mainChara);
	var direction = rwNormalize(vector);
	var shootingAmount = rwMult(direction,ballSpeed);
	var realDest = rwAdd(shootingAmount,ball);
		ball.x = realDest.x;
		ball.y = realDest.y;
		if(ball.x > w || ball.y > h){
			stage.removeChild(ball);
			balls.splice(e,1);
		}
	});

	console.log(balls.length);
};

function checkAttacked(){
	balls.forEach(function(ball,e){
		var xDist = Math.abs(ball.x-enemy.x);
		var yDist = Math.abs(ball.y-enemy.y);
		console.log(yDist);
		if(xDist < 60 && yDist < 60){
			stage.removeChild(enemy);
		}
	});
};


function rwAdd(a,b){
	return {
		x:a.x+b.x,
		y:a.y+b.y
	}
};

function rwMult(a,b){
	return {
		x:a.x*b,
		y:a.y*b
	}
};

function rwNormalize(a){
	var leng = rwLength(a);
	return {
		x:a.x/leng,
		y:a.y/leng
	}
};

function rwLength(a){
	return Math.sqrt(a.x*a.x + a.y*a.y);
}

function rwSub(a,b){
	var c = {};
	c.x = a.x - b.x;
	c.y = a.y - b.y;
	return c;
}


function enemyMove(){
	if(enemy.y <= 0)forward = 'down';
	if(enemy.y >= (h-120))forward = 'up';

	if(forward == 'up'){
		enemy.y = enemy.y - speed;
	}

	if(forward == 'down'){
		enemy.y = enemy.y + speed;
	}
};

function createBall(){
	var shape = new createjs.Shape();
	var g = shape.graphics;

	g.beginFill('#000');
	g.drawRoundRect(0,0,20,20,10);
	g.endFill();
	shape.x = mainChara.x+120;
	shape.y = mainChara.y + 40;

	return shape;
};

function drawRobot(color){
	var shape = new createjs.Shape();
	var g = shape.graphics;

	//draw head
	g.beginFill(color);
	g.drawCircle(50,50,60);
	// g.drawRoundRect(0,0,100,100,0);
	g.endFill();

	g.setStrokeStyle(5);
	g.beginStroke('#fff');
	g.beginFill('#000');
	g.drawCircle(25,35,10);
	g.endFill;

	g.setStrokeStyle(5);
	g.beginStroke('#fff');
	g.beginFill('#000');
	g.drawCircle(72,35,10);
	g.endFill;

	g.beginStroke("#000");
	g.moveTo(20,60);
	g.bezierCurveTo(20,80,80,80,80,60);

	return shape;
};


});

