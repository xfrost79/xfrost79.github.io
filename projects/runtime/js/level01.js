var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
        var hitZoneSize = 35;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = Math.random()*800 + 600;
        sawBladeHitZone.y = 240;
        sawBladeHitZone.rotationalVelocity = 10;
        game.addGameItem(sawBladeHitZone); 
        var obstacleImage = draw.bitmap('img/sawblade.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);
        }
        //call createSawblade 3 times
      
        createSawBlade();
        createSawBlade();
        createSawBlade();

        function createMyObstacle(x,y)  {
            var hitZoneSize = 35;
            var damageFromObstacle = 30;
            var flameBoltHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            flameBoltHitZone.x = Math.random()*500 + 400;
            flameBoltHitZone.y = Math.random()*100 + 230;
            game.addGameItem(flameBoltHitZone); 
            var obstacleImage = draw.bitmap('img/flamebolt.png');
            obstacleImage.scaleX = .25;
            obstacleImage.scaleY = .25;
            obstacleImage.x = -95;
            obstacleImage.y = -135;
            flameBoltHitZone.addChild(obstacleImage);
            };
            createMyObstacle();
        
        function createEnemy(x,y){
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = 900;
            enemy.y = groundY-50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-40)
                enemy.fadeOut();
            };

            enemy.onProjectileCollision = function() {
                console.log('Halle hit an enemy');
                game.increaseScore(100)
                enemy.shrink();
            };
        }   createEnemy();
       
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
