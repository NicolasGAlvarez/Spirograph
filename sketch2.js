let R = 150;
let r = 69;
let aOffset = 0.6;

let M;
let N;

let totalLaps;
let currentLap = 1;
let totalDegrees;
let factor;
let ratioNum;

let alpha;
let deltaAlpha;
let theta;

let pointsx;
let pointsy;

let frameRateSlider;
let deltaSlider;
let maxPoints = 100;
let stats;
let playButton;
let isPlaying;
let resetButton;


function gcd(a,b){
  if(!b){
    return a;
  }
  
  return gcd(b,a%b);
}


function showStats(){
  stats.html('R: ' + R 
    + '</br> r: ' + r 
    + '</br> Ratio: ' + ratioNum + ':' + totalLaps 
    + '</br> Total laps: ' + currentLap + ' / ' + totalLaps 
    + '</br> Total degrees: ' + ceil(theta) + ' / ' + totalDegrees
    + '</br> Seconds ellapsed: ' + round(millis()/1000)
    + '</br> Frame rate: ' + nf(frameRate(), 2, 1)
    + '</br> Delta: ' + deltaAlpha
  );
}


function setup (){
  createCanvas (600, 600);
  angleMode(DEGREES);

  frameRateSlider = createSlider(1, 60, 30, 1);
  deltaSlider = createSlider(1, 100, 50, 1);
  playButton = createButton('Pause');
  resetButton = createButton('Reset');
  stats = createP();
  
  resetSketch();

  isPlaying = true;
}


function toggleLoop(){
  if(isPlaying)
    stopLoop();
  else
    startLoop();
}

function stopLoop(){
  noLoop();
  isPlaying = false;
  playButton.html('Play');
}


function startLoop(){
  if(theta < totalDegrees){
    loop();
    isPlaying = true;
    playButton.html('Pause');
  }
}


function resetSketch(){
  factor = gcd(R,r);
  totalLaps = r/factor;
  ratioNum = R/factor;
  totalDegrees = 360 * totalLaps;
  deltaAlpha = 50;
  alpha = 0;
  theta = 0;
  pointsx = [];
  pointsy = [];

  background(41);
}


function draw(){
  if(alpha >= 360)
    alpha = 0;
  
  if(theta >= totalDegrees)
    stopLoop();

  frameRate(frameRateSlider.value());
  deltaAlpha = deltaSlider.value();

  playButton.mousePressed(toggleLoop);
  resetButton.mousePressed(resetSketch);
  
  showStats();
  
  translate(width/2, height/2);
  
  stroke(80);
  strokeWeight(1);
  noFill();
  
  // Outer circle C0
  ellipse(0, 0, R*2);

  for(let t=theta; t<theta+deltaAlpha; t++){
    // Inner circle Ci
    let xc = (R-r) * cos(t);
    let yc = (R-r) * sin(t);
    
    // phi, Ci angle.
    let phi = -(R/r -1) * t;
    
    // Point B, orientation of the inner circle
    let xB = xc + (aOffset * r) * cos(phi);
    let yB = yc + (aOffset * r) * sin(phi);
  
    pointsx.unshift(xB);
    pointsy.unshift(yB);
  
    strokeWeight(1);
    stroke(200,100,100,7);
    noFill();
  
    beginShape();
    for(let i=0; i<pointsx.length; i++){
      vertex(pointsx[i], pointsy[i]);
    }
    endShape();
  }

  pointsx.splice(maxPoints, maxPoints);
  pointsy.splice(maxPoints, maxPoints);

  alpha += deltaAlpha;
  theta += deltaAlpha;
  currentLap = ceil(theta/360);
}