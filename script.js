//add comment
var config = {
  type: Phaser.AUTO,
  //add comment
  width: 1900,
  height: 1000,
  //add comment
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  //add comment
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
//add comment
var main = document.getElementById("startBtn")
var heading = document.getElementById("header")
//add comment
var gameOver
//add comment
var platforms;
//add comment
var score = 100;
var scoreText;
score = 0;
//add comment
var leafAm = 0
var gunAm = 0
var ammoAm = 0
var monkeyType = "monkey"
function start() {
  //add comment
  game = new Phaser.Game(config);
  //add comment
  main.innerHTML = ''
  heading.innerHTML += '<h1 class="header2" onclick="shop()"><u>Click To Access Shop</u></h1>'
}
//add comment
function preload() {
  //add comment
  this.load.image('Background', 'assets/Background.jpg');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('coin', 'assets/coin.png');
  this.load.image('redCoin', 'assets/redCoin.png');
  //add comment
  this.load.spritesheet('monkey', 'assets/monkey.png',
    { frameWidth: 600, frameHeight: 720 }
  );
  //add comment
  this.load.spritesheet('monkeyBanana', 'assets/monkeyBanana.png',
    { frameWidth: 600, frameHeight: 720 }
  );
  //add comment
  this.load.spritesheet('monkeyFull', 'assets/monkeyFull.png',
    { frameWidth: 600, frameHeight: 720 }
  );
  //add comment
  this.load.spritesheet('monkeySheild', 'assets/monkeySheild.png',
    { frameWidth: 600, frameHeight: 720 }
  );
}
function create() {
  //add comment
  this.add.image(500, 275, 'Background').setScale(3);
  //add comment
  this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  //add comment
  platforms = this.physics.add.staticGroup();
  platforms.create(200, 650, 'ground').setScale(0.15).refreshBody();
  platforms.create(600, 400, 'ground').setScale(0.15).refreshBody();
  platforms.create(1600, 650, 'ground').setScale(0.15).refreshBody();
  platforms.create(750, 100, 'ground').setScale(0.15).refreshBody();
  platforms.create(850, 750, 'ground').setScale(0.15).refreshBody();
  platforms.create(100, 950, 'ground').setScale(0.15).refreshBody();
  platforms.create(400, 950, 'ground').setScale(0.15).refreshBody();
  platforms.create(700, 950, 'ground').setScale(0.15).refreshBody();
  platforms.create(1000, 950, 'ground').setScale(0.15).refreshBody();
  platforms.create(1300, 950, 'ground').setScale(0.15).refreshBody();
  platforms.create(1600, 950, 'ground').setScale(0.15).refreshBody();
  platforms.create(1900, 950, 'ground').setScale(0.15).refreshBody();
  platforms.create(1800, 800, 'ground').setScale(0.15).refreshBody();
  platforms.create(250, 250, 'ground').setScale(0.15).refreshBody();
  platforms.create(1000, 500, 'ground').setScale(0.15).refreshBody();
  platforms.create(1150, 220, 'ground').setScale(0.15).refreshBody();
  //add comment
  player = this.physics.add.sprite(100, 450, 'monkey').setScale(0.075);
  this.physics.add.collider(player, platforms);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  //add comment
  this.anims.create({
    //add comment
    key: 'left',
    //add comment
    frames: this.anims.generateFrameNumbers('monkey', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  //add comment
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'monkey', frame: 4 }],
    frameRate: 20
  });
  //add comment
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('monkey', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  //add comment
  coins = this.physics.add.group({
    //add comment
    key: 'coin',
    //add comment
    repeat: 10,
    //add comment
    setXY: { x: 12, y: 0, stepX: 150 }
  });
  //add comment
  coins.children.iterate(function (child) {
    //add comment
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //add comment
    child.setScale(0.05)
  });
  //add comment
  this.physics.add.collider(coins, platforms);
  this.physics.add.overlap(player, coins, collectCoin, null, this);
  //add comment
  redCoins = this.physics.add.group();
  this.physics.add.collider(redCoins, platforms);
  this.physics.add.collider(player, redCoins, hitredCoin, null, this);
  //add comment
  scoreText = this.add.text(16, 16, 'Score: 0₴', { fontSize: '64px', fill: 'rgb(85, 1, 1)' });
}
//add comment
function update() {
  //add comment
  cursors = this.input.keyboard.createCursorKeys();
  //add comment
  if (cursors.left.isDown) {
    //add comment
    player.setVelocityX(-240);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    //add comment
    player.setVelocityX(240);
    player.anims.play('right', true);
  }
  else {
    //add comment
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  if (cursors.up.isDown && player.body.touching.down) {
    //add comment
    player.setVelocityY(-330);
  }
}
//add comment
function collectCoin(player, coin) {
  //add comment
  coin.disableBody(true, true);
  //add comment
  score += 1;
  scoreText.setText('Score: ' + score + '₴');
  //add comment
  if (coins.countActive(true) === 0) {
    coins.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });
    //add comment
    var x = Phaser.Math.Between(0, 800);
    var redCoin = redCoins.create(x, 16, 'redCoin').setScale(0.05);
    redCoin.setBounce(1);
    redCoin.setCollideWorldBounds(true);
    redCoin.setVelocity(Phaser.Math.Between(-300, 300), 20);
  }
}
//add comment
function hitredCoin(player, redCoin) {
  if (leafAm > 0) {
    leafAm -= 1
    //add comment
    redCoin.disableBody(true, true);
    //add comment
    var x = Phaser.Math.Between(0, 800);
    var redCoin = redCoins.create(x, 16, 'redCoin').setScale(0.05);
    redCoin.setBounce(1);
    redCoin.setCollideWorldBounds(true);
    redCoin.setVelocity(Phaser.Math.Between(-300, 300), 20);
    if (leafAm < 1 && gunAM > 0) {

    } else if (leafAm < 1){
      
    }
  } else {
    //add comment
    this.physics.pause();
    //add comment
    player.setTint(0xff0000);
    //add comment
    player.anims.play('turn');
    //add comment
    gameOver = true;
    //add comment
    this.time.delayedCall(3000, restart, null, this);
  }
}
//add comment
function restart() {
  //add comment
  score = 0
  var leafAm = 0
  var gunAm = 0
  var ammoAm = 0
  //add comment
  this.scene.stop();
  this.scene.start();
}
//add comment
function shop() {
  //add comment
  main.innerHTML = `<button class="shopBackground"></button>`
  main.innerHTML += `<button class="shop1">Shop</button>`
  main.innerHTML += `<button class="shop2">Warning: Shop Fast, you can still die</button>`
  main.innerHTML += `<button class="shop3" onclick = "buy1()">Banana Gun...₴100.00<br>(Ability to shoot bananas)<br>click here to buy</button>`
  main.innerHTML += `<button class="shop4" onclick = "buy2()">Leaf Shield...₴30.00<br>(Protection from 1 hit)<br>click here to buy</button>`
  main.innerHTML += `<button class="shop5" onclick = "buy3()">Bananas...₴10.00<br>(Extra ammo, gun comes with 1)<br>click here to buy</button>`
  main.innerHTML += `<button class="shop6">₴ is score</button>`
  main.innerHTML += `<button class="shop7" onclick="main.innerHTML = ''">Back To Game</button>`
  //
  main.innerHTML += `<img src="/assets/banana1.png" class="banana1">`
  main.innerHTML += `<img src="/assets/banana2.png" class="banana2">`
  main.innerHTML += `<img src="/assets/leaf.png" class="leaf">`
}
function buy1() {
  if (score > 99 && gunAm < 1) {
    gunAm += 1
    ammoAm += 1
    score -= 100
    scoreText.setText('Score: ' + score + '₴');
    if (leafAm > 0) {
      player.setTexture('monkeyFull')
    } else {
      player.setTexture('monkeyBanana')
    }
    
  } else if (gunAm > 0) {
    alert("You already have one")
  } else {
    alert("Not enough score")
  }
}
function buy2() {
  if (score > 29) {
    leafAm += 1
    score -= 30
    scoreText.setText('Score: ' + score + '₴');
    if (gunAm > 0) {

    } else {
      
    }
  } else {
    alert("Not enough score")
  }
}
function buy3() {
  if (score > 9) {
    ammoAm += 1
    score -= 10
    scoreText.setText('Score: ' + score + '₴');
  } else {
    alert("Not enough score")
  }
}