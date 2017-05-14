var r_width = 1;
var river_count = 0;
var max_rivers = 20;
//var first = true;
var r_shimmer = 50;

function animateRiver(x1, y1, x2, y2, ratio) {
  if(pause == 1){
    return;
  }
  
  r_width -= .05;
  if(r_width < .1)
    r_width = .1;
    
  ratio = ratio || 0;

  drawRiver(x1, y1, x2, y2, ratio);
  
  if(ratio < 1) {
    requestAnimationFrame(function() {
      animateRiver(x1, y1, x2, y2, ratio + .02);
    });
  }
  else if(river_count < max_rivers)
  {

    //animateRiver(x2, y2, x2 + 50 + Math.random() * 150, y2 + 50 + Math.random() * 150);
    //animateRiver(x2, y2, x2 - 50 - Math.random() * 150, y2 + 50 + Math.random() * 150);
    //animateRiver(x2, y2, x2, y2);
    river_count++;
  }
  else
  {
    ctx.restore();
  }
}

function drawRiver(x1,y1,x2,y2,ratio) {
  ctx.beginPath();
  ctx.save();
  ctx.lineWidth = r_width;
  var a = Math.random();
  var b = Math.random();

  x2 = x1 + ratio * (x2-x1); //+ a * r_shimmer;
  y2 = y1 + ratio * (y2-y1); //+ b * r_shimmer;
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  //ctx.stroke();
  //ctx.bezierCurveTo(x1, y1, x1 + a * r_shimmer, y1 + b * r_shimmer, x2, y2);
  //ctx.bezierCurveTo(x1 - a * r_shimmer, y1 + b * r_shimmer, x1, y1,  x2, y2);
  //ctx.arcTo(x1, y1, a * 500, b * 500, 20 * (Math.PI/180));
  
  // quadratic curves
  ctx.quadraticCurveTo(x1, y1 + b * 20, x2, y2);
  //ctx.quadraticCurveTo(x1 + a * r_shimmer, y1 + b * r_shimmer, x2, y2);
  
  ctx.stroke();
}