var x, y;
var tree_count = Math.random() * 20 + 15;
var m_count = Math.random() * 5 + 10;
var river_count = 1;
var landscape = [];
var river_partitions = 6;

function create2Darray(rows)
{
  var arr = [];
  for(var i = 0; i < rows; i++)
  {
    arr[i] = [];
  }
  
  return arr;
}

function fill_grid(array, col, rows, x1, y1, x2, y2)
{
  array.fill(1, x1, x2 + 1);
}

function generate_trees(count)
{
  for(var i = 0; i < count; i++)
  {
    x = Math.random();
    y = Math.random();
    animateBranches(x * 1000, 800 - y * 350, x * 1000 + x * 10, 800 - y * 400);
  }
}

function generate_mountains(count)
{
  for(var i = 0; i < count; i++)
  {
    x = Math.random();
    y = Math.random();
    var x1 = x * 1000;
    var y1 = y * 200;
    var x2 = x * 1000 + x * 10;
    var y2 = y * 300;
    animateMountain(x1, y1, x2, y2);
  }
}

function generate_river(count)
{
  for(var i = 0; i < count; i++)
  {
    x = Math.random() * 1000;
    y = Math.random();
    var x1 = Math.random() * 1000;
    for(var j = 0; j < river_partitions; j++)
    {
      animateRiver(x, 800/(river_partitions - j), x1, 800/(river_partitions - j -1));
      x = x1;
      x1 = Math.random() * 1000;
    }
  }
}

generate_trees(tree_count);
generate_mountains(m_count);

generate_river(river_count);