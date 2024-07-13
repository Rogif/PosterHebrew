let ontext
let base
let tilesX = 300;
let tilesY = 450;
let width = 2384;
let height = 3370;
let tileW = width / tilesX;
let tileH = height / tilesY;
let bri_values = new Array(tilesX).fill(0).map(() => new Array(tilesY).fill(0));;

function setup() {
  createCanvas(width, height);
  background(0);
  ontext = loadImage('ontext.jpg', (img) => readBrightnessValues(img));
  base = loadImage('base.png');


  noStroke();
  fill(0);
  rectMode(CENTER);
}

function readBrightnessValues(img) {
  tilesH = img.height / tilesY;
  tilesW = img.width / tilesX;
  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      let c = img.get(int(x * tilesW), int(y * tilesH));
      let bri = brightness(c);
      bri_values[x][y] = bri;
    }
  }
}

function draw() {
  background(255);
  let x = 0;
  let y = 0;
  let mag = mouseX; // Helps control magnitude with the mouse 

  if (mag < 5) {
    image(ontext, 0, 0, width, height);
    image(base, 0, 0, width, height);
    return;
  }

  image(base, 0, 0, width, height);

  for (x = 0; x < tilesX; x++) {
    for (y = 0; y < tilesY; y++) {
      let bri = bri_values[x][y];

      let waveX = sin(radians(frameCount + x * y)); // This will make the words dissociate and associate while gliding across
      //let waveX = sin(radians(frameCount + x + 2 * y)); // Will make the alphabet go all swirly like a globe
      //let wave = sin(radians(frameCount + x + y)); // Makes letter sway from side to side
      //let waveY = sin(radians(frameCount + x * y)); 
      // Enables us to move it in the same way on another axis
      //let waveY = cos(radians(frameCount + x * y));  // Now it is sin and cos together which will give it a circular motion
      let waveY = cos(radians(frameCount + x + y));


      // Check if brightness is more than 100
      if (bri < 100) {
        // If yes, fill it to white
        // Draw the grid-tile
        //rect(x * tileW + waveX * 100, y * tileH + waveY * 100, tileW + 1, tileH + 1);
        // To make the mag work, just replace the numbers from the above and put mag instead.
        ellipse(x * tileW + waveX * mag, y * tileH + waveY * mag, tileW + 1, tileH + 1);
        //triangle(x * tileW + waveX * mag, y * tileH + waveY * mag, tileW + 1, tileH + 1, width / 2, height / 2);
      } else {
        // If not, fill with black
        //fill(255);
      }
    }
  }
}

function keyPressed() {
  if (key === 's') {
    console.log('saving');
    // Scale factor, adjust as needed
    let scaleFactor = 3;
    // Temporarily resize canvas
    resizeCanvas(width / scaleFactor, height / scaleFactor);
    // Save the canvas
    saveCanvas('myCanvas', 'png');
    // Optionally, resize back to original dimensions if needed
    resizeCanvas(width, height);
  }
}



