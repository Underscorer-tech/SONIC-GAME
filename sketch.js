var sonic, coin, spike, simg, cimg, spimg, back, bimg, rand, coins, sc, ig,
  as, cg, score, over, go, state, life, og, sout;
var ig, jsound, csound, b1, h1, h2, h3, heart,outS;


function preload() {
  cimg = loadImage("coin.png");
  simg = loadAnimation("sonic.gif");
  spimg = loadImage("spike.png");
  bimg = loadImage("back.jpg");
  sc = loadAnimation("sonic_roll.gif")
  over = loadImage("gameover.png");
  sout = loadAnimation("sonic_out.png");
  jsound = loadSound("8d82b5_Sonic_Jump_Sound_Effect.mp3")
  csound = loadSound("341695__projectsu012__coins-1.wav")
  heart = loadImage("heart.png")
  outS = loadSound("8d82b5_Sonic_Ouch_Sound_Effect.mp3")
}

function setup() {

  var canvas = createCanvas(displayWidth, 600);

  life = 3;

  cg = new Group();
  og = new Group();

  b1 = createSprite(0, displayHeight / 2 - 160, displayWidth * 100, displayHeight)
  b1.addAnimation("b1", bimg);


  go = createSprite(displayWidth / 2 - 600, 160);
  go.addImage("over1", over);
  go.scale = 0.8;
  go.visible = false;

  state = 0;

  score = 0;

  ig = createSprite(displayWidth / 2, 560, displayWidth * 100, 25);


  sonic = createSprite(55, 560);
  sonic.addAnimation("sonicimg", simg);
  sonic.addAnimation("sc1", sc);
  sonic.addAnimation("sout1", sout);
  sonic.scale = 0.5;
  sonic.velocityX = 0.1;

  h1 = createSprite(550, 20)
  h1.addImage("h1", heart)
  h1.scale = 0.03

  h2 = createSprite(580, 20)
  h2.addImage("h2", heart)
  h2.scale = 0.03

  h3 = createSprite(610, 20)
  h3.addImage("h3", heart)
  h3.scale = 0.03

  b1.velocityX = -5
  go.visible = false

}

function draw() {
  console.log("MouseX:" + " " + World.mouseX + " " + "MouseY:" +
    World.mouseY + " " + "Framecount:" + " " + frameCount)
  background("white")
  camera.position.x = sonic.x;
  //    camera.position.y=sonic.y;


  if (life == 2) {
    h1.destroy();
  }

  if (life == 1) {
    h2.destroy();
  }

  if (life == 0) {
    h3.destroy();
    state = 2

  }



  ig.visible = false;

  if (state === 2) {

    go.visible = true;
    sonic.destroy();
    b1.destroy()
    cg.destroyEach();
    og.destroyEach();

  }



  sonic.collide(ig);
  sonic.velocityY = sonic.velocityY + 0.8;


  if (keyDown("space") && sonic.y > 495) {

    sonic.velocityY = -16;
    jsound.play()

  }


  if (og.isTouching(sonic)) {

    og.velocityX = 0;
    cg.velocityX = 0;

    life = life - 1
  
    outS.play();

    console.log(life)

    og[0].destroy()

  }

  if (cg.isTouching(sonic)) {
    cg[0].destroy();
    score = score + 10;
    csound.play();
  }

  if (sonic.y<485) {

    sonic.changeAnimation("sc1", sc);
    sonic.scale = 0.2;

  }


  if (sonic.y > 480) {

    sonic.changeAnimation("sonicimg", simg)
    sonic.scale = 0.5

  }

  if (b1.x < displayHeight / 2) {

    b1.x = displayWidth / 2

  }

  coin();
  ob();



  drawSprites();
  fill("black");
  textSize(24)
  textFont("Algerian")
  text("SCORE NEEDED TO WIN: 150 ",100,25)
  text("Score: ", 420, 25)
  text("  "+score, 490, 25);
}

function coin() {

  if (frameCount % 80 === 0) {

    coins = createSprite(1350, 560);
    coins.addImage("b1", cimg);
    coins.lifetime = 340;
    coins.scale = 0.2;
    coins.y = Math.round(random(338, 460));

    cg.add(coins);
    if (state === 0) {

      coins.velocityX = -8;
    } else {

      coins.velocityX = 0;
      coins.destroy();

    }

  }

}

function ob() {


  if (frameCount % 95 === 0) {
    var obstacles = createSprite(1350, 520);
    obstacles.addImage("oi1", spimg);

    if (state === 0) {
      obstacles.velocityX = -8;
    } else {

      obstacles.velocityX = 0;
      obstacles.destroy();

    }

    obstacles.scale = 0.4;
    obstacles.lifetime = 340;
    og.add(obstacles);
  }


}