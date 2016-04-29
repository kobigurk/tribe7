var game = new Phaser.Game(2048, 1024, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var t;
var people = [
    ['2', '2.png'],
    ['3', '3.png'],
    ['4', '4.png'],
    ['5', '5.png'],
    ['6', '6.png'],
    ['7', '7.png'],
    ['8', '8.png'],
    ['9', '9.png'],
    ['10', '10.png'],
    ['11', '11.png'],
    ['12', '12.png'],
    ['13', '13.png'],
    ['14', '14.png'],
    ['15', '15.png'],
    ['16', '16.png'],
    ['17', '17.png'],
    ['18', '18.png'],
    ['19', '19.png'],
    ['20', '20.png'],
    ['21', '21.png'],
    ['22', '22.png'],
    ['23', '23.png'],
    ['24', '24.png'],
    ['25', '25.png'],
    ['26', '26.png'],
    ['27', '27.png'],
    ['28', '28.png'],
    ['29', '29.png'],
    ['30', '30.png'],
    ['31', '31.png'],
    ['32', '32.png'],
    ['33', '33.png'],
    ['34', '34.png'],
    ['35', '35.png'],
    ['36', '36.png'],
    ['37', '37.png'],
    ['38', '38.png'],
    ['39', '39.png'],
    ['40', '40.png'],
    ['41', '41.png']

];

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://tribe7.kobigurk.com/';    
//    game.load.baseURL = 'http://localhost:8080/';    
    game.load.crossOrigin = 'anonymous';

    var i;
    for (i = 0; i < people.length; i++) {
        var person = people[i];
        game.load.image(person[0], 'sprites/trimmed_' + person[1]);
    }
    game.load.image('platform', 'sprites/platform.png');
}

var npcs = [];
var platforms;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function create() {

    var i;
    people = shuffle(people);
    for (i = 0; i < people.length; i++) {
        var person = people[i];

        var npc = game.add.sprite(1024 + 25*(i % 2 == 0 ? i+1 : i)*(i % 2 == 0 ? -1 : 1), 0, person[0]);
        game.physics.arcade.enable(npc);
        npc.body.collideWorldBounds = true;
        npc.body.gravity.y = 500;
        npcs.push(npc);
    }
    
    platforms = game.add.physicsGroup();
    
    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');
    platforms.create(1500, 550, 'platform');
    platforms.create(1000, 750, 'platform');

    platforms.setAll('body.immovable', true);

    game.time.events.loop(Phaser.Timer.SECOND, jumpThem, this);
    var style = { font: "100px Arial", fill: "#ff0044", align: "center" };
    t = game.add.text(1250, 100, 'Tribe 7!', style);
}

function update () {

    var i;
    for (i = 0; i < people.length; i++) {
        var npc = npcs[i];
        game.physics.arcade.collide(npc, platforms);
    }
}

function jumpThem() {
    var i;
    for (i  = 0; i < people.length; i++) {
        var npc = npcs[i];
        if (npc.body.onFloor() || npc.body.touching.down)
        {
            npc.body.velocity.y = -200;
        }
    }
}

function render () {

}
