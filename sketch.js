let R = 1;
let r = 5;
let M = 150;
let N = 120;
let f = 30; // phi < r

let totalLaps;
let currentLap = 1;
let totalDegrees;
let factor;
let ratioNum;

let theta = 0;
let deltaTheta;
let pointsx = [];
let pointsy = [];


function gcd(a,b){
  if(!b){
    return a;
  }
  
  return gcd(b,a%b);
}


function showStats(){
  textAlign(LEFT, TOP);
  stroke(0);
  fill(255);
  text('M: ' + M, -width/2, -height/2);
  text('N: ' + N, -width/2, -height/2+15);
  text('Ratio: ' + ratioNum+':'+totalLaps, -width/2, -height/2+30);
  text('totalLaps: ' + currentLap + ' / ' + totalLaps, -width/2, -height/2+45);
  text('totalDegrees: ' + ceil(theta) + ' / ' + totalDegrees, -width/2, -height/2+60);
  text('Seconds passed: ' + round(millis()/1000), -width/2, -height/2+75);
  text('frameRate: ' + nf(frameRate(),2,1), -width/2, -height/2+90);
}


function setup (){
  createCanvas (800, 800);
  angleMode(DEGREES);
  frameRate(30);

  factor = gcd(M,N);
  totalLaps = N/factor;
  ratioNum = M/factor;
  totalDegrees = 360 * totalLaps;
  deltaTheta = 10;
}


function draw(){
  background(41);
  translate(width/2, height/2);
  showStats();
  
  stroke(80);
  strokeWeight(1);
  noFill();
  
  // Outer circle C0
  ellipse(0, 0, M*2);

  //for(let theta=theta; theta<theta+deltaTheta; theta++){
    // Inner circle Ci  
    let xc = (M-N) * cos(theta);
    let yc = (M-N) * sin(theta);

    strokeWeight(1);
    stroke(80);
    ellipse(xc, yc, N*2);

    // alpha = orientation of the inner circle after it rolls (point B)
    let alpha = -(M/N -1) * theta;
  
    // B = Addition of outer circle and inner circle position
    let Bx = xc + N * cos(alpha);
    let By = yc + N * sin(alpha);

    stroke(255);
    strokeWeight(6);
    point(Bx, By);

    pointsx.unshift(Bx);
    pointsy.unshift(By);
    
    strokeWeight(3);
    stroke(200,100,100);
    
    beginShape();
    for(let i=0; i < pointsx.length; i++){
      vertex(pointsx[i], pointsy[i]);
    }
    endShape();
  //}

  let t = theta / N;
  print(t);
  
  // A = Drawing point
  // let Ax = (1- N/M) * cos(N*t) + (N/M) * cos((M-N)*t);
  // let Ay = (1- N/M) * sin(N*t) - (N/M) * sin((M-N)*t);

  strokeWeight(3);
  stroke(200,200,100);  
  //point(Ax, Ay);

  theta += deltaTheta;
  currentLap = ceil(theta/360);

  if(theta >= 360 * totalLaps)
    noLoop();
}