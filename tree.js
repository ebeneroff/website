var pause = 0;
var shimmer = 20;
var width = 5;
var max_branches = 600;
var branches = [];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "#202020";
ctx.fillStyle = "#F0F0F0";
ctx.lineWidth = 5;

var invert = 1;
var red = Math.random() * 255;
var green = Math.random() * 255;
var blue = Math.random() * 255;
  
function drawBranch(x1,y1,x2,y2,ratio, width) {
  ctx.beginPath();
  ctx.save();
  ctx.lineWidth = width;
  //ctx.fillRect(0,0,800,800);
  var a = Math.random();
  var b = Math.random();
  red = Math.floor(Math.random() * 255);
  green = Math.floor(Math.random() * 255);
  blue = Math.floor(Math.random() * 255);

  //ctx.moveTo(x1,y1);
  
  /* acid tree */
  //ctx.strokeStyle = "rgb("+red+","+green+","+blue+")";
  
  //invert = (invert == 1) ? -1 : 1;
  //ctx.rotate(invert * Math.PI/180);
  x2 = x1 + ratio * (x2-x1); //+ a * shimmer;
  y2 = y1 + ratio * (y2-y1); //+ b * shimmer;
  //ctx.lineTo(x2,y2);
  //ctx.stroke();
  //ctx.arcTo(x1, y1, x2, y2, 15 * (Math.PI/180));
  ctx.bezierCurveTo(x1, y1, x1 - a * shimmer, y1 - b * shimmer, x2, y2);
  ctx.bezierCurveTo(x1, y1, x1 + a * shimmer, y1 - b * shimmer, x2, y2);
  
  // quadratic curves
  //ctx.quadraticCurveTo(x1 - a * shimmer, y1 - b * shimmer, x2, y2);
  //ctx.quadraticCurveTo(x1 + a * shimmer, y1 - b * shimmer, x2, y2);
  
  //ctx.arcTo(x1, y1, x2, y2, -15 * (Math.PI/180));
  ctx.stroke();
  //if(green > 150)
    //green = 150;
    

  //branches.push(x1, y1, x2, y2);
}

var slope = 1, branch_count = 0;
function animate(x1, y1, x2, y2, ratio) {
  if(pause == 1){
    return;
  }
  
  width -= .01;
  if(width < .1)
    width = .1;
    
  ratio = ratio || 0;
  drawBranch(x1, y1, x2, y2, ratio, width);
  if(ratio < 1) {
    requestAnimationFrame(function() {
      animate(x1, y1, x2, y2, ratio + .1);
    });
  }
  else if(branch_count < max_branches)
  {
    animate(x2, y2, x2 + 50 * Math.random() + 10, y2 - Math.random() * 50 - 10);
    animate(x2, y2, x2 - 50 * Math.random() - 10, y2 - Math.random() * 50 - 10);
    branch_count++;
  }
  else
  {
    //make_leaves();
    ctx.restore();
  }
}


function build_branches(x1, y1, x2, y2)
{
  if(Math.random() > .5)
  {
    animate(x2, y2, x2 + Math.random() * 120 * slope, y2 - Math.random() * 150 * slope);
  }
  else
  {
    animate(x2, y2, x2 - Math.random() * 120 * slope, y2 + Math.random() * 30 * slope);
  }
  //animate(x2, y2, x2 + 100, y2 - 150);
  branch_count++;
}

/* leaves */
function make_leaves()
{
  var y2 = branches.pop();
  var x2 = branches.pop();
  var y1 = branches.pop();
  var x1 = branches.pop();
  ctx.beginPath();
  ctx.strokeStyle="green";
  ctx.lineWidth = 1;
  for(i = 0; i < max_branches; i++)
  {
    animateLeaf(x1, y1, x2, y2);
  }
}

function drawLeaf(x1,y1,x2,y2,ratio) {
  ctx.fillRect(0,0,800,800);
  var a = Math.random();
  var b = Math.random();
  ctx.moveTo(x1,y1);
  x2 = x1 + ratio * (x2-x1) + a * 10;
  y2 = y1 + ratio * (y2-y1) + b * 10;
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function animateLeaf(x1, y1, x2, y2, ratio) {
  ctx.closePath();
  if(pause == 1){
    return;
  }
  
  ratio = ratio || 0;
  drawLeaf(x1, y1, x2, y2, ratio);
  if(ratio < 1) {
    requestAnimationFrame(function() {
      animateLeaf(x1, y1, x2, y2, ratio + .1);
    });
}}

var btn = document.getElementById("restart");
btn.addEventListener("click", function(evt) {
  canvas.width = canvas.width;
  ctx = canvas.getContext("2d");
  ctx.strokeStyle="#202020";
  ctx.fillStyle = "#F0F0F0";
  animate(400, 800, 370, 600);
  branch_count = 0;
  width = 5;
});


var pause = document.getElementById("pause");
pause.addEventListener("click", function(evt) {
  pause ^= 1;
});

/* trunk */
animate(400, 800, 370, 500);
