// JavaScript Document

var counter=0;
parent = document.getElementById("road");
var enemy_cars = [];

var main = new Main();
main.reset_car();

setInterval(GameLoop,30);

function GameLoop()
{
	if(counter > 30)
	//if(Math.random()<0.1)
		{	
			var e = new Enemy();
			(enemy_cars).push(e);
			e.createEnemy();
		}
	
	var enemies = enemy_cars;
	for(var i=0;i<enemy_cars.length;i++)
	{
		if(enemies[i]!=null)
		{
			enemies[i].updateEnemy();
			if(enemies[i].y>600)
				{
					enemies[i].deleteEnemy();
					enemies[i]=null;
					enemy_cars = clearArray(enemies);
				}
		}
	}
	
	collisionCheck()
	main.updateBackground();
	counter++;
}

function Main(){
		var that = this;
		
		this.car_y = 500;
		this.car_x = 150;
		this.car_dx = 0;
		this.batman_car = document.getElementById("batman-car");
		this.reset_car = function(){
			that.batman_car.style.top = that.car_y+"px";
			that.batman_car.style.left = that.car_x+"px";
		}
		this.update_car = function(e){
			var dx =0;
			if(e==1 && that.car_x<260)
				{
					dx=110;
				}
			else if (e==-1 && that.car_x>140)
				{
					dx=-110;
				}
			else
				{
					dx=0;
				}
			that.car_x = that.car_x + dx;
			that.batman_car.style.left = that.car_x+"px";
		}
		
		this.background_y = 0;
		this.background_dy = 10;
		this.updateBackground = function(){
			parent.style.backgroundPosition = "0px "+that.background_y+"px";
			that.background_y=that.background_y+that.background_dy;
		}
}

function Enemy(){
	this.x=0;
	this.y=-100;
	this.dy =10;
	var that =this;
	this.elem_id = document.createElement('div');
	this.createEnemy = function(){
			that.elem_id.className = "enemy-car"; //style
			that.x=randomGenerator();
			that.elem_id.style.left = (that.x)+"px";	that.elem_id.style.top = that.y+"px";
			parent.appendChild(that.elem_id);
			counter =0;
		}
	this.updateEnemy = function(){
		var t = that.y +that.dy;
		that.y = t;
		that.elem_id.style.top = that.y+"px";
		}
	this.deleteEnemy = function(){
				parent.removeChild(that.elem_id);
	}
	
}

function collisionCheck()
{
	var car_y = main.car_y;
	var car_x = main.car_x;
	var ex;
	var ey;
	var enemies = enemy_cars;
	var l = enemies.length;
	for (var i=0;i<l;i++)
	{
		ex = enemies[i].x;
		ey = enemies[i].y;
	  if ( 	(ex+100) > car_x		//right edge of e > left edge of car
			  && ex<=(car_x+100)	//left edge of e < right edge of car
			  && (ey+100) > car_y	//bottome edge of e > top edge of car
			  && ey<= (car_y+100)
			)
		{
		  enemies[i].deleteEnemy();
		  enemies[i]=null;
		  enemy_cars = clearArray(enemies);
		}
	}
}

function randomGenerator()
{
	var random= Math.random();
	if(random>=0 && random<0.33)
	{
		return 40;
	}
	else if(random >=0.33 && random <0.66)
	{
		return (150);
	}
	else
	{
		return (260);
	}
}

function clearArray(input)
{
	var temp = [];
	var l =input.length;
	for(var i=0;i<l;i++)
	{
		if(input[i]!=null)
		{
			(temp).push(input[i]);
		}
	}
	return temp;
}

function keydownEventHandler(e)
{
	if(e.keyCode == 37)
	{
		//left
		console.log("left");
		main.update_car(-1);
	}
	
	if(e.keyCode == 39)
	{
		//right
		console.log("right");
		main.update_car(+1);
	}
	
	/*if(e.keyCode == 38)
	{
		main.background_dy = 30;
		for(var i=0;i<enemy_cars.length;i++)
			{
				var temp = enemy_cars[i];
				temp.dy = 30;
			}
	}*/
	
}

function keyupEventHandler(e)
{
	/*if(e.keyCode == 38)
	{
		main.background_dy = 5;
		for(var i=0;i<enemy_cars.length;i++)
			{
				var temp = enemy_cars[i];
				temp.dy = 5;
			}
	}*/
}

document.onkeydown = keydownEventHandler;
document.onkeyup = keyupEventHandler;