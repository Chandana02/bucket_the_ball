basketWidth = 75;
basketHeight = 75;
baskNo = 5;
s=200;
var c,ctx,setint,cw,ch;
ch=window.innerHeight;
cw=window.innerWidth;
var colors = ["red","blue","#0066FF","green","brown"];
var baskets = [];
var b = [];
var ran =[];
var lives = 5;
var score = 0;
var net = 5 - lives + score;
function generate(length)
{
    var arr = [];
    var n;
    for(var i=0; i<length; i++)
    {
        do
            n = Math.floor(Math.random()*5+1);
        while(arr.indexOf(n) !== -1)
            
      	arr[i] = n;
    }
    
    return arr;
}

function start()
{
	c = document.getElementById('canvas');
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	ctx = c.getContext('2d');

	b = generate(5);
	ran = generate(5);

	setint=setInterval(function(){ movedown(); }, 100);
	for(var j=0;j<baskNo;j++)
	{
		baskets[j] = new basket(colors[b[j]-1], ran[j]);
	}

	g = Math.floor(Math.random()*5) +1; 
	k=Math.floor(Math.random()*5);
	f = Math.floor(Math.random()*5);
	color=colors[k];
	ball = new createball(color, g, k);
}


//constructor for the baskets

function basket(color,num) {
	this.col = color;
	this.num = num;
	}

function createball(color,num,lane) {
	this.col = color;
	this.num = num;
	this.x=cw/2-(baskNo/2)*(basketWidth)+lane*(basketWidth+s)-(s*Math.floor((baskNo/2)))+basketWidth/2;
	this.y=25;
	this.lane=lane;
	}

	function lives(l) {
		this.l = l;
	}



function draw_baskets() {
	for(var i=0; i<baskNo; i++) {
		ctx.fillStyle = baskets[i].col;
		ctx.fillRect(cw/2-(baskNo/2)*(basketWidth)+i*(basketWidth+s)-(s*Math.floor((baskNo/2))), ch-basketHeight-10, basketWidth, basketHeight);
		ctx.font="40px Georgia";
		ctx.fillStyle="white";
		ctx.fillText(ran[i],cw/2-(baskNo/2)*(basketWidth)+i*(basketWidth+s)-(s*Math.floor((baskNo/2)))+(basketWidth/2)-5,ch-basketHeight+(basketHeight/2));
	}
}


function draw_ball() 
{
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,20,0,2*Math.PI);
	ctx.fillStyle=ball.col;
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle="white";
	ctx.font="40 px Georgia";
	ctx.fillText(ball.num,ball.x-10,ball.y+5);
	ball_in_basket();
}

function drawlives() {
	for(var i=0; i<lives; i++) {
		ctx.beginPath();
		ctx.arc(cw-10-20,10+(i+1)*50,20,0,2*Math.PI);
		ctx.fillStyle="black";
		ctx.fill();
		ctx.stroke();
	}
}

function writescore() {
	ctx.font="50px Georgia";
	ctx.fillStyle="black";
	ctx.fillText(score, 20, 40);
}

var inc =0;
var inc2 = 1;
function  movedown()
{
	ctx.clearRect(0,0,cw,ch);
	ball.y+=(inc);
	draw_ball();
	draw_baskets();
	drawlives();
	writescore();
	inc+=inc2;
}

function falldown() {
	ctx.clearRect(0,0,cw,ch);
	ball.y=ch - basketHeight - 10 -19;
	draw_ball();
	draw_baskets();
	drawlives();
	writescore();
}

function moveleft()
{
	ball.x-=(s+basketWidth);
	ball.lane--;
	if(ball.x<0)
	{
		ball.x+=(s+basketWidth);
		ball.lane++;	
	}
}

function moveright()
{
	ball.x+=(s+basketWidth);
	ball.lane++;
	if(ball.x>cw)
	{
		ball.x-=(s+basketWidth);
		ball.lane--;
	}
}

window.onkeydown = function(event){
	e=event.keyCode;
	if(e==37)
	{
		moveleft();
	}
	else
	if(e==39)
	{
		moveright();
	}
	else
		if(e==40)
		{
			falldown();
		}
}

function ball_in_basket()
{
		if(ball.y>(ch-basketHeight-10-20))
		{
			clearInterval(setint);
			if(ball.num==baskets[ball.lane].num) {
				inc = 0;
				score++;
				if(net%3==0)
				{
					inc2++;
				}
				start();
			}
			else
			{
				lives--;
				//alert('You lost a life :(');

				if(lives == 0)
				alert('you lost! :( Your score is' + score);

				else {
					inc = 0;
					start();
				}
			}
		}
}


