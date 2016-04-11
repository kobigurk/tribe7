var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var people = [
    ['kobi', 'kobi.png'],
];

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://tribe7.kobigurk.com/';    
//    game.load.baseURL = 'http://localhost:8080/';    
    game.load.crossOrigin = 'anonymous';

    var i;
    for (i = 0; i < people.length; i++) {
        var person = people[i];
        game.load.image(person[0], 'sprites/' + person[1]);
    }
    game.load.image('platform', 'sprites/platform.png');
}

var npcs = [];
var platforms;

function create() {

    var i;
    for (i = 0; i < people.length; i++) {
        var person = people[i];

        var npc = game.add.sprite(400 + 10*(i % 2 == 0 ? i+1 : i)*(i % 2 == 0 ? -1 : 1), 0, person[0]);
        game.physics.arcade.enable(npc);
        npc.body.collideWorldBounds = true;
        npc.body.gravity.y = 500;
        npcs.push(npc);
    }
    
    platforms = game.add.physicsGroup();
    
    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);

    game.time.events.loop(Phaser.Timer.SECOND, jumpThem, this);
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
