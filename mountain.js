var m_width = 2;
var mountain_count = 0;
var max_mountains = 20;
var first = true;
var m_shimmer = 20;
//var mountains = [];

function animateMountain(x1, y1, x2, y2, ratio) {
  if(pause == 1){
    return;
  }
  
  m_width -= .05;
  if(m_width < .1)
    m_width = .1;
    
  ratio = ratio || 0;
  if(first === false)
    drawMountain(x1, y1, x2, y2, ratio);
  
  if(ratio < 1) {
    requestAnimationFrame(function() {
      animateMountain(x1, y1, x2, y2, ratio + .05);
    });
  }
  else if(mountain_count < max_mountains)
  {
    
    var a = Math.random(), b = Math.random();
    animateMountain(x2, y2, x2 + 50 + a * 15, y2 + 50 + b * 15);
    animateMountain(x2, y2, x2 - 50 - a * 15, y2 + 50 + b * 15);
    mountain_count++;
    first = false;
  }
  else
  {
    ctx.restore();
  }
}

function drawMountain(x1,y1,x2,y2,ratio) {
  ctx.beginPath();
  ctx.save();
  ctx.lineWidth = m_width;
  var a = Math.random();
  var b = Math.random();

  x2 = x1 + ratio * (x2-x1); //+ a * shimmer;
  y2 = y1 + ratio * (y2-y1); //+ b * shimmer;
  ctx.moveTo(x2,y2);
  ctx.lineTo(x1,y1);
  ctx.stroke();
  //ctx.bezierCurveTo(x1 + a * shimmer, y1 + b * shimmer,x1, y1,  x2, y2);
  //ctx.bezierCurveTo(x1 - a * shimmer, y1 + b * shimmer, x1, y1,  x2, y2);

  // quadratic curves
  //ctx.quadraticCurveTo(x1 - a * shimmer, y1 - b * shimmer, x2, y2);
  ctx.quadraticCurveTo(x1 + a * m_shimmer, y1 + b * m_shimmer, x2, y2);
  
  ctx.stroke();
  
  //mountains.push(x1, y1, x2, y2);
}