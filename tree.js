var pause = 0;
var shimmer = 5;
var max_branches = 5000;
var branches = [];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";
ctx.fillStyle = "#F0F0F0";
ctx.lineWidth = 5;

var invert = 1;
var green = 22;

function drawBranch(x1,y1,x2,y2,ratio, width) {
  ctx.beginPath();
  ctx.save();
  ctx.lineWidth = width;
  //ctx.fillRect(0,0,800,800);
  var a = Math.random();
  var b = Math.random();
  ctx.strokeStyle = 'rgb(22,' + green + ',22)';
  ctx.moveTo(x1,y1);
  invert = (invert == 1) ? -1 : 1;
  ctx.rotate(invert * Math.PI/180);
  x2 = x1 + ratio * (x2-x1) + a * shimmer;
  y2 = y1 + ratio * (y2-y1) + b * shimmer;
  ctx.lineTo(x2,y2);
  ctx.stroke();
  green += .004;
  if(green > 139)
    green = 139;
    
  branches.push(x1, y1, x2, y2);
  //ctx.restore();
}

var slope = 1, branch_count = 0;
function animate(x1, y1, x2, y2, ratio) {
  //ctx.closePath();
  if(pause == 1){
    return;
  }
  width -= .003;
  if(width < .05)
    width = .06;
    
  ratio = ratio || 0;
  drawBranch(x1, y1, x2, y2, ratio, width);
  if(ratio < 1) {
    requestAnimationFrame(function() {
      animate(x1, y1, x2, y2, ratio + .1);
    });
  }
  else if(branch_count < max_branches)
  {
    build_branches(x1, y1, x2, y2);
    build_branches(x1, y1, x2, y2);
  }
  else
  {
    //make_leaves();
    ctx.restore();
  }
}

/* trunk */
//ctx.beginPath();
//ctx.strokeStyle="black";
animate(400, 800, 400, 450);
//animate(410, 800, 405, 405);
//animate(390, 800, 395, 395);
//animate(395, 800, 395, 395);
//animate(380, 800, 390, 390);
//animate(420, 800, 410, 410);
//animate(385, 800, 390, 395);
//animate(375, 800, 395, 395);
//animate(370, 800, 390, 385);
//animate(430, 800, 415, 415);

function build_branches(x1, y1, x2, y2)
{
  a = Math.random();
  // if(x2 < 100)
  // {
  //   animate(400, 400, x2 + Math.random() * 150, 400);
  // }
  // else if (x2 > 700)
  // {
  //   animate(400, 400, x2 - Math.random() * 150, 400);
  // }
  // else if(y2 < 100)
  // {
  //   animate(400, 400, 400, y2 + Math.random() * 150);
  // }
  // else if(y2 > 500)
  // {
  //   animate(400, 400, 400, y2 - Math.random() * 150);
  // }
  if(Math.random() >= .5)
  {
    animate(x2, y2, x2 + Math.random() * 120 * slope, y2 - Math.random() * 120 * slope);
  }
  else
  {
    animate(x2, y2, x2 - Math.random() * 120 * slope, y2 + Math.random() * 30 * slope);
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
  branch_count = 0;
  width = 5;
});

var width = 10;
function draw(startX, startY, len, angle) {
  ctx.beginPath();
  ctx.save();
  width -= 3;
  ctx.lineWidth = width;
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI/180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();
  
  if(len < 10) {
    ctx.restore();
    return;
  }
  
  draw(0, -len, len*0.8,  -15);
  draw(0, -len, len*0.8,  15);
  
  ctx.restore();
}

//draw(400,800,120,0);

var pause = document.getElementById("pause");
pause.addEventListener("click", function(evt) {
  pause ^= 1;
});
