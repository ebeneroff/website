var pause = 0;
var shimmer = 10;
var max_branches = 300;
var branches = [];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";
ctx.fillStyle = "#F0F0F0";
ctx.lineWidth = 2;

function drawBranch(x1,y1,x2,y2,ratio) {
  ctx.fillRect(0,0,800,800);
  var a = Math.random();
  var b = Math.random();
  ctx.moveTo(x1,y1);
  x2 = x1 + ratio * (x2-x1) + a * shimmer;
  y2 = y1 + ratio * (y2-y1) + b * shimmer;
  ctx.lineTo(x2,y2);
  ctx.stroke();
  branches.push(x1, y1, x2, y2);
}

var slope = 1, branch_count = 0;
function animate(x1, y1, x2, y2, ratio) {
  ctx.closePath();
  if(pause == 1){
    return;
  }
  
  ratio = ratio || 0;
  drawBranch(x1, y1, x2, y2, ratio);
  if(ratio < 1) {
    requestAnimationFrame(function() {
      animate(x1, y1, x2, y2, ratio + .01);
    });
  }
  else if(branch_count < max_branches)
  {
    build_branches(x1, y1, x2, y2);
  }
  else
  {
    //make_leaves();
  }
}

/* trunk */
ctx.beginPath();
//ctx.strokeStyle="black";
animate(400, 800, 400, 400);
animate(410, 800, 405, 405);
animate(390, 800, 395, 395);
animate(395, 800, 395, 395);
animate(380, 800, 390, 390);
animate(420, 800, 410, 410);
animate(385, 800, 390, 395);
animate(375, 800, 395, 395);
animate(370, 800, 390, 385);
animate(430, 800, 415, 415);

function build_branches(x1, y1, x2, y2)
{
  a = Math.random();
  if(x2 < 100)
  {
    animate(400, 400, x2 + Math.random() * 300, 400);
  }
  else if (x2 > 700)
  {
    animate(400, 400, x2 - Math.random() * 300, 400);
  }
  else if(y2 < 100)
  {
    animate(400, 400, 400, y2 + Math.random() * 300);
  }
  else if(y2 > 500)
  {
    animate(400, 400, 400, y2 - Math.random() * 300);
  }
  else if(Math.random() > .5)
  {
    animate(x2, y2, x2 + Math.random() * 50 * slope, y2 - Math.random() * 50 * slope);
  }
  else
  {
    animate(x2, y2, x2 - Math.random() * 50 * slope, y2 + Math.random() * 50 * slope);
  }
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
  ctx.strokeStyle="black";
  ctx.fillStyle = "#F0F0F0";
  animate(400, 800, 400, 400);
  animate(400, 800, 400, 400);
  animate(410, 800, 405, 405);
  animate(390, 800, 395, 395);
  animate(395, 800, 395, 395);
  animate(380, 800, 390, 390);
  animate(420, 800, 410, 410);
  animate(385, 800, 390, 395);
  animate(375, 800, 395, 395);
  animate(370, 800, 390, 385);
  animate(430, 800, 415, 415);
  branch_count = 0;
});

var pause = document.getElementById("pause");
pause.addEventListener("click", function(evt) {
  pause ^= 1;
});
